import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imageKit = new ImageKit(config.env.imagekit);

export async function GET() {
  try {
    return NextResponse.json(imageKit.getAuthenticationParameters());
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}