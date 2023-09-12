import { useEffect, useState } from "react";
import { Drivers, Storage } from "@ionic/storage";
import { User } from "../shared/models/userModel";
import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";
import { TransactionModel } from "../shared/models/transactionModel";
import { GiftCardRateModel, RateModel } from "../shared/models/giftcardrates";
import { Cryptos, NetWorks, Rates } from "../shared/models/cryptoModel";

const DATA_KEY = "data";

export interface Data {
  user: User;
  email: string;
  tradeDetails: TransactionModel;
  giftcard: GiftCardRateModel;
  countryCode: string;
  giftCardType: string;
  bankAccountId: string;
  declaredAmount: number;
  giftCardId: string;

  crypto: Cryptos;
  cryptoValue: number | null;
  currentNetwork: NetWorks;
  currentRateCurrency: Rates;
  desiredCurrency: RateModel;
  showBalance: boolean;
  showPopup: boolean;
}

export const emptyData: Data = {
  user: {
    id: "",
    email: "",
    token: "",
    refreshToken: "",
    userName: "",
    firstName: "",
    lastName: "",
    profileImageUrl: "",
    phoneNumber: "",
  },
  email: "",
  tradeDetails: {} as TransactionModel,
  giftcard: {} as GiftCardRateModel,
  countryCode: "",
  giftCardType: "",
  bankAccountId: "",
  declaredAmount: 0,
  giftCardId: "",
  desiredCurrency: {} as RateModel,

  crypto: {} as Cryptos,
  cryptoValue: null,
  currentNetwork: {} as NetWorks,
  currentRateCurrency: {} as Rates,
  showBalance: false,
  showPopup: true,
};

export default function useStorage() {
  const [store, setStore] = useState<Storage>();
  const [appData, setAppData] = useState<Data>(emptyData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initStorage = async () => {
      setIsLoading(true);
      const newStore = new Storage({
        name: "data",
        driverOrder: [
          CordovaSQLiteDriver._driver,
          Drivers.IndexedDB,
          Drivers.LocalStorage,
        ],
      });
      await newStore.defineDriver(CordovaSQLiteDriver);

      const store = await newStore.create();
      setStore(store);

      const storedData = (await store?.get(DATA_KEY)) || [];
      setAppData(storedData);
      setIsLoading(false);
    };

    initStorage();
  }, []);

  const updateData = async (item: object) => {
    setIsLoading(true);
    const newData = { ...appData, ...item };

    setAppData(newData);
    await store?.set(DATA_KEY, newData);
    setIsLoading(false);
  };

  const resetData = async () => {
    setIsLoading(true);

    setAppData(emptyData);
    await store?.set(DATA_KEY, emptyData);
    setIsLoading(false);
  };

  return {
    appData,
    updateData,
    isLoading,
    resetData,
  };
}
