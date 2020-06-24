
export const getField = (res: object) => {
  return {
    type: 'GET_FIELD',
    payload: res,
  };
};

export const createField = (res: object) => {
  return {
    type: 'CREATE_FIELD',
    payload: res,
  };
};

export const inputFieldChange = (newInputValue: string) => {
  return {
    type: 'VALUE_FIELD_CHANGE',
    payload: newInputValue,
  };
};
export const statusCreateField = (res: number) => {
  return {
    type: 'STATUS_CREATE_FIELD',
    payload: res,
  };
};
