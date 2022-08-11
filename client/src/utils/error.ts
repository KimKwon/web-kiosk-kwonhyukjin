import axios from 'axios';
import ERROR_MSG from '../constants/error-message';

export const isKnownError = (
  error: unknown,
): error is {
  response: {
    status: keyof typeof ERROR_MSG;
  };
} => {
  if (!(error instanceof Error)) return false;
  if (!axios.isAxiosError(error)) return false;
  if (!error.response) return false;

  const STATUS_CODE = error.response.status;

  if (STATUS_CODE in ERROR_MSG) {
    return true;
  }

  return false;
};
