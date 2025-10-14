# Solidity Interface Documentation: ICryptoAllowance

Generated on 2025-10-14T10:17:35.606Z

Source: contracts/account-service/examples/IHRC-906/cryptoOwner.sol

## Table of Contents
- [Functions](#functions)

## Functions
### cryptoTransferPublic

Signature:

```solidity
function cryptoTransferPublic(IHederaTokenService.TransferList calldata transferList, IHederaTokenService.TokenTransferList[] calldata tokenTransferList) external returns (int responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| transferList | IHederaTokenService.TransferList calldata |
| tokenTransferList | IHederaTokenService.TokenTransferList[] calldata |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int |
