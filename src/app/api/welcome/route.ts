import { NextResponse } from "next/server";

// For static export, we need to export a config object
export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({ message: "Welcome to the API!" });
}
