import { NextResponse } from "next/server";
import { Configuration, OpenAIApi, CreateChatCompletionResponse } from "openai";
import { AxiosResponse } from "axios";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API,
});
const openai = new OpenAIApi(configuration);
export async function POST(request: Request, response: any) {
  try {
    const aiResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `sarcastic humour about life`,
        },
      ],
    });
    console.log(aiResponse.data.choices[0].message?.content);
    return NextResponse.json(
      {
        content: aiResponse.data.choices[0].message?.content,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    NextResponse.json({ error }, { status: 500 });
  }
}
