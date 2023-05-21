// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

interface ITask {
  struct Task {
    uint256 id;
    string name;
    string description;
    uint256 amount;
    address owner;
    bool isTaken;
    address takenBy;
  }

  function addTask(string memory name, string memory description, uint256 amount) external;
  function deleteTask(uint256 taskId) external payable;
  function takeTask(address owner, uint256 taskId) external returns (bool);
  function payTask(uint256 taskId) external payable returns (bool);
  function getAccountTasks() external view returns (Task[] memory);

  event TakeTask(address owner, uint256 taskId);
  event PayTask(uint256 taskId, address takenBy, uint256 amount);
}
