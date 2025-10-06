EVM compatibility: ecrecover

This example validates the behavior of the Ethereum precompile ecrecover on Hedera by deploying a small contract and verifying recovered addresses from signatures.

Contract
- EcrecoverCheck.sol: Wraps ecrecover and exposes helper functions used by the tests.

The ABI for the contract is exported under contracts-abi/contracts/precompile/native/evm-compatibility-ecrecover/EcrecoverCheck.sol/.

Related
- test/system-contracts/native/evm-compatibility-ecrecover/