const hre = require("hardhat");
const crypto = require("crypto");

async function main() {
  const CONTRACT_ADDRESS = "YOUR_DEPLOYED_ADDRESS_HERE";
  const registry = await hre.ethers.getContractAt("DataIntegrityRegistry", CONTRACT_ADDRESS);

  const dataId = "dataset_v1_jan_2026";
  const dummyData = "This is some sensitive AI training data";
  
  // Generate SHA-256 Hash
  const hash = "0x" + crypto.createHash('sha256').update(dummyData).digest('hex');

  console.log(`Anchoring data for ID: ${dataId}...`);
  
  // 1. Anchor the data
  const tx = await registry.anchorData(dataId, hash);
  await tx.wait();
  console.log("✅ Data anchored on Polygon!");

  // 2. Verify the data
  console.log("Checking integrity...");
  const isValid = await registry.verifyIntegrity(dataId, hash);
  console.log(`Is Data Valid? ${isValid ? "YES (Integrity Confirmed)" : "NO (Tampered)"}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
