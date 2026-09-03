import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:
    "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",
  baseURL: "https://integrate.api.nvidia.com/v1", // 這裡維持 /v1 沒錯
});

async function test() {
  try {
    const res = await openai.chat.completions.create({
      model: "google/gemma-4-31b-it", // 務必填寫精確的全名
      messages: [{ role: "user", content: "Hi" }],
      max_tokens: 16,
    });
    console.log(res.choices[0].message.content);
  } catch (err) {
    // 印出完整的錯誤資訊以供確認
    console.error("Status Code:", err.status);
    console.error("Error Details:", err.error || err.message);
  }
}

test();