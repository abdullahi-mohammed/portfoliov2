import { ApiResult, axiosErrorHandler } from "../shared/models/apiResult";
import axios from "axios";
import { app } from "../shared/const";
import { CryptoModel, SellCryptoModel } from "../shared/models/cryptoModel";

export class CryptoService {
  baseurl = app.coreApi.coreApiUrl;

  // constructor() {}

  async getCryptos(logout: any): Promise<CryptoModel> {
    try {
      const result = await axios.get<ApiResult<CryptoModel>>(
        this.baseurl + "/api/v1/cryptocurrency"
      );
      return result?.data?.data;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        await logout();
        window.location.reload();
      }
      console.log(error);
    }

    return {} as CryptoModel;
  }

  async sellCryptos(
    data: SellCryptoModel,
    token: string,
    logout: any
  ): Promise<ApiResult<undefined>> {
    try {
      const result = await axios.post<ApiResult<undefined>>(
        `${this.baseurl}/api/v1/transaction/crypto-transaction`,
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
}
