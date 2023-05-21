// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

library Tasks {
  struct Task {
    uint256 id;
    string name;
    string description;
    uint256 payment;
    address owner;
    bool isTaken;
    address takenBy;
  }
}
