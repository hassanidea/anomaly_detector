import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import React from "react";
import OpenAI from "openai";
import { any } from "zod";
import axios from "axios";
import { predictAnomaly } from "~/app/utils/predictAnomaly";
const systemPrompt =
  "Predict a potential future value for a specified market ticker based on historical data from the past year. The prediction should consider trends, patterns, and any available economic indicators.";

interface PredictionInput {
  vix: number;
  it2y: number;
  date: string; // ISO format: YYYY-MM-DD
}

interface PredictionResult {
  is_anomaly: boolean;
}

export async function POST(req: Request) {
  const text = await req.json();

  const vix = Number(text.vix);
  const it2y = Number(text.gtitly);
  const date = text.date.slice(0, 10);

  try {
    const prediction = await predictAnomaly({ vix, it2y, date });
    const result = prediction.is_anomaly
      ? "Anomaly Detected"
      : "No Anomaly Detected";
    console.log(result);
  } catch (error) {
    console.log("Error:", error);
  }

  return NextResponse.json("Thank you");
}
