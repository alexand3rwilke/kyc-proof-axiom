// etherscan.ts

interface EtherscanResponse {
    status: string;
    message: string;
    result: Array<{
      blockNumber: string;
      timeStamp: string;
      hash: string;
      nonce: string;
      blockHash: string;
      from: string;
      contractAddress: string;
      to: string;
      value: string;
      tokenName: string;
      tokenSymbol: string;
      tokenDecimal: string;
      transactionIndex: string;
      gas: string;
      gasPrice: string;
      gasUsed: string;
      cumulativeGasUsed: string;
      input: string;
      confirmations: string;
    }>;
  }
  

  
  export const getErc20Transfers = async (address: string): Promise<EtherscanResponse | null> => {
    console.log("ETHET API : ",process.env.ETHERSCAN_API_KEY as string as string)
    const url = new URL('https://api-sepolia.etherscan.io/api');
    url.searchParams.append('module', 'account');
    url.searchParams.append('action', 'tokentx');
    url.searchParams.append('address', address);
    url.searchParams.append('startblock', '0');
    url.searchParams.append('endblock', '99999999');
    url.searchParams.append('sort', 'asc');
    url.searchParams.append('apikey', process.env.ETHERSCAN_API_KEY as string);
  
    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching Etherscan data:', error);
      return null;
    }
  };
  
  export const findTransfersFrom = (transactions: EtherscanResponse, fromAddress: string) => {
    return transactions?.result.filter(tx => tx.from.toLowerCase() === fromAddress.toLowerCase());
  };
