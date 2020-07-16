import axios from 'axios';
import { config } from '../../../helpers/get_config';
import { loading, getPosts, addPostData,
   updateCursor, addPostsPagination, activedeletePost, createImageLink, addPostDataUpdate } from './post_actions';

interface PostObject{
  images?: string[];
  title?: string;
  description?: string;
  workingTime?: string;
  rate?: number;
  region?: number;
  type?: string;
  index?: number;
  postID?: string;
}
interface ComponentLoading{
  loading: boolean;
  loadingPagination: boolean;
  result: number;
}
interface PostDeleteObject{
  index?: number;
  postID?: string;
}
interface PostsInvitation {
  loading: ComponentLoading[];
  images?: string[];
  list?: string[];
  notification?: string;
  selectedPost?: PostObject;
  index?: number;
  deletedPost?: PostDeleteObject;
  addedPost: PostObject;
}
const initialSate : PostsInvitation = {
  loading: [],
  selectedPost: {
    title: '',
    workingTime: '',

  },
  deletedPost: {
    postID: '',
  },
  addedPost: {
    title: '',
    workingTime: '',
    images: [],
  },
};
export const post = (state = initialSate , action) => {
  switch (action.type){
    case 'ADD':
      return {
        ...state,
        addedPost : {
          ...state.addedPost,
          ...action.payload.addedPost,
        },
        loading: { result: 0 },
      };
    case 'ADD_DATA_UPDATE':
      const copiedList = JSON.parse(JSON.stringify(state.list));

      const newList = copiedList.map((item) => {
        if (state.selectedPost && item.postID !== state.selectedPost.postID) {
          return  item;
        }

        return {
          ...item,
          ...action.payload.selectedPost,
        };
      });

      return {
        ...state,
        selectedPost : {
          ...state.selectedPost,
          ...action.payload.selectedPost,
        },
        list: newList,
      };

    case 'ACTIVE_DELETE_DATA':
      const copiedDeleteList = JSON.parse(JSON.stringify(state.list));
      const newDeleteList = copiedDeleteList.filter((item) => item.postID !== state.deletedPost?.postID);

      return {
        ...state,
        list: newDeleteList,
      };
    case 'ADD_DELETE_DATA':
      return {
        ...state,
        deletedPost: {
          ...state.deletedPost,
          ...action.payload.deletedPost,
        },
      };
    case 'GET_POSTS':
      return {
        ...state,
        ...action.payload,
      };

    case 'CREATE_IMAGE_LINK':
      return {
        ...state,
        ...action.payload,
      };
    case 'UPDATE_CURSOR':
      return {
        ...state,
        cursor: action.payload,
      };
    case 'ADD_POSTS_PAGINATION':
      const copiedPostPaginationList = JSON.parse(JSON.stringify(state.list));
      copiedPostPaginationList.push(...action.payload.list);

      return {
        ...state,
        list: copiedPostPaginationList,
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

export const createPost = () =>  async (dispatch, getState) => {
  try {
    const state = getState();
    await dispatch(loading({ loading: true }));
    const dataUpload = {
      title: state.post.addedPost.title,
      description: state.post.addedPost.description,
      rate: state.post.addedPost.rate,
      region: state.post.addedPost.region,
      images: state.post.images,
      departmentID: state.auth.departmentID,
      workingTime: state.post.addedPost.workingTime,
    };
    if (!state.auth || !state.auth.value || !state.auth.companyID){
      // tslint:disable-next-line:no-console
      console.log('Thiếu token hoặc tham số');
      await dispatch(loading({ loading: false, result: 1 }));

      return;
    }

    const token = `Bearer ${state.auth.value}`;
    const res = await axios.post(`${config.API_HOST}/s2/companies/${state.auth.companyID}/posts`, dataUpload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    await dispatch(loading({ loading: false, result: res.status }));

  } catch (error) {
    await dispatch(loading({ loading: false, result: 1 }));
  }

};
export const deletedPost = () =>  async (dispatch, getState) => {
  try {
    const state = getState();
    await dispatch(activedeletePost());
    await dispatch(loading({ loading: true }));

    if (!state.auth || !state.auth.value || !state.post.deletedPost.postID){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại hoặc thiếu tham số ');

      return;
    }
    const token = `Bearer ${state.auth.value}`;
    const res = await axios.delete(`${config.API_HOST}/s2/posts/${state.post.deletedPost.postID}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    await dispatch(loading({ loading: false, result: res.status }));

  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
    await dispatch(loading({ loading: false, result: 1 }));
  }

};
export const updatePost = () =>  async (dispatch, getState) => {
  try {
    const state = getState();
    await dispatch(loading({ loading: true }));
    const dataUpload = {
      title: state.post.selectedPost.title,
      description: state.post.selectedPost.description,
      rate: state.post.selectedPost.rate,
      region: state.post.selectedPost.region,
      images: state.post.selectedPost.images,
      workingTime: state.post.selectedPost.workingTime,
    };

    if (!state.auth || !state.auth.value || !state.post.selectedPost.postID){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại hoặc thiếu tham số ');

      return;
    }

    const token = `Bearer ${state.auth.value}`;
    const res = await axios.put(`${config.API_HOST}/s2/posts/${state.post.selectedPost.postID}`, dataUpload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    await dispatch(loading({ loading: false, result: res.status }));

  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
    await dispatch(loading({ loading: false, result: 1 }));
  }

};
export const getPostsThunkAction = () => async (dispatch, getState) => {
  try {
    const state = getState();
    await dispatch(loading({ loading: true }));
    if (!state.auth || !state.auth.value){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại hoặc thiếu tham số ');

      return;
    }
    const token = `Bearer ${state.auth.value}`;

    const res = await axios.get(`${config.API_HOST}/s2/posts?limit=6&sortBy=postID`,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });

    if (res.data.totalCount === 0){
      await dispatch(loading({ loading: false }));
      await dispatch(addPostData({
        ['notification']: 'Không có phần tử nào !',
        ['totalCount']: res.data.totalCount,
      }));

      return;
    }

    await dispatch(getPosts(res.data));
    await dispatch(loading({ loading: false }));

  } catch (error) {
    await dispatch(loading({ loading: false }));
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};

export const createImagesLinkAction = () =>  async (dispatch, getState) => {
  try {
    const state = getState();
    await dispatch(loading({ loading: true }));
    const formData = new FormData();
    formData.append('files', state.post.addedPost.files);

    if (!state.auth || !state.auth.value || !formData){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại');

      return;
    }
    const token = `Bearer ${state.auth.value}`;
    const res = await axios.post(`${config.API_HOST}/s1/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    });
    await dispatch(createImageLink({ images: res.data }));
    await dispatch(addPostDataUpdate({ selectedPost: { images : res.data } }));
    await dispatch(loading({ loading: false }));

  } catch (error) {
    await dispatch(loading({ loading: false }));
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};

export const getPostsPaginationThunkAction = () => async (dispatch, getState) => {
  try {
    const state = getState();
    await dispatch(loading({ loadingPagination: true }));
    if (!state.auth || !state.auth.value || !state.post.cursor){
      // tslint:disable-next-line:no-console
      console.log('Token không tồn tại');

      return;
    }

    const cursor = state.post.cursor;
    const token = state.auth.value;
    const res = await axios.get(`${config.API_HOST}/s2/posts?cursor=${cursor}&limit=6&sortBy=postID`,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.totalCount === 0){
      await dispatch(loading({ loadingPagination: false }));

      return;
    }

    await dispatch(addPostsPagination(res.data));
    await dispatch(updateCursor(res.data.cursor));
    await dispatch(loading({ loadingPagination: false }));

  } catch (error) {
    await dispatch(loading({ loadingPagination: false }));
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};
