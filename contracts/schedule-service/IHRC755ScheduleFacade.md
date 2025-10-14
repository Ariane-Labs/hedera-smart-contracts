# Solidity Interface Documentation: IHRC755ScheduleFacade

Generated on 2025-10-14T10:17:35.628Z

Source: contracts/schedule-service/IHRC755ScheduleFacade.sol

## Table of Contents
- [Functions](#functions)
- [Related Protobuf Files](#related-protobuf-files)

## Functions
### signSchedule

Signs the targeted schedule transaction with the key of the calling EOA.
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function signSchedule() external returns (int64 responseCode);
```

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

## Related Protobuf Files

| Name | Link |
|-----:|:-----|
| schedule_sign.proto | [../../node_modules/@hashgraph/proto/src/proto/services/schedule_sign.proto](../../node_modules/@hashgraph/proto/src/proto/services/schedule_sign.proto) |