
import axios from 'axios';

export const getTokenAuth = async () => {
  try{

    const dataPost = { email: 'coreproducts1@gmail.com', password: '123abcDEF!@#' };
    const res = await axios.post('https://dev.gospence.com/s1/auth/login', dataPost, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // goi lai action

    return res.data.accessToken;

  } catch (errors){
    const res = errors;

    return res;
  }
};
