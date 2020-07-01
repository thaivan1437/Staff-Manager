import axios from 'axios';
import { config } from '../../../helpers/get_config';
import { loading, getFields, createField } from './fields_actions';

interface ListFields{
  name: string;
  fieldID: string;
}
interface ComponentLoading{
  loading: boolean;
  result: string;
}
interface FieldsInvitation {
  loading: ComponentLoading[];
  result: number;
  fieldID: ListFields[];
  name: string;
  list: ListFields[];

}
const initialSate : FieldsInvitation = {
  loading: [],
  result: 0,
  fieldID: [],
  name: '',
  list: [],
};
export const fields = (state = initialSate , action) => {
  switch (action.type){
    case 'ADD':
      return {
        ...state,
        ...action.payload,
        loading: { result: 0 },
      };
    case 'GET_FIELDS':
      return {
        ...state,
        ...action.payload,
      };
    case 'CREATE_FIELD':
      const listField = [...state.list];
      listField.push(action.payload);

      return {
        ...state,
        list: listField,
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

export const getFieldsThunkAction = () => async (dispatch, getState) => {
  try {
    const state = getState();
    if (!state.auth || !state.auth.value){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại');

      return;
    }
    const token = state.auth.value;
    const res = await axios.get(`${config.API_HOST}/s2/fields`,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    await dispatch(getFields(res.data));

  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};

export const createFieldAction = () =>  async (dispatch, getState) => {
  try {
    const state = getState();
    await dispatch(loading({ loading: true }));
    const  dataUpload = { name: state.fields.name };

    if (!state.auth || !state.auth.value){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại');

      return;
    }
    if (!dataUpload){
      return;
    }
    const token = `Bearer ${state.auth.value}`;

    const res = await axios.post(`${config.API_HOST}/s2/fields`, dataUpload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    await dispatch(createField(res.data));
    await dispatch(loading({ loading: false, result: res.status }));

  } catch (error) {
    await dispatch(loading({ loading: false, result: 1 }));
  }
};
