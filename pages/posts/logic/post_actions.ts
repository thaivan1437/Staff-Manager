export const getPosts = (res: object) => {
  return{
    type: 'GET_POSTS',
    payload: res,
  };
};
export const addPostData = (res: object) => {
  return{
    type: 'ADD',
    payload: res,
  };
};
export const addPostDataUpdate = (res: object) => {
  return{
    type: 'ADD_DATA_UPDATE',
    payload: res,
  };
};
export const deletePost = (res: object) => {
  return{
    type: 'ADD_DELETE_DATA',
    payload: res,
  };
};

export const activedeletePost = () => {
  return{
    type: 'ACTIVE_DELETE_DATA',
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
export const createImageLink = (res: object) => {
  return {
    type: 'CREATE_IMAGE_LINK',
    payload: res,
  };
};
export const addPostsPagination = (res: object) => {
  return{
    type: 'ADD_POSTS_PAGINATION',
    payload: res,
  };
};

export const updateCursor = (res: string) => {
  return{
    type: 'UPDATE_CURSOR',
    payload: res,
  };
};
