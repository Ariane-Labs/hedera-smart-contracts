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

import Cookies from 'js-cookie';
import { Contract } from 'ethers';
import { useToast } from '@chakra-ui/react';
import { useState, useEffect, useMemo } from 'react';
import { CommonErrorToast } from '@/components/toast/CommonToast';
import { getArrayTypedValuesFromLocalStorage } from '@/api/localStorage';
import { createHederaFungibleToken } from '@/api/hedera/tokenCreateCustom-interactions';
import { htsTokenCreateParamFields } from '@/utils/contract-interactions/HTS/constant';
import {
  SharedFromButton,
  SharedFormInputField,
  SharedExecuteButton,
  TransactionResultTable,
  SharedSigningKeysComponent,
} from '../shared/sharedComponents';
import { handleAPIErrors, handleSanitizeHederaFormInputs } from '../shared/sharedMethods';
import {
  CommonKeyObject,
  IHederaTokenServiceKeyType,
  IHederaTokenServiceKeyValueType,
  TransactionResult,
} from '@/types/contract-interactions/HTS';

interface PageProps {
  baseContract: Contract;
}

const FungibleTokenCreate = ({ baseContract }: PageProps) => {
  // general states
  const toaster = useToast();
  const TRANSACTION_PAGE_SIZE = 10;
  const [isLoading, setIsLoading] = useState(false);
  const [withCustomFee, setWithCustomFee] = useState(false);
  const [isDefaultFreeze, setIsDefaultFreeze] = useState(false);
  const hederaNetwork = JSON.parse(Cookies.get('_network') as string);
  const transactionResultStorageKey = 'hedera_HTS_token-creation_results';
  const [currentTransactionPage, setCurrentTransactionPage] = useState(1);
  const [isCreatingTokenSuccessful, setIsCreatingTokenSuccessful] = useState(false);
  const [transactionResults, setTransactionResults] = useState<TransactionResult[]>([]);
  const tokenCreateFields = {
    info: ['name', 'symbol', 'memo'],
    supply: ['initSupply', 'maxSupply', 'decimals'],
    treasury: 'treasury',
    feeTokenAddress: 'feeTokenAddress',
  };

  const [paramValues, setParamValues] = useState<any>({
    name: '',
    symbol: '',
    memo: '',
    initSupply: '',
    maxSupply: '',
    decimals: '',
    freezeStatus: false,
    treasury: '',
    feeTokenAddress: '',
  });

  // keys states
  const HederaTokenKeyTypes: IHederaTokenServiceKeyType[] = [
    'ADMIN',
    'KYC',
    'FREEZE',
    'WIPE',
    'SUPPLY',
    'FEE',
    'PAUSE',
  ];
  const HederaTokenKeyValueType: IHederaTokenServiceKeyValueType[] = [
    'inheritAccountKey',
    'contractId',
    'ed25519',
    'ECDSA_secp256k1',
    'delegatableContractId',
  ];
  const [keys, setKeys] = useState<CommonKeyObject[]>([]); // keeps track of keys array to pass to the API
  const [chosenKeys, setChosenKeys] = useState(new Set<IHederaTokenServiceKeyType>()); // keeps track of keyTypes which have already been chosen in the list
  const [keyTypesToShow, setKeyTypesToShow] = useState(new Set(HederaTokenKeyTypes)); // keeps track of the left over keyTypes to show in the drop down

  /** @dev retrieve token creation results from localStorage to maintain data on re-renders */
  useEffect(() => {
    const { storageResult, err: storagedErr } = getArrayTypedValuesFromLocalStorage(
      transactionResultStorageKey
    );
    // handle err
    if (storagedErr) {
      CommonErrorToast({
        toaster,
        title: 'Cannot retrieve transaction results from local storage',
        description: "See client's console for more information",
      });
      return;
    }

    // update states if storageResult is found
    if (storageResult) {
      setTransactionResults(storageResult as TransactionResult[]);

      // set the current page to the last page so it can show the latest transactions
      const maxPageNum = Math.ceil(storageResult.length / TRANSACTION_PAGE_SIZE);
      setCurrentTransactionPage(maxPageNum === 0 ? 1 : maxPageNum);
    }
  }, [toaster]);

  // declare a paginatedTransactionResults
  const paginatedTransactionResults = useMemo(() => {
    const startIndex = (currentTransactionPage - 1) * TRANSACTION_PAGE_SIZE;
    const endIndex = (currentTransactionPage - 1) * TRANSACTION_PAGE_SIZE + TRANSACTION_PAGE_SIZE;
    return transactionResults.slice(startIndex, endIndex);
  }, [currentTransactionPage, transactionResults]);

  /** @dev handle form inputs on change */
  const handleInputOnChange = (e: any, param: string) => {
    setParamValues((prev: any) => ({ ...prev, [param]: e.target.value }));
  };

  /** @dev handle invoking the API to interact with smart contract and create fungible token */
  const handleCreatingFungibleToken = async () => {
    const {
      name,
      symbol,
      memo,
      initSupply,
      maxSupply,
      decimals,
      freezeStatus,
      treasury,
      feeTokenAddress,
    } = paramValues;

    // sanitize params
    const sanitizeErr = handleSanitizeHederaFormInputs({
      API: 'TokenCreate',
      name,
      symbol,
      initSupply,
      maxSupply,
      decimals,
      withCustomFee,
      feeTokenAddress,
      treasury,
      keys,
    });

    // toast error if any param is invalid
    if (sanitizeErr) {
      CommonErrorToast({ toaster, title: 'Invalid parameters', description: sanitizeErr });
      return;
    }

    // turn is loading on
    setIsLoading(true);

    // invoke createHederaFungibleToken()
    const { transactionHash, tokenAddress, err } = await createHederaFungibleToken(
      baseContract,
      name,
      symbol,
      memo,
      Number(initSupply),
      Number(maxSupply),
      Number(decimals),
      freezeStatus,
      treasury,
      keys,
      withCustomFee ? feeTokenAddress : undefined
    );

    // turn is loading off
    setIsLoading(false);

    // handle err
    if (err || !tokenAddress) {
      handleAPIErrors({ err, toaster, transactionHash, setTransactionResults });
      return;
    } else {
      // handle succesfull
      setTransactionResults((prev) => [
        ...prev,
        {
          txHash: transactionHash as string,
          tokenAddress,
          status: 'sucess',
        },
      ]);

      setIsCreatingTokenSuccessful(true);
    }
  };

  // @dev listen to change event on transactionResults state => load to localStorage
  useEffect(() => {
    if (transactionResults.length > 0) {
      localStorage.setItem(transactionResultStorageKey, JSON.stringify(transactionResults));
    }
  }, [transactionResults]);

  // toast successful
  useEffect(() => {
    if (isCreatingTokenSuccessful) {
      toaster({
        title: '🎉 Token creation successful 🎉',
        description: 'A new balance has been set for the treasury',
        status: 'success',
        position: 'top',
      });

      // reset values
      setParamValues({
        name: '',
        symbol: '',
        memo: '',
        initSupply: '',
        maxSupply: '',
        decimals: '',
        freezeStatus: '',
        treasury: '',
        feeTokenAddress: '',
      });
      setIsCreatingTokenSuccessful(false);
      setKeyTypesToShow(new Set(HederaTokenKeyTypes));
      setChosenKeys(new Set<IHederaTokenServiceKeyType>());
      setKeys([]);
      // set the current page to the last page so it can show the newly created transaction
      const maxPageNum = Math.ceil(transactionResults.length / TRANSACTION_PAGE_SIZE);
      setCurrentTransactionPage(maxPageNum === 0 ? 1 : maxPageNum);
    }
  }, [isCreatingTokenSuccessful, toaster]);

  return (
    <div className="w-full mx-3 flex justify-center mt-6 flex-col gap-20">
      {/* Token Create form */}
      <div className="w-[600px]/ flex flex-col gap-6 justify-center tracking-tight text-white/70">
        {/* name & symbol & memo*/}
        {tokenCreateFields.info.map((param) => {
          return (
            <div key={(htsTokenCreateParamFields as any)[param].paramKey}>
              <SharedFormInputField
                paramKey={(htsTokenCreateParamFields as any)[param].paramKey}
                explanation={(htsTokenCreateParamFields as any)[param].explanation}
                paramValue={paramValues[param]}
                paramType={(htsTokenCreateParamFields as any)[param].inputType}
                param={param}
                paramPlaceholder={(htsTokenCreateParamFields as any)[param].inputPlaceholder}
                paramSize={(htsTokenCreateParamFields as any)[param].inputSize}
                paramFocusColor={(htsTokenCreateParamFields as any)[param].inputFocusBorderColor}
                paramClassName={(htsTokenCreateParamFields as any)[param].inputClassname}
                handleInputOnChange={handleInputOnChange}
              />
            </div>
          );
        })}

        {/* freeze status */}
        <div className="w-full flex gap-3">
          {/* false */}
          <SharedFromButton
            explanation={(htsTokenCreateParamFields as any)['freezeStatus'].explanation.off}
            buttonTitle={'Freeze Status - false'}
            handleButtonOnClick={() => {
              setIsDefaultFreeze(false);
              setParamValues((prev: any) => ({ ...prev, isDefaultFreeze: false }));
            }}
            switcher={!isDefaultFreeze}
          />

          {/* with custom fee */}
          <SharedFromButton
            explanation={(htsTokenCreateParamFields as any)['freezeStatus'].explanation.on}
            buttonTitle={'Freeze Status - true'}
            handleButtonOnClick={() => {
              setIsDefaultFreeze(true);
              setParamValues((prev: any) => ({ ...prev, isDefaultFreeze: true }));
            }}
            switcher={isDefaultFreeze}
          />
        </div>

        {/* supply & decimals */}
        <div className="flex gap-3">
          {/* initSupply & maxSupply & Decimals*/}
          {tokenCreateFields.supply.map((param) => {
            return (
              <div className="w-full" key={(htsTokenCreateParamFields as any)[param].paramKey}>
                <SharedFormInputField
                  paramKey={(htsTokenCreateParamFields as any)[param].paramKey}
                  explanation={(htsTokenCreateParamFields as any)[param].explanation}
                  paramValue={paramValues[param]}
                  paramType={(htsTokenCreateParamFields as any)[param].inputType}
                  param={param}
                  paramPlaceholder={(htsTokenCreateParamFields as any)[param].inputPlaceholder}
                  paramSize={(htsTokenCreateParamFields as any)[param].inputSize}
                  paramFocusColor={(htsTokenCreateParamFields as any)[param].inputFocusBorderColor}
                  paramClassName={(htsTokenCreateParamFields as any)[param].inputClassname}
                  handleInputOnChange={handleInputOnChange}
                />
              </div>
            );
          })}
        </div>

        {/* custom fee */}
        <div className="w-full flex gap-3">
          {/* no custom fee */}

          <SharedFromButton
            explanation={(htsTokenCreateParamFields as any)['customFee'].explanation.off}
            buttonTitle={'No Custom Fee'}
            handleButtonOnClick={() => setWithCustomFee(false)}
            switcher={!withCustomFee}
          />

          {/* with custom fee */}
          <SharedFromButton
            explanation={(htsTokenCreateParamFields as any)['customFee'].explanation.on}
            buttonTitle={'With Custom Fee'}
            handleButtonOnClick={() => setWithCustomFee(true)}
            switcher={withCustomFee}
          />
        </div>

        {/* fee token address */}
        {withCustomFee && (
          <SharedFormInputField
            paramKey={(htsTokenCreateParamFields as any)['feeTokenAddress'].paramKey}
            explanation={(htsTokenCreateParamFields as any)['feeTokenAddress'].explanation}
            paramValue={paramValues['feeTokenAddress']}
            paramType={(htsTokenCreateParamFields as any)['feeTokenAddress'].inputType}
            param={'feeTokenAddress'}
            paramPlaceholder={
              (htsTokenCreateParamFields as any)['feeTokenAddress'].inputPlaceholder
            }
            paramSize={(htsTokenCreateParamFields as any)['feeTokenAddress'].inputSize}
            paramFocusColor={
              (htsTokenCreateParamFields as any)['feeTokenAddress'].inputFocusBorderColor
            }
            paramClassName={(htsTokenCreateParamFields as any)['feeTokenAddress'].inputClassname}
            handleInputOnChange={handleInputOnChange}
          />
        )}

        {/* treasury */}
        <SharedFormInputField
          paramKey={(htsTokenCreateParamFields as any)['treasury'].explanation}
          explanation={(htsTokenCreateParamFields as any)['treasury'].explanation}
          paramValue={paramValues['treasury']}
          paramType={(htsTokenCreateParamFields as any)['treasury'].inputType}
          param={'treasury'}
          paramPlaceholder={(htsTokenCreateParamFields as any)['treasury'].inputPlaceholder}
          paramSize={(htsTokenCreateParamFields as any)['treasury'].inputSize}
          paramFocusColor={(htsTokenCreateParamFields as any)['treasury'].inputFocusBorderColor}
          paramClassName={(htsTokenCreateParamFields as any)['treasury'].inputClassname}
          handleInputOnChange={handleInputOnChange}
        />

        {/* keys */}
        <SharedSigningKeysComponent
          keys={keys}
          chosenKeys={chosenKeys}
          keyTypesToShow={keyTypesToShow}
          HederaTokenKeyTypes={HederaTokenKeyTypes}
          setKeys={setKeys}
          HederaTokenKeyValueType={HederaTokenKeyValueType}
          setChosenKeys={setChosenKeys}
          setKeyTypesToShow={setKeyTypesToShow}
        />

        {/* Execute button */}
        <SharedExecuteButton
          isLoading={isLoading}
          buttonTitle={'Create Fungible Token'}
          handleCreatingFungibleToken={handleCreatingFungibleToken}
        />
      </div>

      {/* transaction results table */}
      {transactionResults.length > 0 && (
        <TransactionResultTable
          API="TokenCreate"
          hederaNetwork={hederaNetwork}
          TRANSACTION_PAGE_SIZE={TRANSACTION_PAGE_SIZE}
          currentTransactionPage={currentTransactionPage}
          transactionResultStorageKey={transactionResultStorageKey}
          transactionResults={transactionResults}
          paginatedTransactionResults={paginatedTransactionResults}
          setCurrentTransactionPage={setCurrentTransactionPage}
          setTransactionResults={setTransactionResults}
        />
      )}
    </div>
  );
};

export default FungibleTokenCreate;
