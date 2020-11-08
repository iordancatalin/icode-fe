import React, { useCallback, useReducer } from 'react';
import authReducer, {
  ACCOUNT_LOCAL_STORAGE_KEY,
} from '../reducers/auth-reducer';

export const AuthContext = React.createContext();

export default function AuthContextProvider({ children }) {
  const findInitialState = useCallback(() => {
    const account = localStorage.getItem(ACCOUNT_LOCAL_STORAGE_KEY);

    return account ? JSON.parse(account) : null;
  }, []);

  const result = useReducer(authReducer, findInitialState());

  return <AuthContext.Provider value={result}>{children}</AuthContext.Provider>;
}
