const { Configuration, OpenAIApi } = require("openai");

const openAiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({ apiKey: openAiKey });
const openai = new OpenAIApi(configuration);

exports.chat = async (req, res) => {
  if (!openAiKey) {
    return res.status(500).json({ error: "OpenAI API key is not configured." });
  }

  const { prompt } = req.body;
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are StudioPro's smart assistant. Provide helpful studio management advice, pricing tips, and image enhancement suggestions in a friendly, concise tone.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 250,
      temperature: 0.8,
    });

    const answer = response.data.choices?.[0]?.message?.content?.trim();
    if (!answer) {
      return res.status(500).json({ error: "AI did not return an answer." });
    }

    res.json({ answer });
  } catch (error) {
    console.error("OpenAI request failed", error?.response?.data || error.message || error);
    const message = error?.response?.data?.error?.message || "AI service is unavailable.";
    res.status(500).json({ error: message });
  }
};
