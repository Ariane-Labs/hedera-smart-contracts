# Solidity Interface Documentation: IHederaAccountService

Generated on 2025-10-14T10:17:35.613Z

Source: contracts/account-service/IHederaAccountService.sol

## Table of Contents
- [Functions](#functions)
- [Related Protobuf Files](#related-protobuf-files)

## Functions
### hbarAllowance

Returns the amount of hbars that the spender has been authorized to spend on behalf of the owner.
@param owner The account that has authorized the spender
@param spender The account that has been authorized by the owner
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return amount The amount of hbar that the spender has been authorized to spend on behalf of the owner.

Signature:

```solidity
function hbarAllowance(address owner, address spender)
    external
    returns (int64 responseCode, int256 amount);
```

Parameters:

| Name | Type |
|-----:|:-----|
| owner | address |
| spender | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| amount | int256 |

### hbarApprove

Allows spender to withdraw hbars from the owner account multiple times, up to the value amount. If this function is called
again it overwrites the current allowance with the new amount.
@param owner The owner of the hbars
@param spender the account address authorized to spend
@param amount the amount of hbars authorized to spend.
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function hbarApprove(
        address owner,
        address spender,
        int256 amount
    ) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| owner | address |
| spender | address |
| amount | int256 |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### getEvmAddressAlias

@param accountNumAlias The Hedera account to get the EVM address alias for.
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return evmAddressAlias The EVM address alias for the given Hedera account.

Signature:

```solidity
function getEvmAddressAlias(address accountNumAlias) external
        returns (int64 responseCode, address evmAddressAlias);
```

Parameters:

| Name | Type |
|-----:|:-----|
| accountNumAlias | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| evmAddressAlias | address |

### getHederaAccountNumAlias

Returns the Hedera Account ID (as account num alias) for the given EVM address alias
@param evmAddressAlias The EVM address alias to get the Hedera account for.
@return responseCode The response code for the status of the request.  SUCCESS is 22.
@return accountNumAlias The Hedera account's num for the given EVM address alias.

Signature:

```solidity
function getHederaAccountNumAlias(address evmAddressAlias) external
        returns (int64 responseCode, address accountNumAlias);
```

Parameters:

| Name | Type |
|-----:|:-----|
| evmAddressAlias | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| accountNumAlias | address |

### isValidAlias

Returns true iff a Hedera account num alias or EVM address alias.
@param addr Some 20-byte address.
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return response true iff addr is a Hedera account num alias or an EVM address alias (and false otherwise).

Signature:

```solidity
function isValidAlias(address addr) external returns (int64 responseCode, bool response);

    /// Determines if the signature is valid for the given message hash and account.
    /// It is assumed that the signature is composed of a single EDCSA or ED25519 key.
    /// @param account The account to check the signature against.
    /// @param messageHash The hash of the message to check the signature against.
    /// @param signature The signature to check.
    /// @return responseCode The response code for the status of the request.  SUCCESS is 22.
    /// @return authorized True if the signature is valid, false otherwise.
    function isAuthorizedRaw(
        address account,
        bytes memory messageHash,
        bytes memory signature
    ) external returns (int64 responseCode, bool authorized);
```

Parameters:

| Name | Type |
|-----:|:-----|
| addr | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| response | bool |

### isAuthorized

Determines if the signature is valid for the given message and account.
It is assumed that the signature is composed of a possibly complex cryptographic key.
@param account The account to check the signature against.
@param message The message to check the signature against.
@param signature The signature to check encoded as bytes.
@return responseCode The response code for the status of the request.  SUCCESS is 22.
@return authorized True if the signature is valid, false otherwise.

Signature:

```solidity
function isAuthorized(
        address account,
        bytes memory message,
        bytes memory signature
    ) external returns (int64 responseCode, bool authorized);
```

Parameters:

| Name | Type |
|-----:|:-----|
| account | address |
| message | bytes memory |
| signature | bytes memory |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| authorized | bool |

## Related Protobuf Files

| Name | Link |
|-----:|:-----|
| crypto_approve_allowance.proto | [../../node_modules/@hashgraph/proto/src/proto/services/crypto_approve_allowance.proto](../../node_modules/@hashgraph/proto/src/proto/services/crypto_approve_allowance.proto) |
| crypto_get_info.proto | [../../node_modules/@hashgraph/proto/src/proto/services/crypto_get_info.proto](../../node_modules/@hashgraph/proto/src/proto/services/crypto_get_info.proto) |
| basic_types.proto | [../../node_modules/@hashgraph/proto/src/proto/services/basic_types.proto](../../node_modules/@hashgraph/proto/src/proto/services/basic_types.proto) |