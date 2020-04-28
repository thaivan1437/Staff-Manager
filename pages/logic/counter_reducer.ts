import { Router } from '../../i18n';
import { increment, resetCounter } from '../logic/counter_actions';

interface CounterValue {
  number: number;
}

const initialState: CounterValue = {
  number: 0,
};

export const counter = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        number: state.number + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        number: state.number - 1,
      };
    case 'RESET COUNTER':
      return {
        ...state,
        number: 0,
      };
    default:
      return state;
  }
};

// tslint:disable-next-line:no-shadowed-variable
export const NextPage = (counter) => async (dispatch) => {
  try {
    await dispatch(increment());
    if (counter.number === 5) {
      dispatch(resetCounter());
      void Router.push('/account/UI/login');
    }
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};
