# ArtifyAI

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

## Usage

- Access UI at `localhost:3000`.
- Mint NFTs via mint page.

## License

MIT License.
