import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json(
        { error: "imageBase64 is required" },
        { status: 400 },
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that produces a short description (caption) for the given image. Respond only with the caption.",
        },
        {
          role: "user",
          content: `Here is a base64 image:\n\n${imageBase64}\n\nGenerate a short caption for this.`,
        },
      ],
    });

    const caption = response.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ caption });
  } catch (err: any) {
    console.error("Caption API error:", err);
    return NextResponse.json(
      { error: err.message || "Caption generation failed" },
      { status: 500 },
    );
  }
}
