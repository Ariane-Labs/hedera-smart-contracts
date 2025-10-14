# Solidity Interface Documentation: IHRC756

Generated on 2025-10-14T10:17:35.629Z

Source: contracts/schedule-service/IHRC756.sol

## Table of Contents
- [Functions](#functions)
- [Related Protobuf Files](#related-protobuf-files)

## Functions
### scheduleNative

Allows for the creation of a schedule transaction for given a system contract address, abi encoded call data and payer address
Currently supports the Hedera Token Service System Contract (0x167) with encoded call data for
createFungibleToken, createNonFungibleToken, createFungibleTokenWithCustomFees, createNonFungibleTokenWithCustomFees
and updateToken functions
@param systemContractAddress the address of the system contract from which to create the schedule transaction
@param callData the abi encoded call data for the system contract function
@param payer the address of the account that will pay for the schedule transaction
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return scheduleAddress The address of the newly created schedule transaction.

Signature:

```solidity
function scheduleNative(address systemContractAddress, bytes memory callData, address payer) external returns (int64 responseCode, address scheduleAddress);

    /// Returns the token information for a scheduled fungible token create transaction
    /// @param scheduleAddress the address of the schedule transaction
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return fungibleTokenInfo The token information for the scheduled fungible token create transaction
    function getScheduledCreateFungibleTokenInfo(address scheduleAddress) external returns (int64 responseCode, IHederaTokenService.FungibleTokenInfo memory fungibleTokenInfo);
```

Parameters:

| Name | Type |
|-----:|:-----|
| systemContractAddress | address |
| callData | bytes memory |
| payer | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| scheduleAddress | address |

### getScheduledCreateNonFungibleTokenInfo

Returns the token information for a scheduled non fungible token create transaction
@param scheduleAddress the address of the schedule transaction
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return nonFungibleTokenInfo The token information for the scheduled non fungible token create transaction

Signature:

```solidity
function getScheduledCreateNonFungibleTokenInfo(address scheduleAddress) external returns (int64 responseCode, IHederaTokenService.NonFungibleTokenInfo memory nonFungibleTokenInfo);
```

Parameters:

| Name | Type |
|-----:|:-----|
| scheduleAddress | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| nonFungibleTokenInfo | IHederaTokenService.NonFungibleTokenInfo memory |

## Related Protobuf Files

| Name | Link |
|-----:|:-----|
| schedule_create.proto | [../../node_modules/@hashgraph/proto/src/proto/services/schedule_create.proto](../../node_modules/@hashgraph/proto/src/proto/services/schedule_create.proto) |
| schedule_get_info.proto | [../../node_modules/@hashgraph/proto/src/proto/services/schedule_get_info.proto](../../node_modules/@hashgraph/proto/src/proto/services/schedule_get_info.proto) |