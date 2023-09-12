import { useState } from "react";

export default function useApi() {
  const [data, setData] = useState<any>();
  const [error, setError] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const request = async (request: any) => {
    try {
      setIsLoading(true);
      setIsSuccessful(false);
      setError("");

      const response = await request();

      if (!response.succeeded) {
        if (response.errors?.length) throw response.errors[0];
        else
          throw "An error occured, please check your internet connection and try again";
      } else {
        setData(response?.data);
        setIsSuccessful(true);
      }
    } catch (error: any) {
      setError(error);
      setIsSuccessful(false);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    request,
    data,
    error,
    isLoading,
    isSuccessful,
    setIsSuccessful,
    setError,
  };
}
