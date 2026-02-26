import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: " is required" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: " AI .",
        },
        {
          role: "user",
          content: `image:\n\n${imageBase64}\n\nGenerate a short caption for this.`,
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
