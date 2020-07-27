
import axios from 'axios';
import { config } from '../../../helpers/get_config';
import {
  loading,
  getScripts,
  addScriptInList,
  activeDeleteScript,
  statusScripts,
  addScriptPagination,
} from './scripts_actions';

interface ScriptsObject{
  title?: string;
  content?: string;
  scriptID?: string;
}

interface ScriptsInitial {
  list?: ScriptsObject;
  createScript?: ScriptsObject;
  updateScript?: ScriptsObject;
  deleteScript?: ScriptsObject;
  loading: boolean;
  status?: number;
  cursor: string;
}
const initialSate : ScriptsInitial = {
  createScript: {
    title: '',
    content: '',
  },
  updateScript: {
    title: '',
    content: '',
    scriptID: '',
  },
  deleteScript: {
    scriptID: '',
  },
  loading: false,
  status: 0,
  cursor: '',
};

export const scripts = (state = initialSate , action) => {
  switch (action.type){
    case 'CREATE_SCRIPT':
      return {
        ...state,
        createScript: {
          ...state.createScript,
          ...action.payload.createScript,
        },
        status: 0,
      };
    case 'GET_SCRIPTS':
      return {
        ...state,
        ...action.payload,
      };
    case 'ADD_PAGINATION':
      const copiedScriptPaginationList = JSON.parse(JSON.stringify(state.list));
      copiedScriptPaginationList.push(...action.payload.list);

      return {
        ...state,
        list: copiedScriptPaginationList,
        cursor: action.payload.cursor,
      };

    case 'ADD_SCRIPT_IN_LIST':
      const newList = JSON.parse(JSON.stringify(state.list));
      newList.unshift(action.payload);

      return {
        ...state,
        list: newList,
      };
    case 'UPDATE_SCRIPTS':
      const copiedList = JSON.parse(JSON.stringify(state.list));

      const newUpdateList = copiedList.map((item) => {
        if (state.updateScript && item.scriptID !== state.updateScript.scriptID) {
          return  item;
        }

        return {
          ...item,
          ...action.payload.updateScript,
        };
      });

      return {
        ...state,
        updateScript : {
          ...state.updateScript,
          ...action.payload.updateScript,
        },
        list: newUpdateList,
      };
    case 'ACTIVE_DELETE_SCRIPT':
      const copiedDeleteList = JSON.parse(JSON.stringify(state.list));
      const newDeleteList = copiedDeleteList.filter((item) => item.scriptID !== state.deleteScript?.scriptID);

      return {
        ...state,
        list: newDeleteList,
      };
    case 'ADD_DELETE_SCRIPT':
      return {
        ...state,
        deleteScript: {
          ...state.deleteScript,
          ...action.payload.deleteScript,
        },
      };
    case 'LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'STATUS':
      return {
        ...state,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export const createScriptAction = () => async (dispatch, getState) => {
  try {
    await dispatch(loading({ loading: true }));
    const state = getState();
    if (!state.auth || !state.auth.value || !state.auth.companyID){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại hoac thieu tham so');

      return;
    }
    const token = state.auth.value;
    const companyID = state.auth.companyID;
    const dataCreate = {
      title: state.scripts.createScript.title,
      content: state.scripts.createScript.content,
    };
    const res = await axios.post(`${config.API_HOST}/s2/companies/${companyID}/scripts`, dataCreate,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    await dispatch(addScriptInList(res.data));
    await dispatch(statusScripts({ status: res.status }));
    await dispatch(loading({ loading: false }));
  } catch (error) {
    await dispatch(statusScripts({ status: 1 }));
    await dispatch(loading({ loading: false }));
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};
export const getScriptsActions = () => async (dispatch, getState) => {
  try {
    await dispatch(loading({ loading: true }));
    const state = getState();
    if (!state.auth || !state.auth.value || !state.auth.companyID){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại hoac thieu tham so');

      return;
    }
    const token = state.auth.value;
    const companyID = state.auth.companyID;
    const res = await axios.get(`${config.API_HOST}/s2/companies/${companyID}/scripts?limit=5`,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    await dispatch(getScripts(res.data));
    await dispatch(loading({ loading: false }));
  } catch (error) {
    await dispatch(loading({ loading: false }));
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};

export const getScriptPaginationAction = () => async (dispatch, getState) => {
  try {
    const state = getState();
    await dispatch(loading({ loading: true }));
    if (!state.auth || !state.auth.value || !state.scripts.cursor){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại');

      return;
    }
    const cursor = state.scripts.cursor;
    const token = state.auth.value;
    const companyID = state.auth.companyID;
    const res = await axios.get(`${config.API_HOST}/s2/companies/${companyID}/scripts?cursor=${cursor}&limit=3`,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.totalCount === 0){
      await dispatch(loading({ loading: false }));

      return;
    }
    await dispatch(addScriptPagination(res.data));
    await dispatch(loading({ loading: false }));
  } catch (error) {
    await dispatch(loading({ loading: false }));
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};

export const updateScriptAction = () =>  async (dispatch, getState) => {
  try {
    await dispatch(loading({ loading: true }));
    const state = getState();
    const dataUpdate = {
      content: state.scripts.updateScript.content,
    };
    const companyID = state.auth.companyID;
    const scriptID = state.scripts.updateScript.scriptID;
    if (!state.auth || !state.auth.value || !scriptID || !companyID){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại hoặc thiếu tham số ');

      return;
    }
    const token = `Bearer ${state.auth.value}`;
    const res = await axios.put(`${config.API_HOST}/s2/companies/${companyID}/scripts/${scriptID}`, dataUpdate, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    await dispatch(loading({ loading: false }));
    await dispatch(statusScripts({ status: res.status }));
  } catch (error) {
    await dispatch(statusScripts({ status: 1 }));
    await dispatch(loading({ loading: false }));
  }
};

export const deleteScriptAction = () =>  async (dispatch, getState) => {
  try {
    await dispatch(loading({ loading: true }));
    await dispatch(activeDeleteScript());
    const state = getState();
    const companyID = state.auth.companyID;
    const scriptID = state.scripts.deleteScript.scriptID;
    if (!state.auth || !state.auth.value || !scriptID || !companyID){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại hoặc thiếu tham số ');

      return;
    }
    const token = `Bearer ${state.auth.value}`;
    const res = await axios.delete(`${config.API_HOST}/s2/companies/${companyID}/scripts/${scriptID}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    await dispatch(loading({ loading: false }));
    await dispatch(statusScripts({ status: res.status }));
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};
