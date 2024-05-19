import { useState, useCallback } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

export interface ApiResponse<T, E> {
  result?: T | undefined;
  error?: AxiosError<E>;
  isFetching: boolean;
}

type UseApiResponse<T, E> = [ApiResponse<T, E>, (...args: any[]) => Promise<void>];

export function useApi<T, E>(
  serviceMethod: (...args: any[]) => Promise<AxiosResponse<T, any>> | undefined
): UseApiResponse<T, E> {
  const [result, setResult] = useState<T | undefined>(undefined);
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState<AxiosError<E> | undefined>(undefined);

  const apiCallback = useCallback(
    async (...args: any) => {
      setError(undefined);
      setFetching(true);
      try {
        const result = await serviceMethod(...args);
        if (result) {
          setResult(result.data);
        }
      } catch (error) {
        const e = error as AxiosError<E>;
        setError(e);
      }
      setFetching(false);
    },
    [serviceMethod]
  );

  const apiResponse = {
    result,
    error,
    isFetching
  };

  return [apiResponse, apiCallback];
}

export default useApi;
