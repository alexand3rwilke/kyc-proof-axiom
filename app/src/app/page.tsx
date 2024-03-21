"use client";
import React, { useEffect, useState } from 'react';
import Title from '@/components/ui/Title';
import { forwardSearchParams } from '@/lib/utils';
import AdvanceStepButton from '@/components/ui/AdvanceStepButton';
import CodeBox from '@/components/ui/CodeBox';
import { useAccount } from 'wagmi';
import { getErc20Transfers, findTransfersFrom } from '../lib/etherscan'; // Adjust the import path based on your file structure

interface Transaction {
  hash: string;
  from: string;
  to: string;
  blockNumber: string;
  transactionIndex: string;
  // Add more fields as necessary
}

export default function Home() {
  const { address } = useAccount();
  const [selectedHash, setSelectedHash] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const checkForTransfers = async (address: string) => {
      const allTransactions = await getErc20Transfers(address);
      if (allTransactions) {
        const transfersFromBinance = findTransfersFrom(allTransactions, "0xdDA015FC1170466309B507269A427E671b932c0D");
        setTransactions(transfersFromBinance);
      }
    };

    if (address) {
      checkForTransfers(address);
    }
  }, [address]);

  const handleRowClick = (hash: string) => {
    setSelectedHash(hash);
  };

  let compiledCircuit;
  try {
    compiledCircuit = require("../../axiom/data/compiled.json");
  } catch (e) {
    console.log(e);
  }

  if (compiledCircuit === undefined) {
    return (
      <>
        <div>
          Compile circuit first by running in the root directory of this project:
        </div>
        <CodeBox>
          {"npx axiom compile circuit app/axiom/average.circuit.ts"}
        </CodeBox>
      </>
    );
  }

  return (
    <>
      

      <Title>💸 KYC Exchange Prover 💸</Title>
      <div className="text-center">Select an incomming withdraw transaction from an exchange to get started:</div>


      <div>
        <h1>Your incomming withdrawal transactions</h1>
        {transactions.map((tx, index) => (
          <div
            key={index}
            onClick={() => handleRowClick(tx.hash)}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              padding: '10px',
              margin: '5px 0',
              cursor: 'pointer',
              backgroundColor: selectedHash === tx.hash ? '#e0e0e0' : 'transparent',
            }}
          >
            {/* <span>{tx.from}</span>
            <span>{tx.to}</span> */}
            <span>{tx.blockNumber}</span>
            <span>{"   "}</span>
            <span>{tx.transactionIndex}</span>
          </div>
        ))}
      </div>

      {selectedHash && (
        <AdvanceStepButton
          label="Generate Proof"
          href={"/prove?" + forwardSearchParams({
            connected: address,
            blockNumber: transactions.find(tx => tx.hash === selectedHash)?.blockNumber,
            transactionIndex: transactions.find(tx => tx.hash === selectedHash)?.transactionIndex,
          })}
        />
      )}
    </>
  );
}
