import reducerVehicle from '../pages/home/logic/vehicle_reducer';
import { counter } from '../pages/home/logic/counter_reducer';
import { todoReducer } from '../pages/home/logic/todo_reducer';
import { reducerLogin } from '../pages/auth/logic/login_reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  reducerVehicle,
  counter,
  todoReducer,
  reducerLogin,
});

export default rootReducer;
