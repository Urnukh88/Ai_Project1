import { NextResponse } from "next/server";
import { openAiLib } from "@/lib/openai-image-generate";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// export async function POST(req: Request) {
//   try {
//     const { prompt } = await req.json();

//     if (!prompt) {
//       return NextResponse.json(
//         { error: "prompt is required" },
//         { status: 400 },
//       );
//     }

//     const promptResponse = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "system",
//           content: "Create a vivid food photography prompt.",
//         },
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//     });

//     const imagePrompt = promptResponse.choices?.[0]?.message?.content ?? "";

//     const image = await openai.images.generate({
//       model: "gpt-image-1",
//       prompt: imagePrompt,
//       size: "1024x1024",
//     });

//     const base64 = image.data?.[0]?.b64_json;
//     if (!base64) {
//       return NextResponse.json(
//         { error: "No image data returned from OpenAI" },
//         { status: 500 },
//       );
//     }

//     const imageUrl = `data:image/png;base64,${base64}`;

//     return NextResponse.json({ imageUrl });
//   } catch (err: any) {
//     console.error("Image API error:", err);
//     return NextResponse.json(
//       { error: err.message || "Image generation failed" },
//       { status: 500 },
//     );
//   }
// }

export const POST = async (req: Request) => {
  const { prompt } = await req.json();
  const buffer = await openAiLib(prompt);

  if (!buffer) {
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 },
    );
  }

  const base64Image = buffer.toString("base64");
  return NextResponse.json({ image: `data:image/png;base64,${base64Image}` });
};
