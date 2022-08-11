import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import ERROR_MSG from '../../constants/error-message';
import { isKnownError } from '../../utils/error';
import { remote } from '../libs/api';

function useMutation<ResponseType>(config: AxiosRequestConfig) {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async <RequestType,>(data: RequestType): Promise<ResponseType | null> => {
    try {
      setIsLoading(true);
      const result = await remote.request<ResponseType>({ ...config, data });

      return result?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (isKnownError(error)) {
          throw new Error(ERROR_MSG[error.response.status]);
        }

        throw new Error('Unknown ERROR');

        return null;
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading };
}

export default useMutation;
