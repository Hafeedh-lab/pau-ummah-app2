import { NextRequest, NextResponse } from "next/server";
import { generateStreamUrl, generateThumbnail, getFileMetadata } from "@/lib/google-drive";

export const runtime = "nodejs";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const mediaId = params.id;
  if (!mediaId) {
    return NextResponse.json({ error: "Media id is required" }, { status: 400 });
  }

  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!folderId) {
    return NextResponse.json({ error: "Google Drive folder not configured" }, { status: 500 });
  }

  try {
    const metadata = await getFileMetadata(mediaId);
    if (!metadata.id) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    const [streamUrl, thumbnail] = await Promise.all([
      generateStreamUrl(mediaId),
      generateThumbnail(mediaId),
    ]);

    return NextResponse.json({ ...metadata, streamUrl, thumbnail });
  } catch (error) {
    console.error("Failed to fetch media metadata", error);
    return NextResponse.json({ error: "Unable to fetch media metadata" }, { status: 500 });
  }
}
