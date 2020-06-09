import reducerVehicle from '../pages/home/logic/vehicle_reducer';
import { counter } from '../pages/home/logic/counter_reducer';
import { todoReducer } from '../pages/home/logic/todo_reducer';
import { auth } from '../pages/auth/logic/login_reducer';
import { profileReducer } from '../pages/profile/logic/profile_reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  reducerVehicle,
  counter,
  todoReducer,
  auth,
  profile: profileReducer,
});

export default rootReducer;
