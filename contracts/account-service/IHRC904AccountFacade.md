# Solidity Interface Documentation: IHRC904AccountFacade

Generated on 2025-10-14T10:17:35.615Z

Source: contracts/account-service/IHRC904AccountFacade.sol

## Table of Contents
- [Functions](#functions)
- [Related Protobuf Files](#related-protobuf-files)

## Functions
### setUnlimitedAutomaticAssociations

@notice Enables or disables automatic token associations for the calling account
@notice Responsible service: HAS
@param enableAutoAssociations True to enable unlimited automatic associations, false to disable
@return responseCode The response code indicating the result of the operation

Signature:

```solidity
function setUnlimitedAutomaticAssociations(bool enableAutoAssociations) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| enableAutoAssociations | bool |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

## Related Protobuf Files

| Name | Link |
|-----:|:-----|
| crypto_update.proto | [../../node_modules/@hashgraph/proto/src/proto/services/crypto_update.proto](../../node_modules/@hashgraph/proto/src/proto/services/crypto_update.proto) |
| basic_types.proto | [../../node_modules/@hashgraph/proto/src/proto/services/basic_types.proto](../../node_modules/@hashgraph/proto/src/proto/services/basic_types.proto) |