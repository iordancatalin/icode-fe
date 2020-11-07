import { useCallback } from 'react';
import { useState } from 'react';

export function useEmailValidator(
  errorMessage = 'Email address has an invalid format'
) {
  const [message, setMessage] = useState();

  const validationFunc = useCallback(
    (email) => {
      const isValid = email?.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,10}$/g);
      setMessage(isValid ? null : errorMessage);

      return isValid;
    },
    [errorMessage]
  );

  return [message, validationFunc];
}
