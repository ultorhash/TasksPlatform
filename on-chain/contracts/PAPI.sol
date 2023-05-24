// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;
pragma experimental ABIEncoderV2;

import '../interaces/ERC20.sol';
import '../interaces/Task.sol';
import '../interaces/Transaction.sol';

contract PAPI is IERC20, ITask, ITransaction {
    string public constant name = "PAPI Token";
    string public constant symbol = "PAPI";
    uint8 public constant decimals = 6;
    uint256 taskId = 0;
    uint256 totalSupply;
    uint256 transactionCount;
    Transaction[] transactions;

    mapping (address => uint) balances;
    mapping (address => mapping (address => uint)) allowed;
    mapping (address => Task[]) tasks;

    constructor (uint _initialSupply) {
        totalSupply = _initialSupply;
        balances[msg.sender] = totalSupply;
    }

    modifier EnoughBalance(address _wallet, uint256 _amount) {
        require(_amount <= balances[_wallet], "The wallet doesn't have enough tokens");
        _;
    }

    modifier EnoughAllowance(address _wallet, address _spender, uint256 _amount) {
        require(_amount <= allowed[_wallet][_spender], "You don't have enough allowance");
        _;
    }

    modifier CanTakeTask(address _owner, uint256 _taskId) {
        Task storage taskToTake = getWalletTaskById(_owner, _taskId);
        require(taskToTake.isTaken == false && taskToTake.takenBy == address(0), "Task is already taken");
        _;
    }

    modifier CanPayTask(address _owner, uint256 _taskId) {
        Task memory taskToPay = getWalletTaskById(_owner, _taskId);

        require(taskToPay.isTaken == true && taskToPay.takenBy != address(0), "Task is not assigned");
        require(taskToPay.amount <= balances[msg.sender], "Not enough tokens to pay for task");
        _;
    }

    function getTotalSupply() external view override returns (uint256) {
        return totalSupply;
    }

    function balanceOf(address _account) external view override returns (uint256) {
        return balances[_account];
    }

    function allowance(address _owner, address _spender) external view override returns (uint256) {
        return allowed[_owner][_spender];
    }

    function transfer(
        address _receiver,
        uint256 _amount
    ) external override EnoughBalance(tx.origin, _amount) returns (bool) {
        balances[tx.origin] -= _amount;
        balances[_receiver] += _amount;

        emit Transfer(msg.sender, _receiver, _amount);
        return true;
    }

    function approve(
        address _spender,
        uint256 _amount
    ) external override returns (bool) {
        allowed[msg.sender][_spender] += _amount;

        emit Approval(msg.sender, _spender, _amount);
        return true;
    }

    function transferFrom(
        address _owner,
        address _receiver,
        uint256 _amount
    ) external override EnoughBalance(msg.sender, _amount) EnoughAllowance(_owner, msg.sender, _amount) returns (bool) {
        balances[_owner] -= _amount;
        allowed[_owner][msg.sender] -= _amount;
        balances[_receiver] += _amount;

        emit Transfer(_owner, _receiver, _amount);
        return true;
    }

    function getAccountTasks() external view override returns (Task[] memory) {
        return tasks[msg.sender];
    }

    function addTask(
        string memory _name,
        string memory _description,
        uint256 _amount
    ) external override EnoughBalance(msg.sender, _amount) {
        Task memory newTask = Task(
            taskId++,
            _name,
            _description,
            _amount,
            msg.sender,
            false,
            address(0)
        );

        tasks[msg.sender].push(newTask);
    }

    function deleteTask(uint256 _taskId) external override payable {
        Task memory taskToRemove;
        Task[] storage walletTasks = tasks[tx.origin];

        for (uint i = 0; i < walletTasks.length; i++) {
            if (walletTasks[i].id == _taskId) {
                taskToRemove = walletTasks[i];
                walletTasks[i] = walletTasks[walletTasks.length - 1];
                walletTasks[walletTasks.length - 1] = taskToRemove;

                walletTasks.pop();
                return;
            }
        }

        revert("Address doesn't have task with provided id");
    }

    function takeTask(address _owner, uint256 _taskId) external override CanTakeTask(_owner, _taskId) returns (bool) {
        Task storage taskToTake = getWalletTaskById(_owner, _taskId);

        taskToTake.isTaken = true;
        taskToTake.takenBy = tx.origin;

        emit TakeTask(_owner, _taskId);
        return true;
    }

    function payTask(uint256 _taskId) external override payable CanPayTask(msg.sender, _taskId) returns (bool) {
        Task memory taskToPay = getWalletTaskById(msg.sender, _taskId);
        address receiver = taskToPay.takenBy;
        uint256 amount = taskToPay.amount;

        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        this.deleteTask(_taskId);

        transactions.push(Transaction(msg.sender, receiver, amount, block.timestamp));
        transactionCount++;

        emit PayTask(_taskId, receiver, amount);
        emit Transfer(msg.sender, receiver, amount, block.timestamp);
        return true;
    }

    function getAllTransactions() external view override returns (Transaction[] memory) {
        return transactions;
    }

    function getTransactionCount() external view override returns (uint256) {
        return transactionCount;
    }

    function getWalletTaskById(address _owner, uint256 _taskId) private view returns (Task storage) {
        Task[] storage walletTasks = tasks[_owner];

        for (uint256 i = 0; i < walletTasks.length; i++) {
            if (walletTasks[i].id == _taskId) {
                return walletTasks[i];
            }
        }

        revert("Task with provided id could not be found");
    }
}
