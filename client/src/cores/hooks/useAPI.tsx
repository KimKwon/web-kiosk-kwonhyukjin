import { Method, AxiosRequestHeaders } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import ERROR_MSG from '../../constants/error-message';
import { isKnownError } from '../../utils/error';
import { remote } from '../libs/api';
import useErrorBoundary from './useErrorBoundary';

interface APIConfig<RequestData> {
  url: string;
  method?: Method;
  headers?: AxiosRequestHeaders;
  data?: RequestData;
}

export interface BaseAPI<Response> {
  data?: Response;
  isLoading: boolean;
  refetch: () => void;
}

function useAPI<RequestData = Record<string, never>>(config: APIConfig<RequestData>) {
  const throwError = useErrorBoundary();
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRefetch, setShouldRefetch] = useState(0);

  const refetch = useCallback(() => setShouldRefetch((updateCount) => updateCount + 1), []);

  const fetchFn = async () => {
    try {
      setIsLoading(true);
      const result = await remote.request(config);
      setResponse(result?.data);

      return result?.data;
    } catch (error) {
      if (isKnownError(error)) {
        throwError(new Error(ERROR_MSG[error.response.status]));
        return;
      }

      throwError(new Error('Unknown ERROR'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRefetch]);

  return { data: response, isLoading, refetch };
}

export default useAPI;
