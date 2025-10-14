# Solidity Interface Documentation: IHRC756

Generated on 2025-10-14T12:10:36.672Z

Source: contracts/schedule-service/IHRC756.sol

## Table of Contents
- [Protobuf Definitions](#protobuf-definitions)
  - [schedule_create.proto](#schedule_createproto)
  - [schedule_get_info.proto](#schedule_get_infoproto)
- [Solidity Interface Functions](#functions)
  - [scheduleNative](#schedulenative)
  - [getScheduledCreateFungibleTokenInfo](#getscheduledcreatefungibletokeninfo)
  - [getScheduledCreateNonFungibleTokenInfo](#getscheduledcreatenonfungibletokeninfo)

## Protobuf Definitions

Using Protobuf package: @hashgraph/proto v2.20.0
Protobufs for the Hiero SDK

### schedule_create.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/schedule_create.proto](../../node_modules/@hashgraph/proto/src/proto/services/schedule_create.proto)

```proto
/**
 * # Schedule Create
 * Message to create a schedule, which is an instruction to execute some other
 * transaction (the scheduled transaction) at a future time, either when
 * enough signatures are gathered (short term) or when the schedule expires
 * (long term). In all cases the scheduled transaction is not executed if
 * signature requirements are not met before the schedule expires.
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
// <<<pbj.java_package = "com.hedera.hapi.node.scheduled">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";
import "services/timestamp.proto";
import "services/schedulable_transaction_body.proto";

/**
 * Create a new Schedule.
 *
 * #### Requirements
 * This transaction SHALL create a new _schedule_ entity in network state.<br/>
 * The schedule created SHALL contain the `scheduledTransactionBody` to be
 * executed.<br/>
 * If successful the receipt SHALL contain a `scheduleID` with the full
 * identifier of the schedule created.<br/>
 * When a schedule _executes_ successfully, the receipt SHALL include a
 * `scheduledTransactionID` with the `TransactionID` of the transaction that
 * executed.<br/>
 * When a scheduled transaction is executed the network SHALL charge the
 * regular _service_ fee for the transaction to the `payerAccountID` for
 * that schedule, but SHALL NOT charge node or network fees.<br/>
 * If the `payerAccountID` field is not set, the effective `payerAccountID`
 * SHALL be the `payer` for this create transaction.<br/>
 * If an `adminKey` is not specified, or is an empty `KeyList`, the schedule
 * created SHALL be immutable.<br/>
 * An immutable schedule MAY be signed, and MAY execute, but SHALL NOT be
 * deleted.<br/>
 * If two schedules have the same values for all fields except `payerAccountID`
 * then those two schedules SHALL be deemed "identical".<br/>
 * If a `scheduleCreate` requests a new schedule that is identical to an
 * existing schedule, the transaction SHALL fail and SHALL return a status
 * code of `IDENTICAL_SCHEDULE_ALREADY_CREATED` in the receipt.<br/>
 * The receipt for a duplicate schedule SHALL include the `ScheduleID` of the
 * existing schedule and the `TransactionID` of the earlier `scheduleCreate`
 * so that the earlier schedule may be queried and/or referred to in a
 * subsequent `scheduleSign`.
 *
 * #### Signature Requirements
 * A `scheduleSign` transaction SHALL be used to add additional signatures
 * to an existing schedule.<br/>
 * Each signature SHALL "activate" the corresponding cryptographic("primitive")
 * key for that schedule.<br/>
 * Signature requirements SHALL be met when the set of active keys includes
 * all keys required by the scheduled transaction.<br/>
 * A scheduled transaction for a "long term" schedule SHALL NOT execute if
 * the signature requirements for that transaction are not met when the
 * network consensus time reaches the schedule `expiration_time`.<br/>
 * A "short term" schedule SHALL execute immediately once signature
 * requirements are met. This MAY be immediately when created.
 *
 * #### Long Term Schedules
 * A "short term" schedule SHALL have the flag `wait_for_expiry` _unset_.<br/>
 * A "long term" schedule SHALL have the flag  `wait_for_expiry` _set_.<br/>
 * A "long term" schedule SHALL NOT be accepted if the network configuration
 * `scheduling.longTermEnabled` is not enabled.<br/>
 * A "long term" schedule SHALL execute when the current consensus time
 * matches or exceeds the `expiration_time` for that schedule, if the
 * signature requirements for the scheduled transaction
 * are met at that instant.<br/>
 * A "long term" schedule SHALL NOT execute before the current consensus time
 * matches or exceeds the `expiration_time` for that schedule.<br/>
 * A "long term" schedule SHALL expire, and be removed from state, after the
 * network consensus time exceeds the schedule `expiration_time`.<br/>
 * A short term schedule SHALL expire, and be removed from state,
 * after the network consensus time exceeds the current network
 * configuration for `ledger.scheduleTxExpiryTimeSecs`.
 *
 * > Note
 * >> Long term schedules are not (as of release 0.56.0) enabled. Any schedule
 * >> created currently MUST NOT set the `wait_for_expiry` flag.<br/>
 * >> When long term schedules are not enabled, schedules SHALL NOT be
 * >> executed at expiration, and MUST meet signature requirements strictly
 * >> before expiration to be executed.
 *
 * ### Block Stream Effects
 * If the scheduled transaction is executed immediately, the transaction
 * record SHALL include a `scheduleRef` with the schedule identifier of the
 * schedule created.
 */
message ScheduleCreateTransactionBody {
    /**
     * A scheduled transaction.
     * <p>
     * This value is REQUIRED.<br/>
     * This transaction body MUST be one of the types enabled in the
     * network configuration value `scheduling.whitelist`.
     */
    SchedulableTransactionBody scheduledTransactionBody = 1;

    /**
     * A short description of the schedule.
     * <p>
     * This value, if set, MUST NOT exceed `transaction.maxMemoUtf8Bytes`
     * (default 100) bytes when encoded as UTF-8.
     */
    string memo = 2;

    /**
     * A `Key` required to delete this schedule.
     * <p>
     * If this is not set, or is an empty `KeyList`, this schedule SHALL be
     * immutable and SHALL NOT be deleted.
     */
    Key adminKey = 3;

    /**
     * An account identifier of a `payer` for the scheduled transaction.
     * <p>
     * This value MAY be unset. If unset, the `payer` for this `scheduleCreate`
     * transaction SHALL be the `payer` for the scheduled transaction.<br/>
     * If this is set, the identified account SHALL be charged the fees
     * required for the scheduled transaction when it is executed.<br/>
     * If the actual `payer` for the _scheduled_ transaction lacks
     * sufficient HBAR balance to pay service fees for the scheduled
     * transaction _when it executes_, the scheduled transaction
     * SHALL fail with `INSUFFICIENT_PAYER_BALANCE`.<br/>
     */
    AccountID payerAccountID = 4;

    /**
     * An expiration time.
     * <p>
     * If not set, the expiration SHALL default to the current consensus time
     * advanced by either the network configuration value
     * `scheduling.maxExpirationFutureSeconds`, if `wait_for_expiry` is set and
     * "long term" schedules are enabled, or the network configuration value
     * `ledger.scheduleTxExpiryTimeSecs` otherwise.
     */
    Timestamp expiration_time = 5;

    /**
     * A flag to delay execution until expiration.
     * <p>
     * If this flag is set the scheduled transaction SHALL NOT be evaluated for
     * execution before the network consensus time matches or exceeds the
     * `expiration_time`.<br/>
     * If this flag is not set, the scheduled transaction SHALL be executed
     * immediately when all required signatures are received, whether in this
     * `scheduleCreate` transaction or a later `scheduleSign` transaction.<br/>
     * This value SHALL NOT be used and MUST NOT be set when the network
     * configuration value `scheduling.longTermEnabled` is not enabled.
     */
    bool wait_for_expiry = 13;
}
```

### schedule_get_info.proto

Source: [../../node_modules/@hashgraph/proto/src/proto/services/schedule_get_info.proto](../../node_modules/@hashgraph/proto/src/proto/services/schedule_get_info.proto)

```proto
/**
 * # Schedule Get Information
 * Query body and response to retrieve information about a scheduled
 * transaction.
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
// <<<pbj.java_package = "com.hedera.hapi.node.scheduled">>> This comment is special code for setting PBJ Compiler java package
option java_multiple_files = true;

import "services/basic_types.proto";
import "services/timestamp.proto";
import "services/query_header.proto";
import "services/response_header.proto";
import "services/schedulable_transaction_body.proto";

/**
 * Request for information about a scheduled transaction.
 *
 * If the requested schedule does not exist, the network SHALL respond
 * with `INVALID_SCHEDULE_ID`.
 */
message ScheduleGetInfoQuery {
    /**
     * Standard information sent with every query operation.<br/>
     * This includes the signed payment and what kind of response is requested
     * (cost, state proof, both, or neither).
     */
    QueryHeader header = 1;

    /**
     * A schedule identifier.
     * <p>
     * This SHALL identify the schedule to retrieve.<br/>
     * This field is REQUIRED.
     */
    ScheduleID scheduleID = 2;
}

/**
 * Information summarizing schedule state
 */
message ScheduleInfo {
    /**
     * A schedule identifier.
     * <p>
     * This SHALL identify the schedule retrieved.
     */
    ScheduleID scheduleID = 1;

    oneof data {
        /**
         * A deletion timestamp.
         * <p>
         * If the schedule was deleted, this SHALL be set to the consensus
         * timestamp of the `deleteSchedule` transaction.<br/>
         * If the schedule is _not_ deleted, this field SHALL NOT be set.
         */
        Timestamp deletion_time = 2;

        /**
         * An execution timestamp.
         * <p>
         * If the schedule was completed, and the _scheduled_ transaction
         * executed, this SHALL be set to the consensus timestamp of the
         * transaction that initiated that execution.<br/>
         * If the schedule is _not_ complete, this field SHALL NOT be set.
         */
        Timestamp execution_time = 3;
    }

    /**
     * An expiration timestamp.<br/>
     * This represents the time at which the schedule will expire. For a
     * long-term schedule (if enabled) this is when the schedule will be
     * executed, assuming it meets signature requirements at that time.
     * For a short-term schedule, this is the deadline to complete the
     * signature requirements for the scheduled transaction to execute.
     * Regardless of schedule type, the schedule will be removed from
     * state when it expires.
     * <p>
     * A schedule SHALL be removed from state when it expires.<br/>
     * A short-term schedule MUST meet signature requirements strictly
     * before expiration or it SHALL NOT be executed.<br/>
     * A long-term schedule SHALL be executed if, and only if, all signature
     * requirements for the scheduled transaction are met at expiration.<br/>
     * A long-term schedule SHALL NOT be executed if any signature requirement
     * for the scheduled transaction are not met at expiration.<br/>
     */
    Timestamp expirationTime = 4;

    /**
     * A scheduled transaction.
     * <p>
     * This SHALL be a transaction type enabled in the network property
     * `scheduling.whitelist`, and SHALL NOT be any other
     * transaction type.<br/>
     * This transaction SHALL be executed if the schedule meets all signature
     * and execution time requirements for this transaction.<br/>
     * The signature requirements for this transaction SHALL be evaluated
     * at schedule creation, SHALL be reevaluated with each `signSchedule`
     * transaction, and, for long-term schedules, SHALL be reevaluated when
     * the schedule expires.<br/>
     */
    SchedulableTransactionBody scheduledTransactionBody = 5;

    /**
     * A short description for this schedule.
     * <p>
     * This value, if set, MUST NOT exceed `transaction.maxMemoUtf8Bytes`
     * (default 100) bytes when encoded as UTF-8.
     */
    string memo = 6;

    /**
     * The key used to delete the schedule from state
     */
    Key adminKey = 7;

    /**
     * A list of "valid" signatures for this schedule.<br/>
     * This list contains only "primitive" (i.e. cryptographic or contract)
     * signatures. The full signature requirements for the scheduled
     * transaction are evaluated as if this list of keys had signed the
     * scheduled transaction directly.
     * <p>
     * This list SHALL contain every "primitive" key that has signed the
     * original `createSchedule`, or any subsequent
     * `signSchedule` transaction.<br/>
     * This list MAY elide any signature not likely to be required by the
     * scheduled transaction. Such requirement SHOULD be evaluated when the
     * signature is presented (i.e. during evaluation of a `createSchedule` or
     * `signSchedule` transaction).
     */
    KeyList signers = 8;

    /**
     * An account identifier.
     * <p>
     * This SHALL identify the account that created this schedule.
     */
    AccountID creatorAccountID = 9;

    /**
     * An account identifier.
     * <p>
     * The identified account SHALL pay the full transaction fee for the
     * scheduled transaction _when it executes_.
     */
    AccountID payerAccountID = 10;

    /**
     * A transaction identifier.
     * <p>
     * This SHALL be recorded as the transaction identifier for the
     * _scheduled_ transaction, if (and when) it is executed.
     */
    TransactionID scheduledTransactionID = 11;

    /**
     * The ledger ID of the network that generated this response.
     * <p>
     * This value SHALL identify the distributed ledger that responded to
     * this query.
     */
    bytes ledger_id = 12;

    /**
     * A flag indicating this schedule will execute when it expires.
     * <p>
     * If this field is set
     * <ul>
     *   <li>This schedule SHALL be considered a "long-term" schedule.</li>
     *   <li>This schedule SHALL be evaluated when the network consensus time
     *       reaches the `expirationTime`, and if the signature requirements
     *       for the scheduled transaction are met at that time, the
     *       scheduled transaction SHALL be executed.</li>
     *   <li>This schedule SHALL NOT be executed before the network consensus
     *       time reaches the `expirationTime`.</li>
     * </ul>
     * If this field is not set
     * <ul>
     *   <li>This schedule SHALL be considered a "short-term" schedule.</li>
     *   <li>This schedule SHALL be evaluated when created, and reevaluated
     *       with each `signSchedule` transaction, and if the signature
     *       requirements for the scheduled transaction are met at that time,
     *       the scheduled transaction SHALL be executed immediately.</li>
     *   <li>This schedule SHALL be executed as soon as the signature
     *       requirements are met, and MUST be executed before the network
     *       consensus time reaches the `expirationTime`, if at all.</li>
     * </ul>
     */
    bool wait_for_expiry = 13;
}

/**
 * A response message for a `getScheduleInfo` query.
 */
message ScheduleGetInfoResponse {
    /**
     * The standard response information for queries.<br/>
     * This includes the values requested in the `QueryHeader`
     * (cost, state proof, both, or neither).
     */
    ResponseHeader header = 1;

    /**
     * Detail information for a schedule.
     * <p>
     * This field SHALL contain all available schedule detail.
     */
    ScheduleInfo scheduleInfo = 2;
}
```

## Solidity Interface Functions
### scheduleNative

Signature:

```solidity
function scheduleNative(address systemContractAddress, bytes memory callData, address payer) external returns (int64 responseCode, address scheduleAddress);
```

### getScheduledCreateFungibleTokenInfo

Signature:

```solidity
function getScheduledCreateFungibleTokenInfo(address scheduleAddress) external returns (int64 responseCode, IHederaTokenService.FungibleTokenInfo memory fungibleTokenInfo);
```

### getScheduledCreateNonFungibleTokenInfo

Signature:

```solidity
function getScheduledCreateNonFungibleTokenInfo(address scheduleAddress) external returns (int64 responseCode, IHederaTokenService.NonFungibleTokenInfo memory nonFungibleTokenInfo);
```
