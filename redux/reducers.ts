import reducerVehicle from '../pages/logic/vehicle_reducer';
import { counter } from '../pages/logic/counter_reducer';
import { todoReducer } from '../pages/logic/todo_reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  reducerVehicle,
  counter,
  todoReducer,
});

export default rootReducer;
