import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Return mock data
  return NextResponse.json({
    id,
    title: "Test Media",
    url: "https://via.placeholder.com/640x360.png",
  });
}
