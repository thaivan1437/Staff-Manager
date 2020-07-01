import axios from 'axios';
import { config } from '../../../helpers/get_config';
import { loading } from './invitation_actions';

interface ComponentLoading{
  loading: boolean;
  result: string;
}

interface EmailInvitation {
  emails: string[];
  loading: ComponentLoading[];
  result: number;
  rolesID: string;
  nameRole: string;
  companyID: string;
  departmentID: string;
}
const initialSate : EmailInvitation = {
  emails: [],
  loading: [],
  result: 0,
  rolesID: '',
  nameRole: '',
  companyID: '',
  departmentID: '',
};
export const invitation = (state = initialSate , action)  => {

  switch (action.type){
    case 'ADD_INVITE_DATA':
      return {
        ...state,
        ...action.payload,
        loading: { result: 0 },
      };
    case 'ADD_ROLES_DATA':
      return {
        ...state,
        ...action.payload,
      };
    case 'ADD_DEPARTMENT_ID':
      return {
        ...state,
        ...action.payload,
      };
    case 'ADD_COMPANY_ID':
      return {
        ...state,
        companyID: action.payload,
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

export const createMemberInvitation = () =>  async (dispatch, getState) => {
  try {
    const state = getState();
    await dispatch(loading({ loading: true }));
    const  dataUpload = { emails: state.invitation.emails, roleName : state.invitation.nameRole };
    if (!state.auth || !state.auth.value){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại');

      return;
    }
    if (state.auth.isAdmin !== true){
      return;
    }
    const token = `Bearer ${state.auth.value}`;
    let res;
    const roleDepartment: string[] = ['CO_STAFF', 'CO_MANAGER', 'OWNER'];
    if (!roleDepartment.includes(state.invitation.nameRole)){
      res = await axios.post(`${config.API_HOST}/s2/companies/${state.invitation.companyID}/departments/${state.invitation.departmentID}/members/invite`,
      dataUpload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
    }
    if (roleDepartment.includes(state.invitation.nameRole)){
      res = await axios.post(`${config.API_HOST}/s2/companies/${state.invitation.companyID}/members/invite`, dataUpload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
    }
    await dispatch(loading({ loading: false, result: res.status }));

  } catch (error) {
    await dispatch(loading({ loading: false, result: 1 }));
  }
};

export const createAdminInvitation = () =>  async (dispatch, getState) => {
  try {
    const state = getState();
    await dispatch(loading({ loading: true }));
    const  dataUpload = { emails: state.invitation.emails };
    if (!state.auth || !state.auth.value){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại');

      return;
    }
    if (state.auth.isAdmin !== true){
      return;
    }
    const token = `Bearer ${state.auth.value}`;
    const res = await axios.post(`${config.API_HOST}/s1/users/invite/admin`, dataUpload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    await dispatch(loading({ loading: false, result: res.status }));

  } catch (error) {
    await dispatch(loading({ loading: false, result: 1 }));

  }
};
