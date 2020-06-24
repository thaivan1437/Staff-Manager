import axios from 'axios';
import { config } from '../../../helpers/get_config';
import { getField, createField, statusCreateField } from './fields_action';

interface Ob {
  fieldID: string;
  name: string;
}
interface FieldsValue {
  list: Ob[];
  newValueFields: string;
  result: number;
}
const initialSate : FieldsValue = {
  list: [],
  newValueFields: '',
  result: 0,
};

export const fieldsReducer = (state = initialSate , action) => {
  switch (action.type){
    case 'GET_FIELD':
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
    case 'VALUE_FIELD_CHANGE':
      return {
        ...state,
        newValueFields: action.payload,
      };
    case 'STATUS_CREATE_FIELD':
      return {
        ...state,
        result: action.payload,
      };
    default:
      return state;
  }
};
export const getFieldAction = () => async (dispatch, getState) => {
  try {
    const state = getState();
    if (!state.auth || !state.auth.value) {
      return;
    }
    const token = state.auth.value;
    const res = await axios.get(`${config.API_HOST}/s2/fields`,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    await dispatch(getField(res.data));
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};

export const createFieldAction = () => async (dispatch, getState) => {
  const state = getState();
  const payload = { name: state.fieldsReducer.newValueFields };
  if (!state.auth || !state.auth.value){
    return;
  }
  const token  = state.auth.value;

  try {
    const res = await axios.post(`${config.API_HOST}/s2/fields`,
      payload, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    await dispatch(createField(res.data));
    await dispatch(statusCreateField(res.status));
  } catch (error) {
    dispatch(statusCreateField(1));
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};
