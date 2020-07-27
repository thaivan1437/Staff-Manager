import reducerVehicle from '../pages/home/logic/vehicle_reducer';
import { counter } from '../pages/home/logic/counter_reducer';
import { todoReducer } from '../pages/home/logic/todo_reducer';
import { auth } from '../pages/auth/logic/login_reducer';
import { profileReducer } from '../pages/profile/logic/profile_reducer';
import { invitation } from '../pages/invitation/logic/invitation_reducer';
import { fields } from '../pages/fields/logic/fields_reducer';
import { conversations } from '../pages/conversations/logic/conversations_reducer';
import { companies } from '../pages/companies/logic/companies_reducer';
import { post } from '../pages/posts/logic/post_reducer';
import { departmentsReducer } from 'pages/departments_member/logic/departments_reducer';
import { scripts } from '../pages/scripts/logic/scripts_reducer';
import { notifications } from '../pages/notifications/logic/notification_reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  reducerVehicle,
  counter,
  todoReducer,
  invitation,
  auth,
  companies,
  conversations,
  fields,
  post,
  scripts,
  notifications,
  profile: profileReducer,
  departments: departmentsReducer,
});

export default rootReducer;
