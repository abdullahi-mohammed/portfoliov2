// Generated by https://quicktype.io

export interface BankAccountModel {
  bankName: string;
  accountName: string;
  accountNumber: string;
  userId: string;
  id: string;
  createdAt: string;
}

export interface CreateBankAccountModel {
  bankName: string;
  accountName: string;
  accountNumber: string;
  userId: string;
}

export interface BanksProps {
  code: string;
  logo: string;
  name: string;
  slug: string;
  ussd: string;
}
