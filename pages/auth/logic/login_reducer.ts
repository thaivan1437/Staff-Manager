import { config } from '../../../helpers/get_config';
import axios from 'axios';
import { GetUserID } from './login_actions';
interface LoginValue {
  value: string;
  userID: string;
}
const initialState: LoginValue = {
  value: '',
  userID: '',
};
export const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        value: action.token,
      };
    case 'LOGOUT':
      return {
        ...state,
        value: '',
      };
    case 'GET_USERID':
      return {
        ...state,
        userID: action.payload.userID,
      };
    default:
      return state;
  }
};

// fetch data tu api, use = trang home
export const getIDUSERThunkAction = (token) => async (dispatch) => {
  try {
    const res = await axios.get(`${config.API_HOST}/s1/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(GetUserID(res.data));
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};
