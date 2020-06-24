
import axios from 'axios';

export const getTokenAuth = async () => {
  try{

    const dataPost = { email: 'lehoanghuyit1009@gmail.com', password: '123abcDEF!@#' };
    const res = await axios.post('https://dev.gospence.com/s1/auth/login', dataPost, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.data.accessToken;

  } catch (errors){
    const res = errors;

    return res;
  }
};
