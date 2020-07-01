import { config } from '../../../helpers/get_config';
import axios from 'axios';
import { GetUserData, GetRoles } from './login_actions';
import { isAdmin } from '../../../helpers/check_roles';

interface ArrayRole{
  name: string;
  roleID: string;
}
interface LoginValue {
  value: string;
  userID: string;
  isAdmin: boolean;
  access: string[];
  roles: ArrayRole[];
  companyID: string;
  departmentID: string;
}
const initialState: LoginValue = {
  value: '',
  userID: '',
  isAdmin: false,
  access: [],
  roles: [],
  companyID: '',
  departmentID: '',
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
    case 'GET_USER_DATA':
      const idAdmin = isAdmin(action.payload.access);

      return {
        ...state,
        companyID: action.payload.companyIDs[0],
        userID: action.payload.userID,
        isAdmin: idAdmin,
        access: action.payload.access,
        departmentID: action.payload.departmentIDs[0],
      };

    case 'GET_ROLES':
      return {
        ...state,
        roles: action.payload,
      };
    default:
      return state;
  }
};

// fetch data tu api, use = trang home
export const GetUserDataThunkAction = (token) => async (dispatch) => {
  try {
    const res = await axios.get(`${config.API_HOST}/s1/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(GetUserData(res.data));
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};

export const getRolesThunkAction = (token) => async (dispatch) => {
  try {
    const res = await axios.get(`${config.API_HOST}/s1/roles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(GetRoles(res.data));
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};
