import dotenv from 'dotenv';
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

dotenv.config();
const { API_URL, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: API_URL,
      accounts: [`${PRIVATE_KEY}`]
    }
  }
};

export default config;
