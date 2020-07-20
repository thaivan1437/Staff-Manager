export const getNotifications = (res: object) => {
  return{
    type: 'GET_NOTIFICATIONS',
    payload: res,
  };
};
export const getNotificationsCursor = (res: object) => {
  return{
    type: 'CURSOR',
    payload: res,
  };
};
export const addNotificationsPagination = (res: object) => {
  return{
    type: 'ADD_NOTIFICATIONS_PAGINATION',
    payload: res,
  };
};
export const hideLoaderNotifications = () => {
  return{
    type: 'HIDE_LOADER',
  };
};
