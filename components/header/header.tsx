import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, FormControlLabel } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { i18n, Router, withTranslation } from '../../i18n';
import { TFunction } from 'next-i18next';
import { Logout, Login } from '../../pages/auth/logic/login_actions';
import { GetUserDataThunkAction, getRolesThunkAction } from 'pages/auth/logic/login_reducer';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
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
        <Button
          variant='contained'
          className='logout__btn MuiFormControlLabel-labelPlacementStart'
          onClick={logUserOut}
        >
          {t('auth:logout')}
        </Button>
      );
    }
    if (!tokenAuth) {
      return (
        <Button
          variant='contained'
          className='logout__btn MuiFormControlLabel-labelPlacementStart'
          onClick={logUserOut}
        >
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
    <div className='header'>
      <div className='header__logo'>
        <Button className='MuiIconButton-root'>
          <img src='../../static/images/logo.svg' alt='' />
        </Button>
        <p className='header__name'>Company</p>
      </div>
      <div className='header__toolbar'>
        <div className='toolbar__search'>
          <Button><SearchIcon className='search__icon'/></Button>
          <p className='header__dash'>Dashboard</p>
        </div>
        <div className='toolbar__right'>
          <Button>
            <NotificationsActiveIcon className='header__notification'/>
          </Button>
          <FormControlLabel
            control={
              <Switch
                onChange={onSwitchLanguage}
                color='default'
                checked={i18n.language ? !(i18n.language === 'vi') : false}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            }
            labelPlacement='start'
            label={i18n.language ? i18n.language.toUpperCase() : 'VI'}
          />
          <ActionUser />
        </div>
      </div>
    </div>
  );

};

export default withTranslation('auth')(Header);
