// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const TrustedSigner = process.env.TRUSTED_SIGNER || "0x0000000000000000000000000000000000000000";

  const Art = await hre.ethers.getContractFactory("ArtAuthenticator");
  console.log("Deploying ArtAuthenticator...");
  const art = await Art.deploy(TrustedSigner);
  await art.deployed();
  console.log("ArtAuthenticator deployed to:", art.address);
  console.log("Trusted signer:", TrustedSigner);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
