// SPDX-License-Identifier: Apache-2.0

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BsGithub } from 'react-icons/bs';
import { Tooltip } from '@chakra-ui/react';
import { IoOpenOutline } from 'react-icons/io5';
import ContractInteraction from '@/components/contract-interaction';
import { HEDERA_OFFICIAL_HIPS_URL, HEDERA_SMART_CONTRACTS_ASSETS } from '@/utils/common/constants';

const HIP351Section = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        delay: 0.3,
        duration: 0.6,
      }}
      viewport={{ once: true }}
      className="text-white w-full flex pt-7 pb-12 pl-7 flex-col gap-9 min-w-[50rem]"
    >
      {/* top part */}
      <div className="flex flex-col gap-6">
        {/* TITLE */}
        <h1 className="text-[1.88rem] font-medium leading-10 flex gap-1 whitespace-nowrap">
          Pseudo random number System Contract Wrapper
          <div className="flex">
            (
            <Link
              href={`${HEDERA_OFFICIAL_HIPS_URL}/hip/hip-351`}
              target="_blank"
              className="hover:underline flex gap-1 items-center"
            >
              <p>HIP-351</p>
              <div className="text-2xl">
                <IoOpenOutline />
              </div>
            </Link>
            )
          </div>
        </h1>

        {/* content */}
        <div>
          {/* Overview */}
          <div className="text-[1.65rem] font-medium">Overview</div>

          {/* content */}
          <div className="tracking-tight text-white/70">
            A Solidity precompiled contracts that generates pseudorandom numbers for use by both smart
            contracts and users.
          </div>
        </div>
      </div>

      {/* Contract */}
      <div className="flex flex-col">
        <div className="flex flex-col gap-6 w-full">
          {/* title */}
          <div className="flex gap-1 items-center text-[20px]">
            {/* title */}
            <p>{HEDERA_SMART_CONTRACTS_ASSETS.PRNG_PRECOMPILED.title}</p>

            {/* Github icon */}
            <Tooltip label="Visit source code on Github." placement={'top'}>
              <Link
                href={HEDERA_SMART_CONTRACTS_ASSETS.PRNG_PRECOMPILED.githubUrl}
                target="_blank"
                className="text-2xl"
              >
                <BsGithub />
              </Link>
            </Tooltip>
          </div>

          {/* contract interaction component */}
          <ContractInteraction contract={HEDERA_SMART_CONTRACTS_ASSETS.PRNG_PRECOMPILED} />
        </div>
      </div>
    </motion.section>
  );
};

export default HIP351Section;
