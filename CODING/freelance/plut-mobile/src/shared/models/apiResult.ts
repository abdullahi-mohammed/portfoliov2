export interface ApiResult<T> {
  data: T;
  message: string;
  succeeded: boolean;
  errors: any[];
}

export const axiosErrorHandler = <T>(error: any): ApiResult<T> => {
  let result = {
    succeeded: false,
  } as ApiResult<T>;
  if (error.response) {
    // let a: ApiResult<BankAccountModel> = {
    //     succeeded: false,
    //     errors
    //   };
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    if (error?.response?.status < 500) {
      result.message = error?.response?.data?.message;
    }
    if (error?.response?.data?.message) {
      result.message = error?.response?.data?.message;
    } else {
      result.message = error?.message;
    }
    if (error?.response?.data?.errors) {
      result.errors = error?.response?.data?.errors;
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    result.message = error?.message;
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);
  return result;
};
