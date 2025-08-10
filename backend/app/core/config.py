# backend/app/core/config.py
from pydantic import BaseSettings


class Settings(BaseSettings):
    ENV: str = "development"
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    DATABASE_URL: str = "postgresql://artuser:artpass@localhost:5432/artdb"
    WEB3STORAGE_TOKEN: str | None = None
    REPORT_SIGNER_PRIVATE_KEY: str | None = None

    # If you want backend to send transactions (not recommended) include RPC + key:
    ETH_RPC_URL: str | None = None
    ETH_PRIVATE_KEY: str | None = None

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
