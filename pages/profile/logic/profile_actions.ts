
export const updateProfile = (res: object) => {
  return{
    type: 'ADD',
    payload: res,
  };
};

export const getProfile = (action: string, res: object) => {
  return{
    type: action,
    payload: res,
  };
};

export const loading = (res: object) => {
  return{
    type: 'LOADING',
    payload: res,
  };
};
