import { NextRequest, NextResponse } from "next/server";
import { createGoogleDriveService } from "@/lib/google-drive";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!folderId) {
    return NextResponse.json({ error: "Google Drive folder not configured" }, { status: 500 });
  }

  try {
    const driveService = createGoogleDriveService();
    const metadata = await driveService.getFileMetadata(params.id);
    const streamUrl = await driveService.generateStreamUrl(params.id);
    const thumbnail = await driveService.generateThumbnail(params.id);

    return NextResponse.json({ ...metadata, streamUrl, thumbnail });
  } catch (error) {
    console.error("Failed to fetch media metadata", error);
    return NextResponse.json({ error: "Unable to fetch media metadata" }, { status: 500 });
  }
}
