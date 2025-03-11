// This file is kept for reference but won't be used in the static export
// Form submissions are handled by Formspree in the formUtils.ts file

import { NextResponse, NextRequest } from "next/server";

// For static export, we need to export a config object
export const dynamic = 'force-static';

export async function POST(req: NextRequest) {
  // This function won't be called in the static export
  // It's just a placeholder to satisfy Next.js build
  return NextResponse.json({ 
    message: "This API route is not available in static export. Use Formspree instead." 
  });
}
