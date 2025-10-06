State Registry

This contract is a comprehensive state container used primarily for migration and state-compatibility testing. 
It stores a wide variety of Solidity types (integers, strings, enums, mappings, arrays, structs) to validate encoding/decoding and storage layout across deployments.

- StateRegistry.sol: The main contract exposing setters/getters for many variable types

Related
- test/state-registry/: Test suite exercising StateRegistry
- Test data files (states.json, ercStates.json) are generated during tests
- The ABI is exported under contracts-abi/contracts/state-registry/StateRegistry.sol/