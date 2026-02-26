import OpenAI from "openai";

export async function openAiLib(prompt: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  });

  const imageData = response?.data?.[0]?.b64_json;
  if (!imageData) {
    console.error("Data found");
    return;
  }

  const buffer = Buffer.from(imageData, "base64");
  return buffer;
}
