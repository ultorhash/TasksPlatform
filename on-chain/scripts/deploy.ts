import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

const entrypoint = async (): Promise<void> => {
  const Transactions: ContractFactory = await ethers.getContractFactory("PAPI");
  const transactions: Contract = await Transactions.deploy();

  await transactions.deployed();

  console.log("Transaction deployed to:", transactions.address);
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
