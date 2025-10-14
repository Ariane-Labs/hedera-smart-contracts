# Solidity Interface Documentation: IHederaTokenService

Generated on 2025-10-14T10:17:35.635Z

Source: contracts/token-service/IHederaTokenService.sol

## Table of Contents
- [Structs](#structs)
- [Functions](#functions)
- [Related Protobuf Files](#related-protobuf-files)

## Structs
### AccountAmount

Transfers cryptocurrency among two or more accounts by making the desired adjustments to their
balances. Each transfer list can specify up to 10 adjustments. Each negative amount is withdrawn
from the corresponding account (a sender), and each positive one is added to the corresponding
account (a receiver). The amounts list must sum to zero. Each amount is a number of tinybars
(there are 100,000,000 tinybars in one hbar).  If any sender account fails to have sufficient
hbars, then the entire transaction fails, and none of those transfers occur, though the
transaction fee is still charged. This transaction must be signed by the keys for all the sending
accounts, and for any receiving accounts that have receiverSigRequired == true. The signatures
are in the same order as the accounts, skipping those accounts that don't need a signature.

This struct is only relevant to fungible/common token transfers.
Non-fungible/unique (NFT) token transfers MUST use the NftTransfer struct.

@custom:version 0.3.0 previous version did not include isApproval

| Field | Type | Description |
|------:|:-----|:------------|
| accountID | address | The Account ID, as a solidity address, that sends/receives cryptocurrency or tokens |
| amount | int64 | The amount of  the lowest denomination of the given token that
the account sends(negative) or receives(positive)

For HBAR this SHALL be tinybar (10&lt;sup&gt;-8&lt;/sup&gt; HBAR).&lt;br/&gt;
For other fungible/common tokens this SHALL depend on the value of
`decimals` for that token |
| isApproval | bool | An approved allowance flag.
If true then the transfer is expected to be an approved allowance and the
accountID is expected to be the owner that previously approved the allowance.
The default is false (omitted). |

### NftTransfer

A sender account, a receiver account, and the serial number of an NFT of a Token with
NON_FUNGIBLE_UNIQUE type. When minting NFTs the sender will be the default AccountID instance
(0.0.0 aka 0x0) and when burning NFTs, the receiver will be the default AccountID instance.
@custom:version 0.3.0 previous version did not include isApproval

| Field | Type | Description |
|------:|:-----|:------------|
| senderAccountID | address | The solidity address of the sender |
| receiverAccountID | address | The solidity address of the receiver |
| serialNumber | int64 | The serial number of the NFT |
| isApproval | bool | An approved allowance flag.
If set, `senderAccountID` SHALL be the owner that previously approved
the allowance.
If set, the `senderAccountID` MUST be the "payer" account for
the transaction.
The default is false (omitted). |

### TokenTransferList

| Field | Type | Description |
|------:|:-----|:------------|
| token | address | The ID of the token as a solidity address This is the token to be transferred. |
| transfers | AccountAmount[] | Multiple list of AccountAmounts.

Each entry SHALL have an account and amount.
These transfers SHALL be "double-entry" style; the credits (positive
amount) and debits (negative amount) MUST sum to 0, unless this
transfer list is part of a `mint` or `burn` operation.
This SHALL be be set for fungible/common tokens and MUST be
empty otherwise. |
| nftTransfers | NftTransfer[] | A list of NftTransfers.
Each entry SHALL have a sender and receiver account, and the
serial number of the unique token to transfer.
This SHALL be be set for non-fungible/unique tokens and SHALL be
empty otherwise. |

### TransferList

| Field | Type | Description |
|------:|:-----|:------------|
| transfers | AccountAmount[] | Multiple list of AccountAmounts, each of which has an account and amount.
Used to transfer hbars between the accounts in the list. |

### Expiry

Expiry properties of a Hedera token - second, autoRenewAccount, autoRenewPeriod

| Field | Type | Description |
|------:|:-----|:------------|
| second | int64 | The epoch second at which the token should expire; if an auto-renew account and period are
specified, this is coerced to the current epoch second plus the autoRenewPeriod |
| autoRenewAccount | address | ID of an account which will be automatically charged to renew the token's expiration, at
autoRenewPeriod interval, expressed as a solidity address |
| autoRenewPeriod | int64 | The interval at which the auto-renew account will be charged to extend the token's expiry |

### KeyValue

A Key can be a public key from either the Ed25519 or ECDSA(secp256k1) signature schemes, where
in the ECDSA(secp256k1) case we require the 33-byte compressed form of the public key. We call
these public keys &lt;b&gt;primitive keys&lt;/b&gt;.
A Key can also be the ID of a smart contract instance, which is then authorized to perform any
precompiled contract action that requires this key to sign.
Note that when a Key is a smart contract ID, it &lt;i&gt;doesn't&lt;/i&gt; mean the contract with that ID
will actually create a cryptographic signature. It only means that when the contract calls a
precompiled contract, the resulting "child transaction" will be authorized to perform any action
controlled by the Key.
Exactly one of the possible values should be populated in order for the Key to be valid.

| Field | Type | Description |
|------:|:-----|:------------|
| inheritAccountKey | bool | if set to true, the key of the calling Hedera account will be inherited as the token key |
| contractId | address | smart contract instance that is authorized as if it had signed with a key |
| ed25519 | bytes | Ed25519 public key bytes |
| ECDSA_secp256k1 | bytes | Compressed ECDSA(secp256k1) public key bytes |
| delegatableContractId | address | A smart contract that, if the recipient of the active message frame, should be treated
as having signed. (Note this does not mean the &lt;i&gt;code being executed in the frame&lt;/i&gt;
will belong to the given contract, since it could be running another contract's code via
&lt;tt&gt;delegatecall&lt;/tt&gt;. So setting this key is a more permissive version of setting the
contractID key, which also requires the code in the active message frame belong to the
the contract with the given id.) |

### TokenKey

A list of token key types the key should be applied to and the value of the key

| Field | Type | Description |
|------:|:-----|:------------|
| keyType | uint | bit field representing the key type. Keys of all types that have corresponding bits set to 1
will be created for the token.
0th bit: adminKey
1st bit: kycKey
2nd bit: freezeKey
3rd bit: wipeKey
4th bit: supplyKey
5th bit: feeScheduleKey
6th bit: pauseKey
7th bit: ignored |
| key | KeyValue | the value that will be set to the key type |

### HederaToken

Basic properties of a Hedera Token - name, symbol, memo, tokenSupplyType, maxSupply,
treasury, freezeDefault. These properties are related both to Fungible and NFT token types.

| Field | Type | Description |
|------:|:-----|:------------|
| name | string | The publicly visible name of the token. The token name is specified as a Unicode string.
Its UTF-8 encoding cannot exceed 100 bytes, and cannot contain the 0 byte (NUL). |
| symbol | string | The publicly visible token symbol. The token symbol is specified as a Unicode string.
Its UTF-8 encoding cannot exceed 100 bytes, and cannot contain the 0 byte (NUL). |
| treasury | address | The ID of the account which will act as a treasury for the token as a solidity address.
This account will receive the specified initial supply or the newly minted NFTs in
the case for NON_FUNGIBLE_UNIQUE Type |
| memo | string | The memo associated with the token (UTF-8 encoding max 100 bytes) |
| tokenSupplyType | bool | IWA compatibility. Specified the token supply type. Defaults to INFINITE |
| maxSupply | int64 | IWA Compatibility. Depends on TokenSupplyType. For tokens of type FUNGIBLE_COMMON - the
maximum number of tokens that can be in circulation. For tokens of type NON_FUNGIBLE_UNIQUE -
the maximum number of NFTs (serial numbers) that can be minted. This field can never be changed! |
| freezeDefault | bool | The default Freeze status (frozen or unfrozen) of Hedera accounts relative to this token. If
true, an account must be unfrozen before it can receive the token |
| tokenKeys | TokenKey[] | list of keys to set to the token |
| expiry | Expiry | expiry properties of a Hedera token - second, autoRenewAccount, autoRenewPeriod |

### TokenInfo

Additional post creation fungible and non fungible properties of a Hedera Token.

| Field | Type | Description |
|------:|:-----|:------------|
| token | HederaToken |  |
| totalSupply | int64 |  |
| deleted | bool |  |
| defaultKycStatus | bool |  |
| pauseStatus | bool |  |
| fixedFees | FixedFee[] |  |
| fractionalFees | FractionalFee[] |  |
| royaltyFees | RoyaltyFee[] |  |
| ledgerId | string |  |

### FungibleTokenInfo

Basic properties of a Hedera Token
The number of tokens (fungible) or serials (non-fungible) of the token
Specifies whether the token is deleted or not
Specifies whether the token kyc was defaulted with KycNotApplicable (true) or Revoked (false)
Specifies whether the token is currently paused or not
The fixed fees collected when transferring the token
The fractional fees collected when transferring the token
The royalty fees collected when transferring the token
The ID of the network ledger
Additional fungible properties of a Hedera Token.

| Field | Type | Description |
|------:|:-----|:------------|
| tokenInfo | TokenInfo |  |
| decimals | int32 |  |

### NonFungibleTokenInfo

The shared hedera token info
The number of decimal places a token is divisible by
Additional non fungible properties of a Hedera Token.

| Field | Type | Description |
|------:|:-----|:------------|
| tokenInfo | TokenInfo |  |
| serialNumber | int64 |  |
| ownerId | address |  |
| creationTime | int64 |  |
| metadata | bytes |  |
| spenderId | address |  |

### FixedFee

The shared hedera token info
The serial number of the nft
The account id specifying the owner of the non fungible token
The epoch second at which the token was created.
The unique metadata of the NFT
The account id specifying an account that has been granted spending permissions on this nft
A fixed number of units (hbar or token) to assess as a fee during a transfer of
units of the token to which this fixed fee is attached. The denomination of
the fee depends on the values of tokenId, useHbarsForPayment and
useCurrentTokenForPayment. Exactly one of the values should be set.

| Field | Type | Description |
|------:|:-----|:------------|
| amount | int64 |  |
| tokenId | address | Specifies ID of token that should be used for fixed fee denomination |
| useHbarsForPayment | bool | Specifies this fixed fee should be denominated in Hbar |
| useCurrentTokenForPayment | bool | Specifies this fixed fee should be denominated in the Token currently being created |
| feeCollector | address | The ID of the account to receive the custom fee, expressed as a solidity address |

### FractionalFee

A fraction of the transferred units of a token to assess as a fee. The amount assessed will never
be less than the given minimumAmount, and never greater than the given maximumAmount.  The
denomination is always units of the token to which this fractional fee is attached.

| Field | Type | Description |
|------:|:-----|:------------|
| numerator | int64 | A rational number's numerator, used to set the amount of a value transfer to collect as a custom fee |
| denominator | int64 | A rational number's denominator, used to set the amount of a value transfer to collect as a custom fee |
| minimumAmount | int64 | The minimum amount to assess |
| maximumAmount | int64 | The maximum amount to assess (zero implies no maximum) |
| netOfTransfers | bool |  |
| feeCollector | address | The ID of the account to receive the custom fee, expressed as a solidity address |

### RoyaltyFee

A fee to assess during a transfer that changes ownership of an NFT. Defines the fraction of
the fungible value exchanged for an NFT that the ledger should collect as a royalty. ("Fungible
value" includes both ℏ and units of fungible HTS tokens.) When the NFT sender does not receive
any fungible value, the ledger will assess the fallback fee, if present, to the new NFT owner.
Royalty fees can only be added to tokens of type type NON_FUNGIBLE_UNIQUE.

| Field | Type | Description |
|------:|:-----|:------------|
| numerator | int64 | A fraction's numerator of fungible value exchanged for an NFT to collect as royalty |
| denominator | int64 | A fraction's denominator of fungible value exchanged for an NFT to collect as royalty |
| amount | int64 | If present, the fee to assess to the NFT receiver when no fungible value
is exchanged with the sender. Consists of:
amount: the amount to charge for the fee
tokenId: Specifies ID of token that should be used for fixed fee denomination
useHbarsForPayment: Specifies this fee should be denominated in Hbar |
| tokenId | address |  |
| useHbarsForPayment | bool |  |
| feeCollector | address | The ID of the account to receive the custom fee, expressed as a solidity address |

### PendingAirdrop

Represents a pending airdrop of a token or NFT to a receiver
@param sender The address of the account sending the airdrop
@param receiver The address of the account receiving the airdrop
@param token The address of the token being airdropped
@param serial For NFT airdrops, the serial number of the NFT. For fungible tokens, this should be 0

| Field | Type | Description |
|------:|:-----|:------------|
| sender | address |  |
| receiver | address |  |
| token | address |  |
| serial | int64 |  |

### NftID

Represents a unique NFT by its token address and serial number
@param nft The address of the NFT token
@param serial The serial number that uniquely identifies this NFT within its token type

| Field | Type | Description |
|------:|:-----|:------------|
| nft | address |  |
| serial | int64 |  |

## Functions
### cryptoTransfer

Performs transfers among combinations of tokens and hbars
@param transferList the list of hbar transfers to do
@param tokenTransfers the list of token transfers to do
@custom:version 0.3.0 the signature of the previous version was cryptoTransfer(TokenTransferList[] memory tokenTransfers)

Signature:

```solidity
function cryptoTransfer(TransferList memory transferList, TokenTransferList[] memory tokenTransfers)
        external
        returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| transferList | TransferList memory |
| tokenTransfers | TokenTransferList[] memory |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### mintToken

Mints an amount of the token to the defined treasury account
@param token The token for which to mint tokens. If token does not exist, transaction results in
INVALID_TOKEN_ID
@param amount Applicable to tokens of type FUNGIBLE_COMMON. The amount to mint to the Treasury Account.
Amount must be a positive non-zero number represented in the lowest denomination of the
token. The new supply must be lower than 2^63.
@param metadata Applicable to tokens of type NON_FUNGIBLE_UNIQUE. A list of metadata that are being created.
Maximum allowed size of each metadata is 100 bytes
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return newTotalSupply The new supply of tokens. For NFTs it is the total count of NFTs
@return serialNumbers If the token is an NFT the newly generate serial numbers, othersise empty.

Signature:

```solidity
function mintToken(
        address token,
        int64 amount,
        bytes[] memory metadata
    )
        external
        returns (
            int64 responseCode,
            int64 newTotalSupply,
            int64[] memory serialNumbers
        );
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| amount | int64 |
| metadata | bytes[] memory |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| newTotalSupply | int64 |
| serialNumbers | int64[] memory |

### burnToken

Burns an amount of the token from the defined treasury account
@param token The token for which to burn tokens. If token does not exist, transaction results in
INVALID_TOKEN_ID
@param amount  Applicable to tokens of type FUNGIBLE_COMMON. The amount to burn from the Treasury Account.
Amount must be a positive non-zero number, not bigger than the token balance of the treasury
account (0; balance], represented in the lowest denomination.
@param serialNumbers Applicable to tokens of type NON_FUNGIBLE_UNIQUE. The list of serial numbers to be burned.
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return newTotalSupply The new supply of tokens. For NFTs it is the total count of NFTs

Signature:

```solidity
function burnToken(
        address token,
        int64 amount,
        int64[] memory serialNumbers
    ) external returns (int64 responseCode, int64 newTotalSupply);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| amount | int64 |
| serialNumbers | int64[] memory |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| newTotalSupply | int64 |

### associateTokens

Associates the provided account with the provided tokens. Must be signed by the provided
Account's key or called from the accounts contract key
If the provided account is not found, the transaction will resolve to INVALID_ACCOUNT_ID.
If the provided account has been deleted, the transaction will resolve to ACCOUNT_DELETED.
If any of the provided tokens is not found, the transaction will resolve to INVALID_TOKEN_REF.
If any of the provided tokens has been deleted, the transaction will resolve to TOKEN_WAS_DELETED.
If an association between the provided account and any of the tokens already exists, the
transaction will resolve to TOKEN_ALREADY_ASSOCIATED_TO_ACCOUNT.
If the provided account's associations count exceed the constraint of maximum token associations
per account, the transaction will resolve to TOKENS_PER_ACCOUNT_LIMIT_EXCEEDED.
On success, associations between the provided account and tokens are made and the account is
ready to interact with the tokens.
@param account The account to be associated with the provided tokens
@param tokens The tokens to be associated with the provided account. In the case of NON_FUNGIBLE_UNIQUE
Type, once an account is associated, it can hold any number of NFTs (serial numbers) of that
token type
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function associateTokens(address account, address[] memory tokens)
        external
        returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| account | address |
| tokens | address[] memory |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### associateToken

Single-token variant of associateTokens. Will be mapped to a single entry array call of associateTokens
@param account The account to be associated with the provided token
@param token The token to be associated with the provided account

Signature:

```solidity
function associateToken(address account, address token)
        external
        returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| account | address |
| token | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### dissociateTokens

Dissociates the provided account with the provided tokens. Must be signed by the provided
Account's key.
If the provided account is not found, the transaction will resolve to INVALID_ACCOUNT_ID.
If the provided account has been deleted, the transaction will resolve to ACCOUNT_DELETED.
If any of the provided tokens is not found, the transaction will resolve to INVALID_TOKEN_REF.
If any of the provided tokens has been deleted, the transaction will resolve to TOKEN_WAS_DELETED.
If an association between the provided account and any of the tokens does not exist, the
transaction will resolve to TOKEN_NOT_ASSOCIATED_TO_ACCOUNT.
If a token has not been deleted and has not expired, and the user has a nonzero balance, the
transaction will resolve to TRANSACTION_REQUIRES_ZERO_TOKEN_BALANCES.
If a &lt;b&gt;fungible token&lt;/b&gt; has expired, the user can disassociate even if their token balance is
not zero.
If a &lt;b&gt;non fungible token&lt;/b&gt; has expired, the user can &lt;b&gt;not&lt;/b&gt; disassociate if their token
balance is not zero. The transaction will resolve to TRANSACTION_REQUIRED_ZERO_TOKEN_BALANCES.
On success, associations between the provided account and tokens are removed.
@param account The account to be dissociated from the provided tokens
@param tokens The tokens to be dissociated from the provided account.
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function dissociateTokens(address account, address[] memory tokens)
        external
        returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| account | address |
| tokens | address[] memory |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### dissociateToken

Single-token variant of dissociateTokens. Will be mapped to a single entry array call of dissociateTokens
@param account The account to be associated with the provided token
@param token The token to be associated with the provided account

Signature:

```solidity
function dissociateToken(address account, address token)
        external
        returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| account | address |
| token | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### createFungibleToken

Creates a Fungible Token with the specified properties
@param token the basic properties of the token being created
@param initialTotalSupply Specifies the initial supply of tokens to be put in circulation. The
initial supply is sent to the Treasury Account. The supply is in the lowest denomination possible.
@param decimals the number of decimal places a token is divisible by
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return tokenAddress the created token's address

Signature:

```solidity
function createFungibleToken(
        HederaToken memory token,
        int64 initialTotalSupply,
        int32 decimals
    ) external payable returns (int64 responseCode, address tokenAddress);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | HederaToken memory |
| initialTotalSupply | int64 |
| decimals | int32 |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| tokenAddress | address |

### createFungibleTokenWithCustomFees

Creates a Fungible Token with the specified properties
@param token the basic properties of the token being created
@param initialTotalSupply Specifies the initial supply of tokens to be put in circulation. The
initial supply is sent to the Treasury Account. The supply is in the lowest denomination possible.
@param decimals the number of decimal places a token is divisible by.
@param fixedFees list of fixed fees to apply to the token
@param fractionalFees list of fractional fees to apply to the token
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return tokenAddress the created token's address

Signature:

```solidity
function createFungibleTokenWithCustomFees(
        HederaToken memory token,
        int64 initialTotalSupply,
        int32 decimals,
        FixedFee[] memory fixedFees,
        FractionalFee[] memory fractionalFees
    ) external payable returns (int64 responseCode, address tokenAddress);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | HederaToken memory |
| initialTotalSupply | int64 |
| decimals | int32 |
| fixedFees | FixedFee[] memory |
| fractionalFees | FractionalFee[] memory |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| tokenAddress | address |

### createNonFungibleToken

Creates an Non Fungible Unique Token with the specified properties
@param token the basic properties of the token being created
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return tokenAddress the created token's address

Signature:

```solidity
function createNonFungibleToken(HederaToken memory token)
        external
        payable
        returns (int64 responseCode, address tokenAddress);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | HederaToken memory |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| tokenAddress | address |

### createNonFungibleTokenWithCustomFees

Creates an Non Fungible Unique Token with the specified properties
@param token the basic properties of the token being created
@param fixedFees list of fixed fees to apply to the token
@param royaltyFees list of royalty fees to apply to the token
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return tokenAddress the created token's address

Signature:

```solidity
function createNonFungibleTokenWithCustomFees(
        HederaToken memory token,
        FixedFee[] memory fixedFees,
        RoyaltyFee[] memory royaltyFees
    ) external payable returns (int64 responseCode, address tokenAddress);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | HederaToken memory |
| fixedFees | FixedFee[] memory |
| royaltyFees | RoyaltyFee[] memory |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| tokenAddress | address |

### transferTokens

Initiates a Fungible Token Transfer
@param token The ID of the token as a solidity address
@param accountId account to do a transfer to/from
@param amount The amount from the accountId at the same index

Signature:

```solidity
function transferTokens(
        address token,
        address[] memory accountId,
        int64[] memory amount
    ) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| accountId | address[] memory |
| amount | int64[] memory |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### transferNFTs

Initiates a Non-Fungable Token Transfer
@param token The ID of the token as a solidity address
@param sender the sender of an nft
@param receiver the receiver of the nft sent by the same index at sender
@param serialNumber the serial number of the nft sent by the same index at sender

Signature:

```solidity
function transferNFTs(
        address token,
        address[] memory sender,
        address[] memory receiver,
        int64[] memory serialNumber
    ) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| sender | address[] memory |
| receiver | address[] memory |
| serialNumber | int64[] memory |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### transferToken

Transfers tokens where the calling account/contract is implicitly the first entry in the token transfer list,
where the amount is the value needed to zero balance the transfers. Regular signing rules apply for sending
(positive amount) or receiving (negative amount)
@param token The token to transfer to/from
@param sender The sender for the transaction
@param recipient The receiver of the transaction
@param amount Non-negative value to send. a negative value will result in a failure.

Signature:

```solidity
function transferToken(
        address token,
        address sender,
        address recipient,
        int64 amount
    ) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| sender | address |
| recipient | address |
| amount | int64 |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### transferNFT

Transfers tokens where the calling account/contract is implicitly the first entry in the token transfer list,
where the amount is the value needed to zero balance the transfers. Regular signing rules apply for sending
(positive amount) or receiving (negative amount)
@param token The token to transfer to/from
@param sender The sender for the transaction
@param recipient The receiver of the transaction
@param serialNumber The serial number of the NFT to transfer.

Signature:

```solidity
function transferNFT(
        address token,
        address sender,
        address recipient,
        int64 serialNumber
    ) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| sender | address |
| recipient | address |
| serialNumber | int64 |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### approve

Allows spender to withdraw from your account multiple times, up to the value amount. If this function is called
again it overwrites the current allowance with value.
Only Applicable to Fungible Tokens
@param token The hedera token address to approve
@param spender the account address authorized to spend
@param amount the amount of tokens authorized to spend.
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function approve(
        address token,
        address spender,
        uint256 amount
    ) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| spender | address |
| amount | uint256 |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### transferFrom

Transfers `amount` tokens from `from` to `to` using the
Only applicable to fungible tokens
@param token The address of the fungible Hedera token to transfer
@param from The account address of the owner of the token, on the behalf of which to transfer `amount` tokens
@param to The account address of the receiver of the `amount` tokens
@param amount The amount of tokens to transfer from `from` to `to`
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function transferFrom(address token, address from, address to, uint256 amount) external returns (int64 responseCode);

    /// Returns the amount which spender is still allowed to withdraw from owner.
    /// Only Applicable to Fungible Tokens
    /// @param token The Hedera token address to check the allowance of
    /// @param owner the owner of the tokens to be spent
    /// @param spender the spender of the tokens
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return allowance The amount which spender is still allowed to withdraw from owner.
    function allowance(
        address token,
        address owner,
        address spender
    ) external returns (int64 responseCode, uint256 allowance);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| from | address |
| to | address |
| amount | uint256 |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### approveNFT

Allow or reaffirm the approved address to transfer an NFT the approved address does not own.
Only Applicable to NFT Tokens
@param token The Hedera NFT token address to approve
@param approved The new approved NFT controller.  To revoke approvals pass in the zero address.
@param serialNumber The NFT serial number  to approve
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function approveNFT(
        address token,
        address approved,
        uint256 serialNumber
    ) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| approved | address |
| serialNumber | uint256 |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### transferFromNFT

Transfers `serialNumber` of `token` from `from` to `to` using the allowance mechanism.
Only applicable to NFT tokens
@param token The address of the non-fungible Hedera token to transfer
@param from The account address of the owner of `serialNumber` of `token`
@param to The account address of the receiver of `serialNumber`
@param serialNumber The NFT serial number to transfer
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function transferFromNFT(address token, address from, address to, uint256 serialNumber) external returns (int64 responseCode);

    /// Get the approved address for a single NFT
    /// Only Applicable to NFT Tokens
    /// @param token The Hedera NFT token address to check approval
    /// @param serialNumber The NFT to find the approved address for
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return approved The approved address for this NFT, or the zero address if there is none
    function getApproved(address token, uint256 serialNumber)
        external
        returns (int64 responseCode, address approved);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| from | address |
| to | address |
| serialNumber | uint256 |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### setApprovalForAll

Enable or disable approval for a third party ("operator") to manage
all of `msg.sender`'s assets
@param token The Hedera NFT token address to approve
@param operator Address to add to the set of authorized operators
@param approved True if the operator is approved, false to revoke approval
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function setApprovalForAll(
        address token,
        address operator,
        bool approved
    ) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| operator | address |
| approved | bool |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### isApprovedForAll

Query if an address is an authorized operator for another address
Only Applicable to NFT Tokens
@param token The Hedera NFT token address to approve
@param owner The address that owns the NFTs
@param operator The address that acts on behalf of the owner
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return approved True if `operator` is an approved operator for `owner`, false otherwise

Signature:

```solidity
function isApprovedForAll(
        address token,
        address owner,
        address operator
    ) external returns (int64 responseCode, bool approved);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| owner | address |
| operator | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| approved | bool |

### isFrozen

Query if token account is frozen
@param token The token address to check
@param account The account address associated with the token
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return frozen True if `account` is frozen for `token`

Signature:

```solidity
function isFrozen(address token, address account)
        external
        returns (int64 responseCode, bool frozen);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| account | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| frozen | bool |

### isKyc

Query if token account has kyc granted
@param token The token address to check
@param account The account address associated with the token
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return kycGranted True if `account` has kyc granted for `token`

Signature:

```solidity
function isKyc(address token, address account)
        external
        returns (int64 responseCode, bool kycGranted);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| account | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| kycGranted | bool |

### deleteToken

Operation to delete token
@param token The token address to be deleted
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function deleteToken(address token) external returns (int64 responseCode);

    /// Query token custom fees
    /// @param token The token address to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return fixedFees Set of fixed fees for `token`
    /// @return fractionalFees Set of fractional fees for `token`
    /// @return royaltyFees Set of royalty fees for `token`
    function getTokenCustomFees(address token)
        external
        returns (int64 responseCode, FixedFee[] memory fixedFees, FractionalFee[] memory fractionalFees, RoyaltyFee[] memory royaltyFees);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### getTokenDefaultFreezeStatus

Query token default freeze status
@param token The token address to check
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return defaultFreezeStatus True if `token` default freeze status is frozen.

Signature:

```solidity
function getTokenDefaultFreezeStatus(address token)
        external
        returns (int64 responseCode, bool defaultFreezeStatus);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| defaultFreezeStatus | bool |

### getTokenDefaultKycStatus

Query token default kyc status
@param token The token address to check
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return defaultKycStatus True if `token` default kyc status is KycNotApplicable and false if Revoked.

Signature:

```solidity
function getTokenDefaultKycStatus(address token)
        external
        returns (int64 responseCode, bool defaultKycStatus);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| defaultKycStatus | bool |

### getTokenExpiryInfo

Query token expiry info
@param token The token address to check
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return expiry Expiry info for `token`

Signature:

```solidity
function getTokenExpiryInfo(address token)
        external
        returns (int64 responseCode, Expiry memory expiry);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| expiry | Expiry memory |

### getFungibleTokenInfo

Query fungible token info
@param token The token address to check
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return fungibleTokenInfo FungibleTokenInfo info for `token`

Signature:

```solidity
function getFungibleTokenInfo(address token)
        external
        returns (int64 responseCode, FungibleTokenInfo memory fungibleTokenInfo);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| fungibleTokenInfo | FungibleTokenInfo memory |

### getTokenInfo

Query token info
@param token The token address to check
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return tokenInfo TokenInfo info for `token`

Signature:

```solidity
function getTokenInfo(address token)
        external
        returns (int64 responseCode, TokenInfo memory tokenInfo);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| tokenInfo | TokenInfo memory |

### getTokenKey

Query token KeyValue
@param token The token address to check
@param keyType The keyType of the desired KeyValue
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return key KeyValue info for key of type `keyType`

Signature:

```solidity
function getTokenKey(address token, uint keyType)
        external
        returns (int64 responseCode, KeyValue memory key);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| keyType | uint |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| key | KeyValue memory |

### getNonFungibleTokenInfo

Query non fungible token info
@param token The token address to check
@param serialNumber The NFT serialNumber to check
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return nonFungibleTokenInfo NonFungibleTokenInfo info for `token` `serialNumber`

Signature:

```solidity
function getNonFungibleTokenInfo(address token, int64 serialNumber)
        external
        returns (int64 responseCode, NonFungibleTokenInfo memory nonFungibleTokenInfo);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| serialNumber | int64 |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| nonFungibleTokenInfo | NonFungibleTokenInfo memory |

### freezeToken

Operation to freeze token account
@param token The token address
@param account The account address to be frozen
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function freezeToken(address token, address account)
        external
        returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| account | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### unfreezeToken

Operation to unfreeze token account
@param token The token address
@param account The account address to be unfrozen
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function unfreezeToken(address token, address account)
        external
        returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| account | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### grantTokenKyc

Operation to grant kyc to token account
@param token The token address
@param account The account address to grant kyc
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function grantTokenKyc(address token, address account)
        external
        returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| account | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### revokeTokenKyc

Operation to revoke kyc to token account
@param token The token address
@param account The account address to revoke kyc
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function revokeTokenKyc(address token, address account)
        external
        returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| account | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### pauseToken

Operation to pause token
@param token The token address to be paused
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function pauseToken(address token) external returns (int64 responseCode);

    /// Operation to unpause token
    /// @param token The token address to be unpaused
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function unpauseToken(address token) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### wipeTokenAccount

Operation to wipe fungible tokens from account
@param token The token address
@param account The account address to revoke kyc
@param amount The number of tokens to wipe
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function wipeTokenAccount(
        address token,
        address account,
        int64 amount
    ) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| account | address |
| amount | int64 |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### wipeTokenAccountNFT

Operation to wipe non fungible tokens from account
@param token The token address
@param account The account address to revoke kyc
@param  serialNumbers The serial numbers of token to wipe
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function wipeTokenAccountNFT(
        address token,
        address account,
        int64[] memory serialNumbers
    ) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| account | address |
| serialNumbers | int64[] memory |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### updateTokenInfo

Operation to update token info
@param token The token address
@param tokenInfo The hedera token info to update token with
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function updateTokenInfo(address token, HederaToken memory tokenInfo)
        external
        returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| tokenInfo | HederaToken memory |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### updateTokenExpiryInfo

Operation to update token expiry info
@param token The token address
@param expiryInfo The hedera token expiry info
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function updateTokenExpiryInfo(address token, Expiry memory expiryInfo)
        external
        returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| expiryInfo | Expiry memory |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### updateTokenKeys

Operation to update token expiry info
@param token The token address
@param keys The token keys
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function updateTokenKeys(address token, TokenKey[] memory keys)
        external
        returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| keys | TokenKey[] memory |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### isToken

Query if valid token found for the given address
@param token The token address
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return isToken True if valid token found for the given address

Signature:

```solidity
function isToken(address token)
        external returns
        (int64 responseCode, bool isToken);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| isToken | bool |

### getTokenType

Query to return the token type for a given address
@param token The token address
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return tokenType the token type. 0 is FUNGIBLE_COMMON, 1 is NON_FUNGIBLE_UNIQUE, -1 is UNRECOGNIZED

Signature:

```solidity
function getTokenType(address token)
        external returns
        (int64 responseCode, int32 tokenType);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| tokenType | int32 |

### redirectForToken

Initiates a Redirect For Token
@param token The token address
@param encodedFunctionSelector The function selector from the ERC20 interface + the bytes input for the function called
@return responseCode The response code for the status of the request. SUCCESS is 22.
@return response The result of the call that had been encoded and sent for execution.

Signature:

```solidity
function redirectForToken(address token, bytes memory encodedFunctionSelector) external returns (int64 responseCode, bytes memory response);

    /// Update the custom fees for a fungible token
    /// @param token The token address
    /// @param fixedFees Set of fixed fees for `token`
    /// @param fractionalFees Set of fractional fees for `token`
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function updateFungibleTokenCustomFees(address token,  IHederaTokenService.FixedFee[] memory fixedFees, IHederaTokenService.FractionalFee[] memory fractionalFees) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| encodedFunctionSelector | bytes memory |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |
| response | bytes memory |

### updateNonFungibleTokenCustomFees

Update the custom fees for a non-fungible token
@param token The token address
@param fixedFees Set of fixed fees for `token`
@param royaltyFees Set of royalty fees for `token`
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function updateNonFungibleTokenCustomFees(address token, IHederaTokenService.FixedFee[] memory fixedFees, IHederaTokenService.RoyaltyFee[] memory royaltyFees) external returns (int64 responseCode);

    /// @notice Airdrop one or more tokens to one or more accounts
    /// @notice Recipients will receive tokens in one of these ways:
    /// @notice     - Immediately if already associated with the token
    /// @notice     - Immediately with auto-association if they have available slots
    /// @notice     - As a pending airdrop requiring claim if they have "receiver signature required"
    /// @notice     - As a pending airdrop requiring claim if they have no available auto-association slots
    /// @notice Immediate airdrops are irreversible, pending airdrops can be canceled
    /// @notice All transfer fees and auto-renewal rent costs are charged to the transaction submitter
    /// @param tokenTransfers Array of token transfer lists containing token addresses and recipient details
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function airdropTokens(TokenTransferList[] memory tokenTransfers) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| token | address |
| fixedFees | IHederaTokenService.FixedFee[] memory |
| royaltyFees | IHederaTokenService.RoyaltyFee[] memory |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### cancelAirdrops

@notice Cancels pending airdrops that have not yet been claimed
@param pendingAirdrops Array of pending airdrops to cancel
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function cancelAirdrops(PendingAirdrop[] memory pendingAirdrops) external returns (int64 responseCode);

    /// @notice Claims pending airdrops that were sent to the calling account
    /// @param pendingAirdrops Array of pending airdrops to claim
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function claimAirdrops(PendingAirdrop[] memory pendingAirdrops) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| pendingAirdrops | PendingAirdrop[] memory |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### rejectTokens

@notice Rejects one or more tokens by transferring their full balance from the requesting account to the treasury
@notice This transfer does not charge any custom fees or royalties defined for the tokens
@notice For fungible tokens, the requesting account's balance will become 0 and the treasury balance will increase by that amount
@notice For non-fungible tokens, the requesting account will no longer hold the rejected serial numbers and they will be transferred to the treasury
@param rejectingAddress The address rejecting the tokens
@param ftAddresses Array of fungible token addresses to reject
@param nftIDs Array of NFT IDs to reject
@return responseCode The response code for the status of the request. SUCCESS is 22.

Signature:

```solidity
function rejectTokens(address rejectingAddress, address[] memory ftAddresses, NftID[] memory nftIDs) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| rejectingAddress | address |
| ftAddresses | address[] memory |
| nftIDs | NftID[] memory |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

## Related Protobuf Files

| Name | Link |
|-----:|:-----|
| token_create.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_create.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_create.proto) |
| token_freeze_account.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_freeze_account.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_freeze_account.proto) |
| token_unfreeze_account.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_unfreeze_account.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_unfreeze_account.proto) |
| token_grant_kyc.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_grant_kyc.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_grant_kyc.proto) |
| token_revoke_kyc.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_revoke_kyc.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_revoke_kyc.proto) |
| token_delete.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_delete.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_delete.proto) |
| token_update.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_update.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_update.proto) |
| token_mint.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_mint.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_mint.proto) |
| token_burn.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_burn.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_burn.proto) |
| token_wipe_account.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_wipe_account.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_wipe_account.proto) |
| token_associate.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_associate.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_associate.proto) |
| token_dissociate.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_dissociate.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_dissociate.proto) |
| token_fee_schedule_update.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_fee_schedule_update.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_fee_schedule_update.proto) |
| token_pause.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_pause.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_pause.proto) |
| token_unpause.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_unpause.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_unpause.proto) |
| token_update_nfts.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_update_nfts.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_update_nfts.proto) |
| token_airdrop.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_airdrop.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_airdrop.proto) |
| token_cancel_airdrop.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_cancel_airdrop.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_cancel_airdrop.proto) |
| token_claim_airdrop.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_claim_airdrop.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_claim_airdrop.proto) |
| token_reject.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_reject.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_reject.proto) |
| token_get_info.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_get_info.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_get_info.proto) |
| token_get_nft_info.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_get_nft_info.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_get_nft_info.proto) |
| token_get_nft_infos.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_get_nft_infos.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_get_nft_infos.proto) |
| token_get_account_nft_infos.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_get_account_nft_infos.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_get_account_nft_infos.proto) |
| basic_types.proto | [../../node_modules/@hashgraph/proto/src/proto/services/basic_types.proto](../../node_modules/@hashgraph/proto/src/proto/services/basic_types.proto) |