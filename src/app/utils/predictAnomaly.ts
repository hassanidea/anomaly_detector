import axios from "axios";

interface PredictionInput {
  vix: number;
  it2y: number;
  date: string; // ISO format: YYYY-MM-DD
}

interface PredictionResult {
  is_anomaly: boolean;
}

export const predictAnomaly = async (
  input: PredictionInput,
): Promise<PredictionResult> => {
  try {
    const response = await axios.post<PredictionResult>(
      "http://localhost:5000/predict",
      input,
    );
    return response.data;
  } catch (error) {
    console.error("Error calling prediction API:", error);
    throw new Error("Failed to predict anomaly.");
  }
};
