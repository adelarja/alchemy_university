// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

interface Contract {
    function attempt() external;
}


// Adel's contract. 0xa3ed035EFaa28fFcD30cfB6fb1a453eb25FFC977
contract ProxyContract {
    address target_contract = 0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502;

    function win() external {
        Contract(target_contract).attempt();
    }

    receive() external payable {}
}
