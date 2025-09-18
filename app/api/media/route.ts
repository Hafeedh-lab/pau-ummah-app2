import { NextResponse } from "next/server";
import { FEATURED_MEDIA } from "@/lib/constants";

export async function GET() {
  // Return static data only - no async operations
  return NextResponse.json({
    items: FEATURED_MEDIA,
    nextPageToken: null,
  });
}
