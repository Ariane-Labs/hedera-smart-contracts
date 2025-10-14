# Solidity Interface Documentation: IHederaScheduleService

Generated on 2025-10-14T10:17:35.624Z

Source: contracts/schedule-service/IHederaScheduleService.sol

## Table of Contents
- [Functions](#functions)
- [Related Protobuf Files](#related-protobuf-files)

## Functions
### authorizeSchedule

Authorizes the calling contract as a signer to the schedule transaction.
@param schedule the address of the schedule transaction.
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function authorizeSchedule(address schedule) external returns (int64 responseCode);

    /// Allows for the signing of a schedule transaction given a protobuf encoded signature map
    /// The message signed by the keys is defined to be the concatenation of the shard, realm, and schedule transaction ID.
    /// @param schedule the address of the schedule transaction.
    /// @param signatureMap the protobuf encoded signature map
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function signSchedule(address schedule, bytes memory signatureMap) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| schedule | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### scheduleNative

Allows for the creation of a schedule transaction for a given system contract address, abi encoded call data and payer address
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
| schedule_sign.proto | [../../node_modules/@hashgraph/proto/src/proto/services/schedule_sign.proto](../../node_modules/@hashgraph/proto/src/proto/services/schedule_sign.proto) |
| schedule_get_info.proto | [../../node_modules/@hashgraph/proto/src/proto/services/schedule_get_info.proto](../../node_modules/@hashgraph/proto/src/proto/services/schedule_get_info.proto) |
| basic_types.proto | [../../node_modules/@hashgraph/proto/src/proto/services/basic_types.proto](../../node_modules/@hashgraph/proto/src/proto/services/basic_types.proto) |