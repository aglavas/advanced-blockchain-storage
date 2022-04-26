// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AdvancedStorage {
  uint[] public arrayStorage;

  function add(uint id) public {
    arrayStorage.push(id);
  }

  function get(uint index) view public returns(uint) {
    return arrayStorage[index];
  }

  function getAll() view public returns(uint[] memory) {
    return arrayStorage;
  }

  function storageLength() view public returns(uint) {
    return arrayStorage.length;
  }  
}
