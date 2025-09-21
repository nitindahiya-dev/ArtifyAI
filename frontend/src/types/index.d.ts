export interface AIReport {
  score: number; // 0-100
  embedding?: number[]; // optionally returned
  similar?: Array<{ cid: string; similarity: number }>;
  signature?: string; // hex string '0x...'
  meta?: Record<string, any>;
}

export interface InferenceResult {
  cid: string;
  report: AIReport;
}

export interface AIReport {
  score: number;
  signature?: string;
  cid: string;
  prediction: string;
  similar_works: { path: string; similarity: number }[];
}
