import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppBar, Toolbar, Switch, Grid, FormControlLabel, Input, InputAdornment, Typography, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { i18n, Router, withTranslation } from '../../i18n';
import { TFunction } from 'next-i18next';
import { Logout, Login } from '../../pages/auth/logic/login_actions';
import { GetUserDataThunkAction, getRolesThunkAction } from 'pages/auth/logic/login_reducer';

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
      dispatch(getRolesThunkAction(token)),
      dispatch(GetUserDataThunkAction(token)),
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
    const tokenAuth = typeof localStorage !== 'undefined' && localStorage.getItem('access_token');
    if (tokenAuth) {
      return (
        <Button variant='contained' className='logout__btn' color='primary' onClick={logUserOut}>
          {t('auth:logout')}
        </Button>
      );
    }
    if (!tokenAuth) {
      return (
        <Button variant='contained' className='logout__btn' color='primary' onClick={logUserOut}>
          {t('auth:logout')}
        </Button>
      );
    }

    return (
      <Button variant='contained' className='logout__btn' color='primary' onClick={() => Router.push('/auth/login')}>
         {t('auth:login')}
      </Button>
    );
  };

  return (
    <div className='topbar'>
      <AppBar position='relative' className='topbar__bg'>
        <Toolbar className='topbar__wrap'>
          <Grid container alignItems='center'>
            <Grid item md={6}>
              <Typography variant='h6' className='topbar__wrap--title'>Dashboard</Typography>
            </Grid>
            <Grid container item md={6} alignContent='flex-end' justify='space-between'>
                <Input
                  className='topbar__search'
                  placeholder='Search'
                  disableUnderline={true}
                  type='search'
                  endAdornment={
                    <InputAdornment position='end'>
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
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
    </div>
  );

};

export default withTranslation('auth')(Header);
