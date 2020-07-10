
import axios from 'axios';
import { config } from '../../../helpers/get_config';
import { getListDpMembers, getDpMemberProfiles,
        dpMemberCursor, hideLoaderListMember,
        hideLoaderMemberProfiles, statusMemberProfiles, addDpMembersPagination }
      from './departments_action';

interface ListDepartment{
  userID: string;
  name: string;
  point: string;
  status: string;
}
interface ListMember{
  id: string;
  photo: string;
  firstName: string;
  lastName: string;
  descriptions: string;
  email: string;
  birthday: string;
  address: string;
}
interface DepartmentValues {
  list: ListDepartment[];
  cursor: string;
  memberItem: ListMember;
  loadingList: boolean;
  loadingProfiles: boolean;
  status: string;
}
const initialSate : DepartmentValues = {
  list: [],
  cursor: '',
  memberItem: {
    id: '',
    photo: '',
    firstName: '',
    lastName: '',
    descriptions: '',
    email: '',
    birthday: '',
    address: '',
  },
  loadingList: true,
  loadingProfiles: true,
  status: 'string',
};
export const departmentsReducer = (state = initialSate , action) => {
  switch (action.type){
    case 'GET_LIST_DP_MEMBERS':
      return {
        ...state,
        list: action.payload.list,
        cursor: action.payload.cursor,
      };
    case 'DP_MEMBERS_CURSOR':
      return {
        ...state,
        cursor: action.payload,
      };
    case 'ADD_DP_MEMBERS_PAGINATION':
      const listDepartment = [...state.list];
      listDepartment.push(...action.payload.list);

      return {
        ...state,
        list: listDepartment,
      };
    case 'GET_DP_MEMBER_PROFILES':
      return {
        ...state,
        memberItem: action.payload.newMemberItem,
      };
    case 'SHOW_LOADER_LIST':
      return {
        ...state,
        loadingList: true,
      };
    case 'HIDE_LOADER_LIST':
      return {
        ...state,
        loadingList: false,
      };
    case 'SHOW_LOADER_PROFILES':
      return {
        ...state,
        loadingProfiles: true,
      };
    case 'HIDE_LOADER_PROFILES':
      return {
        ...state,
        loadingProfiles: false,
      };
    case 'STATUS_PROFILES':
      return {
        ...state,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export const getListDpMembersAction = () => async (dispatch, getState) => {
  try {
    const state = getState();
    if (!state.auth || !state.auth.value || !state.auth.companyID || !state.auth.departmentID){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại hoac thieu tham so');

      return;
    }
    const token = state.auth.value;
    const companyID = state.auth.companyID;
    const departmentID = state.auth.departmentID;
    const res = await axios.get(`${config.API_HOST}/s2/companies/${companyID}/departments/${departmentID}/members?sortDirection=DESC&limit=1`,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    await dispatch(getListDpMembers(res.data));
    await dispatch(hideLoaderListMember());

    const  memberID = res.data.list[0].userID.userID;
    const result = await axios.get(`${config.API_HOST}/s1/users/${memberID}/profiles`,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    await dispatch(getDpMemberProfiles(
      { newMemberItem: {
        id: result.data.userID.userID,
        photo: result.data.profilePhoto,
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        descriptions: result.data.descriptions,
        birthday: result.data.dateOfBirth,
        email: result.data.userID.email,
        address: result.data.address,
      } },
    ));
    await dispatch(hideLoaderMemberProfiles());
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};
export const departmentMembersPaginationAction = () => async (dispatch, getState) => {
  try {
    const state = getState();
    if (!state.auth || !state.auth.value || !state.auth.companyID || !state.auth.departmentID){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại hoac thieu tham so');

      return;
    }
    const cursor = state.departments.cursor;
    const token = state.auth.value;
    const companyID = state.auth.companyID;
    const departmentID = state.auth.departmentID;
    const res = await axios.get(`${config.API_HOST}/s2/companies/${companyID}/departments/${departmentID}/members?sortDirection=DESC&cursor=${cursor}&limit=1`,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    await dispatch(dpMemberCursor(res.data.cursor));
    await dispatch(addDpMembersPagination(res.data));
    await dispatch(hideLoaderListMember());
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};

export const getMemberProfilesAction = () => async (dispatch, getState) => {
  try {
    const state = getState();
    if (!state.auth || !state.auth.value){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại');

      return;
    }
    const token = state.auth.value;
    const memberID = state.departments.memberItem.id;
    const res = await axios.get(`${config.API_HOST}/s1/users/${memberID}/profiles`,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    await dispatch(getDpMemberProfiles(
      { newMemberItem: {
        id: res.data.userID.userID,
        photo: res.data.profilePhoto,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        descriptions: res.data.descriptions,
        birthday: res.data.dateOfBirth,
        email: res.data.userID.email,
        address: res.data.address,
      } },
    ));
    await dispatch(statusMemberProfiles({ status: res.status }));
    await dispatch(hideLoaderMemberProfiles());
  } catch (error) {
    await dispatch(statusMemberProfiles({ status: 1 }));
    await dispatch(hideLoaderMemberProfiles());
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};
