export const addInviteData = (res: object) => {
  return{
    type: 'ADD_INVITE_DATA',
    payload: res,
  };
};

export const addRolesData = (res: object) => {
  return{
    type: 'ADD_ROLES_DATA',
    payload: res,
  };
};

export const addDepartmentID = (res: object) => {
  return{
    type: 'ADD_DEPARTMENT_ID',
    payload: res,
  };
};

export const loading = (res: object) => {
  return{
    type: 'LOADING',
    payload: res,
  };
};

export const addCompanyID = (res: string) => {
  return{
    type: 'ADD_COMPANY_ID',
    payload: res,
  };
};
