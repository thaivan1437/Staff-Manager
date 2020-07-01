export const getFields = (res: object) => {
  return{
    type: 'GET_FIELDS',
    payload: res,
  };
};
export const addField = (res: object) => {
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
export const createField = (res: object) => {
  return {
    type: 'CREATE_FIELD',
    payload: res,
  };
};
