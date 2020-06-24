export const updateCompany = (res: object) => {
  return {
    type: 'UPDATE_COMPANY',
    payload: res,
  };
};

export const getCompany = (res: object) => {
  return {
    type: 'GET_COMPANY',
    payload: res,
  };
};

export const loadingUpdateCompany = (res: boolean) => {
  return {
    type: 'LOADING_UPDATE',
    payload: res,
  };
};

export const statusUpdateCompany = (res: number) => {
  return {
    type: 'STATUS_UPDATE',
    payload: res,
  };
};
