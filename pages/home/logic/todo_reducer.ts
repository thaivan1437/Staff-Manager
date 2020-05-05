import { fetchData } from './todo_action';
import axios from 'axios';

interface TodoValue {
  data: object;
}

const initialState: TodoValue = {
  data: {},
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export const getDataThunkAction = () => async (dispatch) => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    dispatch(fetchData('FETCH_DATA', res.data));
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};
