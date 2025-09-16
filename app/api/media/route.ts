import { NextRequest, NextResponse } from "next/server";
import { listMediaFiles } from "@/lib/google-drive";
import { FEATURED_MEDIA } from "@/lib/constants";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = Number.parseInt(searchParams.get("limit") ?? "20", 10);
  const pageToken = searchParams.get("pageToken") ?? undefined;

  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!folderId) {
    return NextResponse.json(
      { items: FEATURED_MEDIA, nextPageToken: null },
      { headers: { "Cache-Control": "public, s-maxage=60" } },
    );
  }

  try {
    const response = await listMediaFiles({ folderId, pageSize: Number.isFinite(limit) ? limit : 20, pageToken });

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
