# Solidity Interface Documentation: IHTSStructs

Generated on 2025-10-14T10:17:35.642Z

Source: contracts/token-service/IHTSStructs.sol

## Table of Contents
- [Structs](#structs)

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
@custom:version 0.3.0 previous version did not include isApproval

| Field | Type | Description |
|------:|:-----|:------------|
| accountID | address | The Account ID, as a solidity address, that sends/receives cryptocurrency or tokens |
| amount | int64 | The amount of  the lowest denomination of the given token that
the account sends(negative) or receives(positive) |
| isApproval | bool | If true then the transfer is expected to be an approved allowance and the
accountID is expected to be the owner. The default is false (omitted). |

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
| isApproval | bool | If true then the transfer is expected to be an approved allowance and the
accountID is expected to be the owner. The default is false (omitted). |

### TokenTransferList

| Field | Type | Description |
|------:|:-----|:------------|
| token | address | The ID of the token as a solidity address |
| transfers | AccountAmount[] | Applicable to tokens of type FUNGIBLE_COMMON. Multiple list of AccountAmounts, each of which
has an account and amount. |
| nftTransfers | NftTransfer[] | Applicable to tokens of type NON_FUNGIBLE_UNIQUE. Multiple list of NftTransfers, each of
which has a sender and receiver account, including the serial number of the NFT |

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
