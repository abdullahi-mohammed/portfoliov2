import { ApiResult } from "./../shared/models/apiResult";
// import { Database } from "./../shared/types/supabase/supabae";
import { app } from "../shared/const";
// import { createClient, SupabaseClient } from "@supabase/supabase-js";
// import { supaBaseClient } from "./supaBaseClient";

import axios from "axios";
import { GiftCardRateModel } from "../shared/models/giftcardrates";
export class GiftCardService {
  baseurl = app.coreApi.coreApiUrl;

  // constructor() {}

  async giftCard(logout: any): Promise<GiftCardRateModel[]> {
    try {
      const result = await axios.get<ApiResult<GiftCardRateModel[]>>(
        this.baseurl + "/api/v1/giftcard"
      );
      return result?.data?.data;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        await logout();
        window.location.reload();
      }
      console.log(error);
    }
    return [];
  }
}
