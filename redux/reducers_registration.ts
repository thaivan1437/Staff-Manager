import reducerVehicle from '../pages/home/logic/vehicle_reducer';
import { counter } from '../pages/home/logic/counter_reducer';
import { todoReducer } from '../pages/home/logic/todo_reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  reducerVehicle,
  counter,
  todoReducer,
});

export default rootReducer;
