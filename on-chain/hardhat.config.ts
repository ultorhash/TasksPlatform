import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/h0CaqmzxTr3UN3D9SDFtAen7AIkaAT4O',
      accounts: ['1620c1959b17861f5b03e9930f00e26502a8656dcb30b07d19dae72eb98b8f63']
    }
  }
};

export default config;
