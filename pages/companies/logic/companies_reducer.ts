
import axios from 'axios';
import { config } from '../../../helpers/get_config';
import { getCompany, loadingUpdateCompany, statusUpdateCompany } from './companies_action';

interface CompaniesValues {
  name: string;
  address: string;
  intro: string;
  callLimit: number;
  ownedAmount: number;
  paidAmount: number;
  monthLimit: number;
  loading: boolean;
  result: number;
}
const initialSate : CompaniesValues = {
  name: '',
  address: '',
  intro: '',
  callLimit: 0,
  ownedAmount: 0,
  paidAmount: 0,
  monthLimit: 0,
  loading: false,
  result: 0,
};
export const companiesReducer = (state = initialSate , action) => {
  switch (action.type){
    case 'UPDATE_COMPANY':
      return {
        ...state,
        ...action.payload,
      };
    case 'GET_COMPANY':
      return {
        ...state,
        ...action.payload,
      };
    case 'LOADING_UPDATE':
      return {
        ...state,
        loading: action.payload,
      };
    case 'STATUS_UPDATE':
      return {
        ...state,
        result: action.payload,
      };
    default:
      return state;
  }
};

export const updateCompanyAction = () => async (dispatch, getState) => {
  const state = getState();
  await dispatch(loadingUpdateCompany(true));
  const dataUpdate = {
    fieldID: state.fieldsReducer.fieldID,
    name: state.companiesReducer.name,
    address: state.companiesReducer.address,
    intro: state.companiesReducer.intro,
    callLimit: state.companiesReducer.callLimit,
    ownedAmount: state.companiesReducer.ownedAmount,
    paidAmount: state.companiesReducer.paidAmount,
    monthLimit: state.companiesReducer.monthLimit,
  };
  if (!state.auth || !state.auth.value){
    // tslint:disable-next-line:no-console
    console.log('NOT TOKEN');

    return;
  }
  try {
    const token = state.auth.value;
    const companyID = state.auth.companyID;
    const res = await axios.put(`${config.API_HOST}/s2/companies/${companyID}`,
      dataUpdate , {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    await dispatch(loadingUpdateCompany(false));
    await dispatch(statusUpdateCompany(res.status));
  } catch (error) {
    dispatch(loadingUpdateCompany(false));
    dispatch(statusUpdateCompany(1));
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};

export const getCompanyAction = () => async (dispatch, getState) => {
  try {
    const state = getState();

    if (!state.auth || !state.auth.value){
      return;
    }
    const token = state.auth.value;
    const companyID = state.auth.companyID;
    const res = await axios.get(`${config.API_HOST}/s2/companies/${companyID}`,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getCompany(res.data));

    return res;
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};
