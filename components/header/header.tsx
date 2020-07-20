import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormControlLabel, Popover } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { i18n, Router, withTranslation } from '../../i18n';
import { TFunction } from 'next-i18next';
import { Logout, Login } from '../../pages/auth/logic/login_actions';
import { GetUserDataThunkAction, getRolesThunkAction } from 'pages/auth/logic/login_reducer';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Notifications from '../../pages/notifications/index.page';
import { getNotificationsAction } from 'pages/notifications/logic/notification_reducer';
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
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    void fetchNotification();
  }, [auth]);

  const fetchNotification = async() => {
    await dispatch(getNotificationsAction());
  };

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

  // <!---------------Popover React component (Material UI)---------------!>

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClickPopover = (event) => { setAnchorEl(event.currentTarget); };
  const handleClosePopover = () => { setAnchorEl(null); };
  const open = Boolean(anchorEl);
  // <!---------------Popover React component (Material UI)---------------!>

  const notifications = useSelector((state) => state.notifications);

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
          <Button onClick={handleClickPopover}>
            <NotificationsActiveIcon className='header__notification'/>
            <span className='rounded-circle count__notifications'>{notifications.totalCount}</span>
          </Button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Notifications />
          </Popover>
          <FormControlLabel
            className='mx-3 my-0'
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
