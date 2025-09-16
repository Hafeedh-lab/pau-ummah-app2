import { google, drive_v3 } from "googleapis";
import { JWT } from "google-auth-library";
import type { MediaFeedResponse, MediaItem } from "@/types";

const MEDIA_MIME_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

type GoogleDriveRuntimeState = {
  auth?: JWT;
  client?: drive_v3.Drive;
  thumbnailCache?: Map<string, string>;
};

const globalRuntime = globalThis as typeof globalThis & {
  _googleDriveState?: GoogleDriveRuntimeState;
};

function getRuntimeState(): GoogleDriveRuntimeState {
  if (!globalRuntime._googleDriveState) {
    globalRuntime._googleDriveState = {};
  }
  return globalRuntime._googleDriveState;
}

async function getAuthClient() {
  const state = getRuntimeState();
  if (state.auth) return state.auth;

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !privateKey) {
    throw new Error("Google service account credentials are not configured");
  }

  state.auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  return state.auth;
}

async function getClient() {
  const state = getRuntimeState();
  if (state.client) return state.client;

  const auth = await getAuthClient();
  state.client = google.drive({ version: "v3", auth });
  return state.client;
}

function getThumbnailCache() {
  const state = getRuntimeState();
  if (!state.thumbnailCache) {
    state.thumbnailCache = new Map<string, string>();
  }
  return state.thumbnailCache;
}

function isSupportedMimeType(mimeType?: string | null) {
  if (!mimeType) return false;
  return MEDIA_MIME_TYPES.some((allowedType) => {
    const [category] = allowedType.split("/");
    return mimeType.startsWith(`${category}/`);
  });
}

export interface ListMediaOptions {
  folderId: string;
  pageSize?: number;
  pageToken?: string;
}

export async function listMediaFiles({
  folderId,
  pageSize = 20,
  pageToken,
}: ListMediaOptions): Promise<MediaFeedResponse> {
  const drive = await getClient();

  const query = [
    `'${folderId}' in parents`,
    "trashed = false",
    `mimeType contains 'video/' or mimeType contains 'image/'`,
  ].join(" and ");

  const response = await drive.files.list({
    q: query,
    fields:
      "nextPageToken, files(id, name, mimeType, createdTime, description, webViewLink, webContentLink, thumbnailLink, videoMediaMetadata(durationMillis))",
    orderBy: "createdTime desc",
    pageSize,
    pageToken,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  const files = response.data.files ?? [];
  const items: MediaItem[] = files
    .filter((file) => isSupportedMimeType(file.mimeType))
    .map((file) => ({
      id: file.id ?? "",
      type: file.mimeType?.startsWith("video") ? "video" : "image",
      url: file.webContentLink ?? `https://drive.google.com/uc?export=download&id=${file.id}`,
      thumbnail: file.thumbnailLink ?? file.webViewLink ?? "",
      title: file.name ?? "Media",
      description: file.description ?? "",
      date: file.createdTime ?? new Date().toISOString(),
      eventType: "general",
      likes: Math.floor(Math.random() * 1500) + 100,
      views: Math.floor(Math.random() * 25000) + 500,
      duration: Number(file.videoMediaMetadata?.durationMillis ?? 0) / 1000,
    }));

  return {
    items,
    nextPageToken: response.data.nextPageToken ?? undefined,
  };
}

export async function getFileMetadata(fileId: string) {
  const drive = await getClient();
  const response = await drive.files.get({
    fileId,
    fields:
      "id, name, mimeType, description, createdTime, webViewLink, webContentLink, thumbnailLink, videoMediaMetadata(durationMillis)",
    supportsAllDrives: true,
  });
  return response.data;
}

export async function generateStreamUrl(fileId: string) {
  await getAuthClient();
  return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&supportsAllDrives=true`;
}

export async function generateThumbnail(fileId: string) {
  const cache = getThumbnailCache();
  if (cache.has(fileId)) {
    return cache.get(fileId) as string;
  }

  const metadata = await getFileMetadata(fileId);
  const thumbnail = metadata.thumbnailLink ?? metadata.webViewLink ?? "";
  cache.set(fileId, thumbnail);
  return thumbnail;
}
