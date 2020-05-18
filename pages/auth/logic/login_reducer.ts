interface LoginValue {
  value: string;
}
const initialState: LoginValue = {
  value: '',
};
export const reducerLogin = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        value: action.token,
      };
    case 'LOGOUT':
      return {
        ...state,
        value: '',
      };
    default:
      return state;
  }
};
