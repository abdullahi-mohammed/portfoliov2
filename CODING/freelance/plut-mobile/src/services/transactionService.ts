import { axiosErrorHandler } from "./../shared/models/apiResult";
import {
  SellGiftCardModel,
  TransactionModel,
} from "./../shared/models/transactionModel";
import { ApiResult } from "../shared/models/apiResult";
import axios from "axios";
import { app } from "../shared/const";
import { PaginateModel } from "../shared/models/pagination";

export class TransactionService {
  baseurl = app.coreApi.coreApiUrl;

  async sellGiftCard(
    data: SellGiftCardModel,
    token: any,
    logout: any
  ): Promise<ApiResult<undefined>> {
    try {
      const result = await axios.post<ApiResult<undefined>>(
        `${this.baseurl}/api/v1/transaction/gift-card-transaction`,
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
    }
  }

  async getTransacions(
    userId: string,
    token: string,
    logout: any
  ): Promise<ApiResult<PaginateModel<TransactionModel>>> {
    try {
      const result = await axios.get<
        ApiResult<PaginateModel<TransactionModel>>
      >(`${this.baseurl}/api/v1/transaction/user`, {
        data: { UserId: userId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
