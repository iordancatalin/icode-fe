import { useState } from 'react';
import { useCallback } from 'react';

export function useUsernameValidator(
  errorMessage = 'Must have at least 3 characters'
) {
  const [message, setMessage] = useState();

  const validationFunc = useCallback(
    (username) => {
      const isValid = username?.length >= 3;
      setMessage(isValid ? null : errorMessage);

      return isValid;
    },
    [errorMessage]
  );

  return [message, validationFunc];
}
