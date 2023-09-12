import { ApiResult, axiosErrorHandler } from "./../shared/models/apiResult";
import { app } from "../shared/const";
import {
  AuthModel,
  AuthResponseModel,
  DeleteAccountModel,
  EmailModel,
  NewPasswordModel,
  VerifyEmailModel,
} from "../shared/models/userAuthModel";
import axios from "axios";
import { User } from "../shared/models/userModel";

export class UserAuthService {
  baseurl = app.coreApi.coreApiUrl;

  async login(data: AuthModel): Promise<ApiResult<AuthResponseModel | User>> {
    try {
      const result = await axios.post<ApiResult<AuthResponseModel | User>>(
        `${this.baseurl}/api/v1/account/login`,
        data
      );

      return result.data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }

  async register(data: AuthModel): Promise<ApiResult<AuthResponseModel>> {
    try {
      const result = await axios.post<ApiResult<AuthResponseModel>>(
        `${this.baseurl}/api/v1/account/register`,
        data
      );

      return result.data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }

  async verifyMail(
    data: VerifyEmailModel
  ): Promise<ApiResult<AuthResponseModel>> {
    try {
      const result = await axios.post<ApiResult<AuthResponseModel>>(
        `${this.baseurl}/api/v1/account/verify`,
        data
      );

      return result.data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }

  async resendOTP(data: EmailModel): Promise<ApiResult<AuthResponseModel>> {
    try {
      const result = await axios.post<ApiResult<AuthResponseModel>>(
        `${this.baseurl}/api/v1/account/resend-registration-otp`,
        data
      );

      return result.data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }

  async forgotPassword(
    data: EmailModel
  ): Promise<ApiResult<AuthResponseModel>> {
    try {
      const result = await axios.post<ApiResult<AuthResponseModel>>(
        `${this.baseurl}/api/v1/account/forget-password`,
        data
      );

      return result.data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }

  async newPassword(
    data: NewPasswordModel
  ): Promise<ApiResult<AuthResponseModel>> {
    try {
      const result = await axios.post<ApiResult<AuthResponseModel>>(
        `${this.baseurl}/api/v1/account/confirm-password-reset`,
        data
      );

      return result.data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }

  async deleteAccount(
    data: DeleteAccountModel,
    token: string
  ): Promise<ApiResult<AuthResponseModel>> {
    try {
      const result = await axios.post<ApiResult<AuthResponseModel>>(
        `${this.baseurl}/api/v1/account/deletemyaccount`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return result.data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }
}
