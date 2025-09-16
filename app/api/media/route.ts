import { NextRequest, NextResponse } from "next/server";
import { createGoogleDriveService } from "@/lib/google-drive";
import { FEATURED_MEDIA } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? "20");
  const pageToken = searchParams.get("pageToken") ?? undefined;

  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const driveService = createGoogleDriveService();

  try {
    if (!folderId) {
      return NextResponse.json(
        { items: FEATURED_MEDIA, nextPageToken: null },
        { headers: { "Cache-Control": "public, s-maxage=60" } },
      );
    }

    const response = await driveService.listMediaFiles({ folderId, pageSize: limit, pageToken });

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=60",
      },
    });
  } catch (error) {
    console.error("Failed to fetch media", error);
    return NextResponse.json(
      { items: FEATURED_MEDIA, nextPageToken: null, error: "Unable to fetch media at this time" },
      { status: 500 },
    );
  }
}
