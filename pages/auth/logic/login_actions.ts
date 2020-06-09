export const Login = (value: string) => {
  return {
    type: 'LOGIN',
    token: value,
  };
};
export const Logout = () => {
  return {
    type: 'LOGOUT',
    token: '',
  };
};
export const GetUserID = (userid: object) => {
  return {
    type: 'GET_USERID',
    payload: userid,
  };
};
