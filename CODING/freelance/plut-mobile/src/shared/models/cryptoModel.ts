export interface NetWorks {
  name: string;
  code: string;
  depositAddress: string;
  id: string;
  createdAt: string;
}

export interface Rates {
  base: string;
  quote: string;
  exchangeType: string;
  rate: number;
  id: string;
  createdAt: string;
}

export interface Cryptos {
  logo: string;
  name: string;
  symbol: string;
  networks: NetWorks[];
  rates: Rates[];
  id: string;
  createdAt: string;
}

export interface CryptoModel {
  quoteCurrencies: string[];
  cryptoCurrencies: Cryptos[];
}

export interface SellCryptoModel {
  userId: string;
  bankAccountId: string;
  cryptoId: string;
  cryptoRateId: string;
  cryptoNetworkId: string;
  uploadedProofOfAddress: string;
  transactionHash: string;
  declaredCryptoAmount: number;
}
