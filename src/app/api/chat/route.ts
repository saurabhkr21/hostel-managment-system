import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "dummy",
});

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            // Mock response if no API key
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
            return NextResponse.json({
                reply: `I received your message: "${message}". Since I am running in demo mode (no API key), I cannot provide a real AI response. Please configure OPENAI_API_KEY to enable full functionality.`,
            });
        }

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: message }],
            model: "gpt-3.5-turbo",
        });

        return NextResponse.json({
            reply: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error("Chat error:", error);
        return NextResponse.json(
            { error: "Failed to process message" },
            { status: 500 }
        );
    }
}
