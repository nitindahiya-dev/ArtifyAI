const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const trustedSigner = process.env.TRUSTED_SIGNER;
  if (!trustedSigner) {
    throw new Error("TRUSTED_SIGNER not set in .env");
  }

  const ArtAuthenticator = await hre.ethers.getContractFactory("ArtAuthenticator");
  const artAuthenticator = await ArtAuthenticator.deploy(trustedSigner);

  await artAuthenticator.waitForDeployment();
  console.log("ArtAuthenticator deployed to:", artAuthenticator.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});