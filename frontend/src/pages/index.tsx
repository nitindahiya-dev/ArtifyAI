import React, { useState } from "react";
import UploadCard from "../components/UploadCard";
import WalletConnectButton from "../components/WalletConnectButton";
import ReportView from "../components/ReportView";
import MintForm from "../components/MintForm";
import type { AIReport, InferenceResult } from "../types";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const [report, setReport] = useState<AIReport | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleFileSelect(f: File) {
    setFile(f);
    setCid(null);
    setReport(null);
    // Upload file to backend /inference endpoint
    try {
      setLoading(true);
      const base = process.env.NEXT_PUBLIC_API_BASE || "";
      if (!base) {
        alert("NEXT_PUBLIC_API_BASE not configured. Backend not connected.");
        return;
      }
      const url = `${base.replace(/\/$/, "")}/infer`;
      const fd = new FormData();
      fd.append("file", f, f.name);
      const resp = await fetch(url, { method: "POST", body: fd });
      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(`Inference failed: ${resp.status} ${txt}`);
      }
      const json = (await resp.json()) as InferenceResult;
      setCid(json.cid);
      setReport(json.report);
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Inference failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ArtifyAi — Upload & Authenticate</h1>
        <WalletConnectButton />
      </div>

      <UploadCard onSelect={handleFileSelect} disabled={loading} />

      {loading && (
        <div className="card mt-4">
          <div>Running inference... please wait.</div>
        </div>
      )}

      <ReportView cid={cid ?? undefined} report={report ?? undefined} />

      {cid && report && (
        <MintForm
          cid={cid}
          report={report}
          onMintSuccess={(tx) => {
            console.log("mint success", tx);
          }}
        />
      )}
    </div>
  );
}
