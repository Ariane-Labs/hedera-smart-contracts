# Solidity Interface Documentation: IHRC906AccountFacade

Generated on 2025-10-14T10:17:35.617Z

Source: contracts/account-service/IHRC906AccountFacade.sol

## Table of Contents
- [Functions](#functions)
- [Related Protobuf Files](#related-protobuf-files)

## Functions
### hbarAllowance

Returns the amount of hbar that the spender has been authorized to spend on behalf of the owner.
@param spender The account that has been authorized by the owner.
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return amount The amount of hbar that the spender has been authorized to spend on behalf of the owner.

Signature:

```solidity
function hbarAllowance(
        address spender
    ) external returns (int64 responseCode, int256 amount);
```

Parameters:

| Name | Type |
|-----:|:-----|
| spender | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| amount | int256 |

### hbarApprove

Allows spender to withdraw hbars from the owner account multiple times, up to the value amount. If this
function is called again it overwrites the current allowance with the new amount.
@param spender the account address authorized to spend.
@param amount the amount of tokens authorized to spend.
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function hbarApprove(
        address spender,
        int256 amount
    ) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| spender | address |
| amount | int256 |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

## Related Protobuf Files

| Name | Link |
|-----:|:-----|
| crypto_approve_allowance.proto | [../../node_modules/@hashgraph/proto/src/proto/services/crypto_approve_allowance.proto](../../node_modules/@hashgraph/proto/src/proto/services/crypto_approve_allowance.proto) |
| basic_types.proto | [../../node_modules/@hashgraph/proto/src/proto/services/basic_types.proto](../../node_modules/@hashgraph/proto/src/proto/services/basic_types.proto) |