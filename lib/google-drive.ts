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

const thumbnailCache = new Map<string, string>();

interface ListMediaOptions {
  folderId: string;
  pageSize?: number;
  pageToken?: string;
}

export class GoogleDriveService {
  private constructor(
    private readonly drive: drive_v3.Drive,
    private readonly auth: JWT,
  ) {}

  static async create() {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!email || !privateKey) {
      throw new Error("Google service account credentials are not configured");
    }

    const auth = new google.auth.JWT({
      email,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    try {
      await auth.authorize();
    } catch (error) {
      auth.revokeCredentials().catch(() => undefined);
      throw error;
    }

    const drive = google.drive({ version: "v3", auth });
    return new GoogleDriveService(drive, auth);
  }

  async listMediaFiles({ folderId, pageSize = 20, pageToken }: ListMediaOptions): Promise<MediaFeedResponse> {
    const query = [
      `'${folderId}' in parents`,
      "trashed = false",
      `mimeType contains 'video/' or mimeType contains 'image/'`,
    ].join(" and ");

    const response = await this.drive.files.list({
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
      .filter((file) => file.mimeType && MEDIA_MIME_TYPES.some((mime) => file.mimeType?.startsWith(mime.split("/")[0])))
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

  async getFileMetadata(fileId: string) {
    const response = await this.drive.files.get({
      fileId,
      fields:
        "id, name, mimeType, description, createdTime, webViewLink, webContentLink, thumbnailLink, videoMediaMetadata(durationMillis)",
      supportsAllDrives: true,
    });
    return response.data;
  }

  async generateStreamUrl(fileId: string) {
    await this.auth.authorize().catch(() => undefined);
    return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&supportsAllDrives=true`;
  }

  async generateThumbnail(fileId: string, metadata?: drive_v3.Schema$File) {
    if (thumbnailCache.has(fileId)) {
      return thumbnailCache.get(fileId) as string;
    }

    const fileMetadata = metadata ?? (await this.getFileMetadata(fileId));
    const thumbnail = fileMetadata.thumbnailLink ?? fileMetadata.webViewLink ?? "";

    if (thumbnail) {
      thumbnailCache.set(fileId, thumbnail);
    }

    return thumbnail;
  }
}

export async function getGoogleDriveService() {
  return GoogleDriveService.create();
}
