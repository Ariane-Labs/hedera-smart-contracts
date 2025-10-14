# Solidity Interface Documentation: IHRC904TokenFacade

Generated on 2025-10-14T12:10:36.683Z

Source: contracts/token-service/IHRC904TokenFacade.sol

## Table of Contents

- [Protobuf Definitions](#protobuf-definitions)
  - [token_cancel_airdrop.proto](#token_cancel_airdropproto)
  - [token_claim_airdrop.proto](#token_claim_airdropproto)
  - [token_reject.proto](#token_rejectproto)
- [Solidity Interface Functions](#functions)
  - [cancelAirdropFT](#cancelairdropft)
  - [cancelAirdropNFT](#cancelairdropnft)
  - [claimAirdropFT](#claimairdropft)
  - [claimAirdropNFT](#claimairdropnft)
  - [rejectTokenFT](#rejecttokenft)
  - [rejectTokenNFTs](#rejecttokennfts)

## Protobuf Definitions

Using Protobuf package: @hashgraph/proto v2.20.0
Protobufs for the Hiero SDK

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

## Solidity Interface Functions

### cancelAirdropFT

Signature:

```solidity
function cancelAirdropFT(address receiverAddress) external returns (int64 responseCode);
```

### cancelAirdropNFT

Signature:

```solidity
function cancelAirdropNFT(address receiverAddress, int64 serialNumber) external returns (int64 responseCode);
```

### claimAirdropFT

Signature:

```solidity
function claimAirdropFT(address senderAddress) external returns (int64 responseCode);
```

### claimAirdropNFT

Signature:

```solidity
function claimAirdropNFT(address senderAddress, int64 serialNumber) external returns (int64 responseCode);
```

### rejectTokenFT

Signature:

```solidity
function rejectTokenFT() external returns (int64 responseCode);
```

### rejectTokenNFTs

Signature:

```solidity
function rejectTokenNFTs(int64[] memory serialNumbers) external returns (int64 responseCode);
```
