# ArtifyAI [Under Construction]

ArtifyAI is a decentralized platform for creating, authenticating, and minting AI-generated artwork as NFTs. It integrates a React-based frontend with a FastAPI backend, smart contracts for blockchain interactions, and a machine learning pipeline for AI art generation.

## Project Structure

- **`.github/workflows/`**: CI/CD pipelines.
- **`.vscode/`**: IDE settings.
- **`infra/`**: Docker, Postgres, Redis setups.
- **`contracts/`**: Smart contracts with Hardhat.
- **`frontend/`**: Next.js UI with Tailwind.
- **`backend/`**: FastAPI backend with ML services.
- **`ml/`**: ML training and models.
- **`scripts/`**: Dev setup scripts.
- **`docs/`**: Architecture and API docs.
- **`tests/`**: E2E and integration tests.

## Setup

1. Clone repo: `git clone <repo-url>`.
2. Install deps:
   - Frontend: `cd frontend && npm install`.
   - Backend: `cd backend && pip install -r requirements.txt`.
   - Contracts: `cd contracts && npm install`.
3. Run infra: `docker-compose up -d`.
4. Start apps:
   - Backend: `uvicorn app.main:app --reload`.
   - Frontend: `npm run dev`.

# ArtifyAI Project Architecture

This project combines **Machine Learning (ML)**, **Web Backend (FastAPI)**, **Blockchain (Smart Contracts)**, and **Decentralized Storage (IPFS)** into a single system for authenticating and minting AI-generated art.


<image width=100% src="./architecture_flow.webp" />


---

## 📂 Project Layers

### 1. Machine Learning Layer (Off-chain AI)
**Location:** `ml/`, `backend/app/ml/`

- Models are trained and evaluated here (`train.py`, `evaluate.py`, `experiments/`).
- Trained models (e.g., `models/checkpoint.pt`) are loaded in the backend via `loader.py`.
- Used in API endpoint `/api/v1/infer.py`.

**Workflow:**
- User uploads artwork.
- ML model checks authenticity or generates a feature embedding.
- Output: **ML report** (e.g., classification, authenticity score, hash).

⚡ Heavy ML tasks are **off-chain** due to gas/storage limitations.

---

### 2. Backend Layer (Orchestration + APIs)
**Location:** `backend/`

The backend is built with **FastAPI** and coordinates ML, IPFS, and blockchain.

- **Inference Service** (`inference_service.py`) → Runs ML model and produces authenticity results.
- **IPFS Service** (`ipfs_service.py`) → Uploads ML output, images, or metadata to IPFS and returns a **CID**.
- **Signer Service** (`signer_service.py`) → Signs ML reports to prove they came from a trusted source.
- **Contract Service** (`contract_service.py`) → Interacts with the smart contract for minting/verification.

**API Endpoints:**
- `/infer` → Run ML and return report.
- `/mint` → Store results in IPFS + mint NFT via contract.
- `/attestations` → Prove authenticity of existing works.

---

### 3. Blockchain Layer (On-chain Verification)
**Location:** `contracts/`

- Smart contract: **`ArtAuthenticator.sol`**
- Stores only **lightweight metadata** (due to gas/storage costs):
  - IPFS CID of ML report
  - Creator wallet address
  - Verification signature

**Scripts:**
- `deploy.js` → Deploys contract.
- `verify.js` → Verifies deployment.
- `ArtifyAi.test.js` → Tests smart contract logic.

⚡ On-chain = trust + provenance.  
⚡ Off-chain = heavy ML computation & storage.

---

### 4. Frontend Layer (User dApp)
**Location:** `frontend/`

- Built with **Next.js + Tailwind**.
- Components:
  - `UploadCard.tsx` → Upload artwork.
  - `MintForm.tsx` → Mint NFT after inference.
  - `ReportView.tsx` → Show ML authenticity report.
  - `WalletConnectButton.tsx` → Connect user’s wallet.
- Utilities:
  - `ethers.ts` → Interact with contracts.
  - `ipfs.ts` → Fetch/store IPFS files.

## Flow
- User → uploads art → backend API.
- Backend → runs ML → uploads results to IPFS → stores CID on-chain.
- Frontend → fetches contract state + IPFS data → displays authenticity + minted NFT.