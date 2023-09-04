/*-
 *
 * Hedera Smart Contracts
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { Contract } from 'ethers';
import { isAddress } from 'ethers';
import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CommonErrorToast } from '@/components/toast/CommonToast';
import MultiLineMethod from '@/components/common/MultiLineMethod';
import { erc721Transfers } from '@/api/hedera/erc721-interactions';
import { TransactionResult } from '@/types/contract-interactions/HTS';
import { convertCalmelCaseFunctionName } from '@/utils/common/helpers';
import { handleAPIErrors } from '@/components/contract-interaction/hts/shared/methods/handleAPIErrors';
import { useUpdateTransactionResultsToLocalStorage } from '@/components/contract-interaction/hts/shared/hooks/useUpdateLocalStorage';
import { handleRetrievingTransactionResultsFromLocalStorage } from '@/components/contract-interaction/hts/shared/methods/handleRetrievingTransactionResultsFromLocalStorage';
import {
  safeTransferFromERC721ParamFields,
  transferFromERC721ParamFields,
} from '@/utils/contract-interactions/erc/erc721/constant';

interface PageProps {
  baseContract: Contract;
}

const ERC721Transfer = ({ baseContract }: PageProps) => {
  const toaster = useToast();
  const transactionResultStorageKey = 'HEDERA.EIP.ERC-20.TOKEN-TRANSFER-RESULTS';
  const [transactionResults, setTransactionResults] = useState<TransactionResult[]>([]);

  const [transferFromParams, setTransferFromParams] = useState({
    sender: '',
    recipient: '',
    tokenId: '',
  });
  const [safeTransferFromParams, setSafeTransferFromParams] = useState({
    sender: '',
    recipient: '',
    tokenId: '',
    data: '',
  });

  const [methodState, setMethodStates] = useState({
    TRANSFER_FROM: {
      isSuccessful: false,
      isLoading: false,
    },
    SAFE_TRANSFER_FROM: {
      isSuccessful: false,
      isLoading: false,
    },
  });

  /** @dev retrieve token creation results from localStorage to maintain data on re-renders */
  useEffect(() => {
    handleRetrievingTransactionResultsFromLocalStorage(
      toaster,
      transactionResultStorageKey,
      undefined,
      setTransactionResults
    );
  }, [toaster]);

  /** @dev handle execute methods */
  const handleExecutingMethods = async (
    method: 'TRANSFER_FROM' | 'SAFE_TRANSFER_FROM',
    params: any,
    setParams: any
  ) => {
    // sanitize params & toast error invalid params
    let paramErrDescription;
    if (method === 'TRANSFER_FROM' && !isAddress(params.sender)) {
      paramErrDescription = 'Sender address is not a valid address';
    } else if (!isAddress(params.recipient)) {
      paramErrDescription = 'Recipient address is not a valid address';
    }
    if (paramErrDescription) {
      CommonErrorToast({
        toaster,
        title: 'Invalid parameters',
        description: paramErrDescription,
      });
      return;
    }

    // turn on isLoading
    setMethodStates((prev) => ({ ...prev, [method]: { ...prev[method], isLoading: true } }));

    // invoke method API
    const tokenTransferRes = await erc721Transfers(
      baseContract,
      method,
      params.sender,
      params.recipient,
      params.tokenId,
      params.data || ''
    );

    // turn off isLoading
    setMethodStates((prev) => ({ ...prev, [method]: { ...prev[method], isLoading: false } }));

    // handle error
    if (tokenTransferRes.err) {
      handleAPIErrors({
        toaster,
        setTransactionResults,
        err: tokenTransferRes.err,
        transactionHash: tokenTransferRes.txHash,
        transactionType: `ERC721-${convertCalmelCaseFunctionName(method).replace(' ', '-')}`,
      });
      return;
    } else {
      // turn isSuccessful on
      setMethodStates((prev) => ({ ...prev, [method]: { ...prev[method], isSuccessful: true } }));

      setTransactionResults((prev) => [
        ...prev,
        {
          status: 'sucess',
          transactionTimeStamp: Date.now(),
          txHash: tokenTransferRes.txHash as string,
          transactionType: `ERC721-${convertCalmelCaseFunctionName(method)
            .toUpperCase()
            .replace(' ', '-')}`,
        },
      ]);
    }
  };

  /** @dev listen to change event on transactionResults state => load to localStorage  */
  useUpdateTransactionResultsToLocalStorage(transactionResults, transactionResultStorageKey);

  // toast successful
  useEffect(() => {
    if (methodState.TRANSFER_FROM.isSuccessful || methodState.SAFE_TRANSFER_FROM.isSuccessful) {
      toaster({
        title: 'Transfer successful 🎉',
        description: 'A new balance has been set for the recipient',
        status: 'success',
        position: 'top',
      });
      if (methodState.TRANSFER_FROM.isSuccessful) {
        setTransferFromParams({ sender: '', recipient: '', tokenId: '' });
        setMethodStates((prev) => ({
          ...prev,
          TRANSFER_FROM: { ...prev.TRANSFER_FROM, isSuccessful: false },
        }));
      } else if (methodState.SAFE_TRANSFER_FROM.isSuccessful) {
        setSafeTransferFromParams({ sender: '', recipient: '', tokenId: '', data: '' });
        setMethodStates((prev) => ({
          ...prev,
          SAFE_TRANSFER_FROM: { ...prev.SAFE_TRANSFER_FROM, isSuccessful: false },
        }));
      }
    }
  }, [methodState, toaster]);

  return (
    <div className="w-full mx-3 flex">
      {/* wrapper */}
      <div className="w-full flex gap-12 justify-between items-end">
        {/* transferFrom() */}
        <MultiLineMethod
          paramFields={transferFromERC721ParamFields}
          methodName={'Transfer'}
          params={transferFromParams}
          widthSize="w-[360px]"
          setParams={setTransferFromParams}
          isLoading={methodState.TRANSFER_FROM.isLoading}
          handleExecute={() =>
            handleExecutingMethods('TRANSFER_FROM', transferFromParams, setTransferFromParams)
          }
          explanation="Moves `amount` tokens from the caller’s account to `recipient`."
        />

        {/* safeTransferFrom() */}
        <MultiLineMethod
          paramFields={safeTransferFromERC721ParamFields}
          methodName={'Transfer From'}
          widthSize="w-[360px]"
          params={safeTransferFromParams}
          setParams={setSafeTransferFromParams}
          isLoading={methodState.SAFE_TRANSFER_FROM.isLoading}
          handleExecute={() =>
            handleExecutingMethods(
              'SAFE_TRANSFER_FROM',
              safeTransferFromParams,
              setSafeTransferFromParams
            )
          }
          explanation="Moves amount tokens from `token owner` to `recipient` using the allowance mechanism. `Token amount` is then deducted from the caller’s allowance."
        />
      </div>
    </div>
  );
};

export default ERC721Transfer;
