import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    return NextResponse.json({ count: 0 });
  } catch (err) {
    return NextResponse.json({ err: err.message });
  }
}
