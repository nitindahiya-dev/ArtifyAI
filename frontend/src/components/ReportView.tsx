import React from "react";
import type { AIReport } from "../types";

type Props = {
  cid?: string | null;
  report?: AIReport | null;
};

export default function ReportView({ cid, report }: Props) {
  if (!cid && !report) {
    return null;
  }

  function openIpfs() {
    if (!cid) return;
    const base = process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://ipfs.io/ipfs/";
    window.open(`${base.replace(/\/$/, "")}/${cid}`, "_blank");
  }

  return (
    <div className="card mt-4">
      <h4 className="font-semibold mb-2">AI Report</h4>
      {report ? (
        <div className="mb-2">
          <div className="small">Authenticity score</div>
          <div className="text-2xl font-bold">{report.score} / 100</div>
        </div>
      ) : (
        <div className="small mb-2">No AI report yet</div>
      )}

      {cid && (
        <div className="flex items-center space-x-3 mt-2">
          <div className="small">CID:</div>
          <div className="font-mono text-sm break-all">{cid}</div>
          <button className="btn-ghost ml-auto" onClick={openIpfs}>
            Open on IPFS
          </button>
        </div>
      )}

      {report?.signature && (
        <div className="mt-3 small">
          <div>Report signed by server (signature):</div>
          <div className="font-mono text-xs break-all">{report.signature}</div>
        </div>
      )}
    </div>
  );
}
