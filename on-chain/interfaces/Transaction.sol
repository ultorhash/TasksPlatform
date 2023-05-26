// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

interface ITransaction {
    struct Transaction {
        address sender;
        address receiver;
        uint amount;
        uint256 timestamp;
    }

    function getAllTransactions() external view returns (Transaction[] memory);
    function getTransactionCount() external view returns (uint256);

    event Payment(address sender, address receiver, uint amount, uint256 timestamp);
}
