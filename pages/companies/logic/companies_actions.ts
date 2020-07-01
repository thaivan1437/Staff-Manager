export const addDataCompany = (res: object) => {
  return{
    type: 'ADD',
    payload: res,
  };
};
export const loading = (res: object) => {
  return{
    type: 'LOADING',
    payload: res,
  };
};

export const getCompanies = (res: object) => {
  return{
    type: 'GET_COMPANIES',
    payload: res,
  };
};

export const getCompany = (res: object) => {
  return {
    type: 'ADD',
    payload: res,
  };
};

export const addCompany = (res: object) => {
  return{
    type: 'ADD_COMPANY',
    payload: res,
  };
};

export const addCompanies = (res: object) => {
  return{
    type: 'ADD_COMPANIES',
    payload: res,
  };
};

export const updateCursor = (res: string) => {
  return{
    type: 'UPDATE_CURSOR',
    payload: res,
  };
};
