import { getProfile, loading } from './profile_actions';
import axios from 'axios';
import { config } from '../../../helpers/get_config';

interface ComponentLoading{
  loading: boolean;
  result: string;
}
interface ProfileList {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  descriptions: string;
  phoneNumber: string;
  earnedAmount: number;
  paidAmount: number;
  gender: boolean;
  address: string;
  loading: ComponentLoading[];

}
const initialSate : ProfileList = {
  firstName: '',
  lastName: '',
  email: '',
  profilePhoto: '',
  descriptions: '',
  phoneNumber: '',
  earnedAmount: 0,
  paidAmount: 0,
  gender: false,
  address: '',
  loading: [],
};

export const profileReducer = (state = initialSate , action) => {
  switch (action.type){
    case 'ADD':
      return {
        ...state,
        ...action.payload,
        loading: { result: 0 },
      };
    case 'FETCH':
      return {
        ...state,
        ...action.payload,
        email: action.payload.userID.email,
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

export const getDataThunkAction = () => async (dispatch, getState) => {
  try {
    const state = getState();
    if (!state.auth || !state.auth.value || !state.auth.userID){
      return;
    }
    const token = `Bearer ${state.auth.value}`;
    const userID = state.auth.userID;
    const res = await axios.get(`${config.API_HOST}/s1/users/${userID}/profiles`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    await dispatch(getProfile('FETCH', res.data));
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};

export const putProfile = (nameTab) =>  async (dispatch, getState) => {
  try {
    const state = getState();
    let dataUpload = {};
    await dispatch(loading({ loading: true }));

    if (nameTab === 'ABOUT'){
      dataUpload = {
        firstName: state.profile.firstName,
        lastName: state.profile.lastName,
      };
    }
    if (nameTab === 'ACCOUNT'){
      dataUpload = {
        gender: state.profile.gender,
        dateOfBirth: state.profile.dateOfBirth,
        phoneNumber: state.profile.phoneNumber,
        earnedAmount: state.profile.earnedAmount,
      };
    }
    if (nameTab === 'ADDRESS'){
      dataUpload = {
        address: state.profile.address,
        descriptions: state.profile.descriptions,
      };
    }
    if (!state.auth || !state.auth.value || !state.auth.userID){
      return;
    }

    const token = `Bearer ${state.auth.value}`;
    const userID = state.auth.userID;
    const res = await axios.put(`${config.API_HOST}/s1/users/${userID}/profiles`, dataUpload, {
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
