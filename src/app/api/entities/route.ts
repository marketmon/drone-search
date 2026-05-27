import { NextResponse } from "next/server";

const SHEET_URL = process.env.USV_ENTITIES_SHEET_URL!;

export async function GET() {
  try {
    const response = await fetch(SHEET_URL, { cache: "no-store" });
    if (!response.ok) {
      return new NextResponse("Failed to fetch sheet", { status: 502 });
    }
    const csv = await response.text();
    return new NextResponse(csv, {
      headers: { "Content-Type": "text/csv" },
    });
  } catch (error) {
    console.error("Error fetching entities sheet:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
