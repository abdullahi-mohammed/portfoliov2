export interface GiftCardRateModel {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  imageUrl: string;
  rates: RateModel[];
  giftCardTypes: string[];
  countries: any;
}

export interface RateModel {
  rate: number;
  quoteCurrencyCode: string;
  maxVal: number;
  minVal: number;
  id: string;
  giftCardId: string;
  giftCardType: string;
  description: string;
  baseCurrencyCode: string;
  countryCode: string;
  createdAt: string;
}
