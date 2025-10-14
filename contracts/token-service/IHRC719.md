# Solidity Interface Documentation: IHRC719

Generated on 2025-10-14T10:17:35.638Z

Source: contracts/token-service/IHRC719.sol

## Table of Contents
- [Functions](#functions)
- [Related Protobuf Files](#related-protobuf-files)

## Functions
### associate

@notice Associates the calling account with the token
@dev This function allows an account to opt-in to receive the token
@return responseCode The response code indicating the result of the operation

Signature:

```solidity
function associate() external returns (uint256 responseCode);

    /// @notice Dissociates the calling account from the token
    /// @dev This function allows an account to opt-out from receiving the token
    /// @return responseCode The response code indicating the result of the operation
    function dissociate() external returns (uint256 responseCode);
```

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | uint256 |

### isAssociated

@notice Checks if the calling account is associated with the token
@dev This function returns the association status of the calling account
@return associated True if the account is associated, false otherwise

Signature:

```solidity
function isAssociated() external view returns (bool associated);
```

Returns:

| Name | Type |
|-----:|:-----|
| associated | bool |

## Related Protobuf Files

| Name | Link |
|-----:|:-----|
| token_associate.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_associate.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_associate.proto) |
| token_dissociate.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_dissociate.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_dissociate.proto) |