import axios from 'axios';
import { config } from '../../../helpers/get_config';
import { getConversations, addConversationsData, loading, updateCursor, addConversationsPagination } from './conversations_actions';

interface ComponentLoading{
  loading: boolean;
  result: string;
}
interface FieldsConversations {
  loading: ComponentLoading[];
  list: string[];
  email?: string;
  status?: string;
  points?: number;
  startedAt?: Date;
  endedAt?: Date;
  conversationID?: string;
  cursor?: string;
  notification?: string;
  totalCount?: number;
}
const initialSate : FieldsConversations = {
  loading: [],
  list: [],
  email: '',
  status: '',
  points: 0,
  startedAt: new Date(),
  endedAt: new Date(),
};
export const conversations = (state = initialSate , action) => {
  switch (action.type){
    case 'ADD_CONVERSATIONS_DATA':
      return {
        ...state,
        ...action.payload,
      };
    case 'GET_CONVERSATIONS':
      return {
        ...state,
        ...action.payload,
      };
    case 'UPDATE_CURSOR':
      return {
        ...state,
        cursor: action.payload,
      };
    case 'ADD_CONVERSATIONS_PAGINATION':
      const ConversationsList = [...state.list];
      ConversationsList.push(...action.payload.list);

      return {
        ...state,
        list: ConversationsList,
      };
    case 'LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const getConversationsThunkAction = () => async (dispatch, getState) => {
  try {
    const state = getState();
    await dispatch(loading({ loading: true }));
    if (!state.auth || !state.auth.value || !state.auth.companyID || !state.auth.departmentID){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại hoặc thiếu tham số ');

      return;
    }
    const token = `Bearer ${state.auth.value}`;

    const res = await axios.get(`${config.API_HOST}/s3/companies/${state.auth.companyID}/departments/${state.auth.departmentID}/conversations?limit=3`,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });

    if (res.data.totalCount === 0){
      await dispatch(loading({ loading: false }));
      await dispatch(addConversationsData({
        ['notification']: 'Không có phần tử nào !',
        ['totalCount']: res.data.totalCount,
      }));

      return;
    }

    if (res.data){
      await dispatch(addConversationsData({
        ['conversationID']: res.data.list[0].conversationID,
        ['startedAt']: res.data.list[0].startedAt,
        ['endedAt']: res.data.list[0].endedAt,
        ['email']: res.data.list[0].createdBy.email,
        ['status']: res.data.list[0].createdBy.status,
        ['points']: res.data.list[0].createdBy.points,
      }));
    }
    await dispatch(getConversations(res.data));
    await dispatch(loading({ loading: false }));

  } catch (error) {
    await dispatch(loading({ loading: false }));
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};
export const getConversationsPaginationThunkAction = () => async (dispatch, getState) => {
  try {
    const state = getState();
    await dispatch(loading({ loading: true }));
    if (!state.auth || !state.auth.value){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại');

      return;
    }
    if (!state.conversations.cursor){
      // tslint:disable-next-line:no-console
      console.log('No exit cursor');

      return;
    }
    const cursor = state.conversations.cursor;
    const token = state.auth.value;
    const res = await axios.get(`${config.API_HOST}/s3/companies/${state.auth.companyID}/departments/${state.auth.departmentID}/conversations?cursor=${cursor}&limit=3`,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.totalCount === 0){
      await dispatch(loading({ loading: false }));

      return;
    }

    await dispatch(addConversationsPagination(res.data));
    await dispatch(updateCursor(res.data.cursor));
    await dispatch(loading({ loading: false }));

  } catch (error) {
    await dispatch(loading({ loading: false }));
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};
