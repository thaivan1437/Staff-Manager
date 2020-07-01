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
export const GetUserData = (res: object) => {
  return {
    type: 'GET_USER_DATA',
    payload: res,
  };
};
export const GetRoles = (res: object) => {
  return {
    type: 'GET_ROLES',
    payload: res,
  };
};
