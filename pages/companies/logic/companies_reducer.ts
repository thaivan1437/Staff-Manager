import axios from 'axios';
import { config } from '../../../helpers/get_config';
import { loading, getCompanies, updateCursor, addCompany, addCompanies, getCompany } from './companies_actions';

interface CompaniesList{
  name: string;
  companyID: string;
}
interface ComponentLoading{
  loading: boolean;
  result: string;
}
interface Field{
  name: string;
  fieldID: string;
}
interface CompanyData {
  loading: ComponentLoading[];
  name: string;
  address: string;
  intro: string;
  callLimit: number;
  monthLimit: number;
  ownedAmount: number;
  paidAmount: number;
  phones: string[];
  hotlines: string[];
  list: CompaniesList[];
  cursor: string;
  fieldID: Field[];

}

const initialSate : CompanyData = {
  loading: [],
  list: [],
  name: '',
  address: '',
  intro: '',
  ownedAmount: 0,
  paidAmount: 0,
  callLimit: 0,
  monthLimit: 0,
  phones: [],
  hotlines: [],
  cursor: '',
  fieldID: [],

};
export const companies = (state = initialSate , action) => {
  switch (action.type){
    case 'ADD':
      return {
        ...state,
        ...action.payload,
        loading: { result: 0 },
      };
    case 'LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'UPDATE_CURSOR':
      return {
        ...state,
        cursor: action.payload,
      };
    case 'GET_COMPANIES':
      return {
        ...state,
        ...action.payload,
      };
    case 'ADD_COMPANY':
      const listNew = [...state.list];
      listNew.unshift(action.payload);

      return {
        ...state,
        list: listNew,
      };

    case 'ADD_COMPANIES':
      const listCompanies = [...state.list];
      listCompanies.push(...action.payload.list);

      return {
        ...state,
        list: listCompanies,
      };

    default:
      return state;
  }
};

export const updateCompanyAction = () => async (dispatch, getState) => {
  try {
    await dispatch(loading({ loading: true }));
    const state = getState();
    const dataUpdate = {
      fieldID: state.fields.fieldID['fieldID'],
      name: state.companies.name,
      address: state.companies.address,
      intro: state.companies.intro,
      callLimit: state.companies.callLimit,
      ownedAmount: state.companies.ownedAmount,
      paidAmount: state.companies.paidAmount,
      monthLimit: state.companies.monthLimit,
    };
    if (!state.auth || !state.auth.value){
      // tslint:disable-next-line:no-console
      console.log('NOT TOKEN');

      return;
    }
    const token = state.auth.value;
    const companyID = state.auth.companyID;
    const res = await axios.put(`${config.API_HOST}/s2/companies/${companyID}`,
      dataUpdate , {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    await dispatch(loading({ loading: false, result: res.status }));

  } catch (error) {
    await dispatch(loading({ loading: false, result: 1 }));
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};

export const getCompanyAction = () => async (dispatch, getState) => {
  try {
    const state = getState();

    if (!state.auth || !state.auth.value){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại');

      return;
    }
    const token = state.auth.value;
    if (!state.auth.companyID){
      // tslint:disable-next-line:no-console
      console.log('companyID không tồn tại');

      return;
    }
    const companyID = state.auth.companyID;
    const res = await axios.get(`${config.API_HOST}/s2/companies/${companyID}`,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    await  dispatch(getCompany(res.data));

    return res;
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};

export const createDataCompany = () =>  async (dispatch, getState) => {
  try {
    const state = getState();
    await dispatch(loading({ loading: true }));
    const  dataUpload = {
      name: state.companies.name,
      address: state.companies.address,
      fieldID: state.fields.fieldID['fieldID'],
      intro: state.companies.intro,
      callLimit: state.companies.callLimit,
      monthLimit: state.companies.monthLimit,
      phones: state.companies.phones,
      hotlines: state.companies.hotlines,
    };
    if (!state.auth || !state.auth.value){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại');

      return;
    }
    if (state.auth.isAdmin !== true){
      return;
    }
    const token = `Bearer ${state.auth.value}`;
    const res = await axios.post(`${config.API_HOST}/s2/companies`, dataUpload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    await dispatch(addCompany(res.data));
    await dispatch(loading({ loading: false, result: res.status }));

  } catch (error) {
    await dispatch(loading({ loading: false, result: 1 }));
  }
};

export const getCompaniesThunkAction = () => async (dispatch, getState) => {
  try {
    const state = getState();
    if (!state.auth || !state.auth.value){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại');

      return;
    }
    const token = state.auth.value;
    const res = await axios.get(`${config.API_HOST}/s2/companies?sortDirection=ASC`,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    await dispatch(getCompanies(res.data));
    await dispatch(updateCursor(res.data.cursor));

  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};

export const getCompaniesPaginationThunkAction = () => async (dispatch, getState) => {
  try {
    const state = getState();
    if (!state.auth || !state.auth.value){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại');

      return;
    }

    const cursor = state.companies.cursor;
    const token = state.auth.value;
    const res = await axios.get(`${config.API_HOST}/s2/companies?sortDirection=ASC&cursor=${cursor}`,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    await dispatch(addCompanies(res.data));
    await dispatch(updateCursor(res.data.cursor));

  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};
