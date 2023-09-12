import { ApiResult, axiosErrorHandler } from "./../shared/models/apiResult";
import axios from "axios";
import { app } from "../shared/const";
import {
  BankAccountModel,
  CreateBankAccountModel,
} from "../shared/models/bankaccountModel";

export class BankaccoutService {
  baseurl = app.coreApi.coreApiUrl;

  async createBankAccount(
    data: CreateBankAccountModel,
    token: string,
    logout: any
  ): Promise<ApiResult<BankAccountModel>> {
    try {
      const result = await axios.post<ApiResult<BankAccountModel>>(
        `${this.baseurl}/api/v1/transaction/bank-accounts`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return result.data;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        await logout();
        window.location.reload();
      }
      return axiosErrorHandler(error);
      //   return Promise.reject(error);
    }
  }

  async getBankAccount(
    userId: string,
    token: string,
    logout: any
  ): Promise<ApiResult<BankAccountModel[]>> {
    try {
      const result = await axios.get<ApiResult<BankAccountModel[]>>(
        `${this.baseurl}/api/v1/transaction/bank-accounts?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return result.data;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        await logout();
        window.location.reload();
      }
      return axiosErrorHandler(error);
    }
  }
}
