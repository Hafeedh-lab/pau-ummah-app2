import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import { getGoogleDriveService } from "@/lib/google-drive";

interface RouteParams {
  params: { id?: string };
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  noStore();

  const mediaId = params?.id;

  if (!mediaId) {
    return NextResponse.json({ error: "Media id is required" }, { status: 400 });
  }

  try {
    const driveService = await getGoogleDriveService();
    const metadata = await driveService.getFileMetadata(mediaId);
    const [streamUrl, thumbnail] = await Promise.all([
      driveService.generateStreamUrl(mediaId),
      driveService.generateThumbnail(mediaId, metadata),
    ]);

    return NextResponse.json({ ...metadata, streamUrl, thumbnail }, { headers: { "Cache-Control": "no-store, max-age=0" } });
  } catch (error) {
    console.error("Failed to fetch media metadata", error);
    return NextResponse.json({ error: "Unable to fetch media metadata" }, { status: 500, headers: { "Cache-Control": "no-store, max-age=0" } });
  }
}
