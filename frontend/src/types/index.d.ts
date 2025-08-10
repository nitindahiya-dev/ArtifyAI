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
