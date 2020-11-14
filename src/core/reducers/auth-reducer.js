export const REGISTER_ACTION = 'REGISTER';
export const AUTHENTICATE_ACTION = 'AUTHENTICATE';

export const REGISTER_STATUS = 'REGISTERED_NOT_ACTIVE';
export const AUTHENTICATE_STATUS = 'AUTHENTICATED';

export const ACCOUNT_LOCAL_STORAGE_KEY = 'account';

export default function reducer(state, action) {
  let newState;

  switch (action?.type) {
    case REGISTER_ACTION:
      newState = {
        ...action.payload,
        status: REGISTER_STATUS,
      };
      break;

    case AUTHENTICATE_ACTION:
      newState = {
        ...action.payload,
        status: AUTHENTICATE_STATUS,
      };
      break;

    default:
      newState = state;
  }
  localStorage.setItem(ACCOUNT_LOCAL_STORAGE_KEY, JSON.stringify(newState));

  return newState;
}
