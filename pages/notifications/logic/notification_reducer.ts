import axios from 'axios';
import { config } from '../../../helpers/get_config';
import { getNotifications, getNotificationsCursor, addNotificationsPagination, hideLoaderNotifications } from './notification_action';

interface ListNotification{
  title: string;
  body: string;
  image: string;
  createdAt: string;
}
interface NotificationsValue {
  list: ListNotification[];
  cursor: string;
  loadingList: boolean;
}
const initialSate : NotificationsValue = {
  list: [],
  cursor: '',
  loadingList: true,
};
export const notifications = (state = initialSate , action) => {
  switch (action.type){
    case 'GET_NOTIFICATIONS':
      return {
        ...state,
        list: action.payload.list,
        cursor: action.payload.cursor,
        totalCount: action.payload.totalCount,
      };
    case 'CURSOR':
      return {
        ...state,
        cursor: action.payload,
      };
    case 'ADD_NOTIFICATIONS_PAGINATION':
      const notification = [...state.list];
      notification.push(...action.payload.list);

      return {
        ...state,
        list: notification,
      };
    case 'HIDE_LOADER':
      return {
        ...state,
        loadingList: false,
      };
    default:
      return state;
  }
};

export const getNotificationsAction = () =>  async (dispatch, getState) => {
  try {
    const state = getState();
    if (!state.auth || !state.auth.value || state.notifications.list.length !== 0) {
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại hoac thieu tham so');

      return;
    }
    const token = `Bearer ${state.auth.value}`;
    const res = await axios.get(`${config.API_HOST}/s2/user/me/notifications?limit=1`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    await dispatch(getNotifications(res.data));
    await dispatch(hideLoaderNotifications());
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};

export const getNotificationsPagination = () => async (dispatch, getState) => {
  try {
    const state = getState();
    if (!state.auth || !state.auth.value){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại hoac thieu tham so');

      return;
    }
    const cursor = state.notifications.cursor;
    const token = `Bearer ${state.auth.value}`;
    const res = await axios.get(`${config.API_HOST}/s2/user/me/notifications?cursor=${cursor}&limit=1`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    await dispatch(getNotificationsCursor(res.data.cursor));
    await dispatch(addNotificationsPagination(res.data));
    await dispatch(hideLoaderNotifications());
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};
