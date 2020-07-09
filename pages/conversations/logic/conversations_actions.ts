export const getConversations = (res: object) => {
  return{
    type: 'GET_CONVERSATIONS',
    payload: res,
  };
};
export const addConversationsData = (res: object) => {
  return{
    type: 'ADD_CONVERSATIONS_DATA',
    payload: res,
  };
};

export const loading = (res: object) => {
  return{
    type: 'LOADING',
    payload: res,
  };
};
export const addConversationsPagination = (res: object) => {
  return{
    type: 'ADD_CONVERSATIONS_PAGINATION',
    payload: res,
  };
};

export const updateCursor = (res: string) => {
  return{
    type: 'UPDATE_CURSOR',
    payload: res,
  };
};
