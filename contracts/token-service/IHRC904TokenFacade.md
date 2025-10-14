# Solidity Interface Documentation: IHRC904TokenFacade

Generated on 2025-10-14T10:17:35.640Z

Source: contracts/token-service/IHRC904TokenFacade.sol

## Table of Contents
- [Functions](#functions)
- [Related Protobuf Files](#related-protobuf-files)

## Functions
### cancelAirdropFT

@notice Cancels a pending fungible token airdrop to a specific receiver
@notice Responsible service: HTS
@param receiverAddress The address of the receiver whose airdrop should be cancelled
@return responseCode The response code indicating the result of the operation

Signature:

```solidity
function cancelAirdropFT(address receiverAddress) external returns (int64 responseCode);

    /// @notice Cancels a pending non-fungible token airdrop to a specific receiver
    /// @notice Responsible service: HTS
    /// @param receiverAddress The address of the receiver whose airdrop should be cancelled
    /// @param serialNumber The serial number of the NFT to cancel
    /// @return responseCode The response code indicating the result of the operation
    function cancelAirdropNFT(address receiverAddress, int64 serialNumber) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| receiverAddress | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### claimAirdropFT

@notice Claims a pending fungible token airdrop from a specific sender
@notice Responsible service: HTS
@param senderAddress The address of the sender whose airdrop should be claimed
@return responseCode The response code indicating the result of the operation

Signature:

```solidity
function claimAirdropFT(address senderAddress) external returns (int64 responseCode);

    /// @notice Claims a pending non-fungible token airdrop from a specific sender
    /// @notice Responsible service: HTS
    /// @param senderAddress The address of the sender whose airdrop should be claimed
    /// @param serialNumber The serial number of the NFT to claim
    /// @return responseCode The response code indicating the result of the operation
    function claimAirdropNFT(address senderAddress, int64 serialNumber) external returns (int64 responseCode);
```

Parameters:

| Name | Type |
|-----:|:-----|
| senderAddress | address |

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

### rejectTokenFT

@notice Rejects all pending fungible token airdrops
@notice Responsible service: HTS
@return responseCode The response code indicating the result of the operation

Signature:

```solidity
function rejectTokenFT() external returns (int64 responseCode);

    /// @notice Rejects pending non-fungible token airdrops for specific serial numbers
    /// @notice Responsible service: HTS
    /// @param serialNumbers Array of NFT serial numbers to reject
    /// @return responseCode The response code indicating the result of the operation
    function rejectTokenNFTs(int64[] memory serialNumbers) external returns (int64 responseCode);
```

Returns:

| Name | Type |
|-----:|:-----|
| responseCode | int64 |

## Related Protobuf Files

| Name | Link |
|-----:|:-----|
| token_cancel_airdrop.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_cancel_airdrop.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_cancel_airdrop.proto) |
| token_claim_airdrop.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_claim_airdrop.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_claim_airdrop.proto) |
| token_reject.proto | [../../node_modules/@hashgraph/proto/src/proto/services/token_reject.proto](../../node_modules/@hashgraph/proto/src/proto/services/token_reject.proto) |