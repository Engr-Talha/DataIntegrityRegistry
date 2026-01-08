# AI-Blockchain Data Integrity Layer

## Overview

This project provides a **cryptographic "Circuit Breaker"** for AI applications. By leveraging the **Polygon PoS** network and a **Solidity** smart contract, this system ensures that AI models only process verified, untampered data. It solves the "Trust Problem" in decentralized AI pipelines by moving the Source of Truth from a mutable database to an immutable ledger.

## The Architecture

1. **Hashing:** The Node.js backend generates a `SHA-256` hash of a dataset.
2. **Anchoring:** The backend sends this hash to the `DataIntegrityRegistry` smart contract on Polygon.
3. **Verification:** Before AI inference/training, the system re-hashes the data and compares it against the on-chain record.
4. **Action:** If hashes do not match, the AI process is immediately halted.

## Project Structure

* `/contracts`: `DataIntegrityRegistry.sol` (The Solidity Notary)
* `/scripts`: Deployment and interaction scripts.
* `/src`: Middleware logic for Node.js.

## Getting Started

### 1. Prerequisites

* [Node.js](https://nodejs.org/) (v18+)
* [Hardhat](https://hardhat.org/)
* A Polygon RPC URL (Alchemy or Infura)
* A private key with a small amount of $POL (formerly MATIC) for gas.

### 2. Smart Contract Deployment

```bash
# Install dependencies
npm install

# Compile the contract
npx hardhat compile

# Deploy to Polygon Amoy (Testnet) or Mainnet
npx hardhat run scripts/deploy.js --network polygon

```

### 3. Backend Integration (Node.js)

Use the following logic in your backend to verify data before feeding it to your AI model:

```javascript
const { ethers } = require("ethers");
const crypto = require("crypto");

async function verifyDataset(dataId, localBuffer) {
    // 1. Generate local hash
    const localHash = "0x" + crypto.createHash('sha256').update(localBuffer).digest('hex');

    // 2. Connect to Polygon
    const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

    // 3. Call the Smart Contract
    const isValid = await contract.verifyIntegrity(dataId, localHash);

    if (!isValid) {
        throw new Error("SECURITY ALERT: Local data does not match the On-Chain record!");
    }
    
    console.log( Data Integrity Verified. Starting AI process...");
}

```

##  Research & Context

This implementation is based on current trends in **Decentralized AI (DeAI)** and data provenance. For deep dives into the theory, see:

* [A Blockchain-Based Method for Data Integrity Verification](https://www.google.com/search?q=https://www.researchgate.net/publication/396929793_A_Blockchain-Based_Method_for_Data_Integrity_Verification)
* [Transparent AI Model Training Pipelines](https://www.researchgate.net/publication/398789873_Enabled_Data_Provenance_Framework_for_Transparent_AI_Model_Training_Pipelines)

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

### 💡 Pro-Tip for your GitHub

If you host this on GitHub, make sure to add a **"Architecture Diagram"** image to the folder. I can describe exactly how that diagram should look if you'd like to draw one or use a tool like Lucidchart!

**Would you like me to generate the `deploy.js` script to make this a complete, ready-to-run repository?**
