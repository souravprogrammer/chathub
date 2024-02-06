import { NextResponse } from "next/server";
import sendEmail from "@/utils/sendEmail";
export async function POST(request) {
  const formData = await request.formData();

  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const body = formData.get("body");

    const res = await sendEmail({
      name,
      subject: "Benter : Contact Query",
      email,
      body,
    });
    if (!res.success) {
      throw new Error("not successfuly send");
    }

    return NextResponse.json({ res: { success: true } });
  } catch (err) {
    return NextResponse.json({ err: err.message, res: { success: false } });
  }
}
