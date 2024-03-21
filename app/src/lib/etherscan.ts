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
  
  const YOUR_ADDRESS = '0x2f7205f46840A18b98B7F5EC306daf5936434e62';
  const BINANCE_ADDRESS = '0xdDA015FC1170466309B507269A427E671b932c0D';
  const ETHERSCAN_API_KEY = 'D5WJMUU7XU8CTJ2PMSWMCPI51QZ81TNEUR';
  
  export const getErc20Transfers = async (address: string): Promise<EtherscanResponse | null> => {
    const url = new URL('https://api-sepolia.etherscan.io/api');
    url.searchParams.append('module', 'account');
    url.searchParams.append('action', 'tokentx');
    url.searchParams.append('address', address);
    url.searchParams.append('startblock', '0');
    url.searchParams.append('endblock', '99999999');
    url.searchParams.append('sort', 'asc');
    url.searchParams.append('apikey', ETHERSCAN_API_KEY);
  
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
