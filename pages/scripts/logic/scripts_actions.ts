export const createScript = (res: object) => {
  return {
    type: 'CREATE_SCRIPT',
    payload: res,
  };
};
export const addScriptInList = (res: string) => {
  return{
    type: 'ADD_SCRIPT_IN_LIST',
    payload: res,
  };
};

export const getScripts = (res: object) => {
  return {
    type: 'GET_SCRIPTS',
    payload: res,
  };
};
export const updateScript = (res: object) => {
  return {
    type: 'UPDATE_SCRIPTS',
    payload: res,
  };
};
export const deleteScript = (res: object) => {
  return{
    type: 'ADD_DELETE_SCRIPT',
    payload: res,
  };
};

export const activeDeleteScript = () => {
  return{
    type: 'ACTIVE_DELETE_SCRIPT',
  };
};

export const showLoaderScripts = () => {
  return{
    type: 'SHOW_LOADER',
  };
};

export const hideLoaderScripts = () => {
  return{
    type: 'HIDE_LOADER',
  };
};

export const statusScripts = (res: object) => {
  return{
    type: 'STATUS',
    payload: res,
  };
};

export const addScriptPagination = (res: object) => {
  return{
    type: 'ADD_PAGINATION',
    payload: res,
  };
};

export const loading = (res: object) => {
  return{
    type: 'LOADING',
    payload: res,
  };
};
