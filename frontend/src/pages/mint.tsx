import React from "react";
import { useRouter } from "next/router";
import MintForm from "../components/MintForm";

export default function MintPage() {
  const router = useRouter();
  const { cid, score, sig } = router.query;

  if (!cid) {
    return (
      <div className="container">
        <div className="card">No CID provided. Use the upload page first.</div>
      </div>
    );
  }

  const report = {
    score: Number(score ?? 0),
    signature: typeof sig === "string" ? sig : (sig as string | undefined),
  };

  return (
    <div className="container">
      <h2 className="text-xl mb-4">Mint page</h2>
      <div className="card">
        <div className="mb-2">CID: <span className="font-mono break-all">{cid}</span></div>
        <div className="mb-4">Score: {report.score}</div>
        <MintForm cid={String(cid)} report={report} onMintSuccess={(tx) => alert("Minted: " + tx)} />
      </div>
    </div>
  );
}
