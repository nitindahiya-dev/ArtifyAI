import React, { useState } from "react";
import { ethers } from "ethers";
import { connectMetaMask, getContract } from "../lib/ethers";
import type { AIReport } from "../types";

type Props = {
  cid: string;
  report: AIReport;
  onMintSuccess?: (txHash: string, tokenId?: string) => void;
};

export default function MintForm({ cid, report, onMintSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleMint() {
    if (!cid) return alert("CID missing");
    if (!report) return alert("Report missing");
    try {
      setLoading(true);
      const { provider } = await connectMetaMask();
      const signer = provider.getSigner();
      const contract = getContract(signer);

      // report.signature should be a hex string like "0x..."
      const sig = report.signature ?? "0x";

      // score must be number 0-255 (uint8)
      const score = Math.max(0, Math.min(255, Math.round(report.score)));

      // Optionally pass msg.value if your contract charges a fee. Here we send 0.
      const tx = await contract.mintWithReport(await signer.getAddress(), cid, score, sig, {
        value: ethers.utils.parseEther("0"), // change if needed
      });
      const receipt = await tx.wait();
      // tokenId may be returned in events or as tx return value — we try to read events:
      let tokenId: string | undefined;
      try {
        const mintedEvent = receipt.events?.find((e: any) => e.event === "Transfer" && e.args && e.args[1]);
        if (mintedEvent) tokenId = mintedEvent.args[2]?.toString();
      } catch {}
      onMintSuccess?.(receipt.transactionHash, tokenId);
      alert(`Minted — tx ${receipt.transactionHash}`);
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Mint failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card mt-4">
      <h4 className="font-semibold mb-2">Mint NFT</h4>
      <div className="small mb-3">Mint an ERC-721 NFT containing the IPFS CID and the AI report signature.</div>
      <button className="btn" onClick={handleMint} disabled={loading}>
        {loading ? "Minting..." : "Mint NFT"}
      </button>
    </div>
  );
}
