import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import { getGoogleDriveService } from "@/lib/google-drive";
import { FEATURED_MEDIA } from "@/lib/constants";

const CACHE_HEADERS = { "Cache-Control": "no-store, max-age=0" } as const;

export async function GET(request: NextRequest) {
  noStore();

  const { searchParams } = new URL(request.url);
  const parsedLimit = Number.parseInt(searchParams.get("limit") ?? "20", 10);
  const limit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : 20;
  const pageToken = searchParams.get("pageToken") ?? undefined;

  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!folderId) {
    return NextResponse.json(
      { items: FEATURED_MEDIA, nextPageToken: null },
      { headers: CACHE_HEADERS },
    );
  }

  try {
    const driveService = await getGoogleDriveService();
    const response = await driveService.listMediaFiles({ folderId, pageSize: limit, pageToken });

    return NextResponse.json(response, {
      headers: CACHE_HEADERS,
    });
  } catch (error) {
    console.error("Failed to fetch media", error);
    return NextResponse.json(
      { items: FEATURED_MEDIA, nextPageToken: null, error: "Unable to fetch media at this time" },
      { status: 500, headers: CACHE_HEADERS },
    );
  }
}
