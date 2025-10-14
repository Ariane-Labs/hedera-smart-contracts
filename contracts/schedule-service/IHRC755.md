# Solidity Interface Documentation: IHRC755

Generated on 2025-10-14T10:17:35.626Z

Source: contracts/schedule-service/IHRC755.sol

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

## Related Protobuf Files

| Name | Link |
|-----:|:-----|
| schedule_sign.proto | [../../node_modules/@hashgraph/proto/src/proto/services/schedule_sign.proto](../../node_modules/@hashgraph/proto/src/proto/services/schedule_sign.proto) |