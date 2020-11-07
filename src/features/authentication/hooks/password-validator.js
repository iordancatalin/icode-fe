import { useCallback } from 'react';
import { useState } from 'react';

export function usePasswordValidator(
  errorMessage = 'Must have at least 6 characters'
) {
  const [message, setMessage] = useState();

  const validationFunc = useCallback(
    (password) => {
      const isValid = password?.length >= 6;
      setMessage(isValid ? null : errorMessage);

      return isValid;
    },
    [errorMessage]
  );

  return [message, validationFunc];
}
