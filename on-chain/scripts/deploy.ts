import dotenv from 'dotenv';
import { BigNumber, Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

dotenv.config();
const { TOTAL_TOKEN_SUPPLY } = process.env;

const entrypoint = async (): Promise<void> => {
  if (TOTAL_TOKEN_SUPPLY) {
    const contractFactory: ContractFactory = await ethers.getContractFactory("PAPI");
    const contract: Contract = await contractFactory.deploy(
      BigNumber.from(parseInt(TOTAL_TOKEN_SUPPLY))
    );

    await contract.deployed();
    console.log("Transaction deployed to:", contract.address);
  }
}

const main = async (): Promise<never> => {
  try {
    await entrypoint();
    process.exit(0);
  } catch (err: unknown) {
    console.log(err);
    process.exit(1);
  }
}

main();
