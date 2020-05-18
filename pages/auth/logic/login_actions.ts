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
