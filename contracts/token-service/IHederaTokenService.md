# Solidity Interface Documentation: IHederaTokenService

Generated on 2025-10-14T12:10:36.677Z

Source: contracts/token-service/IHederaTokenService.sol

## Table of Contents

- [Protobuf Definitions](#protobuf-definitions)
  - [token_create.proto](#token_createproto)
  - [token_freeze_account.proto](#token_freeze_accountproto)
  - [token_unfreeze_account.proto](#token_unfreeze_accountproto)
  - [token_grant_kyc.proto](#token_grant_kycproto)
  - [token_revoke_kyc.proto](#token_revoke_kycproto)
  - [token_delete.proto](#token_deleteproto)
  - [token_update.proto](#token_updateproto)
  - [token_mint.proto](#token_mintproto)
  - [token_burn.proto](#token_burnproto)
  - [token_wipe_account.proto](#token_wipe_accountproto)
  - [token_associate.proto](#token_associateproto)
  - [token_dissociate.proto](#token_dissociateproto)
  - [token_fee_schedule_update.proto](#token_fee_schedule_updateproto)
  - [token_pause.proto](#token_pauseproto)
  - [token_unpause.proto](#token_unpauseproto)
  - [token_update_nfts.proto](#token_update_nftsproto)
  - [token_airdrop.proto](#token_airdropproto)
  - [token_cancel_airdrop.proto](#token_cancel_airdropproto)
  - [token_claim_airdrop.proto](#token_claim_airdropproto)
  - [token_reject.proto](#token_rejectproto)
  - [token_get_info.proto](#token_get_infoproto)
  - [token_get_nft_info.proto](#token_get_nft_infoproto)
  - [token_get_nft_infos.proto](#token_get_nft_infosproto)
  - [token_get_account_nft_infos.proto](#token_get_account_nft_infosproto)
  - [basic_types.proto](#basic_typesproto)
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
- [Solidity Interface Functions](#functions)
  - [cryptoTransfer](#cryptotransfer)
  - [mintToken](#minttoken)
  - [burnToken](#burntoken)
  - [associateTokens](#associatetokens)
  - [associateToken](#associatetoken)
  - [dissociateTokens](#dissociatetokens)
  - [dissociateToken](#dissociatetoken)
  - [createFungibleToken](#createfungibletoken)
  - [createFungibleTokenWithCustomFees](#createfungibletokenwithcustomfees)
  - [createNonFungibleToken](#createnonfungibletoken)
  - [createNonFungibleTokenWithCustomFees](#createnonfungibletokenwithcustomfees)
  - [transferTokens](#transfertokens)
  - [transferNFTs](#transfernfts)
  - [transferToken](#transfertoken)
  - [transferNFT](#transfernft)
  - [approve](#approve)
  - [transferFrom](#transferfrom)
  - [allowance](#allowance)
  - [approveNFT](#approvenft)
  - [transferFromNFT](#transferfromnft)
  - [getApproved](#getapproved)
  - [setApprovalForAll](#setapprovalforall)
  - [isApprovedForAll](#isapprovedforall)
  - [isFrozen](#isfrozen)
  - [isKyc](#iskyc)
  - [deleteToken](#deletetoken)
  - [getTokenCustomFees](#gettokencustomfees)
  - [getTokenDefaultFreezeStatus](#gettokendefaultfreezestatus)
  - [getTokenDefaultKycStatus](#gettokendefaultkycstatus)
  - [getTokenExpiryInfo](#gettokenexpiryinfo)
  - [getFungibleTokenInfo](#getfungibletokeninfo)
  - [getTokenInfo](#gettokeninfo)
  - [getTokenKey](#gettokenkey)
  - [getNonFungibleTokenInfo](#getnonfungibletokeninfo)
  - [freezeToken](#freezetoken)
  - [unfreezeToken](#unfreezetoken)
  - [grantTokenKyc](#granttokenkyc)
  - [revokeTokenKyc](#revoketokenkyc)
  - [pauseToken](#pausetoken)
  - [unpauseToken](#unpausetoken)
  - [wipeTokenAccount](#wipetokenaccount)
  - [wipeTokenAccountNFT](#wipetokenaccountnft)
  - [updateTokenInfo](#updatetokeninfo)
  - [updateTokenExpiryInfo](#updatetokenexpiryinfo)
  - [updateTokenKeys](#updatetokenkeys)
  - [isToken](#istoken)
  - [getTokenType](#gettokentype)
  - [redirectForToken](#redirectfortoken)
  - [updateFungibleTokenCustomFees](#updatefungibletokencustomfees)
  - [updateNonFungibleTokenCustomFees](#updatenonfungibletokencustomfees)
  - [airdropTokens](#airdroptokens)
  - [cancelAirdrops](#cancelairdrops)
  - [claimAirdrops](#claimairdrops)
  - [rejectTokens](#rejecttokens)

## Protobuf Definitions

Using Protobuf package: @hashgraph/proto v2.20.0
Protobufs for the Hiero SDK

### token_create.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_create.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_create.proto)

```proto
/**
 * # Token Create
 * Create an Hedera Token Service (HTS) token.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/duration.proto";
import "services/basic_types.proto";
import "services/custom_fees.proto";
import "services/timestamp.proto";

/**
 * Create an HTS token.
 *
 * #### Keys
 * Each token has several keys that, separately, control different functions
 * for that token. It is *_strongly_* recommended that each key assigned to
 * a token be unique, or disabled by assigning an empty `KeyList`.
 * Keys and purpose
 * - `adminKey` is a general access and may authorize a token update
 *   transaction as well as _update the other keys_. Even the admin key
 *   cannot authorize _adding_ a key that is not present, however.<br/>
 *   The admin key may also delete the token entirely.
 * - `fee_schedule` may authorize updating the token custom fees. If this
 *   key is not present, the custom fees for the token are fixed and immutable.
 * - `freeze` may authorize a token freeze or unfreeze transaction.
 *   If this key is not present, accounts holding this token cannot have
 *   their tokens frozen or unfrozen.
 * - `kyc` may authorize a token grant KYC or revoke KYC transaction.
 *   If this key is not present, accounts holding this token cannot have
 *   KYC status granted or revoked.
 * - `metadata` may authorize token update nfts transactions.
 *   If this key is not present, the token metadata values for that
 *   non-fungible/unique token _type_ will be immutable.
 * - `pause` may authorize a token pause or token unpause transaction.
 *   If this key is not present, the token cannot be paused (preventing any
 *   account from transacting in that token) or resumed.
 * - `supply` may authorize a token mint or burn transaction.
 *   If this key is not present, the token cannot mint additional supply and
 *   existing tokens cannot be "burned" from the treasury (but _might_ still be
 *   "burned" from individual accounts, c.f. `wipeKey` and `tokenWipe`).
 * - `wipe` may authorize a token wipe account transaction.
 *   If this key is not present, accounts holding this token cannot have
 *   their balance or NFTs wiped (effectively burned).
 *
 * #### Requirements
 * If `tokenType` is fungible/common, the `initialSupply` MUST be strictly
 * greater than zero(`0`).<br/>
 * If `tokenType` is non-fungible/unique, the `initialSupply` MUST
 * be zero(`0`).<br/>
 * If `tokenSupplyType` is "infinite", the `maxSupply` MUST be zero(`0`).<br/>
 * If `tokenSupplyType` is "finite", the `maxSupply` MUST be strictly
 * greater than zero(`0`).<br/>
 *
 * ### Block Stream Effects
 * If the token is created, the Token Identifier SHALL be in the receipt.<br/>
 */
message TokenCreateTransactionBody {
    /**
     * A name for the token.<br/>
     * This is generally the "full name" displayed in wallet software.
     * <p>
     * This field is REQUIRED.<br/>
     * This value MUST NOT exceed 100 bytes when encoded as UTF-8.<br/>
     * This value MUST NOT contain the Unicode NUL codepoint.
     */
    string name = 1;

    /**
     * A symbol to use for the token.
     * <p>
     * This field is REQUIRED.<br/>
     * This value MUST NOT exceed 100 bytes when encoded as UTF-8.<br/>
     * This value MUST NOT contain the Unicode NUL codepoint.
     */
    string symbol = 2;

    /**
     * A decimal precision of the token's smallest denomination.<br/>
     * Most values are described in terms of this smallest denomination,
     * so the token initial supply, for instance, must be divided by
     * <tt>10<sup>decimals</sup></tt> to get whole tokens.
     * <p>
     * This MUST be zero(`0`) for non-fungible/unique tokens.
     */
    uint32 decimals = 3;

    /**
     * An initial supply, in the smallest denomination for the token.
     * <p>
     * This amount SHALL be transferred to the treasury account as part
     * of this transaction.<br/>
     * This amount MUST be specified in the smallest denomination for the
     * token (i.e. <tt>10<sup>-decimals</sup></tt> whole tokens).<br/>
     * This MUST be zero(`0`) for a non-fungible/unique token.
     */
    uint64 initialSupply = 4;

    /**
     * A treasury account identifier.
     * <p>
     * This field is REQUIRED.<br/>
     * The identified account SHALL be designated the "treasury" for the
     * new token, and all tokens "minted" SHALL be delivered to that account,
     * including the initial supply, if any.<br/>
     * The identified account MUST exist, MUST NOT be expired, and SHOULD
     * have a non-zero HBAR balance.<br/>
     * The identified account SHALL be associated to the new token.
     */
    AccountID treasury = 5;

    /**
     * An Hedera key for token administration.
     * <p>
     * This key, if set, SHALL have administrative authority for this token and
     * MAY authorize token update and/or token delete transactions.<br/>
     * If this key is not set, or is an empty `KeyList`, this token SHALL be
     * immutable, except for expiration and renewal.
     */
    Key adminKey = 6;

    /**
     * An Hedera key for managing account KYC.
     * <p>
     * This key, if set, SHALL have KYC authority for this token and
     * MAY authorize transactions to grant or revoke KYC for accounts.<br/>
     * If this key is not set, or is an empty `KeyList`, KYC status for this
     * token SHALL NOT be granted or revoked for any account.<br/>
     * If this key is removed after granting KYC, those grants SHALL remain
     * and cannot be revoked.
     */
    Key kycKey = 7;

    /**
     * An Hedera key for managing asset "freeze".
     * <p>
     * This key, if set, SHALL have "freeze" authority for this token and
     * MAY authorize transactions to freeze or unfreeze accounts
     * with respect to this token.<br/>
     * If this key is not set, or is an empty `KeyList`, this token
     * SHALL NOT be frozen or unfrozen for any account.<br/>
     * If this key is removed after freezing accounts, those accounts
     * SHALL remain frozen and cannot be unfrozen.
     */
    Key freezeKey = 8;

    /**
     * An Hedera key for wiping tokens from accounts.
     * <p>
     * This key, if set, SHALL have "wipe" authority for this token and
     * MAY authorize transactions to "wipe" any amount of this token from
     * any account, effectively burning the tokens "wiped".<br/>
     * If this key is not set, or is an empty `KeyList`, it SHALL NOT be
     * possible to "wipe" this token from an account.
     */
    Key wipeKey = 9;

    /**
     * An Hedera key for "minting" and "burning" tokens.
     * <p>
     * This key, if set, MAY authorize transactions to "mint" new tokens to
     * be delivered to the token treasury or "burn" tokens held by the
     * token treasury.<br/>
     * If this key is not set, or is an empty `KeyList`, it SHALL NOT be
     * possible to change the supply of tokens and neither "mint" nor "burn"
     * transactions SHALL be permitted.
     */
    Key supplyKey = 10;

    /**
     * An initial Freeze status for accounts associated to this token.
     * <p>
     * If this value is set, an account MUST be the subject of a
     * `tokenUnfreeze` transaction after associating to the token before
     * that account can send or receive this token.<br/>
     * If this value is set, the `freezeKey` SHOULD be set.<br/>
     * If the `freezeKey` is not set, any account associated to this token
     * while this value is set SHALL be permanently frozen.
     * <p>
     * <blockquote>REVIEW NOTE<blockquote>
     * Should we prevent setting this value true for tokens with no freeze
     * key?<br/>
     * Should we set this value to false if a freeze key is removed?
     * </blockquote></blockquote>
     */
    bool freezeDefault = 11;

    /**
     * An expiration timestamp.
     * <p>
     * If the `autoRenewAccount` and `autoRenewPeriod` fields are set, this
     * value SHALL be replaced with the current consensus time extended
     * by the `autoRenewPeriod` duration.<br/>
     * If this value is set and token expiration is enabled in network
     * configuration, this token SHALL expire when consensus time exceeds
     * this value, and MAY be subsequently removed from the network state.<br/>
     * If this value is not set, and the automatic renewal account is also not
     * set, then this value SHALL default to the current consensus time
     * extended by the "default" expiration period from network configuration.
     */
    Timestamp expiry = 13;

    /**
     * An identifier for the account to be charged renewal fees at the token's
     * expiry to extend the lifetime of the token.
     * <p>
     * If this value is set, the token lifetime SHALL be extended by the
     * _smallest_ of the following:
     * <ul>
     *   <li>The current `autoRenewPeriod` duration.</li>
     *   <li>The maximum duration that this account has funds to purchase.</li>
     *   <li>The configured MAX_AUTORENEW_PERIOD at the time of automatic
     *       renewal.</li>
     * </ul>
     * If this account's HBAR balance is `0` when the token must be
     * renewed, then the token SHALL be expired, and MAY be subsequently
     * removed from state.<br/>
     * If this value is set, the referenced account MUST sign this
     * transaction.
     */
    AccountID autoRenewAccount = 14;

    /**
     * A duration between token automatic renewals.<br/>
     * All entities in state may be charged "rent" occasionally (typically
     * every 90 days) to prevent unnecessary growth of the ledger. This value
     * sets the interval between such events for this token.
     * <p>
     * This value MUST be set.<br/>
     * This value MUST be greater than the configured
     * MIN_AUTORENEW_PERIOD.<br/>
     * This value MUST be less than the configured MAX_AUTORENEW_PERIOD.
     */
    Duration autoRenewPeriod = 15;

    /**
     * A short description for this token.
     * <p>
     * This value, if set, MUST NOT exceed `transaction.maxMemoUtf8Bytes`
     * (default 100) bytes when encoded as UTF-8.
     */
    string memo = 16;

    /**
     * A type for this token, according to IWA classification.
     * <p>
     * If this value is not set, the token SHALL have the default type of
     * fungible/common.<br/>
     * This field SHALL be immutable.
     */
    TokenType tokenType = 17;

    /**
     * A supply type for this token, according to IWA classification.
     * <p>
     * If this value is not set, the token SHALL have the default supply
     * type of "infinite" (which is, as a practical matter,
     * (2<sup><i>63</i></sup>-1)/10<sup><i>decimals</i></sup>).<br/>
     * This field SHALL be immutable.
     */
    TokenSupplyType supplyType = 18;

    /**
     * A maximum supply for this token.
     * <p>
     * This SHALL be interpreted in terms of the smallest fractional unit for
     * this token.<br/>
     * If `supplyType` is "infinite", this MUST be `0`.<br/>
     * This field SHALL be immutable.
     */
    int64 maxSupply = 19;

    /**
     * An Hedera key for managing the token custom fee schedule.
     * <p>
     * This key, if set, MAY authorize transactions to modify the
     * `custom_fees` for this token.<br/>
     * If this key is not set, or is an empty `KeyList`, the `custom_fees`
     * for this token SHALL NOT be modified.
     */
    Key fee_schedule_key = 20;

    /**
     * A list of custom fees representing a fee schedule.
     * <p>
     * This list MAY be empty, which SHALL mean that there
     * are no custom fees for this token.<br/>
     * If this token is a non-fungible/unique type, the entries
     * in this list MUST NOT declare a `fractional_fee`.<br/>
     * If this token is a fungible/common type, the entries in this
     * list MUST NOT declare a `royalty_fee`.<br/>
     * Any token type MAY include entries that declare a `fixed_fee`.
     */
    repeated CustomFee custom_fees = 21;

    /**
     * An Hedera key for managing token "pause".
     * <p>
     * This key, if set, SHALL have "pause" authority for this token and
     * MAY authorize transactions to pause or unpause this token.<br/>
     * If this key is not set, or is an empty `KeyList`, this token
     * SHALL NOT be paused or unpaused.<br/>
     * If this key is removed while the token is paused, the token cannot
     * be unpaused and SHALL remain paused.
     */
    Key pause_key = 22;

    /**
     * Token "Metadata".
     * <p>
     * The value, if set, MUST NOT exceed 100 bytes.<br/>
     * <dl><dt>Examples</dt>
     *   <dd>hcs://1/0.0.4896575</dd>
     *   <dd>ipfs://bafkreifd7tcjjuwxxf4qkaibkj62pj4mhfuud7plwrc3pfoygt55al6syi</dd>
     * </dl>
     */
    bytes metadata = 23;

    /**
     * An Hedera key for managing the token `metadata`.
     * <p>
     * This key, if set, MAY authorize transactions to modify the
     * `metadata` for this token.<br/>
     * If this key is not set, or is an empty `KeyList`, the `metadata`
     * for this token SHALL NOT be modified.
     */
    Key metadata_key = 24;
}
```

### token_freeze_account.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_freeze_account.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_freeze_account.proto)

```proto
/**
 * # Token Freeze Account
 * Freeze all tokens of an identified type for an identified account.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";

/**
 * Block transfers of a token type for an account.<br/>
 * This, effectively, freezes assets of one account with respect to
 * one token type. While frozen, that account cannot send or receive tokens
 * of the identified type.
 *
 * The token MUST have a `freeze_key` set and that key MUST NOT
 * be an empty `KeyList`.<br/>
 * The token `freeze_key` MUST sign this transaction.<br/>
 * The identified token MUST exist, MUST NOT be deleted, MUST NOT be paused,
 * and MUST NOT be expired.<br/>
 * The identified account MUST exist, MUST NOT be deleted, and
 * MUST NOT be expired.<br/>
 * If the identified account is already frozen with respect to the identified
 * token, the transaction SHALL succeed, but no change SHALL be made.<br/>
 * An association between the identified account and the identified
 * token MUST exist.
 *
 * ### Block Stream Effects
 * None
 */
message TokenFreezeAccountTransactionBody {
    /**
     * A token identifier.
     * <p>
     * This SHALL identify the token type to "freeze".<br/>
     * The identified token MUST exist, MUST NOT be deleted, and MUST be
     * associated to the identified account.
     */
    TokenID token = 1;

    /**
     * An account identifier.
     * <p>
     * This shall identify the account to "freeze".<br/>
     * The identified account MUST exist, MUST NOT be deleted, MUST NOT be
     * expired, and MUST be associated to the identified token.<br/>
     * The identified account SHOULD NOT be "frozen" with respect to the
     * identified token.
     */
    AccountID account = 2;
}
```

### token_unfreeze_account.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_unfreeze_account.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_unfreeze_account.proto)

```proto
/**
 * # Token Unfreeze
 * Release a freeze on tokens of an identified type for an identified account.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";

/**
 * Resume transfers of a token type for an account.<br/>
 * This releases previously frozen assets of one account with respect to
 * one token type. Once unfrozen, that account can once again send or
 * receive tokens of the identified type.
 *
 * The token MUST have a `freeze_key` set and that key MUST NOT
 * be an empty `KeyList`.<br/>
 * The token `freeze_key` MUST sign this transaction.<br/>
 * The identified token MUST exist, MUST NOT be deleted, MUST NOT be paused,
 * and MUST NOT be expired.<br/>
 * The identified account MUST exist, MUST NOT be deleted, and
 * MUST NOT be expired.<br/>
 * If the identified account is not frozen with respect to the identified
 * token, the transaction SHALL succeed, but no change SHALL be made.<br/>
 * An association between the identified account and the identified
 * token MUST exist.
 *
 * ### Block Stream Effects
 * None
 */
message TokenUnfreezeAccountTransactionBody {
    /**
     * A token identifier.
     * <p>
     * This SHALL identify the token type to "unfreeze".<br/>
     * The identified token MUST exist, MUST NOT be deleted, and MUST be
     * associated to the identified account.
     */
    TokenID token = 1;

    /**
     * An account identifier.
     * <p>
     * This shall identify the account to "unfreeze".<br/>
     * The identified account MUST exist, MUST NOT be deleted, MUST NOT be
     * expired, and MUST be associated to the identified token.<br/>
     * The identified account SHOULD be "frozen" with respect to the
     * identified token.
     */
    AccountID account = 2;
}
```

### token_grant_kyc.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_grant_kyc.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_grant_kyc.proto)

```proto
/**
 * # Token Grant KYC
 * Grant "KYC" status to an account with respect to a token.
 *
 * The "KYC' property is named for the "Know Your Customer" requirements in
 * US federal regulations (FINRA 2090 and related US Code) that was subsequently
 * incorporated into laws and regulations for many worldwide jurisdictions.
 * The process requires a regulated financial entity to positively identify
 * customers and certain other entities.
 *
 * This transaction enables a token administrator to track whether KYC
 * requirements are met for a given account transacting in that token.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";

/**
 * Grant "Know Your Customer"(KYC) for one account for a single token.
 *
 * This transaction MUST be signed by the `kyc_key` for the token.<br/>
 * The identified token MUST have a `kyc_key` set to a valid `Key` value.<br/>
 * The token `kyc_key` MUST NOT be an empty `KeyList`.<br/>
 * The identified token MUST exist and MUST NOT be deleted.<br/>
 * The identified account MUST exist and MUST NOT be deleted.<br/>
 * The identified account MUST have an association to the identified token.<br/>
 * On success the association between the identified account and the identified
 * token SHALL be marked as "KYC granted".
 *
 * ### Block Stream Effects
 * None
 */
message TokenGrantKycTransactionBody {
    /**
     * A token identifier.
     * <p>
     * The identified token SHALL grant "KYC" for the account
     * identified by the `account` field.<br/>
     * The identified token MUST be associated to the account identified
     * by the `account` field.
     */
    TokenID token = 1;

    /**
     * An account identifier.
     * <p>
     * The token identified by the `token` field SHALL grant "KYC" for the
     * identified account.<br/>
     * This account MUST be associated to the token identified
     * by the `token` field.
     */
    AccountID account = 2;
}
```

### token_revoke_kyc.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_revoke_kyc.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_revoke_kyc.proto)

```proto
/**
 * # Token Revoke KYC
 * Revoke "KYC" status from an account with respect to a token.
 *
 * The "KYC' property is named for the "Know Your Customer" requirements in
 * US federal regulations (FINRA 2090 and related US Code) that was subsequently
 * incorporated into laws and regulations for many worldwide jurisdictions.
 * The process requires a regulated financial entity to positively identify
 * customers and certain other entities.
 *
 * This transaction enables a token administrator to track whether KYC
 * requirements are met for a given account transacting in that token.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
option java_multiple_files = true;
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package

import "services/basic_types.proto";

/**
 * Revoke "Know Your Customer"(KYC) from one account for a single token.
 *
 * This transaction MUST be signed by the `kyc_key` for the token.<br/>
 * The identified token MUST have a `kyc_key` set to a valid `Key` value.<br/>
 * The token `kyc_key` MUST NOT be an empty `KeyList`.<br/>
 * The identified token MUST exist and MUST NOT be deleted.<br/>
 * The identified account MUST exist and MUST NOT be deleted.<br/>
 * The identified account MUST have an association to the identified token.<br/>
 * On success the association between the identified account and the identified
 * token SHALL NOT be marked as "KYC granted".
 *
 * ### Block Stream Effects
 * None
 */
message TokenRevokeKycTransactionBody {
    /**
     * A token identifier.
     * <p>
     * The identified token SHALL revoke "KYC" for the account
     * identified by the `account` field.<br/>
     * The identified token MUST be associated to the account identified
     * by the `account` field.
     */
    TokenID token = 1;

    /**
     * An account identifier.
     * <p>
     * The token identified by the `token` field SHALL revoke "KYC" for the
     * identified account.<br/>
     * This account MUST be associated to the token identified
     * by the `token` field.
     */
    AccountID account = 2;
}
```

### token_delete.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_delete.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_delete.proto)

```proto
/**
 * # Token Delete
 * Delete an Hedera Token Service (HTS) token.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";

/**
 * Mark a token as deleted.<br/>
 * A deleted token remains present in the network state, but is no longer
 * active, cannot be held in a balance, and all operations on that token
 * fail. A deleted token is removed from network state when it expires.
 *
 * #### Operations on a deleted token
 * All operations on a deleted token SHALL fail with a
 * status code `TOKEN_WAS_DELETED`.<br/>
 * Any attempt to transfer a deleted token between accounts SHALL fail with
 * a status code `TOKEN_WAS_DELETED`.
 *
 * > QUESTIONS
 * >> What happens to existing balances/NFTs?
 * >> Are these removed; are they stuck on the accounts?
 * >
 * >> If balances/NFTs remain, can a `tokenReject` remove them?
 *
 * #### Requirements
 * The `admin_key` for the token MUST be set, and MUST
 * sign this transaction.<br/>
 * If the `admin_key` for the token is not set, this transaction SHALL
 * fail with a status code `TOKEN_IS_IMMUTABlE`.
 *
 * ### Block Stream Effects
 * None
 */
message TokenDeleteTransactionBody {
    /**
     * A token identifier.
     * <p>
     * This SHALL identify the token type to delete.<br/>
     * The identified token MUST exist, and MUST NOT be deleted.
     */
    TokenID token = 1;
}
```

### token_update.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_update.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_update.proto)

```proto
/**
 * # Token Update
 * Modify the characteristics of an existing token. Most changes require that
 * the transaction be signed by an `admin_key`, and if that key is not valid
 * the only change permitted is to extend the token expiration.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";
import "services/duration.proto";
import "services/timestamp.proto";
import "google/protobuf/wrappers.proto";

/**
 * Update an existing token.
 *
 * This transaction SHALL NOT update any field that is not set.<br/>
 * Most changes MUST be signed by the current `admin_key` of the token. If the
 * token does not currently have a valid `admin_key`, then this transaction
 * MUST NOT set any value other than `expiry` or a non-admin key.<br/>
 * If the `treasury` is set to a new account, the new account MUST sign this
 * transaction.<br/>
 * If the `treasury` is set to a new account for a _non-fungible/unique_ token,
 * The current treasury MAY hold some tokens.
 *
 * #### Requirements for Keys
 * Any of the key values may be changed, even without an admin key, but the
 * key to be changed MUST have an existing valid key assigned, and both the
 * current key and the new key MUST sign the transaction.<br/>
 * A key value MAY be set to an empty `KeyList`. In this case the existing
 * key MUST sign this transaction, but the new value is not a valid key, and the
 * update SHALL effectively remove the existing key.
 *
 * ### Block Stream Effects
 * None
 */
message TokenUpdateTransactionBody {
    /**
     * A token identifier.
     * <p>
     * This SHALL identify the token type to delete.<br/>
     * The identified token MUST exist, and MUST NOT be deleted.<br/>
     * If any field other than `expiry` is set, the identified token MUST
     * have a valid `admin_key`.
     */
    TokenID token = 1;

    /**
     * A new symbol to use for the token.
     * <p>
     * This value, if set, MUST NOT exceed 100 bytes when encoded as UTF-8.<br/>
     * This value, if set, MUST NOT contain the Unicode NUL codepoint.
     */
    string symbol = 2;

    /**
     * A new name for the token.<br/>
     * This is generally the "full name" displayed in wallet software.
     * <p>
     * This value, if set, MUST NOT exceed 100 bytes when encoded as UTF-8.<br/>
     * This value, if set, MUST NOT contain the Unicode NUL codepoint.
     */
    string name = 3;

    /**
     * A new treasury account identifier.
     * <p>
     * If set,
     * - The identified account SHALL be designated the "treasury" for the
     *   token, and all tokens "minted" SHALL be delivered to that account
     *   following this transaction.<br/>
     * - The identified account MUST exist, MUST NOT be expired, MUST NOT be
     *   deleted, and SHOULD have a non-zero HBAR balance.<br/>
     * - The identified account SHALL be associated to this token.
     * - The full balance of this token held by the prior treasury account
     *   SHALL be transferred to the new treasury account, if the token type
     *   is fungible/common.
     * - If the token type is non-fungible/unique, the previous treasury
     *   account MUST NOT hold any tokens of this type.
     * - The new treasury account key MUST sign this transaction.
     */
    AccountID treasury = 4;

    /**
     * An Hedera key for token administration.
     * <p>
     * This key, if set, SHALL have administrative authority for this token and
     * MAY authorize token update and/or token delete transactions.<br/>
     * If this key is set to an empty `KeyList`, this token SHALL be
     * immutable thereafter, except for expiration and renewal.<br/>
     * If set, this key MUST be a valid key or an empty `KeyList`.<br/>
     * If set to a valid key, the previous key and new key MUST both
     * sign this transaction.
     */
    Key adminKey = 5;

    /**
     * An Hedera key for managing account KYC.
     * <p>
     * This key, if set, SHALL have KYC authority for this token and
     * MAY authorize transactions to grant or revoke KYC for accounts.<br/>
     * If this key is not set, or is an empty `KeyList`, KYC status for this
     * token SHALL NOT be granted or revoked for any account.<br/>
     * If this key is removed after granting KYC, those grants SHALL remain
     * and cannot be revoked.<br/>
     * If set, this key MUST be a valid key or an empty `KeyList`.<br/>
     * If set to a valid key, the previous key and new key MUST both
     * sign this transaction.
     */
    Key kycKey = 6;

    /**
     * An Hedera key for managing asset "freeze".
     * <p>
     * This key, if set, SHALL have "freeze" authority for this token and
     * MAY authorize transactions to freeze or unfreeze accounts
     * with respect to this token.<br/>
     * If this key is set to an empty `KeyList`, this token
     * SHALL NOT be frozen or unfrozen for any account.<br/>
     * If this key is removed after freezing accounts, those accounts
     * SHALL remain frozen and cannot be unfrozen.<br/>
     * If set, this key MUST be a valid key or an empty `KeyList`.<br/>
     * If set to a valid key, the previous key and new key MUST both
     * sign this transaction.
     */
    Key freezeKey = 7;

    /**
     * An Hedera key for wiping tokens from accounts.
     * <p>
     * This key, if set, SHALL have "wipe" authority for this token and
     * MAY authorize transactions to "wipe" any amount of this token from
     * any account, effectively burning the tokens "wiped".<br/>
     * If this key is set to an empty `KeyList`, it SHALL NOT be
     * possible to "wipe" this token from an account.<br/>
     * If set, this key MUST be a valid key or an empty `KeyList`.<br/>
     * If set to a valid key, the previous key and new key MUST both
     * sign this transaction.
     */
    Key wipeKey = 8;

    /**
     * An Hedera key for "minting" and "burning" tokens.
     * <p>
     * This key, if set, MAY authorize transactions to "mint" new tokens to
     * be delivered to the token treasury or "burn" tokens held by the
     * token treasury.<br/>
     * If this key is set to an empty `KeyList`, it SHALL NOT be
     * possible to change the supply of tokens and neither "mint" nor "burn"
     * transactions SHALL be permitted.<br/>
     * If set, this key MUST be a valid key or an empty `KeyList`.<br/>
     * If set to a valid key, the previous key and new key MUST both
     * sign this transaction.
     */
    Key supplyKey = 9;

    /**
     * An identifier for the account to be charged renewal fees at the token's
     * expiry to extend the lifetime of the token.
     * <p>
     * If this value is set for the identified token, the token lifetime SHALL
     * be extended by the _smallest_ of the following at expiration:
     * <ul>
     *   <li>The current `autoRenewPeriod` duration.</li>
     *   <li>The maximum duration that this account has funds to purchase.</li>
     *   <li>The configured MAX_AUTORENEW_PERIOD at the time of automatic
     *       renewal.</li>
     * </ul>
     * If this account's HBAR balance is `0` when the token must be
     * renewed, then the token SHALL be expired, and MAY be subsequently
     * removed from state.<br/>
     * If this value is set, the referenced account MUST sign this
     * transaction.
     * <p>
     * <blockquote>Note<blockquote>
     * It is not currently possible to remove an automatic renewal account.
     * Once set, it can only be replaced by a valid account.
     * </blockquote></blockquote>
     */
    AccountID autoRenewAccount = 10;

    /**
     * A duration between token automatic renewals.<br/>
     * All entities in state may be charged "rent" occasionally (typically
     * every 90 days) to prevent unnecessary growth of the ledger. This value
     * sets the interval between such events for this token.
     * <p>
     * If set, this value MUST be greater than the configured
     * `MIN_AUTORENEW_PERIOD`.<br/>
     * If set, this value MUST be less than the configured
     * `MAX_AUTORENEW_PERIOD`.
     */
    Duration autoRenewPeriod = 11;

    /**
     * An expiration timestamp.
     * <p>
     * If this value is set, the automatic renewal account is not set for the
     * identified token, and token expiration is enabled in network
     * configuration, this token SHALL expire when the consensus time exceeds
     * this value, and MAY be subsequently removed from the network state.<br/>
     * If `autoRenewAccount` is set or the `auto_renew_account_id` is set for
     * the identified token, the token SHALL be subject to automatic renewal
     * when the consensus time exceeds this value.
     */
    Timestamp expiry = 12;

    /**
     * A short description for this token.
     * <p>
     * This value, if set, MUST NOT exceed `transaction.maxMemoUtf8Bytes`
     * (default 100) bytes when encoded as UTF-8.
     */
    google.protobuf.StringValue memo = 13;

    /**
     * An Hedera key for managing the token custom fee schedule.
     * <p>
     * This key, if set, MAY authorize transactions to modify the
     * `custom_fees` for this token.<br/>
     * If this key is set to an empty `KeyList`, the `custom_fees`
     * for this token SHALL NOT be modified.<br/>
     * If set, this key MUST be a valid key or an empty `KeyList`.<br/>
     * If set to a valid key, the previous key and new key MUST both
     * sign this transaction.
     */
    Key fee_schedule_key = 14;

    /**
     * An Hedera key for managing token "pause".
     * <p>
     * This key, if set, SHALL have "pause" authority for this token and
     * MAY authorize transactions to pause or unpause this token.<br/>
     * If this key is set to an empty `KeyList`, this token
     * SHALL NOT be paused or unpaused.<br/>
     * If this key is removed while the token is paused, the token cannot
     * be unpaused and SHALL remain paused.<br/>
     * If set, this key MUST be a valid key or an empty `KeyList`.<br/>
     * If set to a valid key, the previous key and new key MUST both
     * sign this transaction.
     */
    Key pause_key = 15;

    /**
     * Token "Metadata".
     * <p>
     * The value, if set, MUST NOT exceed 100 bytes.<br/>
     * <dl><dt>Examples</dt>
     *   <dd>hcs://1/0.0.4896575</dd>
     *   <dd>ipfs://bafkreifd7tcjjuwxxf4qkaibkj62pj4mhfuud7plwrc3pfoygt55al6syi</dd>
     * </dl>
     */
    google.protobuf.BytesValue metadata = 16;

    /**
     * An Hedera key for managing the token `metadata`.
     * <p>
     * This key, if set, MAY authorize transactions to modify the
     * `metadata` for this token.<br/>
     * If this key is set to an empty `KeyList`, the `metadata`
     * for this token SHALL NOT be modified.<br/>
     * If set, this key MUST be a valid key or an empty `KeyList`.<br/>
     * If set to a valid key, the previous key and new key MUST both
     * sign this transaction.
     */
    Key metadata_key = 17;

    /**
     * Set a key validation mode.<br/>
     * Any key may be updated by a transaction signed by the token `admin_key`.
     * Each role key may _also_ sign a transaction to update that key.
     * If a role key signs an update to change that role key both old
     * and new key must sign the transaction, _unless_ this field is set
     * to `NO_VALIDATION`, in which case the _new_ key is not required to
     * sign the transaction (the existing key is still required).<br/>
     * The primary intent for this field is to allow a role key (e.g. a
     * `pause_key`) holder to "remove" that key from the token by signing
     * a transaction to set that role key to an empty `KeyList`.
     * <p>
     * If set to `FULL_VALIDATION`, either the `admin_key` or _both_ current
     * and new key MUST sign this transaction to update a "key" field for the
     * identified token.<br/>
     * If set to `NO_VALIDATION`, either the `admin_key` or the current
     * key MUST sign this transaction to update a "key" field for the
     * identified token.<br/>
     * This field SHALL be treated as `FULL_VALIDATION` if not set.
     */
    TokenKeyValidation key_verification_mode = 18;
}
```

### token_mint.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_mint.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_mint.proto)

```proto
/**
 * # Token Mint
 * Mint new tokens and deliver them to the token treasury. This is akin
 * to how a fiat treasury will mint new coinage for circulation.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";

/**
 * Mint tokens and deliver the new tokens to the token treasury account.
 *
 * The token MUST have a `supply_key` set and that key MUST NOT
 * be an empty `KeyList`.<br/>
 * The token `supply_key` MUST sign this transaction.<br/>
 * This operation SHALL increase the total supply for the token type by
 * the number of tokens "minted".<br/>
 * The total supply for the token type MUST NOT be increased above the
 * maximum supply limit (2^63-1) by this transaction.<br/>
 * The tokens minted SHALL be credited to the token treasury account.<br/>
 * If the token is a fungible/common type, the amount MUST be specified.<br/>
 * If the token is a non-fungible/unique type, the metadata bytes for each
 * unique token MUST be specified in the `metadata` list.<br/>
 * Each unique metadata MUST not exceed the global metadata size limit defined
 * by the network configuration value `tokens.maxMetadataBytes`.<br/>
 * The global batch size limit (`tokens.nfts.maxBatchSizeMint`) SHALL set
 * the maximum number of individual NFT metadata permitted in a single
 * `tokenMint` transaction.
 *
 * ### Block Stream Effects
 * None
 */
message TokenMintTransactionBody {
    /**
     * A token identifier.
     * <p>
     * This SHALL identify the token type to "mint".<br/>
     * The identified token MUST exist, and MUST NOT be deleted.
     */
    TokenID token = 1;

    /**
     * An amount to mint to the Treasury Account.
     * <p>
     * This is interpreted as an amount in the smallest possible denomination
     * for the token (10<sup>-decimals</sup> whole tokens).<br/>
     * The balance for the token treasury account SHALL receive the newly
     * minted tokens.<br/>
     * If this value is equal to zero (`0`), the token SHOULD be a
     * non-fungible/unique type.<br/>
     * If this value is non-zero, the token MUST be a fungible/common type.
     */
    uint64 amount = 2;

    /**
     * A list of metadata bytes.<br/>
     * <p>
     * One non-fungible/unique token SHALL be minted for each entry
     * in this list.<br/>
     * Each entry in this list MUST NOT be larger than the limit set by the
     * current network configuration value `tokens.maxMetadataBytes`.<br/>
     * This list MUST NOT contain more entries than the current limit set by
     * the network configuration value `tokens.nfts.maxBatchSizeMint`.<br/>
     * If this list is not empty, the token MUST be a
     * non-fungible/unique type.<br/>
     * If this list is empty, the token MUST be a fungible/common type.
     */
    repeated bytes metadata = 3;
}
```

### token_burn.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_burn.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_burn.proto)

```proto
/**
 * # Token Burn
 * Permanently remove tokens from circulation, akin to how a fiat treasury
 * will physically burn worn out bank notes.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";

/**
 * Burns tokens from the Token's treasury Account.
 *
 * The token MUST have a `supply_key` set and that key MUST NOT
 * be an empty `KeyList`.<br/>
 * The token `supply_key` MUST sign this transaction.<br/>
 * This operation SHALL decrease the total supply for the token type by
 * the number of tokens "burned".<br/>
 * The total supply for the token type MUST NOT be reduced below zero (`0`)
 * by this transaction.<br/>
 * The tokens to burn SHALL be deducted from the token treasury account.<br/>
 * If the token is a fungible/common type, the amount MUST be specified.<br/>
 * If the token is a non-fungible/unique type, the specific serial numbers
 * MUST be specified.<br/>
 * The global batch size limit (`tokens.nfts.maxBatchSizeBurn`) SHALL set
 * the maximum number of individual NFT serial numbers permitted in a single
 * `tokenBurn` transaction.
 *
 * ### Block Stream Effects
 * None
 */
message TokenBurnTransactionBody {
    /**
     * A token identifier.
     * <p>
     * This SHALL identify the token type to "burn".<br/>
     * The identified token MUST exist, and MUST NOT be deleted.
     */
    TokenID token = 1;

    /**
     * An amount to burn from the Treasury Account.
     * <p>
     * This is interpreted as an amount in the smallest possible denomination
     * for the token (10<sup>-decimals</sup> whole tokens).<br/>
     * The balance for the token treasury account MUST contain sufficient
     * tokens to complete this transaction with a non-negative balance.<br/>
     * If this value is equal to zero (`0`), the token SHOULD be a
     * non-fungible/unique type.<br/>
     * If this value is non-zero, the token MUST be a fungible/common type.
     */
    uint64 amount = 2;

    /**
     * A list of serial numbers to burn from the Treasury Account.
     * <p>
     * This list MUST NOT contain more entries than the current limit set by
     * the network configuration value `tokens.nfts.maxBatchSizeBurn`.<br/>
     * The treasury account for the token MUST hold each unique token
     * identified in this list.<br/>
     * If this list is not empty, the token MUST be a
     * non-fungible/unique type.<br/>
     * If this list is empty, the token MUST be a fungible/common type.
     */
    repeated int64 serialNumbers = 3;
}
```

### token_wipe_account.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_wipe_account.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_wipe_account.proto)

```proto
/**
 * # Token Wipe Account
 * Administratively burn tokens owned by a single, non-treasury, account.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";

/**
 * Wipe (administratively burn) tokens held by a non-treasury account.<br/>
 * On success, the requested tokens will be removed from the identified account
 * and the token supply will be reduced by the amount "wiped".
 *
 * This transaction MUST be signed by the token `wipe_key`.<br/>
 * The identified token MUST exist, MUST NOT be deleted,
 * and MUST NOT be paused.<br/>
 * The identified token MUST have a valid `Key` set for the `wipe_key` field,
 * and that key MUST NOT be an empty `KeyList`.<br/>
 * The identified account MUST exist, MUST NOT be deleted, MUST be
 * associated to the identified token, MUST NOT be frozen for the identified
 * token, MUST NOT be the token `treasury`, and MUST hold a balance for the
 * token or the specific serial numbers provided.<br/>
 * This transaction SHOULD provide a value for `amount` or `serialNumbers`,
 * but MUST NOT set both fields.
 *
 * ### Block Stream Effects
 * The new total supply for the wiped token type SHALL be recorded.
 */
message TokenWipeAccountTransactionBody {
    /**
     * A token identifier.
     * <p>
     * This field is REQUIRED.<br/>
     * The identified token MUST exist, MUST NOT be paused, MUST NOT be
     * deleted, and MUST NOT be expired.
     */
    TokenID token = 1;

    /**
     * An account identifier.<br/>
     * This identifies the account from which tokens will be wiped.
     * <p>
     * This field is REQUIRED.<br/>
     * The identified account MUST NOT be deleted or expired.<br/>
     * If the identified token `kyc_key` is set to a valid key, the
     * identified account MUST have "KYC" granted.<br/>
     * The identified account MUST NOT be the `treasury` account for the
     * identified token.
     */
    AccountID account = 2;

    /**
     * An amount of fungible/common tokens to wipe.
     * <p>
     * If the identified token is a non-fungible/unique token type,
     * this value MUST be exactly zero(`0`).<br/>
     * If the identified token type is fungible/common:
     * <ul>
     *   <li>This value SHALL be specified in units of the smallest
     *       denomination possible for the identified token
     *       (<tt>10<sup>-decimals</sup></tt> whole tokens).</li>
     *   <li>This value MUST be strictly less than `Long.MAX_VALUE`.</li>
     *   <li>This value MUST be less than or equal to the current total
     *       supply for the identified token.</li>
     *   <li>This value MUST be less than or equal to the current balance
     *       held by the identified account.</li>
     *   <li>This value MAY be zero(`0`).</li>
     * </ul>
     */
    uint64 amount = 3;

    /**
     * A list of serial numbers to wipe.<br/>
     * The non-fungible/unique tokens with these serial numbers will be
     * destroyed and cannot be recovered or reused.
     * <p>
     * If the identified token type is a fungible/common type, this
     * list MUST be empty.<br/>
     * If the identified token type is non-fungible/unique:
     * <ul>
     *   <li>This list MUST contain at least one entry if the identified token
     *       type is non-fungible/unique.>/li>
     *   <li>This list MUST NOT contain more entries than the current total
     *       supply for the identified token.</li>
     *   <li>Every entry in this list MUST be a valid serial number for the
     *       identified token (i.e. "collection").</li>
     *   <li>Every entry in this list MUST be owned by the
     *       identified account</li>
     *   <li></li>
     * </ul>
     * This list MUST NOT contain more entries than the network configuration
     * value for batch size limit, typically ten(`10`).
     */
    repeated int64 serialNumbers = 4;
}
```

### token_associate.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_associate.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_associate.proto)

```proto
/**
 * # Token Associate
 * Transaction to associate an Hedera Token Service (HTS) token with an
 * account.<br/>
 * Accounts cannot transact in a token (send or receive) until the account
 * and token are associated.
 *
 * > Note
 * >> An "airdrop" transaction MAY initiate sending tokens to an
 * >> unassociated account, but the transfer remains in a "pending"
 * >> state until the recipient executes a "claim" transaction
 * >> that both accepts the tokens and associates that account
 * >> with the token type.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";

/**
 * Associate an Hedera Token Service (HTS) token and an account.
 *
 * An association MUST exist between an account and a token before that
 * account may transfer or receive that token.<br/>
 * If the identified account is not found,
 * the transaction SHALL return `INVALID_ACCOUNT_ID`.<br/>
 * If the identified account has been deleted,
 * the transaction SHALL return `ACCOUNT_DELETED`.<br/>
 * If any of the identified tokens is not found,
 * the transaction SHALL return `INVALID_TOKEN_REF`.<br/>
 * If any of the identified tokens has been deleted,
 * the transaction SHALL return `TOKEN_WAS_DELETED`.<br/>
 * If an association already exists for any of the identified tokens,
 * the transaction SHALL return `TOKEN_ALREADY_ASSOCIATED_TO_ACCOUNT`.<br/>
 * The identified account MUST sign this transaction.
 *
 * ### Block Stream Effects
 * None
 */
message TokenAssociateTransactionBody {
    /**
     * An account identifier.
     * <p>
     * The identified account SHALL be associated to each of the
     * tokens identified in the `tokens` field.<br/>
     * This field is REQUIRED and MUST be a valid account identifier.<br/>
     * The identified account MUST exist in state.<br/>
     * The identified account MUST NOT be deleted.<br/>
     * The identified account MUST NOT be expired.
     */
    AccountID account = 1;

    /**
     * A list of token identifiers.
     * <p>
     * Each token identified in this list SHALL be separately associated with
     * the account identified in the `account` field.<br/>
     * This list MUST NOT be empty.
     * Each entry in this list MUST be a valid token identifier.<br/>
     * Each entry in this list MUST NOT be currently associated to the
     * account identified in `account`.<br/>
     * Each entry in this list MUST NOT be expired.<br/>
     * Each entry in this list MUST NOT be deleted.
     */
    repeated TokenID tokens = 2;
}
```

### token_dissociate.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_dissociate.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_dissociate.proto)

```proto
/**
 * # Token Dissociate
 * Remove association between an account and one or more Hedera Token
 * Service (HTS) tokens.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";

/**
 * Dissociate an account from one or more HTS tokens.
 *
 * If the identified account is not found,
 * the transaction SHALL return `INVALID_ACCOUNT_ID`.<br/>
 * If the identified account has been deleted,
 * the transaction SHALL return `ACCOUNT_DELETED`.<br/>
 * If any of the identified tokens is not found,
 * the transaction SHALL return `INVALID_TOKEN_REF`.<br/>
 * If any of the identified tokens has been deleted,
 * the transaction SHALL return `TOKEN_WAS_DELETED`.<br/>
 * If an association does not exist for any of the identified tokens,
 * the transaction SHALL return `TOKEN_NOT_ASSOCIATED_TO_ACCOUNT`.<br/>
 * If the identified account has a nonzero balance for any of the identified
 * tokens, and that token is neither deleted nor expired, the
 * transaction SHALL return `TRANSACTION_REQUIRES_ZERO_TOKEN_BALANCES`.<br/>
 * If one of the identified tokens is a fungible/common token that is expired,
 * the account MAY disassociate from that token, even if that token balance is
 * not zero for that account.<br/>
 * If one of the identified tokens is a non-fungible/unique token that is
 * expired, the account MUST NOT disassociate if that account holds any
 * individual NFT of that token. In this situation the transaction SHALL
 * return `TRANSACTION_REQUIRED_ZERO_TOKEN_BALANCES`.<br/>
 * The identified account MUST sign this transaction.
 *
 * ### Block Stream Effects
 * None
 */
message TokenDissociateTransactionBody {
    /**
     * An account identifier.
     * <p>
     * The identified account SHALL be dissociated from each of the
     * tokens identified in the `tokens` field.
     * This field is REQUIRED and MUST be a valid account identifier.<br/>
     * The identified account MUST exist in state.<br/>
     * The identified account MUST NOT be deleted.<br/>
     * The identified account MUST NOT be expired.
     */
    AccountID account = 1;

    /**
     * A list of token identifiers.
     * <p>
     * Each token identified in this list SHALL be dissociated from
     * the account identified in the `account` field.<br/>
     * This list MUST NOT be empty.
     * Each entry in this list MUST be a valid token identifier.<br/>
     * Each entry in this list MUST be currently associated to the
     * account identified in `account`.<br/>
     * Entries in this list MAY be expired, if the token type is
     * fungible/common.<br/>
     * Each entry in this list MUST NOT be deleted.
     */
    repeated TokenID tokens = 2;
}
```

### token_fee_schedule_update.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_fee_schedule_update.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_fee_schedule_update.proto)

```proto
/**
 * # Fee Schedule Update
 * Transaction to update the fee schedule for a token. A token creator may
 * wish to charge custom transaction fees for a token type, and if a
 * `fee_schedule_key` is assigned, this transaction enables adding, removing,
 * or updating those custom transaction fees.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";
import "services/custom_fees.proto";

/**
 * Update the custom fee schedule for a token type.
 *
 * The token MUST have a `fee_schedule_key` set and that key MUST NOT
 * be an empty `KeyList`.<br/>
 * The token `fee_schedule_key` MUST sign this transaction.<br/>
 * The token MUST exist, MUST NOT be deleted, and MUST NOT be expired.<br/>
 *
 * If the custom_fees list is empty, clears the fee schedule or resolves to
 * CUSTOM_SCHEDULE_ALREADY_HAS_NO_FEES if the fee schedule was already empty.
 *
 * ### Block Stream Effects
 * None
 */
message TokenFeeScheduleUpdateTransactionBody {
    /**
     * A token identifier.
     * <p>
     * This SHALL identify the token type to modify with an updated
     * custom fee schedule.<br/>
     * The identified token MUST exist, and MUST NOT be deleted.
     */
    TokenID token_id = 1;

    /**
     * A list of custom fees representing a fee schedule.
     * <p>
     * This list MAY be empty to remove custom fees from a token.<br/>
     * If the identified token is a non-fungible/unique type, the entries
     * in this list MUST NOT declare a `fractional_fee`.<br/>
     * If the identified token is a fungible/common type, the entries in this
     * list MUST NOT declare a `royalty_fee`.<br/>
     * Any token type MAY include entries that declare a `fixed_fee`.
     */
    repeated CustomFee custom_fees = 2;
}
```

### token_pause.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_pause.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_pause.proto)

```proto
/**
 * # Token Pause
 * A transaction to "pause" all activity for a token. While a token is paused
 * it cannot be transferred between accounts by any transaction other than
 * `rejectToken`.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";

/**
 * Pause transaction activity for a token.
 *
 * This transaction MUST be signed by the Token `pause_key`.<br/>
 * The `token` identified MUST exist, and MUST NOT be deleted.<br/>
 * The `token` identified MAY be paused; if the token is already paused,
 * this transaction SHALL have no effect.
 * The `token` identified MUST have a `pause_key` set, the `pause_key` MUST be
 * a valid `Key`, and the `pause_key` MUST NOT be an empty `KeyList`.<br/>
 * A `paused` token SHALL NOT be transferred or otherwise modified except to
 * "up-pause" the token with `unpauseToken` or in a `rejectToken` transaction.
 *
 * ### Block Stream Effects
 * None
 */
message TokenPauseTransactionBody {
  /**
   * A token identifier.
   * <p>
   * The identified token SHALL be paused. Subsequent transactions
   * involving that token SHALL fail until the token is "unpaused".
   */
  TokenID token = 1;
}
```

### token_unpause.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_unpause.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_unpause.proto)

```proto
/**
 * # Token Un-Pause
 * A transaction to "unpause" (i.e. resume) all activity for a token. While
 * a token is "paused" it cannot be transferred between accounts by any
 * transaction other than `rejectToken`. Once "unpaused", transactions involving
 * that token may resume.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";

/**
 * Resume transaction activity for a token.
 *
 * This transaction MUST be signed by the Token `pause_key`.<br/>
 * The `token` identified MUST exist, and MUST NOT be deleted.<br/>
 * The `token` identified MAY not be paused; if the token is not paused,
 * this transaction SHALL have no effect.
 * The `token` identified MUST have a `pause_key` set, the `pause_key` MUST be
 * a valid `Key`, and the `pause_key` MUST NOT be an empty `KeyList`.<br/>
 * An `unpaused` token MAY be transferred or otherwise modified.
 *
 * ### Block Stream Effects
 * None
 */
message TokenUnpauseTransactionBody {
  /**
   * A token identifier.
   * <p>
   * The identified token SHALL be "unpaused". Subsequent transactions
   * involving that token MAY succeed.
   */
  TokenID token = 1;
}
```

### token_update_nfts.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_update_nfts.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_update_nfts.proto)

```proto
/**
 * # Token Update NFTs
 * Given a token identifier and a metadata block, change the metadata for
 * one or more non-fungible/unique token instances.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";
import "google/protobuf/wrappers.proto";

/**
 * Modify the metadata field for an individual non-fungible/unique token (NFT).
 *
 * Updating the metadata of an NFT SHALL NOT affect ownership or
 * the ability to transfer that NFT.<br/>
 * This transaction SHALL affect only the specific serial numbered tokens
 * identified.
 * This transaction SHALL modify individual token metadata.<br/>
 * This transaction MUST be signed by the token `metadata_key`.<br/>
 * The token `metadata_key` MUST be a valid `Key`.<br/>
 * The token `metadata_key` MUST NOT be an empty `KeyList`.
 *
 * ### Block Stream Effects
 * None
 */
message TokenUpdateNftsTransactionBody {
    /**
     * A token identifier.<br/>
     * This is the token type (i.e. collection) for which to update NFTs.
     * <p>
     * This field is REQUIRED.<br/>
     * The identified token MUST exist, MUST NOT be paused, MUST have the type
     * non-fungible/unique, and MUST have a valid `metadata_key`.
     */
    TokenID token = 1;

    /**
     * A list of serial numbers to be updated.
     * <p>
     * This field is REQUIRED.<br/>
     * This list MUST have at least one(1) entry.<br/>
     * This list MUST NOT have more than ten(10) entries.
     */
    repeated int64 serial_numbers = 2;

    /**
     * A new value for the metadata.
     * <p>
     * If this field is not set, the metadata SHALL NOT change.<br/>
     * This value, if set, MUST NOT exceed 100 bytes.
     */
    google.protobuf.BytesValue metadata = 3;
}
```

### token_airdrop.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_airdrop.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_airdrop.proto)

```proto
/**
 * # Token Airdrop
 * Messages used to implement a transaction to "airdrop" tokens.<br/>
 * An "airdrop" is a distribution of tokens from a funding account
 * to one or more recipient accounts, ideally with no action required
 * by the recipient account(s).
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";

/**
 * Airdrop one or more tokens to one or more accounts.
 *
 * ### Effects
 * This distributes tokens from the balance of one or more sending account(s)
 * to the balance of one or more recipient accounts. Accounts MAY receive the
 * tokens in one of four ways.
 *
 *  - An account already associated to the token to be distributed SHALL
 *    receive the airdropped tokens immediately to the recipient account
 *    balance.<br/>
 *    The fee for this transfer SHALL include the transfer, the airdrop fee,
 *    and any custom fees.
 *  - An account with available automatic association slots SHALL be
 *    automatically associated to the token, and SHALL immediately receive
 *    the airdropped tokens to the recipient account balance.<br/>
 *    The fee for this transfer SHALL include the transfer, the association,
 *    the cost to renew that association once, the airdrop fee, and
 *    any custom fees.
 *  - An account with "receiver signature required" set SHALL have a
 *    "Pending Airdrop" created and must claim that airdrop with a
 *    `claimAirdrop` transaction.<br/>
 *    The fee for this transfer SHALL include the transfer, the association,
 *    the cost to renew that association once, the airdrop fee, and
 *    any custom fees.<br/>
 *    If the pending airdrop is not claimed immediately, the `sender` SHALL
 *    pay the cost to renew the token association, and the cost to maintain
 *    the pending airdrop, until the pending airdrop is claimed or cancelled.
 *  - An account with no available automatic association slots SHALL have a
 *    "Pending Airdrop" created and must claim that airdrop with a
 *    `claimAirdrop` transaction.<br/>
 *    The fee for this transfer SHALL include the transfer, the association,
 *    the cost to renew that association once, the airdrop fee, and any custom
 *    fees.<br/>
 *    If the pending airdrop is not claimed immediately, the `sender` SHALL
 *    pay the cost to renew the token association, and the cost to maintain
 *    the pending airdrop, until the pending airdrop is claimed or cancelled.
 *
 * If an airdrop would create a pending airdrop for a fungible/common token,
 * and a pending airdrop for the same sender, receiver, and token already
 * exists, the existing pending airdrop SHALL be updated to add the new
 * amount to the existing airdrop, rather than creating
 * a new pending airdrop.<br/>
 * Any airdrop that completes immediately SHALL be irreversible. Any airdrop
 * that results in a "Pending Airdrop" MAY be canceled via a `cancelAirdrop`
 * transaction.<br/>
 * All transfer fees (including custom fees and royalties), as well as the
 * rent cost for the first auto-renewal period for any automatic-association
 * slot occupied by the airdropped tokens, SHALL be charged to the account
 * paying for this transaction.<br/>
 *
 * ### Block Stream Effects
 * - Each successful transfer SHALL be recorded in `token_transfer_list`
 *   for the transaction record.
 * - Each successful transfer that consumes an automatic association slot
 *   SHALL populate the `automatic_association` field for the record.
 * - Each pending transfer _created_ SHALL be added to the
 *   `pending_airdrops` field for the record.
 * - Each pending transfer _updated_ SHALL be added to the
 *   `pending_airdrops` field for the record.
 */
message TokenAirdropTransactionBody {
    /**
     * A list of token transfers representing one or more airdrops.
     * <p>
     * The sender for each transfer MUST have sufficient balance to complete
     * the transfers.<br/>
     * All token transfers MUST successfully transfer tokens or create a
     * pending airdrop for this transaction to succeed.<br/>
     * This list MUST contain between 1 and 10 transfers, inclusive.
     * <p>
     * Note that each transfer of fungible/common tokens requires both a debit
     * and a credit, so each _fungible_ token transfer MUST have _balanced_
     * entries in the TokenTransferList for that transfer.
     */
    repeated TokenTransferList token_transfers = 1;
}
```

### token_cancel_airdrop.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_cancel_airdrop.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_cancel_airdrop.proto)

```proto
/**
 * # Token Cancel Airdrop
 * Messages used to implement a transaction to cancel a pending airdrop.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";

/**
 * Token cancel airdrop<br/>
 * Remove one or more pending airdrops from state on behalf of the
 * sender(s) for each airdrop.
 *
 * Each pending airdrop canceled SHALL be removed from state and
 * SHALL NOT be available to claim.<br/>
 * Each cancellation SHALL be represented in the transaction body and
 * SHALL NOT be restated in the record file.<br/>
 * All cancellations MUST succeed for this transaction to succeed.
 *
 * ### Block Stream Effects
 * None
 */
message TokenCancelAirdropTransactionBody {
    /**
     * A list of one or more pending airdrop identifiers.<br/>
     * This list declares the set of pending airdrop entries that the client
     * wishes to cancel; on success all listed pending airdrop entries
     * will be removed.
     * <p>
     * This transaction MUST be signed by the account identified by a
     * `sender_id` for each entry in this list.<br/>
     * This list MUST NOT have any duplicate entries.<br/>
     * This list MUST contain between 1 and 10 entries, inclusive.
     */
    repeated PendingAirdropId pending_airdrops = 1;
}
```

### token_claim_airdrop.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_claim_airdrop.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_claim_airdrop.proto)

```proto
/**
 * # Token Claim Airdrop
 * Messages used to implement a transaction to claim a pending airdrop.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";

/**
 * Token claim airdrop<br/>
 * Complete one or more pending transfers on behalf of the
 * recipient(s) for an airdrop.
 *
 * The sender MUST have sufficient balance to fulfill the airdrop at the
 * time of claim. If the sender does not have sufficient balance, the
 * claim SHALL fail.<br/>
 * Each pending airdrop successfully claimed SHALL be removed from state and
 * SHALL NOT be available to claim again.<br/>
 * Each claim SHALL be represented in the transaction body and
 * SHALL NOT be restated in the record file.<br/>
 * All claims MUST succeed for this transaction to succeed.
 *
 * ### Block Stream Effects
 * The completed transfers SHALL be present in the transfer list.
 */
message TokenClaimAirdropTransactionBody {
    /**
     * A list of one or more pending airdrop identifiers.
     * <p>
     * This transaction MUST be signed by the account identified by
     * the `receiver_id` for each entry in this list.<br/>
     * This list MUST contain between 1 and 10 entries, inclusive.<br/>
     * This list MUST NOT have any duplicate entries.
     */
    repeated PendingAirdropId pending_airdrops = 1;
}
```

### token_reject.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_reject.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_reject.proto)

```proto
/**
 * # Token Reject
 * Messages used to implement a transaction to reject a token type from an
 * account.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";

/**
 * Reject undesired token(s).<br/>
 * Transfer one or more token balances held by the requesting account to the
 * treasury for each token type.
 *
 * Each transfer SHALL be one of the following
 * - A single non-fungible/unique token.
 * - The full balance held for a fungible/common token.
 * A single `tokenReject` transaction SHALL support a maximum
 * of 10 transfers.<br/>
 * A token that is `pause`d MUST NOT be rejected.<br/>
 * If the `owner` account is `frozen` with respect to the identified token(s)
 * the token(s) MUST NOT be rejected.<br/>
 * The `payer` for this transaction, and `owner` if set, SHALL NOT be charged
 * any custom fees or other fees beyond the `tokenReject` transaction fee.
 *
 * ### Block Stream Effects
 * - Each successful transfer from `payer` to `treasury` SHALL be recorded in
 *   the `token_transfer_list` for the transaction record.
 */
message TokenRejectTransactionBody {
    /**
     * An account identifier.<br/>
     * This OPTIONAL field identifies the account holding the
     * tokens to be rejected.
     * <p>
     * If set, this account MUST sign this transaction.
     * If not set, the `payer` for this transaction SHALL be the effective
     * `owner` for this transaction.
     */
    AccountID owner = 1;

    /**
     * A list of one or more token rejections.
     * <p>
     * On success each rejected token serial number or balance SHALL be
     * transferred from the requesting account to the treasury account for
     * that token type.<br/>
     * After rejection the requesting account SHALL continue to be associated
     * with the token.<br/>
     * If dissociation is desired then a separate `TokenDissociate` transaction
     * MUST be submitted to remove the association.<br/>
     * This list MUST contain at least one (1) entry and MUST NOT contain more
     * than ten (10) entries.
     */
    repeated TokenReference rejections = 2;
}

/**
 * A union token identifier.
 *
 * Identify a fungible/common token type, or a single
 * non-fungible/unique token serial.
 */
message TokenReference {
    oneof token_identifier {
        /**
         * A fungible/common token type.
         */
        TokenID fungible_token = 1;

        /**
         * A single specific serialized non-fungible/unique token.
         */
        NftID nft = 2;
    }
}
```

### token_get_info.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_get_info.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_get_info.proto)

```proto
/**
 * # Get Token Info
 * Query to retrieve information for a single token.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";
import "services/custom_fees.proto";
import "services/query_header.proto";
import "services/response_header.proto";
import "services/timestamp.proto";
import "services/duration.proto";

/**
 * Request information for a token.
 */
message TokenGetInfoQuery {
    /**
     * Standard information sent with every query operation.<br/>
     * This includes the signed payment and what kind of response is requested
     * (cost, state proof, both, or neither).
     */
    QueryHeader header = 1;

    /**
     * A token identifier.
     * <p>
     * This SHALL identify the token to query.<br/>
     * The identified token MUST exist, and MUST NOT be deleted.
     */
    TokenID token = 2;
}

/**
 * An Hedera Token Service(HTS) token.
 *
 * A token SHALL represent a fungible or non-fungible unit of exchange.<br/>
 * The specified Treasury Account SHALL receive the initial supply of tokens and
 * SHALL determine distribution of all tokens once minted.
 */
message TokenInfo {
    /**
     * A unique identifier for this token.
     */
    TokenID tokenId = 1;

    /**
     * A human-readable name for this token.
     * <p>
     * This value MAY NOT be unique.<br/>
     * This value SHALL NOT exceed 100 bytes when encoded as UTF-8.
     */
    string name = 2;

    /**
     * A human-readable symbol for the token.
     * <p>
     * This value SHALL NOT be unique.<br/>
     * This value SHALL NOT exceed 100 bytes when encoded as UTF-8.
     */
    string symbol = 3;

    /**
     * A number of decimal places for this token.
     * <p>
     * If decimals are 8 or 11, then the number of whole tokens can be at most
     * billions or millions, respectively. More decimals allows for a more
     * finely-divided token, but also limits the maximum total supply.
     * <p>
     * Examples
     * <ul>
     *   <li>Bitcoin satoshis (21 million whole tokens with 8 decimals).</li>
     *   <li>Hedera tinybar (50 billion whole tokens with 8 decimals).</li>
     *   <li>Bitcoin milli-satoshis (21 million whole tokens with 11
     *       decimals).</li>
     *   <li>Theoretical limit is roughly 92.2 billion with 8 decimals, or
     *       92.2 million with 11 decimals.</li>
     * </ul>
     * All token amounts in the network are stored as integer amounts, with
     * each unit representing 10<sup>-decimals</sup> whole tokens.
     * <p>
     * For tokens with `token_type` set to `NON_FUNGIBLE_UNIQUE` this MUST be 0.
     */
    uint32 decimals = 4;

    /**
     * A _current_ total supply of this token, expressed in the smallest unit
     * of the token.
     * <p>
     * The number of _whole_ tokens this represents is (total_supply /
     * 10<sup>decimals</sup>). The value of total supply, MUST be within the
     * positive range of a twos-compliment signed 64-bit integer.
     * The `total_supply`, therefore MUST be between 1, and
     * 9,223,372,036,854,775,807, inclusive.
     * <p>
     * This value SHALL be reduced when a `token_burn` or `token_wipe_account`
     * operation is executed, and SHALL be increased when a `token_mint`
     * operation is executed.
     */
    uint64 totalSupply = 5;

    /**
     * A treasury account identifier for this token.
     * <p>
     * When the token is created, the initial supply given in the token create
     * transaction SHALL be minted and deposited in the treasury account.<br/>
     * All token mint transactions for this token SHALL deposit the new minted
     * tokens in the treasury account.<br/>
     * All token burn transactions for this token SHALL remove the tokens to be
     * burned from the treasury account.
     */
    AccountID treasury = 6;

    /**
     * Access control for general modification of this token.
     * <p>
     * This key MUST sign any `token_update` transaction that
     * changes any attribute of the token other than expiration_time.
     * Other attributes of this token MAY be changed by transactions other than
     * `token_update`, and MUST be signed by one of the other purpose-specific
     * keys assigned to the token.<br/>
     * This value can be set during token creation, and SHALL NOT be
     * modified thereafter, unless the update transaction is signed by both
     * the existing `admin_key` and the new `admin_key`.<br/>
     * If the `admin_key` is not set for a token, that token SHALL be immutable.
     */
    Key adminKey = 7;

    /**
     * Access control for KYC for this token.
     * <p>
     * Know Your Customer (KYC) status may be granted for an account by a token
     * grant kyc transaction signed by this key.<br/>
     * If this key is not set, then KYC status cannot be granted to an account
     * for this token, and any `TokenGrantKyc` transaction attempting to grant
     * kyc to an account for this token SHALL NOT succeed.<br/>
     * This key MAY be set when the token is created, and MAY be set or modified
     * via a token update transaction signed by the `admin_key`.<br/>
     * If `admin_key` is not set, this value, whether set or unset,
     * SHALL be immutable.
     */
    Key kycKey = 8;

    /**
     * Access control to freeze this token.
     * <p>
     * A token may be frozen for an account, preventing any transaction from
     * transferring that token for that specified account, by a token freeze
     * account transaction signed by this key.<br/>
     * If this key is not set, the token cannot be frozen, and any transaction
     * attempting to freeze the token for an account SHALL NOT succeed.<br/>
     * This key MAY be set when the token is created, and MAY be set or modified
     * via a token update transaction signed by the `admin_key`.<br/>
     * If `admin_key` is not set, this value, whether set or unset,
     * SHALL be immutable.
     */
    Key freezeKey = 9;

    /**
     * Access control of account wipe for this token.
     * <p>
     * A token may be wiped, removing and burning tokens from a specific
     * account, by a token wipe transaction, which MUST be signed by this key.
     * The `treasury_account` cannot be subjected to a token wipe. A token burn
     * transaction, signed by the `supply_key`, serves to burn tokens held by
     * the `treasury_account` instead.<br/>
     * If this key is not set, the token cannot be wiped, and any transaction
     * attempting to wipe the token from an account SHALL NOT succeed.<br/>
     * This key MAY be set when the token is created, and MAY be set or modified
     * via a token update transaction signed by the `admin_key`.<br/>
     * If `admin_key` is not set, this value, whether set or unset,
     * SHALL be immutable.
     */
    Key wipeKey = 10;

    /**
     * Access control of token mint/burn for this token.
     * <p>
     * A token mint transaction MUST be signed by this key, and any token mint
     * transaction not signed by the current `supply_key` for that token
     * SHALL NOT succeed.<br/>
     * A token burn transaction MUST be signed by this key, and any token burn
     * transaction not signed by the current `supply_key` for that token
     * SHALL NOT succeed.<br/>
     * This key MAY be set when the token is created, and MAY be set or modified
     * via a token update transaction signed by the `admin_key`.<br/>
     * If `admin_key` is not set, this value, whether set or unset,
     * SHALL be immutable.
     */
    Key supplyKey = 11;

    /**
     * A flag indicating if accounts associated to this token are frozen by
     * default, not frozen, or freeze is not applicable.
     * <p>
     * Accounts frozen by default and newly associated with this token CANNOT
     * transact in the token until unfrozen.<br/>
     * This SHALL NOT prevent a `tokenReject` transaction to return the tokens
     * from an account to the treasury account.
     */
    TokenFreezeStatus defaultFreezeStatus = 12;

    /**
     * A flag indicating if accounts associated with this token are granted
     * KYC by default, revoked by default, or KYC is not applicable.
     */
    TokenKycStatus defaultKycStatus = 13;

    /**
     * A flag indicating that this token is deleted.
     * <p>
     * A transaction involving a deleted token MUST NOT succeed.
     */
    bool deleted = 14;

    /**
     * An identifier for the account (if any) that the network will attempt
     * to charge for this token's auto-renewal upon expiration.
     * <p>
     * This field is OPTIONAL. If it is not set then renewal fees SHALL be
     * charged to the account identified by `treasury`.
     */
    AccountID autoRenewAccount = 15;

    /**
     * A duration by which the network should automatically extend
     * this token's expiration.
     * <p>
     * If the token has a valid auto-renew account, and is not deleted upon
     * expiration, the network SHALL attempt to automatically renew this
     * token.<br/>
     * The default values for the minimum period and maximum period are 30 days
     * and 90 days, respectively.
     */
    Duration autoRenewPeriod = 16;

    /**
     * An expiration time for this token, in seconds since the epoch.
     * <p>
     * For this purpose, `epoch` SHALL be the
     * UNIX epoch with 0 at `1970-01-01T00:00:00.000Z`.
     */
    Timestamp expiry = 17;

    /**
     * A short description of this token.
     * <p>
     * This value, if set, MUST NOT exceed `transaction.maxMemoUtf8Bytes`
     * (default 100) bytes when encoded as UTF-8.
     */
    string memo = 18;

    /**
     * A type for this token.
     * <p>
     * A token SHALL be either `FUNGIBLE_COMMON` or `NON_FUNGIBLE_UNIQUE`.<br/>
     * If this value was omitted during token creation, `FUNGIBLE_COMMON`
     * SHALL be used.<br/>
     * The value `FUNGIBLE_COMMON` SHALL represent a fungible/common token.
     * The value `NON_FUNGIBLE_UNIQUE` SHALL represent a
     * non-fungible/unique token.
     */
    TokenType tokenType = 19;

    /**
     * A supply type for this token.
     * <p>
     * A token SHALL have either `INFINITE` or `FINITE` supply type.<br/>
     * If this value was omitted during token creation, the value `INFINITE`
     * SHALL be used.
     */
    TokenSupplyType supplyType = 20;

    /**
     * A maximum supply of this token.<br/>
     * This is the maximum number of tokens of this type that may be issued.
     * <p>
     * This limit SHALL apply regardless of `token_type`.<br/>
     * If `supply_type` is `INFINITE` then this value MUST be 0.<br/>
     * If `supply_type` is `FINITE`, then this value MUST be greater than 0.
     */
    int64 maxSupply = 21;

    /**
     * Access control of the `custom_fees` field for this token.
     * <p>
     * The token custom fee schedule may be changed, modifying the fees charged
     * for transferring that token, by a token update transaction, which MUST
     * be signed by this key.<br/>
     * If this key is not set, the token custom fee schedule cannot be changed,
     * and any transaction attempting to change the custom fee schedule for
     * this token SHALL NOT succeed.<br/>
     * This key MAY be set when the token is created, and MAY be set or modified
     * via a token update transaction signed by the `admin_key`.<br/>
     * If `admin_key` is not set, this value, whether set or unset,
     * SHALL be immutable.
     */
    Key fee_schedule_key = 22;

    /**
     * A custom fee schedule for this token.
     */
    repeated CustomFee custom_fees = 23;

    /**
     * Access control of pause/unpause for this token.
     * <p>
     * A token may be paused, preventing any transaction from transferring that
     * token, by a token update transaction signed by this key.<br/>
     * If this key is not set, the token cannot be paused, and any transaction
     * attempting to pause the token SHALL NOT succeed.<br/>
     * This key MAY be set when the token is created, and MAY be set or modified
     * via a token update transaction signed by the `admin_key`.<br/>
     * If `admin_key` is not set, this value, whether set or unset,
     * SHALL be immutable.
     */
    Key pause_key = 24;

    /**
     * A flag indicating that this token is paused.<br/>
     * A token may be paused, unpaused, or pause not applicable.
     * <p>
     * A transaction involving a paused token, other than token_unpause,
     * MUST NOT succeed.
     */
    TokenPauseStatus pause_status = 25;

    /**
     * The ledger ID of the network that generated this response.
     * <p>
     * This value SHALL identify the distributed ledger that responded to
     * this query.
     */
    bytes ledger_id = 26;

    /**
     * A Token "Metadata".
     * <p>
     * This value, if set, SHALL NOT exceed 100 bytes.
     */
    bytes metadata = 27;

    /**
     * Access Control of metadata update for this token.
     * <p>
     * A transaction to update the `metadata` field of this token MUST be
     * signed by this key.<br/>
     * If this token is a non-fungible/unique token type, a transaction to
     * update the `metadata` field of any individual serialized unique token
     * of this type MUST be signed by this key.<br/>
     * If this key is not set, the token metadata SHALL NOT be changed after it
     * is created.<br/>
     * If this key is not set, the metadata for any individual serialized token
     * of this type SHALL NOT be changed after it is created.<br/>
     * This key MAY be set when the token is created, and MAY be set or modified
     * via a token update transaction signed by the `admin_key`.<br/>
     * If `admin_key` is not set, this value, whether set or unset,
     * SHALL be immutable.
     */
    Key metadata_key = 28;
}

/**
 * A response message for the `getTokenInfo` query.
 */
message TokenGetInfoResponse {
    /**
     * The standard response information for queries.<br/>
     * This includes the values requested in the `QueryHeader`
     * (cost, state proof, both, or neither).
     */
    ResponseHeader header = 1;

    /**
     * The information requested for the identified token.
     */
    TokenInfo tokenInfo = 2;
}
```

### token_get_nft_info.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_get_nft_info.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_get_nft_info.proto)

```proto
/**
 * # Get NFT Info Query
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";
import "services/query_header.proto";
import "services/response_header.proto";
import "services/timestamp.proto";

/**
 * Applicable only to tokens of type NON_FUNGIBLE_UNIQUE. Gets info on a NFT for a given TokenID (of
 * type NON_FUNGIBLE_UNIQUE) and serial number
 */
message TokenGetNftInfoQuery {
    /**
     * Standard information sent with every query operation.<br/>
     * This includes the signed payment and what kind of response is requested
     * (cost, state proof, both, or neither).
     */
    QueryHeader header = 1;

    /**
     * A non-fungible/unique token (NFT) identifier.
     * <p>
     * This SHALL identify the NFT to query.<br/>
     * The identified NFT MUST exist, and MUST NOT be deleted.
     */
    NftID nftID = 2;
}

/**
 * Information for one non-fungible/unique token (NFT).
 *
 */
message TokenNftInfo {
    /**
     * A non-fungible/unique token (NFT) identifier.
     * <p>
     * This SHALL match the NFT requested.<br/>
     */
    NftID nftID = 1;

    /**
     * The current owner of the NFT
     */
    AccountID accountID = 2;

    /**
     * The effective consensus timestamp at which the NFT was minted
     */
    Timestamp creationTime = 3;

    /**
     * Represents the unique metadata of the NFT
     */
    bytes metadata = 4;

    /**
     * The ledger ID of the network that generated this response.
     * <p>
     * This value SHALL identify the distributed ledger that responded to
     * this query.
     */
    bytes ledger_id = 5;

    /**
     * If an allowance is granted for the NFT, its corresponding spender account
     */
    AccountID spender_id = 6;
}

/**
 * UNDOCUMENTED
 */
message TokenGetNftInfoResponse {
    /**
     * The standard response information for queries.<br/>
     * This includes the values requested in the `QueryHeader`
     * (cost, state proof, both, or neither).
     */
    ResponseHeader header = 1;

    /**
     * The information about this NFT
     */
    TokenNftInfo nft = 2;
}
```

### token_get_nft_infos.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_get_nft_infos.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_get_nft_infos.proto)

```proto
/**
 * # Token Get NFT Infos
 * Deprecated and permanently disabled
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";
import "services/token_get_nft_info.proto";
import "services/query_header.proto";
import "services/response_header.proto";

/**
 * Deleted and unsupported.
 *
 * This query is not implemented and any query of this type submitted
 * SHALL return a `NOT_SUPPORTED` response code.
 */
message TokenGetNftInfosQuery {
    /**
     * Standard information sent with every query operation.<br/>
     * This includes the signed payment and what kind of response is requested
     * (cost, state proof, both, or neither).
     */
    QueryHeader header = 1;

    /**
     * A token identifier.
     * <p>
     * This SHALL identify the token to query.<br/>
     * The identified token MUST exist, MUST NOT be deleted, and MUST be
     * a non-fungible/unique type.
     */
    TokenID tokenID = 2;

    /**
     * Specifies the start index (inclusive) of the range of NFTs to query for.
     * Value must be in the range [0; mintedNFTs-1]
     */
    int64 start = 3;

    /**
     * Specifies the end index (exclusive) of the range of NFTs to query for.
     * Value must be in the range (start; mintedNFTs]
     */
    int64 end = 4;
}

/**
 * Deleted and unsupported.
 */
message TokenGetNftInfosResponse {
    /**
     * The standard response information for queries.<br/>
     * This includes the values requested in the `QueryHeader`
     * (cost, state proof, both, or neither).
     */
    ResponseHeader header = 1;

    /**
     * A token identifier.
     * <p>
     * This SHALL identify the token type to query.<br/>
     * The identified token MUST exist, and MUST NOT be deleted.
     * The identified token MUST be a non-fungible/unique type.
     */
    TokenID tokenID = 2;

    /**
     * A list of messages, each of which describes one NFT.
     */
    repeated TokenNftInfo nfts = 3;
}
```

### token_get_account_nft_infos.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/token_get_account_nft_infos.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_get_account_nft_infos.proto)

```proto
/**
 * # Get Account NFT Infos
 * Deprecated and permanently disabled
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.token">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";
import "services/token_get_nft_info.proto";
import "services/query_header.proto";
import "services/response_header.proto";

/**
 * Deleted and unsupported.
 *
 * This query is not implemented and any query of this type submitted
 * SHALL return a `NOT_SUPPORTED` response code.
 */
message TokenGetAccountNftInfosQuery {
    /**
     * Standard information sent with every query operation.<br/>
     * This includes the signed payment and what kind of response is requested
     * (cost, state proof, both, or neither).
     */
    QueryHeader header = 1;

    /**
     * The Account for which information is requested
     */
    AccountID accountID = 2;

    /**
     * Specifies the start index (inclusive) of the range of NFTs to query for.
     * Value must be in the range [0; ownedNFTs-1]
     */
    int64 start = 3;

    /**
     * Specifies the end index (exclusive) of the range of NFTs to query for.
     * Value must be in the range (start; ownedNFTs]
     */
    int64 end = 4;
}

/**
 * Deleted and unsupported.
 */
message TokenGetAccountNftInfosResponse {
    /**
     * The standard response information for queries.<br/>
     * This includes the values requested in the `QueryHeader`
     * (cost, state proof, both, or neither).
     */
    ResponseHeader header = 1;

    /**
     * List of NFTs associated to the account
     */
    repeated TokenNftInfo nfts = 2;
}
```

### basic_types.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/basic_types.proto](../../node_modules/@hashgraph/proto/src/proto/services/basic_types.proto)

```proto
/**
 * # Basic Types
 * Fundamental message types used across transactions and state as field types.
 *
 * ### Requirements for identifier values
 * - Most entities in the network SHALL be identified by a multi-part
 *   identifier. These identifier values SHALL consist of a shard, a realm, and
 *   an entity identifier.
 * - Shard, Realm, and Entity Number MUST all be whole numbers.
 * - A Shard SHALL be globally unique.
 * - A Realm MAY be reused between shards, but SHALL be unique within a shard.
 * - An Entity Number MAY be reused between shards and realms, but SHALL be
 *   unique within each combination of shard and realm.
 * - Every object (e.g. account, file, token, etc...) SHALL be scoped to exactly
 *   one realm and shard. Thus a File has a FileID, a numeric triplet, such as
 *   0.0.2 for shard 0, realm 0, entity 2.
 * - Identifier values SHOULD use an Entity Number as the third component of the
 *   identifier. Some, however, MAY use alternative or composite values for the
 *   Entity portion of the three part identifier. Any such alternative or
 *   composite value MUST be unique within that shard and realm combination.
 * - The entity portion of the identifier, regardless of type, MUST be unique
 *   within that realm and shard combination and MAY be globally unique.
 * - The triplet of shard.realm.entity MUST be globally unique, even across
 *   different identifier types.
 * - Each realm SHALL maintain a single counter for entity numbers, so if there
 *   is an identifier with value 0.1.2, then there MUST NOT be an identifier
 *   with value 0.1.2 for any other object.
 *
 * ### Keywords
 * The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
 * "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
 * document are to be interpreted as described in
 * [RFC2119](https://www.ietf.org/rfc/rfc2119) and clarified in
 * [RFC8174](https://www.ietf.org/rfc/rfc8174).
 */
syntax = "proto3";

package proto;

// SPDX-License-Identifier: Apache-2.0
import "services/timestamp.proto";
import "google/protobuf/wrappers.proto";

option java_package = "com.hederahashgraph.api.proto.java";
// <<<pbj.java_package = "com.hedera.hapi.node.base">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

/**
 * A shard identifier.<br/>
 * A shard is a partition of nodes running the network that processes
 * transactions separately from other shards. Each shard is effectively an
 * independent instance of the overall network that shares the same virtual
 * distributed ledger, and may gossip cross-shard transactions with other
 * shards to maintain overall correct processing of the ledger.
 */
message ShardID {
    /**
     * A whole number shard identifier.
     */
    int64 shardNum = 1;
}

/**
 * A realm identifier.<br/>
 * Within a given shard, every realm has a unique numeric identifier.
 * Each account, file, and contract instance belongs to exactly one realm.
 */
message RealmID {
    /**
     * A whole number shard identifier.
     */
    int64 shardNum = 1;

    /**
     * A whole number realm identifier.
     */
    int64 realmNum = 2;
}

/**
 * Unique identifier for a token.<br/>
 * As with all entity identifiers within the network, a token identifier
 * consists of a combination of shard number, realm number, and entity number.
 * Each of these numbers is unique within its scope (shard > realm > entity).
 */
message TokenID {
    /**
     * A whole number shard identifier.
     */
    int64 shardNum = 1;

    /**
     * A whole number realm identifier.
     */
    int64 realmNum = 2;

    /**
     * A whole number token identifier.
     */
    int64 tokenNum = 3;
}

/**
 * A specific hash algorithm.
 *
 * We did not reuse Record Stream `HashAlgorithm` here because in all cases,
 * currently, this will be `SHA2_384` and if that is the default value then
 * we can save space by not serializing it, whereas `HASH_ALGORITHM_UNKNOWN`
 * is the default for Record Stream `HashAlgorithm`.
 *
 * Note that enum values here MUST NOT match the name of any other enum value
 * in the same `package`, as protobuf follows `C++` scope rules and all enum
 * _names_ are treated as global constants within the `package`.
 */
enum BlockHashAlgorithm {
    /**
     * A SHA2 algorithm SHA-384 hash.
     * <p>
     * This is the default value, if a field of this enumerated type is
     * not set, then this is the value that will be decoded when the
     * serialized message is read.
     */
    SHA2_384 = 0;
}

/**
 * A unique identifier for an Hedera account.
 *
 * An account identifier is of the form `shard.realm.[number|alias]`.<br/>
 * The identifier MAY use the alias form when transferring HBAR to a public key
 * before the account for that key is created, when only the alias value is
 * known, or in some smart contracts that use the EVM address style alias to
 * refer to Accounts.<br/>
 * When the account entry is completed, the alias SHALL be stored separately in
 * the Account record, and the identifier in the Account SHALL use the
 * `accountNum` form.
 *
 * ---
 * ### Additional Notes
 *
 * #### Alias
 * There is considerable complexity with `alias` (aka `evm_address`) for
 * Accounts. Much of this comes from the existence of a "hidden" alias for
 * almost all accounts, and the reuse of the alias field for both EVM reference
 * and "automatic" account creation.<br/>
 * For the purposes of this specification, we will use the following terms for
 * clarity.
 *   - `key_alias`<br/>
 *      The account public key as a protobuf serialized message and used for
 *      auto-creation and subsequent lookup. This is only valid if the account
 *      key is a single `primitive` key, either Ed25519 or ECDSA_SECP256K1.
 *   - `evm_address`<br/>
 *     Exists for every account and is one of
 *      - `contract_address`<br/>
 *        The 20 byte EVM address prescribed by `CREATE` or `CREATE2`
 *      - `evm_key_address`<br/>
 *        An arbitrary 20 byte EVM address that, for a usable externally owned
 *        account (EOA) SHALL be the rightmost 20 bytes of the Keccak-256 hash
 *        of a ECDSA_SECP256K1 key.<br/>
 *        Such accounts may be created in one of three ways:
 *        - Sending hbar or fungible tokens to an unused
 *          ECDSA_SECP256K1 key alias.
 *        - Sending hbar or fungible tokens to an unassigned 20-byte
 *          EVM address.
 *        - Submitting a `CryptoCreate` signed with the corresponding
 *          private key.
 *      - `long_zero`<br/>
 *        A synthetic 20 byte address inferred for "normally" created accounts.
 *        It is constructed from the "standard" AccountID as follows.
 *         1. 4 byte big-endian shard number
 *         1. 8 byte big-endian realm number
 *         1. 8 byte big-endian entity number<br/>
 *
 * The `alias` field in the `Account` message SHALL contain one of four values
 * for any given account.
 *   - The `key_alias`, if the account was created by transferring HBAR to the
 *     `key_alias` public key value.
 *   - The `evm_key_address` if the account was created from an EVM public key
 *   - The `contract_address` if the account belongs to an EVM contract
 *   - Not-Set/null/Bytes.EMPTY (collectively `null`) if the account was
 *     created normally
 *
 * If the `alias` field of an `Account` is any form of `null`, then the account
 * MAY be referred to by `alias` in an `AccountID` by using the `long_zero`
 * address for the account.<br/>
 * This "hidden default" alias SHALL NOT be stored, but is synthesized by the
 * node software as needed, and may be synthesized by an EVM contract or client
 * software as well.
 *
 * ---
 *
 * #### Alias forms
 * An `AccountID` in a transaction MAY reference an `Account` with
 * `shard.realm.alias`.<br/>
 * If the account `alias` field is set for an Account, that value SHALL be the
 * account alias.<br/>
 * If the account `alias` field is not set for an Account, the `long_zero` alias
 * SHALL be the account alias.
 */
message AccountID {
    /**
     * A whole number shard identifier.
     */
    int64 shardNum = 1;

    /**
     * A whole number realm identifier.
     */
    int64 realmNum = 2;

    oneof account {
        /**
         * A whole number account number, unique within its realm and shard.
         * <p>
         * For any AccountID fields in the query response, transaction records,
         * transaction receipts, or block stream `accountNum` MUST be used.
         */
        int64 accountNum = 3;

        /**
         * An alias value.<br/>
         * Alias is a value used in some contexts to refer to an account when
         * account number is not available, and may be an alias public key, or
         * an EVM address.
         */
        bytes alias = 4;
    }
}

/**
 * An identifier for a unique token (or "NFT"), used by both contract
 * and token services.
 */
message NftID {
    /**
     * A token identifier.<br/>
     * This token represents the collection containing this NFT.
     */
    TokenID token_ID = 1;

    /**
     * A unique serial number.<br/>
     * This serial number is unique within its token type.
     */
    int64 serial_number = 2;
}

/**
 * An identifier for a File within the network.
 */
message FileID {
    /**
     * A whole number shard identifier.
     */
    int64 shardNum = 1;

    /**
     * A whole number realm identifier.
     */
    int64 realmNum = 2;

    /**
     * A whole number file identifier, unique within its realm and shard.
     */
    int64 fileNum = 3;
}

/**
 * An identifier for a smart contract within the network.
 */
message ContractID {
    /**
     * A whole number shard identifier.
     */
    int64 shardNum = 1;

    /**
     * A whole number realm identifier.
     */
    int64 realmNum = 2;

    oneof contract {
        /**
        * A whole number contract identifier, unique within its realm and shard.
        */
        int64 contractNum = 3;

        /**
        * A 20-byte EVM address of the contract to call.
        * <p>
        * A contract created via a HAPI `ContractCreate` call SHALL have
        * an EVM address determined by its `shard.realm.num` identifier.<br/>
        * This address is as follows
        * <ol>
        *     <li>4 byte big-endian shard number</li>
        *     <li>8 byte big-endian realm number</li>
        *     <li>8 byte big-endian contract number</li>
        * </ol>
        * This address is not stored in state, but is computed when needed.
        * <p>
        * Contracts created by any other means, including a HAPI
        * `EthereumTransaction` whose `to` address is the zero address,
        * SHALL have the EVM address prescribed by the `CREATE` or
        * `CREATE2` opcode, as applicable.
        */
        bytes evm_address = 4;
    }
}

/**
 * An unique identifier for a topic.<br/>
 * Topics are part of the consensus service, messages are published to a topic.
 */
message TopicID {
    /**
     * A whole number shard identifier.
     */
    int64 shardNum = 1;

    /**
     * A whole number realm identifier.
     */
    int64 realmNum = 2;

    /**
     * A whole number topic identifier, unique within its realm and shard.
     */
    int64 topicNum = 3;
}

/**
 * An unique identifier for a Schedule
 */
message ScheduleID {
    /**
     * A whole number shard
     */
    int64 shardNum = 1;

    /**
     * A whole number realm
     */
    int64 realmNum = 2;

    /**
     * A whole number schedule, unique within its realm and shard
     */
    int64 scheduleNum = 3;
}

/**
 * A transaction identifier.<br/>
 * This is used for retrieving receipts and records for a transaction
 * and internally by the network for detecting when duplicate transactions are
 * submitted.
 *
 * A transaction may be processed more reliably by submitting it to
 * several nodes, each with a different node account, but all with the same
 * TransactionID. Then, the transaction will take effect when the first of all
 * those nodes submits the transaction and it reaches consensus. The other
 * transactions SHALL NOT be executed (and SHALL result in a
 * `DUPLICATE_TRANSACTION` response).<br/>
 * Multiple submission increase reliability on the assumption that an error in,
 * for example, network connectivity will not affect all nodes equally. Latency
 * might be slightly lower, if one node is handling intake significantly slower
 * than others, for example. The base transaction fee is required for each
 * submission, however, so the total fees charged are significantly higher when
 * using this approach.
 *
 * ### Requirements
 * Each transaction identifier MUST be unique.<br/>
 * Multiple transactions MAY be submitted with the same transaction
 * identifier, but all except the first SHALL be rejected as duplicate
 * transactions.<br/>
 * An identifier MUST specify a `payer` account to be charged all fees
 * associated with the transaction.<br/>
 * The `payer` account MUST exist and MUST have sufficient HBAR to pay all
 * transaction fees.<br/>
 * An identifier MUST specify a "valid start time".<br/>
 * The "valid start time" MUST be strictly _earlier_ than the current
 * network consensus time when submitted.<br/>
 * The "valid start time" MUST NOT be more than `transaction.maxValidDuration`
 * seconds before the current network consensus time when submitted.<br/>
 * A client-submitted transaction MUST NOT set the `scheduled` flag.
 *
 * ### Additional Notes
 *
 * Additional items applicable to Scheduled Transactions:
 *
 *  - The ID of a Scheduled Transaction, once executed, SHALL inherit both
 *    `transactionValidStart` and `accountID` from the `ScheduleCreate`
 *    transaction that created the schedule.
 *  - The `scheduled` property SHALL be set for Scheduled Transactions.
 */
message TransactionID {
    /**
     * A timestamp for the transaction start time.<br/>
     * This is the earliest expected start time for this transaction.
     * <p>
     * This value MUST be strictly less than `consensusTimestamp` when the
     * transaction is submitted.
     */
    Timestamp transactionValidStart = 1;

    /**
     * An Account identifier.
     * <p>
     * The identified account SHALL pay transaction fees for this transaction.
     */
    AccountID accountID = 2;

    /**
     * A scheduled transaction flag.<br/>
     * If set, this transaction represents the execution of a Schedule after
     * all necessary signatures are gathered.
     * <p>
     * This flag MUST NOT be set in a user-submitted transaction.
     */
    bool scheduled = 3;

    /**
     * An identifier for an internal transaction.<br/>
     * An internal transaction is one that was spawned as part of handling a
     * user transaction. These internal transactions share the
     * transactionValidStart and accountID of the user transaction, so a nonce
     * is necessary to give them a unique TransactionID.
     * <p>
     * An example is when a "parent" ContractCreate or ContractCall transaction
     * calls one or more HTS precompiled contracts; each of the "child"
     * transactions spawned for a precompile has a transaction id with a
     * different nonce.
     * <p>
     * This value MUST be unset for user-submitted transactions.
     */
    int32 nonce = 4;
}

/**
 * An account, and the amount that it sends or receives during a token transfer.
 *
 * This message is only relevant to fungible/common token transfers.
 * Non-fungible/unique (NFT) token transfers MUST use the NftTransfer message.
 */
message AccountAmount {
    /**
     * An account identifier that will send or receive token(s).
     */
    AccountID accountID = 1;

    /**
     * An amount to send (negative) or receive (positive).
     * <p>
     * This amount MUST be denominated in the smallest unit of the relevant
     * token.<br/>
     * For HBAR this SHALL be tinybar (10<sup>-8</sup> HBAR).<br/>
     * For other fungible/common tokens this SHALL depend on the value of
     * `decimals` for that token.
     */
    sint64 amount = 2;

    /**
     * An approved allowance flag.<br/>
     * If true then the transfer is expected to be an approved allowance.
     * <p>
     * If set, `accountID` SHALL be the owner that previously approved
     * the allowance.<br/>
     * The default value SHALL be false (unset).
     */
    bool is_approval = 3;
}

/**
 * A list of accounts and amounts to transfer.
 *
 * Each `AccountAmount` SHALL specify the account and the amount to
 * send(negative) or receive(positive).<br/>
 * Each `TransferList` SHALL be contained in another message that contains
 * other details required to complete a transfer. This is typically a
 * `CryptoTransferTransactionBody` or `TransactionRecord`.<br/>
 * The `TransferList` SHALL only be used for HBAR transfers. Other token types
 * MUST use the `TokenTransferList` message.
 */
message TransferList {
    /**
     * A list of AccountAmount pairs.<br/>
     * Each entry in this list is an account and an amount to transfer
     * into it (positive) or out of it (negative)
     */
    repeated AccountAmount accountAmounts = 1;
}

/**
 * A NFT transfer.<br/>
 * This refers to a sender account, a receiver account, and the serial number
 * of an NFT to transfer from sender to receiver.
 *
 * Each `NftTransfer` SHALL be contained in another message (typically
 * `TokenTransferList`) that details which `Token` type applies to this NFT
 * transfer.
 */
message NftTransfer {
    /**
     * An Account identifier for the sender.
     */
    AccountID senderAccountID = 1;

    /**
     * An Account identifier for the receiver.
     */
    AccountID receiverAccountID = 2;

    /**
     * A serial number for the NFT to transfer.
     */
    int64 serialNumber = 3;

    /**
     * An approved allowance flag.<br/>
     * If true then the transfer is expected to be an approved allowance.
     * <p>
     * If set, `senderAccountID` SHALL be the owner that previously approved
     * the allowance.<br/>
     * If set, the `senderAccountID` MUST be the "payer" account for
     * the transaction <br/>
     * The default value SHALL be false (unset).
     */
    bool is_approval = 4;
}

/**
 * A list of transfers for a particular (non-HBAR) token type.
 *
 * A `TokenTransferList` applies to a single token type, but may contain many
 * individual transfers.<br/>
 * Each transfer of a fungible/common token MUST specify an `accountID` and
 * `amount`. Amount SHALL be positive when the account receives tokens, and
 * SHALL be negative when the account sends tokens. The amount SHOULD NOT be
 * `0`.<br/>
 * In a transfer list containing fungible/common tokens in the `transfers`
 * list, the sum of all such transfers MUST be zero (`0`).
 * Each transfer of a unique token SHALL specify both sender and receiver, as
 * well as the serial number transferred.<br/>
 * A single `TokenTransferList` MUST contain `transfers` or `nftTransfers`,
 * but MUST NOT contain both.
 */
message TokenTransferList {
    /**
     * A token identifier.<br/>
     * This is the token to be transferred.
     */
    TokenID token = 1;

    /**
     * A list of account amounts.
     * <p>
     * Each entry SHALL have an account and amount.<br/>
     * These transfers SHALL be "double-entry" style; the credits (positive
     * amount) and debits (negative amount) MUST sum to 0, unless this
     * transfer list is part of a `mint` or `burn` operation.<br/>
     * This SHALL be be set for fungible/common tokens and MUST be
     * empty otherwise.
     */
    repeated AccountAmount transfers = 2;

    /**
     * A list of NftTransfers.
     * <p>
     * Each entry SHALL have a sender and receiver account, and the
     * serial number of the unique token to transfer.<br/>
     * This SHALL be be set for non-fungible/unique tokens and SHALL be
     * empty otherwise.
     */
    repeated NftTransfer nftTransfers = 3;

    /**
     * An expected decimal precision.<br/>
     * This is the number of decimals a fungible/common token type is
     * _expected_ to have.
     * <p>
     * The transfer SHALL fail with response code `UNEXPECTED_TOKEN_DECIMALS`
     * if this is set and the actual decimals specified for the `Token` differ
     * from this value.<br/>
     * If `nftTransfers` is set, then this value SHOULD NOT be set.
     */
    google.protobuf.UInt32Value expected_decimals = 4;
}

/**
 * A rational number.<br/>
 * A common use is to set the amount of a value transfer to collect as a
 * custom fee.
 *
 * It is RECOMMENDED that both numerator and denominator be no larger than
 * necessary to express the required fraction. A very large numerator, in
 * particular, may not be reliable.
 * Both fields are REQUIRED and SHOULD be positive integers.
 */
message Fraction {
    /**
     * A fractional number's numerator.
     */
    int64 numerator = 1;

    /**
     * A fractional number's denominator.
     * <p>
     * A zero value SHALL fail with response code `FRACTION_DIVIDES_BY_ZERO`.
     */
    int64 denominator = 2;
}

/**
 * Possible Token Types (IWA Compatibility).
 *
 * Apart from fungible and non-fungible, Tokens can have either a common or
 * unique representation. Furthermore, tokens can have intrinsic or referential
 * value, and can be whole and indivisible or fractional.<br/>
 * These distinction might seem subtle, but it is important when considering
 * how tokens can be traced, used, transferred, and if they can have isolated
 * unique properties.
 *
 * A few examples (these may not match enumerations below) using IWA taxonomy.
 * <dl>
 *   <dt>fungible, whole, intrinsic, unique</dt>
 *     <dd>Physical fiat currency</dd>
 *   <dt>fungible, fractional, intrinsic, common</dt>
 *     <dd>bank balance fiat currency</dd>
 *   <dt>non-fungible, fractional, reference, unique</dt>
 *     <dd>"mutual" collectible/art/property ownership</dd>
 *   <dt>non-fungible, whole, intrinsic, unique</dt>
 *     <dd>Physical work of fine art</dd>
 *   <dt>non-fungible, whole, reference, unique</dt>
 *     <dd>Registered property title</dd>
 * </dl>
 */
enum TokenType {
    /**
     * A fungible/common token.<br/>
     * Tokens of this type are interchangeable with one another, where any
     * quantity of tokens has the same value as another equal quantity, if
     * they are in the same class. Tokens share a single set of properties,
     * and are not distinct from one another. Ownership is represented as a
     * balance or quantity associated to a given account. Tokens may be
     * divided into fractional tokens, within reasonable limits.
     * <p>
     * IWA taxonomy _fungible, fractional, intrinsic, common_
     */
    FUNGIBLE_COMMON = 0;

    /**
     * A non-fungible/unique token.<br/>
     * Tokens of this type are unique, and are not interchangeable with other
     * tokens of the same type. Each token carries a serial number which is
     * unique for that token, these tokens may have a different trade value
     * for each individual token. The tokens are individually accounted and
     * often carry additional unique properties. Tokens cannot be subdivided,
     * and value is related to what the individual token represents.
     * <p>
     * IWA taxonomy _non-fungible, whole, reference, unique_
     */
    NON_FUNGIBLE_UNIQUE = 1;
}

/**
 * A transaction sub type.<br/>
 * This enumeration enables a set of transaction base fees to be broadly
 * defined for a type of operation and also be modified, when necessary,
 * based on specifics of the operation.
 *
 * ### Explanation
 * The resource cost for a TokenMint operation is different between minting
 * fungible/common and non-fungible/unique tokens. This `enum` is used to
 * "mark" a cost as applying to one or the other.<br/>
 * Similarly, the resource cost for a basic `tokenCreate` without a custom
 * fee schedule may yield a _base_ fee of $1. The resource cost for a
 * `tokenCreate` _with_ a custom fee schedule is different and may yield a
 * _base_ fee of $2 or more.
 */
enum SubType {
    /**
     * The resource cost for the transaction type has no additional attributes
     */
    DEFAULT = 0;

    /**
     * The resource cost for the transaction type includes an operation on a
     * fungible/common token
     */
    TOKEN_FUNGIBLE_COMMON = 1;

    /**
     * The resource cost for the transaction type includes an operation on
     * a non-fungible/unique token
     */
    TOKEN_NON_FUNGIBLE_UNIQUE = 2;

    /**
     * The resource cost for the transaction type includes an operation on a
     * fungible/common token with a custom fee schedule
     */
    TOKEN_FUNGIBLE_COMMON_WITH_CUSTOM_FEES = 3;

    /**
     * The resource cost for the transaction type includes an operation on a
     * non-fungible/unique token with a custom fee schedule
     */
    TOKEN_NON_FUNGIBLE_UNIQUE_WITH_CUSTOM_FEES = 4;

    /**
     * The resource cost for the transaction type includes a ScheduleCreate
     * containing a ContractCall.
     */
    SCHEDULE_CREATE_CONTRACT_CALL = 5;

    /**
     * The resource cost for the transaction type includes a TopicCreate
     * with custom fees.
     */
    TOPIC_CREATE_WITH_CUSTOM_FEES = 6;

    /**
     * The resource cost for the transaction type includes a ConsensusSubmitMessage
     * for a topic with custom fees.
     */
    SUBMIT_MESSAGE_WITH_CUSTOM_FEES = 7;
}

/**
 * Possible Token Supply Types (IWA Compatibility).
 *
 * This `enum` indicates the limit of tokens that can exist during the
 * lifetime of a token definition. The "infinite" supply is only theoretically
 * infinite, as it is still limited to the magnitude of a 64-bit signed
 * integer. A "finite" supply is further limited to a value specified when
 * the token is created (or updated, if not immutable).
 */
enum TokenSupplyType {
    /**
     * An unlimited supply.<br/>
     * This indicates that tokens of this type have an upper bound of
     * Long.MAX_VALUE.<br/>
     * The supply is accounted in the smallest units of the token
     * (i.e. 10<sup>-`decimals`</sup> whole tokens)
     */
    INFINITE = 0;

    /**
     * A limited supply.<br/>
     * This indicates that tokens of this type have an upper bound of
     * `maxSupply`.<br/>
     * The maximum supply SHALL be provided on token creation, but MAY be
     * changed thereafter if the token has an `admin_key` set.
     */
    FINITE = 1;
}

/**
 * Types of validation strategies for token keys.
 */
enum TokenKeyValidation {
    /**
     * Perform all token key validations.<br/>
     * This is the default value and behavior.
     */
    FULL_VALIDATION = 0;

    /**
     * Perform no validations at all for all passed token keys.
     */
    NO_VALIDATION = 1;
}

/**
 * Possible token freeze status values.
 *
 * This is returned by `TokenGetInfoQuery` or `CryptoGetInfoResponse`
 * in `TokenRelationship`.
 */
enum TokenFreezeStatus {
    /**
     * The token does not support freeze or cannot be frozen for the designated
     * account.<br/>
     * Typically this indicates that the token does not have a `freeze_key` set.
     */
    FreezeNotApplicable = 0;

    /**
     * The token is currently frozen for the designated account.
     */
    Frozen = 1;

    /**
     * The token is not currently frozen for the designated account.
     */
    Unfrozen = 2;
}

/**
 * Possible token "KYC" status values.
 *
 * This is returned by `TokenGetInfoQuery` or `CryptoGetInfoResponse`
 * in `TokenRelationship`.
 */
enum TokenKycStatus {
    /**
     * The token does not support KYC or cannot grant KYC for the
     * designated account.<br/>
     * Typically this indicates that the token does not have a `kyc_key` set.
     */
    KycNotApplicable = 0;

    /**
     * The designated account is currently granted KYC status for the
     * designated token.
     */
    Granted = 1;

    /**
     * The designated account is not currently granted KYC status for the
     * designated token.
     */
    Revoked = 2;
}

/**
 * Possible Pause status values.
 *
 * This is returned by `TokenGetInfoQuery` in `TokenRelationship`.
 */
enum TokenPauseStatus {
    /**
     * The token does not support pause or cannot be paused.<br/>
     * Typically this indicates that the token does not have a `pause_key` set.
     */
    PauseNotApplicable = 0;

    /**
     * The token is currently paused.
     */
    Paused = 1;

    /**
     * The token is not currently paused.
     */
    Unpaused = 2;
}

/**
 * A Key is an entity representing one or more cryptographic public/private key
 * pairs and, optionally, the structure for how multiple signatures may be
 * composed to meet complex multiple-signature authorization requirements.
 *
 * A Key can be a public key from either the Ed25519 or ECDSA(secp256k1)
 * signature schemes. In the ECDSA(secp256k1) case we require the 33-byte
 * compressed form of the public key. For simplicity, we call these
 * cryptographic public keys `primitive` keys.<br/>
 * If an entity has a primitive key associated to it, then the corresponding
 * private key must sign any transaction to send tokens or perform other
 * actions requiring authorization.
 *
 * A Key can also be the ID of a smart contract, which SHALL authorize that
 * contract to execute any system contract with signing requirements that are
 * met by the key.<br/>
 * > Example
 * >> If account `0.0.A` has a threshold key whose threshold is satisfied
 * >> by a contract ID key for contract `0.0.C`, then when `0.0.C` is called,
 * >> it is authorized to use system contracts to manage any asset owned by
 * >> `0.0.A`. If the contract ID key is "delegatable", then `0.0.C` can even
 * >> perform these actions when running code accessed via `DELEGATECALL`.
 *
 * A Key can be a "threshold key", which is a list of N keys, any M of which
 * may sign in order for the signature to be considered valid. The value of
 * M for a given threshold key MUST be less than or equal to N. A threshold
 * key is sometimes called a "M-of-N" key.
 *
 * A Key can be a "key list" where all keys in the list must sign unless
 * specified otherwise in the documentation for a specific transaction
 * type (e.g. FileDeleteTransactionBody).<br/>
 * This implies that the use of a key list is dependent on context. For
 * example, an Hedera file that is created with a list of keys, SHALL require
 * that all of those keys must sign a transaction to create or modify the file,
 * but only one key from that list MUST sign a transaction to delete the file.
 * So it is a single list that sometimes acts as a N-of-N threshold key, and
 * sometimes acts as a 1-of-N threshold key.<br/>
 * To reduce confusion this may cause, a key list SHALL always be considered
 * N-of-N, unless specified otherwise in official documentation.<br/>
 * A key list MAY have repeated primitive public keys, but the signature
 * requirement for all keys in a repeated set SHALL be satisfied by a single
 * valid signature. There is no mechanism to require a single key to sign a
 * single transaction more than once.
 *
 * Any list or threshold key MAY have nested key lists or threshold keys.
 * This allows, for example, the keys within a threshold signature to
 * themselves be threshold, list, contract, or primitive keys. This nesting
 * structure enables complex asymmetric multi-party signature requirements to
 * be met.
 *
 * To ensure adequate performance and transaction security, key nesting is
 * limited to at most fifteen(15) levels.
 */
message Key {
    oneof key {
        /**
         * A smart contract instance that is authorized implicitly.
         * <p>
         * This key type SHALL require that the code in the active message frame
         * belong to the contract with the given id.
         */
        ContractID contractID = 1;

        /**
         * An array of Ed25519 public key bytes.
         */
        bytes ed25519 = 2;

        /**
         * This option is not currently supported.<br/>
         * An array of RSA-3072 public key bytes.
         */
        bytes RSA_3072 = 3 [deprecated = true];

        /**
         * This option is not currently supported.<br/>
         * An array of ECDSA, using the p-384 curve, public key bytes.
         */
        bytes ECDSA_384 = 4 [deprecated = true];

        /**
         * A threshold, M, combined with a list of N keys, any M of which are
         * sufficient to form a valid signature.
         */
        ThresholdKey thresholdKey = 5;

        /**
         * A list of keys. This may be treated like a "N-of-N" threshold key,
         * as a component of another key, or in some other manner as documented.
         */
        KeyList keyList = 6;

        /**
         * A set of compressed ECDSA(secp256k1) public key bytes.<br/>
         * This is an EVM compatibility format.
         */
        bytes ECDSA_secp256k1 = 7;

        /**
         * A smart contract that, if the recipient of the active message frame,
         * SHALL be imputed authorization.<br/>
         * Setting this key type is a more permissive version of setting a
         * contractID key.
         * <p>
         * This key form SHALL NOT strictly require that the code being executed
         * in the frame belong to the given contract. The code in frame MAY be
         * running another contract via a `delegatecall`.
         */
        ContractID delegatable_contract_id = 8;
    }
}

/**
 * A threshold value and a list of public keys that, together, form a threshold
 * signature requirement. Any subset of the keys in the list may satisfy the
 * signature requirements of this type of key, provided the number of keys meets
 * or exceeds the threshold. For example, if a particular key has a threshold of
 * three(3) and eight(8) keys in the list, then any three(3) signatures, from
 * the list of eight(8), is sufficient to authorize that key.
 *
 * For threshold purposes, all signatures from a single `primitive` key are
 * considered a single signature, so that signature(s) from a single key SHALL
 * NOT _directly_ meet a threshold greater than one(1).
 *
 * #### Note
 * > It is possible to construct a complex key structure that _would_ enable a
 * > single primitive key to successfully meet a threshold requirement. All
 * > threshold keys SHOULD be carefully audited to ensure no one `primitive`
 * > key, or smart contract, has disproportionate capability.
 */
message ThresholdKey {
    /**
     * A transaction MUST have valid signatures from at least this number of
     * separate keys, from the `keys` list to be authorized by this key.
     */
    uint32 threshold = 1;

    /**
     * A list of the keys that MAY satisfy signature requirements of this key.
     */
    KeyList keys = 2;
}

/**
 * A list of keys.<br/>
 * A `KeyList` requires all keys (N-of-N) to sign, unless otherwise
 * specified in official documentation. A KeyList may contain repeated keys,
 * but all such repeated keys are considered a single key when determining
 * signature authorization.
 *
 * ### Additional Notes
 * 1. An empty key list is the "standard" mechanism to represent an
 *    unassigned key. For example, if the `admin_key` of a token is set
 *    to the empty key list, then that token has no admin key, and
 *    functionality that requires an admin key to sign the
 *    transaction is disabled.
 */
message KeyList {
    /**
     * A list of keys. All values in this list SHALL be non-null.
     * <p>
     */
    repeated Key keys = 1;
}

/**
 * This message is deprecated and MUST NOT be used to communicate with
 * network nodes. It is retained here only for historical reasons.
 *
 * Client software MUST NOT include this message in any request. <br/>
 * Compliant nodes SHALL NOT accept any request containing this message.
 *
 * Please use the `SignaturePair` and `SignatureMap` messages instead of
 * this message.
 */
message Signature {
    option deprecated = true;

    oneof signature {
        /**
         * Smart contract virtual signature (always length zero).
         */
        bytes contract = 1;

        /**
         * Ed25519 signature bytes.
         */
        bytes ed25519 = 2;

        /**
         * RSA-3072 signature bytes.
         */
        bytes RSA_3072 = 3;

        /**
         * ECDSA p-384 signature bytes.
         */
        bytes ECDSA_384 = 4;

        /**
         * A list of signatures for a single N-of-M threshold Key. This must be
         * a list of exactly M signatures, at least N of which are non-null.
         */
        ThresholdSignature thresholdSignature = 5;

        /**
         * A list of M signatures, each corresponding to a Key in a KeyList
         * of the same length.
         */
        SignatureList signatureList = 6;
    }
}

/**
 * This message is deprecated and MUST NOT be used to communicate with network
 * nodes. It is retained here only for historical reasons.
 *
 * Client software MUST NOT include this message in any request. <br/>
 * Compliant nodes SHALL NOT accept any request containing this message.
 *
 * Please use the `SignaturePair` and `SignatureMap` messages, in combination
 * with `ThresholdKey` keys, instead of this message.
 */
message ThresholdSignature {
    option deprecated = true;

    /**
     * For an N-of-M threshold key, this is a list of M signatures, at least N
     * of which must be non-null.
     */
    SignatureList sigs = 2;
}

/**
 * This message is deprecated and MUST NOT be used to communicate with network
 * nodes. It is retained here only for historical reasons.
 *
 * Client software MUST NOT include this message in any request. <br/>
 * Compliant nodes SHALL NOT accept any request containing this message.
 *
 * Please use the `SignaturePair` and `SignatureMap` messages instead of
 * this message.
 */
message SignatureList {
    option deprecated = true;

    /**
     * Each signature corresponds to a Key in the KeyList.
     */
    repeated Signature sigs = 2;
}

/**
 * A public key and signature pair.<br/>
 * Only Ed25519 and ECDSA(secp256k1) keys and signatures are currently supported
 * as cryptographic (non-implied) signatures.
 */
message SignaturePair {
    /**
     * Prefix bytes of the public key.
     * <p>
     * The client may use any number of bytes from zero to the whole length of
     * the public key for pubKeyPrefix. If zero bytes are used, then it MUST be
     * true that only one cryptographic key is required to sign the associated
     * transaction.<br/>
     * If the `pubKeyPrefix` is 0 bytes and more than a single cryptographic
     * key is required to sign the transaction, the request SHALL resolve to
     * `INVALID_SIGNATURE`.
     * <blockquote>Important Note<blockquote>
     * In the special case that a signature is provided to authorize a
     * precompiled contract, the `pubKeyPrefix` MUST contain the _entire public
     * key_.<br/>
     * That is, if the key is an Ed25519 key, the `pubKeyPrefix` MUST be
     * 32 bytes long and contain the full public key bytes.<br/>
     * If the key is an ECDSA(secp256k1) key, the `pubKeyPrefix` MUST be
     * 33 bytes long and contain the full _compressed_ form of the public key.
     * </blockquote></blockquote>
     * <p>
     * <dl><dt>Purpose</dt>
     * <dd>The `pubKeyPrefix` exists to save cost. A signed transaction with
     * shorter prefixes will have fewer bytes, and so will have a lower
     * transaction fee.
     * The prefixes, however, MUST be long enough to distinguish between all
     * of the public keys that might be signing the transaction. Therefore,
     * software signing a transaction SHOULD evaluate which keys might possibly
     * be required to sign a transaction, and ensure that the shortest prefix
     * that is sufficient to unambiguously identify the correct key is used.
     * </dd></dl>
     */
    bytes pubKeyPrefix = 1;

    oneof signature {
        /**
         * A smart contract virtual signature.
         * <p>
         * This value MUST be length zero, if set.
         */
        bytes contract = 2;

        /**
         * An Ed25519 signature.
         */
        bytes ed25519 = 3;

        /**
         * This option is not supported.<br/>
         * A RSA-3072 signature.
         */
        bytes RSA_3072 = 4 [deprecated = true];

        /**
         * This option is not supported.<br/>
         * ECDSA p-384 signature.
         */
        bytes ECDSA_384 = 5 [deprecated = true];

        /**
         * An ECDSA(secp256k1) signature.
         */
        bytes ECDSA_secp256k1 = 6;
    }
}

/**
 * A set of signatures corresponding to every unique public key that
 * signed a given transaction.
 *
 * If any public key matches more than one prefix in the signature map,
 * the transaction containing that map SHALL fail immediately with the
 * response code `KEY_PREFIX_MISMATCH`.
 */
message SignatureMap {
    /**
     * A list of signature pairs for a specific transaction.<br/>
     * Each signature pair represents a single cryptographic (`primitive`)
     * public key identified by a "prefix" value and the cryptographic
     * signature produced for that key.
     */
    repeated SignaturePair sigPair = 1;
}

/**
 * The transactions and queries supported by Hedera Hashgraph.
 */
enum HederaFunctionality {
    // FUTURE - Uncomment when https://github.com/hashgraph/pbj/issues/339 is fixed;
    // currently the PBJ-generated unit tests fail when using reserved ordinals
    // reserved 96, 97, 98, 99;

    /**
     * Unused - The first value is unused because this default value is
     * ambiguous with an "unset" value and therefore should not be used.
     */
    NONE = 0;

    /**
     * Transfer tokens among accounts.
     */
    CryptoTransfer = 1;

    /**
     * Update an account.
     */
    CryptoUpdate = 2;

    /**
     * Delete an account.
     */
    CryptoDelete = 3;

    /**
     * Add a livehash to an account
     */
    CryptoAddLiveHash = 4 [deprecated = true];

    /**
     * Delete a livehash from an account
     */
    CryptoDeleteLiveHash = 5 [deprecated = true];

    /**
     * Execute a smart contract call.
     */
    ContractCall = 6;

    /**
     * Create a smart contract.
     */
    ContractCreate = 7;

    /**
     * Update a smart contract.
     */
    ContractUpdate = 8;

    /**
     * Create a "file" stored in the ledger.
     */
    FileCreate = 9;

    /**
     * Append data to a "file" stored in the ledger.
     */
    FileAppend = 10;

    /**
     * Update a "file" stored in the ledger.
     */
    FileUpdate = 11;

    /**
     * Delete a "file" stored in the ledger.
     */
    FileDelete = 12;

    /**
     * Get the balance for an account.
     */
    CryptoGetAccountBalance = 13;

    /**
     * Get a full account record.
     */
    CryptoGetAccountRecords = 14;

    /**
     * Get information about a token.
     */
    CryptoGetInfo = 15;

    /**
     * Execute a local smart contract call.<br/>
     * Used by contracts to call other contracts.
     */
    ContractCallLocal = 16;

    /**
     * Get information about a smart contract.
     */
    ContractGetInfo = 17;

    /**
     * Get the compiled bytecode that implements a smart contract.
     */
    ContractGetBytecode = 18;

    /**
     * Get a smart contract record by reference to the solidity ID.
     */
    GetBySolidityID = 19;

    /**
     * Get a smart contract by reference to the contract key.
     */
    GetByKey = 20;

    /**
     * Get the live hash for an account
     */
    CryptoGetLiveHash = 21 [deprecated = true];

    /**
     * Get the accounts proxy staking to a given account.
     */
    CryptoGetStakers = 22 [deprecated = true];

    /**
     * Get the contents of a "file" stored in the ledger.
     */
    FileGetContents = 23;

    /**
     * Get the metadata for a "file" stored in the ledger.
     */
    FileGetInfo = 24;

    /**
     * Get transaction record(s) for a specified transaction ID.
     */
    TransactionGetRecord = 25;

    /**
     * Get all transaction records for a specified contract ID in
     * the past 24 hours.<br/>
     * deprecated since version 0.9.0
     */
    ContractGetRecords = 26 [deprecated = true];

    /**
     * Create a new account
     */
    CryptoCreate = 27;

    /**
     * Delete a "system" "file" stored in the ledger.<br/>
     * "System" files are files with special purpose and ID values within a
     * specific range.<br/>
     * These files require additional controls and can only be deleted when
     * authorized by accounts with elevated privilege.
     */
    SystemDelete = 28;

    /**
     * Undo the delete of a "system" "file" stored in the ledger.<br/>
     * "System" files are files with special purpose and ID values within a
     * specific range.<br/>
     * These files require additional controls and can only be deleted when
     * authorized by accounts with elevated privilege. This operation allows
     * such files to be restored, within a reasonable timeframe, if
     * deleted improperly.
     */
    SystemUndelete = 29;

    /**
     * Delete a smart contract
     */
    ContractDelete = 30;

    /**
     * Stop all processing and "freeze" the entire network.<br/>
     * This is generally sent immediately prior to upgrading the network.<br/>
     * After processing this transactions all nodes enter a quiescent state.
     */
    Freeze = 31;

    /**
     * Create a Transaction Record.<br/>
     * This appears to be purely internal and unused.
     */
    CreateTransactionRecord = 32;

    /**
     * Auto-renew an account.<br/>
     * This is used for internal fee calculations.
     */
    CryptoAccountAutoRenew = 33;

    /**
     * Auto-renew a smart contract.<br/>
     * This is used for internal fee calculations.
     */
    ContractAutoRenew = 34;

    /**
     * Get version information for the ledger.<br/>
     * This returns a the version of the software currently running the network
     * for both the protocol buffers and the network services (node).
     */
    GetVersionInfo = 35;

    /**
     * Get a receipt for a specified transaction ID.
     */
    TransactionGetReceipt = 36;

    /**
     * Create a topic for the Hedera Consensus Service (HCS).
     */
    ConsensusCreateTopic = 50;

    /**
     * Update an HCS topic.
     */
    ConsensusUpdateTopic = 51;

    /**
     * Delete an HCS topic.
     */
    ConsensusDeleteTopic = 52;

    /**
     * Get metadata (information) for an HCS topic.
     */
    ConsensusGetTopicInfo = 53;

    /**
     * Publish a message to an HCS topic.
     */
    ConsensusSubmitMessage = 54;

    /**
     * Submit a transaction, bypassing intake checking.
     * Only enabled in local-mode.
     */
    UncheckedSubmit = 55;

    /**
     * Create a token for the Hedera Token Service (HTS).
     */
    TokenCreate = 56;

    /**
     * Get metadata (information) for an HTS token.
     */
    TokenGetInfo = 58;

    /**
     * Freeze a specific account with respect to a specific HTS token.
     * <p>
     * Once this transaction completes that account CANNOT send or receive
     * the specified token.
     */
    TokenFreezeAccount = 59;

    /**
     * Remove a "freeze" from an account with respect to a specific HTS token.
     */
    TokenUnfreezeAccount = 60;

    /**
     * Grant KYC status to an account for a specific HTS token.
     */
    TokenGrantKycToAccount = 61;

    /**
     * Revoke KYC status from an account for a specific HTS token.
     */
    TokenRevokeKycFromAccount = 62;

    /**
     * Delete a specific HTS token.
     */
    TokenDelete = 63;

    /**
     * Update a specific HTS token.
     */
    TokenUpdate = 64;

    /**
     * Mint HTS token amounts to the treasury account for that token.
     */
    TokenMint = 65;

    /**
     * Burn HTS token amounts from the treasury account for that token.
     */
    TokenBurn = 66;

    /**
     * Wipe all amounts for a specific HTS token from a specified account.
     */
    TokenAccountWipe = 67;

    /**
     * Associate a specific HTS token to an account.
     */
    TokenAssociateToAccount = 68;

    /**
     * Dissociate a specific HTS token from an account.
     */
    TokenDissociateFromAccount = 69;

    /**
     * Create a scheduled transaction
     */
    ScheduleCreate = 70;

    /**
     * Delete a scheduled transaction
     */
    ScheduleDelete = 71;

    /**
     * Sign a scheduled transaction
     */
    ScheduleSign = 72;

    /**
     * Get metadata (information) for a scheduled transaction
     */
    ScheduleGetInfo = 73;

    /**
     * Get NFT metadata (information) for a range of NFTs associated to a
     * specific non-fungible/unique HTS token and owned by a specific account.
     */
    TokenGetAccountNftInfos = 74 [deprecated = true];

    /**
     * Get metadata (information) for a specific NFT identified by token and
     * serial number.
     */
    TokenGetNftInfo = 75 [deprecated = true];

    /**
     * Get NFT metadata (information) for a range of NFTs associated to a
     * specific non-fungible/unique HTS token.
     */
    TokenGetNftInfos = 76;

    /**
     * Update a token's custom fee schedule.
     * <p>
     * If a transaction of this type is not signed by the token
     * `fee_schedule_key` it SHALL fail with INVALID_SIGNATURE, or
     * TOKEN_HAS_NO_FEE_SCHEDULE_KEY if there is no `fee_schedule_key` set.
     */
    TokenFeeScheduleUpdate = 77;

    /**
     * Get execution time(s) for one or more "recent" TransactionIDs.
     */
    NetworkGetExecutionTime = 78 [deprecated = true];

    /**
     * Pause a specific HTS token
     */
    TokenPause = 79;

    /**
     * Unpause a paused HTS token.
     */
    TokenUnpause = 80;

    /**
     * Approve an allowance for a spender relative to the owner account, which
     * MUST sign the transaction.
     */
    CryptoApproveAllowance = 81;

    /**
     * Delete (unapprove) an allowance previously approved
     * for the owner account.
     */
    CryptoDeleteAllowance = 82;

    /**
     * Get all the information about an account, including balance
     * and allowances.<br/>
     * This does not get a list of account records.
     */
    GetAccountDetails = 83;

    /**
     * Perform an Ethereum (EVM) transaction.<br/>
     * CallData may be inline if small, or in a "file" if large.
     */
    EthereumTransaction = 84;

    /**
     * Used to indicate when the network has updated the staking information
     * at the end of a staking period and to indicate a new staking period
     * has started.
     */
    NodeStakeUpdate = 85;

    /**
     * Generate and return a pseudorandom number based on network state.
     */
    UtilPrng = 86;

    /**
     * Get a record for a "recent" transaction.
     */
    TransactionGetFastRecord = 87 [deprecated = true];

    /**
     * Update the metadata of one or more NFT's of a specific token type.
     */
    TokenUpdateNfts = 88;

    /**
     * Create a node
     */
    NodeCreate = 89;

    /**
     * Update a node
     */
    NodeUpdate = 90;

    /**
     * Delete a node
     */
    NodeDelete = 91;

    /**
     * Transfer one or more token balances held by the requesting account
     * to the treasury for each token type.
     */
    TokenReject = 92;

    /**
     * Airdrop one or more tokens to one or more accounts.
     */
    TokenAirdrop = 93;

    /**
    * Remove one or more pending airdrops from state on behalf of
    * the sender(s) for each airdrop.
    */
    TokenCancelAirdrop = 94;

    /**
     * Claim one or more pending airdrops
     */
    TokenClaimAirdrop = 95;

    /**
     * Submit a signature of a state root hash gossiped to other nodes
     */
    StateSignatureTransaction = 100;

    /**
     * Publish a hinTS key to the network.
     */
    HintsKeyPublication = 101;

    /**
     * Vote for a particular preprocessing output of a hinTS construction.
     */
    HintsPreprocessingVote = 102;

    /**
     * Sign a partial signature for the active hinTS construction.
     */
    HintsPartialSignature = 103;

    /**
     * Sign a particular history assembly.
     */
    HistoryAssemblySignature = 104;

    /**
     * Publish a roster history proof key to the network.
     */
    HistoryProofKeyPublication = 105;

    /**
     * Vote for a particular history proof.
     */
    HistoryProofVote = 106;

    /**
     * Publish a random CRS to the network.
     */
    CrsPublication = 107;

    /**
     * Submit a batch of transactions to run atomically
     */
    AtomicBatch = 108;
}

/**
 * A set of values the nodes use in determining transaction and query fees, and
 * constants involved in fee calculations.
 *
 * Nodes SHALL multiply the amount of "resources" allocated to a transaction or
 * query by the corresponding price to calculate the appropriate fee. Units are
 * one-thousandth of a `tinyCent`. The "resource" allocations SHALL be estimated
 * based on transaction characteristics and current network state, and MAY be
 * further adjusted based on network load and congestion.
 *
 * This SHALL be used, in different contexts, for the cost _factors_ used to
 * calculate charged amounts, for the resource accumulation, and for actual
 * amounts to be charged.<br/>
 * Amounts recorded here MUST be converted to tinybar according to the
 * current active `ExchangeRate` for the network.
 */
message FeeComponents {
    /**
     * Base: "minimum total fee".
     * <p>
     * The calculated fee MUST be greater than this value.
     */
    int64 min = 1;

    /**
     * Base: "maximum total fee".
     * <p>
     * The calculated fee MUST be less than this value.
     */
    int64 max = 2;

    /**
     * Base: "constant fee".<br/>
     * A baseline constant contribution to total fee.
     */
    int64 constant = 3;

    /**
     * Bandwidth: "bytes per transaction".<br/>
     * The fee for bandwidth consumed by a transaction, measured in bytes
     */
    int64 bpt = 4;

    /**
     * Signatures: "validations per transaction".<br/>
     * The fee for signature verifications required by a transaction
     */
    int64 vpt = 5;

    /**
     * Memory: "RAM byte-hours".<br/>
     * The fee for RAM required to process a transaction,
     * measured in byte-hours
     */
    int64 rbh = 6;

    /**
     * Disk: "storage byte-hours".<br/>
     * The fee for storage required by a transaction, measured in byte-hours
     */
    int64 sbh = 7;

    /**
     * Compute: Ethereum term for a derivative EVM compute resource.<br/>
     * The fee of computation for a smart contract transaction. The value of
     * gas is set by a conversion rate, and is regularly updated to reflect
     * reasonable and customary costs.
     */
    int64 gas = 8;

    /**
     * Ad valorem: "transferred value".<br/>
     * The fee for HBAR transferred by a transaction.
     */
    int64 tv = 9;

    /**
     * Response memory: "bytes per response".<br/>
     * The fee for data retrieved from memory to deliver a response,
     * measured in bytes
     */
    int64 bpr = 10;

    /**
     * Response disk: "storage bytes per response".<br/>
     * The fee for data retrieved from disk to deliver a response,
     * measured in bytes
     */
    int64 sbpr = 11;
}

/**
 * The fee schedule for a specific transaction or query based on the fee data.
 */
message TransactionFeeSchedule {
    /**
     * An enumeration for a particular transaction or query.<br/>
     * The functionality type determines the base cost parameters.
     */
    HederaFunctionality hederaFunctionality = 1;

    /**
     * Use `fees` instead of this field.<br/>
     * Resource price coefficients.
     */
    FeeData feeData = 2 [deprecated = true];

    /**
     * The resource price coefficients for transaction type and any applicable
     * subtypes.<br/>
     * The multiple entries enable support for subtype price definitions.
     */
    repeated FeeData fees = 3;
}

/**
 * A total fee, in component amounts charged for a transaction.
 *
 * Total fees are composed of three sets of components.
 * - Node data, components that compensate the specific node that submitted
 *   the transaction.
 * - Network data, components that compensate the Hedera network for gossiping
 *   the transaction and determining the consensus timestamp.
 * - Service data, components that compensate the Hedera network for the ongoing
 *   maintenance and operation of the network, as well as ongoing development
 *   of network services.
 *
 * Fee components are recorded in thousandths of a tiny cent, and the network
 * exchange rate converts these to tinybar amounts, which are what the network
 * charges for transactions and what the network reports in the record stream.
 */
message FeeData {
    /**
     * Fee components to be paid to the submitting node.
     */
    FeeComponents nodedata = 1;

    /**
     * Fee components to be paid to the network for bringing a
     * transaction to consensus.
     */
    FeeComponents networkdata = 2;

    /**
     * Fee components to be paid to the network for providing the immediate and
     * ongoing services associated with executing the transaction, maintaining
     * the network, and developing the network software.
     */
    FeeComponents servicedata = 3;

    /**
     * A sub-type distinguishing between different types of `FeeData` that may
     * apply to the same base transaction type (associated with
     * an `HederaFunctionality`).
     */
    SubType subType = 4;
}

/**
 * A set of fee schedules covering all transaction types and query types, along
 * with a specific time at which this fee schedule will expire.
 *
 * Nodes SHALL use the most recent unexpired fee schedule to determine the fees
 * for all transactions based on various resource components imputed to each
 * transaction.
 */
message FeeSchedule {
    /**
     * Sets of fee coefficients for various transaction or query types.
     */
    repeated TransactionFeeSchedule transactionFeeSchedule = 1;

    /**
     * A time, in seconds since the `epoch`, when this fee schedule
     * will expire.
     * <p>
     * For this purpose, `epoch` SHALL be the UNIX epoch
     * with 0 at `1970-01-01T00:00:00.000Z`.
     */
    TimestampSeconds expiryTime = 2;
}

/**
 * The "current" fee schedule and the "next" fee schedule.
 *
 * The current fee schedule is the schedule that SHALL apply to the current
 * transaction.<br/>
 * The next fee schedule is the schedule that SHALL apply after the current
 * schedule expires.<br/>
 * We store both to avoid a condition where transactions are processed very
 * near the time when a fee schedule expires and it might be indeterminate
 * which fees to apply. With both current and next fee schedule the network
 * can deterministically apply the correct fee schedule based on consensus
 * timestamp for each transaction.
 */
message CurrentAndNextFeeSchedule {
    /**
     * A current, unexpired, fee schedule.
     */
    FeeSchedule currentFeeSchedule = 1;

    /**
     * A future fee schedule to use when the current schedule expires.
     */
    FeeSchedule nextFeeSchedule = 2;
}

/**
 * A network node endpoint.<br/>
 * Each network node in the global address book publishes one or more endpoints
 * which enable the nodes to communicate both with other nodes, for gossip, and
 * with clients to receive transaction requests.
 *
 * This message supports IPv4 with address and TCP port,
 * and MAY include a FQDN instead of an IP address.<br/>
 * IPv6 is not currently supported.
 *
 * When the `domain_name` field is set, the `ipAddressV4` field
 * MUST NOT be set.<br/>
 * When the `ipAddressV4` field is set, the `domain_name` field
 * MUST NOT be set.
 */
message ServiceEndpoint {
    /**
     * A 32-bit IPv4 address.<br/>
     * This is the address of the endpoint, encoded in pure "big-endian"
     * (i.e. left to right) order (e.g. `127.0.0.1` has hex bytes in the
     * order `7F`, `00`, `00`, `01`).
     */
    bytes ipAddressV4 = 1;

    /**
     * A TCP port to use.
     * <p>
     * This value MUST be between 0 and 65535, inclusive.
     */
    int32 port = 2;

    /**
     * A node domain name.
     * <p>
     * This MUST be the fully qualified domain name of the node.<br/>
     * This value MUST NOT exceed 253 characters.<br/>
     * When the `domain_name` field is set, the `ipAddressV4`
     * field MUST NOT be set.<br/>
     * When the `ipAddressV4` field is set, the `domain_name`
     * field MUST NOT be set.
     */
    string domain_name = 3;
}

/**
 * The data about a node, including its service endpoints and the Hedera account
 * to be paid for services provided by the node (that is, queries answered and
 * transactions submitted).
 *
 * All active fields are populated in the `0.0.102` address book file.<br/>
 * Only fields documented with "`0.0.101` field" are populated in the 0.0.101
 * address book file.
 *
 * This message MAY be superseded by messages in state/addressbook/node.proto
 * and node_get_info.proto.
 */
message NodeAddress {
    /**
     * ServiceEndpoint is now used to retrieve a node's list of IP
     * addresses and ports.<br/>
     * The IP address of the Node, as a string, encoded in UTF-8.<br/>
     * This value SHALL NOT be populated.
     */
    bytes ipAddress = 1 [deprecated = true];

    /**
     * ServiceEndpoint is now used to retrieve a node's list of IP
     * addresses and ports.<br/>
     * The port number of the grpc server for the node.<br/>
     * This value SHALL NOT be populated.
     */
    int32 portno = 2 [deprecated = true];

    /**
     * Description provides short text functionality.<br/>
     * A short description of the node.
     * <p>
     * This field SHALL NOT be populated.
     */
    bytes memo = 3 [deprecated = true];

    /**
     * A hexadecimal String encoding of an X509 public key.
     * <p>
     * This X509 RSA _public_ key SHALL be used to verify record stream files
     * (e.g., record stream files).<br/>
     * This field SHALL be a string of hexadecimal characters, encoded UTF-8,
     * which, translated to binary, form the public key DER encoding.
     */
    string RSA_PubKey = 4;

    /**
     * A numeric identifier for the node.
     * <p>
     * This value SHALL NOT be sequential.
     * <p>
     * A `0.0.101` field
     */
    int64 nodeId = 5;

    /**
     * An account to be paid the "node" portion of transaction fees.<br/>
     * The "node" fees are paid to the node that submitted the transaction.
     * <p>
     * A `0.0.101` field
     */
    AccountID nodeAccountId = 6;

    /**
     * A hash of the node's TLS certificate.
     * <p>
     * This field SHALL be a string of hexadecimal characters, encoded UTF-8,
     * which, translated to binary, form a SHA-384 hash of the node's TLS
     * certificate in PEM format.
     * This TLS certificate MUST be encoded UTF-8 and normalized according to
     * the NFKD form prior to computing the hash value.<br/>
     * The value of this field SHALL be used to verify the node TLS
     * certificate when presented during protocol negotiation.
     * <p>
     * A `0.0.101` field
     */
    bytes nodeCertHash = 7;

    /**
     * A node's service IP addresses and TCP ports.<br/>
     * Nodes require multiple endpoints to ensure that inter-node communication
     * (e.g. gossip) is properly separated from client communication to
     * API endpoints.
     * <p>
     * A `0.0.101` field
     */
    repeated ServiceEndpoint serviceEndpoint = 8;

    /**
     * A short description of the node.
     * <p>
     * This value, if set, MUST NOT exceed `transaction.maxMemoUtf8Bytes`
     * (default 100) bytes when encoded as UTF-8.
     */
    string description = 9;

    /**
     * This is replaced by per-account stake tracking and dynamic
     * calculation.<br/>
     * The amount of tinybar staked to the node.<br/>
     * This value SHOULD NOT be populated, and SHALL be ignored.
     */
    int64 stake = 10 [deprecated = true];
}

/**
 * A list of nodes and their metadata that contains details of the nodes
 * running the network.
 *
 * Used to parse the contents of system files `0.0.101` and `0.0.102`.
 */
message NodeAddressBook {
    /**
     * Published data for all nodes in the network
     */
    repeated NodeAddress nodeAddress = 1;
}

/**
 * A software version according to "[semantic versioning](https://semver.org/)"
 * or "date versioning".
 *
 * Hedera currently modifies the "typical" semantic versioning somewhat, the
 * `major` version is always `0`, and each release increments the `minor`
 * version. The `patch` and `pre` components are used in the typical manner.
 * The `build` component is not generally used.
 */
message SemanticVersion {
    /**
     * A major version.<br/>
     * Hedera does not increment this value and retains a `0` value to
     * indicate that API may change for any release.
     * <p>
     * This value SHALL increment for an incompatible API change.<br/>
     */
    int32 major = 1;

    /**
     * A minor version.<br/>
     * Hedera increments this value with each release.<br/>
     * There may be incompatible API changes in any Hedera Services release.
     * <p>
     * This value SHALL increment for backwards-compatible new
     * functionality.
     */
    int32 minor = 2;

    /**
     * A patch version.
     * <p>
     * This value SHALL increment for backwards-compatible bug fixes.
     */
    int32 patch = 3;

    /**
     * A pre-release version.
     * <p>
     * This MAY be denoted by appending a hyphen and a series of dot separated
     * identifiers per [Semver Specification](https://semver.org/#spec-item-9);
     * given a string `0.14.0-alpha.1+21AF26D3`, this field would contain
     * 'alpha.1'
     */
    string pre = 4;

    /**
     * A build version.
     * <p>
     * Build version MAY be denoted by appending a plus sign and a series of
     * dot separated identifiers immediately following the patch or pre-release
     * version per [Semver Specification](https://semver.org/#spec-item-10); so
     * given a string `0.14.0-alpha.1+21AF26D3`, this field
     * would contain '21AF26D3'
     */
    string build = 5;
}

/**
 * A single runtime configuration setting.
 *
 * Typically a name-value pair, this may also contain a small amount of
 * associated data.
 */
message Setting {
    /**
     * A name for this setting property.
     */
    string name = 1;

    /**
     * A value for this setting property.
     */
    string value = 2;

    /**
     * A small quantity of data associated with this setting.
     * <p>
     * This SHOULD be less than 100 bytes.<br/>
     * If the value is a string, it MUST be encoded UTF-8.
     */
    bytes data = 3;
}

/**
 * Setting values representing a source of runtime configuration information.
 */
message ServicesConfigurationList {
    /**
     * A List of `Setting` values, typically read from application properties.
     */
    repeated Setting nameValue = 1;
}

/**
 * An Hedera Token Service token relationship. A token relationship describes
 * the connection between an Account and a Token type, including the current
 * account balance in that token.
 *
 * A `TokenRelationship` SHALL contain, for the designated token and enclosing
 * account, The account's current balance, whether the account has KYC granted,
 * whether the assets are frozen and whether the association was automatic.<br/>
 * A `TokenRelationship` MAY also contain the `symbol` and `decimals` values
 * copied from the token.<br/>
 * `TokenRelationship` entries SHALL be valid only within the context of a
 * `GetAccountDetails` query response, or other enclosing message, which
 * specifies the account side of the relationship.
 */
message TokenRelationship {
    /**
     * A token identifier.
     * <p>
     * This MUST match an existing token that is not deleted.
     */
    TokenID tokenId = 1;

    /**
     * A token symbol.
     * <p>
     * This MUST match an existing token that is not deleted.<br/>
     * This MUST match the value for the token identified in `tokenId`.
     */
    string symbol = 2;

    /**
     * An account balance for this token.
     * <p>
     * For fungible/common tokens this SHALL be the balance that the
     * account holds of that token. The value is provided as an integer amount
     * of the smallest unit of the token (i.e. 10<sup>`-decimals`</sup> whole
     * tokens).<br/>
     * For non-fungible/unique tokens this SHALL be the whole number of
     * unique tokens held by the account for this token type.
     */
    uint64 balance = 3;

    /**
     * A KYC status for the account with respect to this token.
     * <p>
     * This may be `KycNotApplicable`, `Granted` or `Revoked` and, if KYC is
     * not supported for this token (e.g. the `kyc_key` of the token is not
     * set), this SHALL be `KycNotApplicable`.
     */
    TokenKycStatus kycStatus = 4;

    /**
     * A Freeze status for the account with respect to this token.
     * <p>
     * This value SHALL be one of `FreezeNotApplicable`, `Frozen`
     * or `Unfrozen`.<br/>
     * If the token cannot freeze account assets (e.g. the `freeze_key` of the
     * token is not set), this SHALL be `FreezeNotApplicable`.
     */
    TokenFreezeStatus freezeStatus = 5;

    /**
     * A maximum "precision" for this token.
     * <p>
     * This value MUST match the `decimals` field of the token identified in
     * the `tokenId` field.<br/>
     * A single whole token SHALL be divided into at most
     * 10<sup>`decimals`</sup> sub-units.
     */
    uint32 decimals = 6;

    /**
     * An automatic association flag.
     * <p>
     * This SHALL be set if the relationship was created implicitly
     * (automatically).<br/>
     * This SHALL be unset if the relationship was created explicitly
     * (manually) via a `TokenAssociate` transaction.
     */
    bool automatic_association = 7;
}

/**
 * A number of _transferable units_ of a specified token.
 *
 * The transferable unit of a token is its smallest denomination, as given by
 * the token's `decimals` property. Each minted token contains
 * 10<sup>`decimals`</sup> transferable units. For example, we could think of
 * the cent as the transferable unit of the US dollar (`decimals=2`); and the
 * tinybar as the transferable unit of HBAR (`decimals=8`).
 *
 * Transferable units are not directly comparable across different tokens.
 */
message TokenBalance {
    /**
     * A token identifier.
     */
    TokenID tokenId = 1;

    /**
     * A number of transferable units of the identified token.
     * <p>
     * For fungible/common tokens this SHALL be the balance, in units of
     * 10<sup>`-decimals`</sup> whole tokens.<br/>
     * For non-fungible/unique tokens, this SHALL be the number of
     * individual unique tokens in this balance.
     */
    uint64 balance = 2;

    /**
     * A number of "decimals" precision.
     * <p>
     * This MUST match the `decimals` value for the token identified by the
     * `tokenId` field.
     */
    uint32 decimals = 3;
}

/**
 * A set of token balance values.
 *
 * Each entry describes the balance the enclosing account holds for a specific
 * token. The balance is an amount for a fungible/common token or a count for
 * a non-fungible/unique token.
 */
message TokenBalances {
    /**
     * A list of token balance values.<br/>
     * Each entry represents a single account balance for a single token.
     */
    repeated TokenBalance tokenBalances = 1;
}

/**
 * An association between a token and an account.
 *
 * An account must be associated with a token before that account can transact
 * in (send or receive) that token.
 */
message TokenAssociation {
    /**
     * A token identifier for the associated token.
     */
    TokenID token_id = 1;

    /**
     * An account identifier for the associated account.
     */
    AccountID account_id = 2;
}

/**
 * Staking information for an account or a contract.
 *
 * This is used for responses returned from `CryptoGetInfo` or
 * `ContractGetInfo` queries.
 */
message StakingInfo {

    /**
     * A flag indicating that the holder of this account has chosen to decline
     * staking rewards.
     */
    bool decline_reward = 1;

    /**
     * A `Timestamp` of the start time for the latest active staking period.
     * <p>
     * This MUST be a period during which either the staking settings for this
     * account or contract changed or the account or contract received staking
     * rewards, whichever is later. Examples of a change in staking settings
     * include starting staking or changing the staked_node_id.<br/>
     * If this account or contract is not currently staked to a node, then this
     * field SHALL NOT be set.
     */
    Timestamp stake_period_start = 2;

    /**
     * An amount, in tinybar, to be received in the next reward payout.<br/>
     * Rewards are not paid out immediately; for efficiency reasons rewards are
     * only paid out as part of another transaction involving that account.
     */
    int64 pending_reward = 3;

    /**
     * A proxy-staked balance.<br/>
     * The total HBAR balance of all accounts that delegate staking to this
     * account or contract.
     */
    int64 staked_to_me = 4;

    oneof staked_id {
        /**
         * A delegated stake.
         * <p>
         * This account delegates to the indicated account for staking purposes.
         */
        AccountID staked_account_id = 5;

        /**
         * A direct stake.
         * <p>
         * This accounts stakes its balance to the designated node.
         */
        int64 staked_node_id = 6;
    }
}

/**
 * A unique, composite, identifier for a pending airdrop.
 *
 * Each pending airdrop SHALL be uniquely identified by
 * a `PendingAirdropId`.<br/>
 * A `PendingAirdropId` SHALL be recorded when created and MUST be provided in
 * any transaction that would modify that pending airdrop
 * (such as a `claimAirdrop` or `cancelAirdrop`).
 */
message PendingAirdropId {
    /**
     * A sending account.
     * <p>
     * This is the account that initiated, and SHALL fund,
     * this pending airdrop.<br/>
     * This field is REQUIRED.
     */
    AccountID sender_id = 1;

    /**
     * A receiving account.
     * <p>
     * This is the ID of the account that SHALL receive the airdrop.<br/>
     * This field is REQUIRED.
     */
    AccountID receiver_id = 2;

    oneof token_reference {
        /**
         * A token identifier.<br/>
         * This is the type of token for a fungible/common token airdrop.
         * <p>
         * This field is REQUIRED for a fungible/common token and MUST NOT
         * be used for a non-fungible/unique token.
         */
        TokenID fungible_token_type = 3;

        /**
         * The id of a single NFT<br/>
         * This is the type of token for a non-fungible/unique token airdrop
         * and consists of a Token ID and serial number.
         * <p>
         * This field is REQUIRED for a non-fungible/unique token and
         * MUST NOT be used for a fungible/common token.
         */
        NftID non_fungible_token = 4;
    }
}

/**
 * A single pending airdrop value.
 *
 * This message SHALL record the airdrop amount for a
 * fungible/common token.<br/>
 * This message SHOULD be null for a non-fungible/unique token.<br/>
 * If a non-null `PendingAirdropValue` is set for a non-fungible/unique
 * token, the amount field MUST be `0`.
 *
 * It is RECOMMENDED that implementations store pending airdrop information
 * as a key-value map from `PendingAirdropId` to `PendingAirdropValue`, with
 * a `null` value used for non-fungible pending airdrops.
 */
message PendingAirdropValue {
    /**
     * An amount to transfer for fungible/common tokens.<br/>
     * This is expressed in the smallest available units for that token
     * (i.e. 10<sup>-`decimals`</sup> whole tokens).
     * <p>
     * This amount SHALL be transferred from the sender to the receiver,
     * if claimed.<br/>
     * If the token is a fungible/common token, this value MUST be strictly
     * greater than `0`.<br/>
     * If the token is a non-fungible/unique token, this message SHOULD NOT
     * be set, and if set, this field MUST be `0`.
     */
    uint64 amount = 1;
}
```

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

## Solidity Interface Functions

### cryptoTransfer

Signature:

```solidity
function cryptoTransfer(TransferList memory transferList, TokenTransferList[] memory tokenTransfers)
        external
        returns (int64 responseCode);
```

### mintToken

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

### burnToken

Signature:

```solidity
function burnToken(
        address token,
        int64 amount,
        int64[] memory serialNumbers
    ) external returns (int64 responseCode, int64 newTotalSupply);
```

### associateTokens

Signature:

```solidity
function associateTokens(address account, address[] memory tokens)
        external
        returns (int64 responseCode);
```

### associateToken

Signature:

```solidity
function associateToken(address account, address token)
        external
        returns (int64 responseCode);
```

### dissociateTokens

Signature:

```solidity
function dissociateTokens(address account, address[] memory tokens)
        external
        returns (int64 responseCode);
```

### dissociateToken

Signature:

```solidity
function dissociateToken(address account, address token)
        external
        returns (int64 responseCode);
```

### createFungibleToken

Signature:

```solidity
function createFungibleToken(
        HederaToken memory token,
        int64 initialTotalSupply,
        int32 decimals
    ) external payable returns (int64 responseCode, address tokenAddress);
```

### createFungibleTokenWithCustomFees

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

### createNonFungibleToken

Signature:

```solidity
function createNonFungibleToken(HederaToken memory token)
        external
        payable
        returns (int64 responseCode, address tokenAddress);
```

### createNonFungibleTokenWithCustomFees

Signature:

```solidity
function createNonFungibleTokenWithCustomFees(
        HederaToken memory token,
        FixedFee[] memory fixedFees,
        RoyaltyFee[] memory royaltyFees
    ) external payable returns (int64 responseCode, address tokenAddress);
```

### transferTokens

Signature:

```solidity
function transferTokens(
        address token,
        address[] memory accountId,
        int64[] memory amount
    ) external returns (int64 responseCode);
```

### transferNFTs

Signature:

```solidity
function transferNFTs(
        address token,
        address[] memory sender,
        address[] memory receiver,
        int64[] memory serialNumber
    ) external returns (int64 responseCode);
```

### transferToken

Signature:

```solidity
function transferToken(
        address token,
        address sender,
        address recipient,
        int64 amount
    ) external returns (int64 responseCode);
```

### transferNFT

Signature:

```solidity
function transferNFT(
        address token,
        address sender,
        address recipient,
        int64 serialNumber
    ) external returns (int64 responseCode);
```

### approve

Signature:

```solidity
function approve(
        address token,
        address spender,
        uint256 amount
    ) external returns (int64 responseCode);
```

### transferFrom

Signature:

```solidity
function transferFrom(address token, address from, address to, uint256 amount) external returns (int64 responseCode);
```

### allowance

Signature:

```solidity
function allowance(
        address token,
        address owner,
        address spender
    ) external returns (int64 responseCode, uint256 allowance);
```

### approveNFT

Signature:

```solidity
function approveNFT(
        address token,
        address approved,
        uint256 serialNumber
    ) external returns (int64 responseCode);
```

### transferFromNFT

Signature:

```solidity
function transferFromNFT(address token, address from, address to, uint256 serialNumber) external returns (int64 responseCode);
```

### getApproved

Signature:

```solidity
function getApproved(address token, uint256 serialNumber)
        external
        returns (int64 responseCode, address approved);
```

### setApprovalForAll

Signature:

```solidity
function setApprovalForAll(
        address token,
        address operator,
        bool approved
    ) external returns (int64 responseCode);
```

### isApprovedForAll

Signature:

```solidity
function isApprovedForAll(
        address token,
        address owner,
        address operator
    ) external returns (int64 responseCode, bool approved);
```

### isFrozen

Signature:

```solidity
function isFrozen(address token, address account)
        external
        returns (int64 responseCode, bool frozen);
```

### isKyc

Signature:

```solidity
function isKyc(address token, address account)
        external
        returns (int64 responseCode, bool kycGranted);
```

### deleteToken

Signature:

```solidity
function deleteToken(address token) external returns (int64 responseCode);
```

### getTokenCustomFees

Signature:

```solidity
function getTokenCustomFees(address token)
        external
        returns (int64 responseCode, FixedFee[] memory fixedFees, FractionalFee[] memory fractionalFees, RoyaltyFee[] memory royaltyFees);
```

### getTokenDefaultFreezeStatus

Signature:

```solidity
function getTokenDefaultFreezeStatus(address token)
        external
        returns (int64 responseCode, bool defaultFreezeStatus);
```

### getTokenDefaultKycStatus

Signature:

```solidity
function getTokenDefaultKycStatus(address token)
        external
        returns (int64 responseCode, bool defaultKycStatus);
```

### getTokenExpiryInfo

Signature:

```solidity
function getTokenExpiryInfo(address token)
        external
        returns (int64 responseCode, Expiry memory expiry);
```

### getFungibleTokenInfo

Signature:

```solidity
function getFungibleTokenInfo(address token)
        external
        returns (int64 responseCode, FungibleTokenInfo memory fungibleTokenInfo);
```

### getTokenInfo

Signature:

```solidity
function getTokenInfo(address token)
        external
        returns (int64 responseCode, TokenInfo memory tokenInfo);
```

### getTokenKey

Signature:

```solidity
function getTokenKey(address token, uint keyType)
        external
        returns (int64 responseCode, KeyValue memory key);
```

### getNonFungibleTokenInfo

Signature:

```solidity
function getNonFungibleTokenInfo(address token, int64 serialNumber)
        external
        returns (int64 responseCode, NonFungibleTokenInfo memory nonFungibleTokenInfo);
```

### freezeToken

Signature:

```solidity
function freezeToken(address token, address account)
        external
        returns (int64 responseCode);
```

### unfreezeToken

Signature:

```solidity
function unfreezeToken(address token, address account)
        external
        returns (int64 responseCode);
```

### grantTokenKyc

Signature:

```solidity
function grantTokenKyc(address token, address account)
        external
        returns (int64 responseCode);
```

### revokeTokenKyc

Signature:

```solidity
function revokeTokenKyc(address token, address account)
        external
        returns (int64 responseCode);
```

### pauseToken

Signature:

```solidity
function pauseToken(address token) external returns (int64 responseCode);
```

### unpauseToken

Signature:

```solidity
function unpauseToken(address token) external returns (int64 responseCode);
```

### wipeTokenAccount

Signature:

```solidity
function wipeTokenAccount(
        address token,
        address account,
        int64 amount
    ) external returns (int64 responseCode);
```

### wipeTokenAccountNFT

Signature:

```solidity
function wipeTokenAccountNFT(
        address token,
        address account,
        int64[] memory serialNumbers
    ) external returns (int64 responseCode);
```

### updateTokenInfo

Signature:

```solidity
function updateTokenInfo(address token, HederaToken memory tokenInfo)
        external
        returns (int64 responseCode);
```

### updateTokenExpiryInfo

Signature:

```solidity
function updateTokenExpiryInfo(address token, Expiry memory expiryInfo)
        external
        returns (int64 responseCode);
```

### updateTokenKeys

Signature:

```solidity
function updateTokenKeys(address token, TokenKey[] memory keys)
        external
        returns (int64 responseCode);
```

### isToken

Signature:

```solidity
function isToken(address token)
        external returns
        (int64 responseCode, bool isToken);
```

### getTokenType

Signature:

```solidity
function getTokenType(address token)
        external returns
        (int64 responseCode, int32 tokenType);
```

### redirectForToken

Signature:

```solidity
function redirectForToken(address token, bytes memory encodedFunctionSelector) external returns (int64 responseCode, bytes memory response);
```

### updateFungibleTokenCustomFees

Signature:

```solidity
function updateFungibleTokenCustomFees(address token,  IHederaTokenService.FixedFee[] memory fixedFees, IHederaTokenService.FractionalFee[] memory fractionalFees) external returns (int64 responseCode);
```

### updateNonFungibleTokenCustomFees

Signature:

```solidity
function updateNonFungibleTokenCustomFees(address token, IHederaTokenService.FixedFee[] memory fixedFees, IHederaTokenService.RoyaltyFee[] memory royaltyFees) external returns (int64 responseCode);
```

### airdropTokens

Signature:

```solidity
function airdropTokens(TokenTransferList[] memory tokenTransfers) external returns (int64 responseCode);
```

### cancelAirdrops

Signature:

```solidity
function cancelAirdrops(PendingAirdrop[] memory pendingAirdrops) external returns (int64 responseCode);
```

### claimAirdrops

Signature:

```solidity
function claimAirdrops(PendingAirdrop[] memory pendingAirdrops) external returns (int64 responseCode);
```

### rejectTokens

Signature:

```solidity
function rejectTokens(address rejectingAddress, address[] memory ftAddresses, NftID[] memory nftIDs) external returns (int64 responseCode);
```
