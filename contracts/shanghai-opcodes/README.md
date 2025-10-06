Shanghai opcodes examples

This folder contains a small contract that exercises EVM opcodes introduced or updated around the Shanghai upgrade, demonstrating their behavior on Hedera.

Contract
- ShanghaiOpcodes.sol: Calls into and logs results from the relevant opcodes.


Notes
- The related test prints opcode outputs so you can compare expectations vs. actual behavior.
- The ABI for the contract is exported under contracts-abi/contracts/shanghai-opcodes/ShanghaiOpcodes.sol/.

Related
- test/shanghai-opcodes/: Test suite invoking the example contract