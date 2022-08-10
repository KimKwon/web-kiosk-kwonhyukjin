import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { remote } from '../libs/api';

interface APIError {
  message?: string;
  code?: number;
}

function useMutation<ResponseType>(config: AxiosRequestConfig) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<APIError>();

  const mutate = async <RequestType,>(data: RequestType): Promise<ResponseType | null> => {
    try {
      setIsLoading(true);
      const result = await remote.request<ResponseType>({ ...config, data });

      return result?.data;
    } catch (error) {
      /**
       * TODO :: 선언적 에러핸들링 설계해보기
       *
       * 1) 에러의 형태 구분하기 (처리가능, 처리불가능)
       * 2) ErrorBoundary 설정
       */

      if (axios.isAxiosError(error)) {
        /**
         * TODO :: 에러코드 정의하기
         *
         * 1) 서버에서 특정 상황에 대한 에러코드와 메시지를 같이 정의해줌
         * 2) 해당 에러코드에 따라 처리 방식 정하기
         * 3) 그 외의 경우에는 throw하여 ErrorBoundary에게 처리를 위임
         */

        setError({
          code: error.response?.status,
          message: error.response?.statusText,
        });

        return null;
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}

export default useMutation;
