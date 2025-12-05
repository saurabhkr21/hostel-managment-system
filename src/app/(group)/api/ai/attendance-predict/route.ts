import prisma from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { studentId, historicalData } = await request.json();

    if (!studentId) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    // Get student data
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Enhanced AI prediction using OpenAI
    const prediction = await predictAttendanceWithAI(student, historicalData);

    return NextResponse.json({
      studentId,
      prediction: prediction.status,
      confidence: prediction.confidence,
      reasoning: prediction.reasoning,
    });
  } catch (error) {
    console.error("Error predicting attendance:", error);
    return NextResponse.json(
      { error: "Failed to predict attendance" },
      { status: 500 }
    );
  }
}

async function predictAttendanceWithAI(student: any, historicalData?: any[]) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Fallback to simple prediction if no API key
      return predictAttendanceSimple(student, historicalData);
    }

    const prompt = `Based on the following student information, predict their attendance status for today (present, absent, or late). Provide a confidence percentage and brief reasoning.

Student Details:
- Name: ${student.name}
- Department: ${student.department}
- Year: ${student.year}
- Current Status: ${student.attendanceStatus}
- Room: ${student.roomBlock}-${student.roomNumber}

${
  historicalData
    ? `Historical Data: ${JSON.stringify(historicalData)}`
    : "No historical data available"
}

Respond in JSON format: {"status": "present|absent|late", "confidence": number, "reasoning": "string"}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error("OpenAI API request failed");
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content.trim());

    return {
      status: result.status,
      confidence: Math.min(Math.max(result.confidence, 0), 100),
      reasoning: result.reasoning,
    };
  } catch (error) {
    console.error("AI prediction failed, using fallback:", error);
    return predictAttendanceSimple(student, historicalData);
  }
}

function predictAttendanceSimple(student: any, historicalData?: any[]) {
  // Simple prediction based on current status and department patterns
  const currentStatus = student.attendanceStatus;
  const department = student.department;
  const year = student.year;

  // Department-based attendance patterns (mock data)
  const departmentPatterns = {
    "Computer Science": { presentRate: 0.92, lateRate: 0.05 },
    "Electrical Engineering": { presentRate: 0.88, lateRate: 0.07 },
    "Mechanical Engineering": { presentRate: 0.85, lateRate: 0.08 },
    "Civil Engineering": { presentRate: 0.78, lateRate: 0.1 },
    "Business Administration": { presentRate: 0.82, lateRate: 0.06 },
  };

  const pattern = departmentPatterns[
    department as keyof typeof departmentPatterns
  ] || { presentRate: 0.85, lateRate: 0.05 };

  // Year-based adjustment (senior students tend to have better attendance)
  const yearMultiplier = year >= 3 ? 1.1 : year === 2 ? 1.0 : 0.9;

  const adjustedPresentRate = Math.min(
    pattern.presentRate * yearMultiplier,
    0.95
  );
  const adjustedLateRate = pattern.lateRate * (2 - yearMultiplier);

  // Random factor for prediction
  const random = Math.random();

  let prediction: "present" | "absent" | "late";
  let confidence: number;
  let reasoning: string;

  if (random < adjustedPresentRate) {
    prediction = "present";
    confidence = Math.round(adjustedPresentRate * 100);
    reasoning = `Based on ${department} department patterns and year ${year} performance`;
  } else if (random < adjustedPresentRate + adjustedLateRate) {
    prediction = "late";
    confidence = Math.round(adjustedLateRate * 100);
    reasoning = `Historical late patterns in ${department} department`;
  } else {
    prediction = "absent";
    confidence = Math.round((1 - adjustedPresentRate - adjustedLateRate) * 100);
    reasoning = `Lower attendance probability for ${department} department`;
  }

  return { status: prediction, confidence, reasoning };
}
