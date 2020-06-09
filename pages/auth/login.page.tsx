import React, { useEffect } from 'react';
import { TFunction } from 'next-i18next';
import { withTranslation, useTranslation, Router } from '../../i18n';
import { Grid, Button } from '@material-ui/core';
import LeftSidebar from './UI/left_sidebar/left_sidebar';
import { useDispatch } from 'react-redux';
import { Login } from './logic/login_actions';
import { config } from '../../helpers/get_config';
import { getIDUSERThunkAction } from './logic/login_reducer';

interface DataType {
  t: TFunction;
}

const linkAPI = `${config.API_HOST}/s1/auth/google`;

const LoginPage = () => {
  const { t }: DataType = useTranslation();

  const dispatch = useDispatch();
  useEffect(() => {
    const token = window.location.search;
    if (!token) {
      return;
    }
    const accessToken = token.replace('?token=', '');
    localStorage.setItem('access_token', accessToken);
    void logUserIn(accessToken);

  }, []);

  async function logUserIn(token: string) {
    await Promise.all([
      dispatch(getIDUSERThunkAction(token)),
      dispatch(Login(token)),
    ]);
    void Router.push('/');
  }

  return  (
  <React.Fragment>
    <Grid container>
      <Grid className='' item md={4}>
        <LeftSidebar />
      </Grid>
      <Grid className='login-box' item md={8}>
        <Button variant='contained' color='primary' href={linkAPI}>
          {t('auth:signInGoogle')}
        </Button>
      </Grid>
    </Grid>
  </React.Fragment>
  );
};

LoginPage.getInitialProps = async () => {
  return {
    namespacesRequired: ['auth'],
  };
};

export default withTranslation(['auth'])(LoginPage);
