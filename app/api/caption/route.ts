import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    const { image_url, prompt } = await req.json();
    console.log({ image_url });

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                prompt ||
                "(2-3) өгүүлбэрт багтаан монгол хэлээр тайлбарлаж бичнэ үү.",
            },
            {
              type: "image_url",
              image_url: {
                url: image_url,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
    });

    const caption = response.choices[0]?.message?.content;

    return NextResponse.json({ output: caption });
  } catch (err: any) {
    console.error("Caption API error:", err);
    return NextResponse.json(
      { error: err.message || "Caption generation failed" },
      { status: 500 },
    );
  }
}
