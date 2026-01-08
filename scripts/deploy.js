const hre = require("hardhat");

async function main() {
  console.log("Starting deployment of DataIntegrityRegistry...");

  // Get the contract factory
  const Registry = await hre.ethers.getContractFactory("DataIntegrityRegistry");

  // Deploy the contract
  const registry = await Registry.deploy();

  // Wait for deployment to finish
  await registry.waitForDeployment();

  const address = await registry.getAddress();

  console.log("----------------------------------------------------");
  console.log(`✅ Success! Contract deployed to: ${address}`);
  console.log("----------------------------------------------------");
  console.log("Next steps:");
  console.log("1. Copy this address to your .env file");
  console.log("2. Verify the contract on Polygonscan: npx hardhat verify --network polygon " + address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
