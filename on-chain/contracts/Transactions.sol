// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract Transactions {
  uint256 transactionCount;

  event Transfer(address sender, address receiver, uint amount, string message, uint256 timestamp, string keyword);

  struct Transaction {
    address sender;
    address receiver;
    uint amount;
    string message;
    uint256 timestamp;
    string keyword;
  }

  Transaction[] transactions;

  function addToBlockchain(
    address payable receiver,
    uint amount,
    string memory message,
    string memory keyword
  ) public {
    transactionCount += 1;
    transactions.push(Transaction(msg.sender, receiver, amount, message, block.timestamp, keyword));

    emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
  }

  function getAllTransactions() public view returns (Transaction[] memory) {
    return transactions;
  }

  function getTransactionCount() public view returns (uint256) {
    return transactionCount;
  }
}
