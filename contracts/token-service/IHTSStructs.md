# Solidity Interface Documentation: IHTSStructs

Generated on 2025-10-14T12:10:36.684Z

Source: contracts/token-service/IHTSStructs.sol

## Table of Contents

- [Solidity Interface Structs](#structs)
  - [AccountAmount](#accountamount)
  - [NftTransfer](#nfttransfer)
  - [TokenTransferList](#tokentransferlist)
  - [TransferList](#transferlist)
  - [Expiry](#expiry)
  - [KeyValue](#keyvalue)
  - [TokenKey](#tokenkey)
  - [HederaToken](#hederatoken)
  - [TokenInfo](#tokeninfo)
  - [FungibleTokenInfo](#fungibletokeninfo)
  - [NonFungibleTokenInfo](#nonfungibletokeninfo)
  - [FixedFee](#fixedfee)
  - [FractionalFee](#fractionalfee)
  - [RoyaltyFee](#royaltyfee)
  - [PendingAirdrop](#pendingairdrop)
  - [NftID](#nftid)

## Solidity Interface Structs

### AccountAmount

|      Field | Type    |
| ---------: | :------ |
|  accountID | address |
|     amount | int64   |
| isApproval | bool    |

### NftTransfer

|             Field | Type    |
| ----------------: | :------ |
|   senderAccountID | address |
| receiverAccountID | address |
|      serialNumber | int64   |
|        isApproval | bool    |

### TokenTransferList

|        Field | Type            |
| -----------: | :-------------- |
|        token | address         |
|    transfers | AccountAmount[] |
| nftTransfers | NftTransfer[]   |

### TransferList

|     Field | Type            |
| --------: | :-------------- |
| transfers | AccountAmount[] |

### Expiry

|            Field | Type    |
| ---------------: | :------ |
|           second | int64   |
| autoRenewAccount | address |
|  autoRenewPeriod | int64   |

### KeyValue

|                 Field | Type    |
| --------------------: | :------ |
|     inheritAccountKey | bool    |
|            contractId | address |
|               ed25519 | bytes   |
|       ECDSA_secp256k1 | bytes   |
| delegatableContractId | address |

### TokenKey

|   Field | Type     |
| ------: | :------- |
| keyType | uint     |
|     key | KeyValue |

### HederaToken

|           Field | Type       |
| --------------: | :--------- |
|            name | string     |
|          symbol | string     |
|        treasury | address    |
|            memo | string     |
| tokenSupplyType | bool       |
|       maxSupply | int64      |
|   freezeDefault | bool       |
|       tokenKeys | TokenKey[] |
|          expiry | Expiry     |

### TokenInfo

|            Field | Type            |
| ---------------: | :-------------- |
|            token | HederaToken     |
|      totalSupply | int64           |
|          deleted | bool            |
| defaultKycStatus | bool            |
|      pauseStatus | bool            |
|        fixedFees | FixedFee[]      |
|   fractionalFees | FractionalFee[] |
|      royaltyFees | RoyaltyFee[]    |
|         ledgerId | string          |

### FungibleTokenInfo

|     Field | Type      |
| --------: | :-------- |
| tokenInfo | TokenInfo |
|  decimals | int32     |

### NonFungibleTokenInfo

|        Field | Type      |
| -----------: | :-------- |
|    tokenInfo | TokenInfo |
| serialNumber | int64     |
|      ownerId | address   |
| creationTime | int64     |
|     metadata | bytes     |
|    spenderId | address   |

### FixedFee

|                     Field | Type    |
| ------------------------: | :------ |
|                    amount | int64   |
|                   tokenId | address |
|        useHbarsForPayment | bool    |
| useCurrentTokenForPayment | bool    |
|              feeCollector | address |

### FractionalFee

|          Field | Type    |
| -------------: | :------ |
|      numerator | int64   |
|    denominator | int64   |
|  minimumAmount | int64   |
|  maximumAmount | int64   |
| netOfTransfers | bool    |
|   feeCollector | address |

### RoyaltyFee

|              Field | Type    |
| -----------------: | :------ |
|          numerator | int64   |
|        denominator | int64   |
|             amount | int64   |
|            tokenId | address |
| useHbarsForPayment | bool    |
|       feeCollector | address |

### PendingAirdrop

|    Field | Type    |
| -------: | :------ |
|   sender | address |
| receiver | address |
|    token | address |
|   serial | int64   |

### NftID

|  Field | Type    |
| -----: | :------ |
|    nft | address |
| serial | int64   |
