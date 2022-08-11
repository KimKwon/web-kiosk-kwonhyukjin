import { useState } from 'react';

function useErrorBoundary<ErrorType extends Error>() {
  const [error, setError] = useState<ErrorType | null>(null);

  if (error !== null) {
    throw error;
  }

  return setError;
}

export default useErrorBoundary;
