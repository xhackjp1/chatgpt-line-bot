require('dotenv').config();
const Log = require("@dazn/lambda-powertools-logger");
const axios = require("axios");

const GPT3_API_KEY = process.env.OPENAI_API_KEY;

// GPT-4にリクエストを送信する
async function getCompletion(context) {
  const model = "gpt-3.5-turbo";
  const url = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${GPT3_API_KEY}`,
  };
  const data = {
    model,
    max_tokens: 2048,
    messages: context,
    // stream: true,
  };
  try {
    const response = await axios.post(url, data, { headers });
    Log.info("GPT-3", { data: response.data });
    return response.data;
  } catch (error) {
    Log.error("GPT-3", { error });
    return null;
  }
}

const execute = async () => {
  const data = [{ role: "user", content: "ChatGPT-3の便利な使い方を5つ、箇条書きで教えて" }]
  await getCompletion(data)
}

execute()