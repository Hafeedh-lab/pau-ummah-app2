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

interface ListMediaOptions {
  folderId: string;
  pageSize?: number;
  pageToken?: string;
}

export class GoogleDriveService {
  private client: drive_v3.Drive | null = null;
  private auth: JWT | null = null;
  private thumbnailCache = new Map<string, string>();

  private async getAuthClient() {
    if (this.auth) return this.auth;

    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!email || !privateKey) {
      throw new Error("Google service account credentials are not configured");
    }

    this.auth = new google.auth.JWT({
      email,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    return this.auth;
  }

  private async getClient() {
    if (this.client) return this.client;
    const auth = await this.getAuthClient();
    this.client = google.drive({ version: "v3", auth });
    return this.client;
  }

  async authenticate() {
    await this.getClient();
  }

  async listMediaFiles({ folderId, pageSize = 20, pageToken }: ListMediaOptions): Promise<MediaFeedResponse> {
    const drive = await this.getClient();

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
    const drive = await this.getClient();
    const response = await drive.files.get({
      fileId,
      fields:
        "id, name, mimeType, description, createdTime, webViewLink, webContentLink, thumbnailLink, videoMediaMetadata(durationMillis)",
      supportsAllDrives: true,
    });
    return response.data;
  }

  async generateStreamUrl(fileId: string) {
    await this.getAuthClient();
    return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&supportsAllDrives=true`;
  }

  async generateThumbnail(fileId: string) {
    if (this.thumbnailCache.has(fileId)) {
      return this.thumbnailCache.get(fileId) as string;
    }
    const metadata = await this.getFileMetadata(fileId);
    const thumbnail = metadata.thumbnailLink ?? metadata.webViewLink ?? "";
    this.thumbnailCache.set(fileId, thumbnail);
    return thumbnail;
  }
}

export function createGoogleDriveService() {
  return new GoogleDriveService();
}
