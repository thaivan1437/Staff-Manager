import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppBar, Toolbar, Switch, Grid, FormControlLabel, Input, Typography, Button } from '@material-ui/core';
import { i18n, Router, withTranslation } from '../../i18n';
import { TFunction } from 'next-i18next';
import { Logout, Login } from '../../pages/auth/logic/login_actions';
import { getIDUSERThunkAction } from 'pages/auth/logic/login_reducer';

interface DataType {
  t: TFunction;
}

type Token = string | null;

type HeaderProps = DataType;

async function onSwitchLanguage(event) {
  if (event.target.checked) {
    await i18n.changeLanguage('en');
    localStorage.setItem('lang', i18n.language);

    return;
  }
  await i18n.changeLanguage('vi');
  localStorage.setItem('lang', i18n.language);
}

const Header: React.FunctionComponent<HeaderProps> = ({ t }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let token: Token = window.location.search;

    if (!token && typeof localStorage !== 'undefined') {
      token = localStorage.getItem('access_token');
    }

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
  }

  function logUserOut() {
    dispatch(Logout());
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.removeItem('access_token');
    void Router.push('/auth/login');
  }

  const ActionUser = () => {
    if (typeof localStorage === 'undefined') {
      return <div/>;
    }
    const tokenAuth = localStorage.getItem('access_token');
    if (tokenAuth) {
      return (
        <React.Fragment>
          <Button variant='contained' color='primary' onClick={logUserOut}>
            {t('auth:logout')}
          </Button>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Button variant='contained' color='primary' onClick={() => Router.push('/auth/login')}>
          {t('auth:login')}
        </Button>
      </React.Fragment>
    );
  };

  return (
    <AppBar position='relative' className='topbar'>
      <Toolbar className='topbar__wrap'>
        <Grid container alignItems='center'>
          <Grid item md={7}>
            <Typography className='topbar__wrap--title'>Dashboard</Typography>
          </Grid>
          <Grid container item sm={4} md={5} alignContent='flex-end'>
            <form noValidate autoComplete='off'>
              <Input placeholder='Search' inputProps={{ 'aria-label': 'description' }} />
            </form>
            <FormControlLabel
              control={
                <Switch
                  onChange={onSwitchLanguage}
                  value='checked'
                  color='default'
                  checked={i18n.language ? !(i18n.language === 'vi') : false}
                />
              }
              labelPlacement='start'
              label={i18n.language ? i18n.language.toUpperCase() : 'VI'}
            />
            <ActionUser />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

};

export default withTranslation('auth')(Header);
