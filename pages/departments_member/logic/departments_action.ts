export const getListDpMembers = (res: object) => {
  return {
    type: 'GET_LIST_DP_MEMBERS',
    payload: res,
  };
};
export const dpMemberCursor = (res: string) => {
  return{
    type: 'DP_MEMBERS_CURSOR',
    payload: res,
  };
};
export const addDpMembersPagination = (res: object) => {
  return{
    type: 'ADD_DP_MEMBERS_PAGINATION',
    payload: res,
  };
};

export const getDpMemberProfiles = (res: object) => {
  return {
    type: 'GET_DP_MEMBER_PROFILES',
    payload: res,
  };
};
export const showLoaderListMember = () => {
  return{
    type: 'SHOW_LOADER_LIST',
  };
};
export const hideLoaderListMember = () => {
  return{
    type: 'HIDE_LOADER_LIST',
  };
};
export const showLoaderMemberProfiles = () => {
  return{
    type: 'SHOW_LOADER_PROFILES',
  };
};
export const hideLoaderMemberProfiles = () => {
  return{
    type: 'HIDE_LOADER_PROFILES',
  };
};
export const statusMemberProfiles = (res: object) => {
  return{
    type: 'STATUS_PROFILES',
    payload: res,
  };
};
