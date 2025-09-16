import { NextRequest, NextResponse } from "next/server";
import { googleDriveService } from "@/lib/google-drive";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params since it's a Promise in Next.js 15+
    const { id } = await params;
    
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!folderId) {
      return NextResponse.json(
        { error: "Google Drive folder not configured" },
        { status: 500 }
      );
    }

    await googleDriveService.authenticate();
    const [metadata, streamUrl, thumbnail] = await Promise.all([
      googleDriveService.getFileMetadata(id),
      googleDriveService.generateStreamUrl(id),
      googleDriveService.generateThumbnail(id),
    ]);

    if (!metadata) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...metadata,
      streamUrl,
      thumbnail,
    });
  } catch (error) {
    console.error("Failed to fetch media metadata:", error);
    return NextResponse.json(
      { error: "Unable to fetch media metadata" },
      { status: 500 }
    );
  }
}