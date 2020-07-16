import React, {  } from 'react';
import Sidebar from '@components/sidebar/sidebar';
import Header from '../../components/header/header';
import BodyProfile from './UI/body';
// import {  withTranslation } from 'i18n';

const Account = () => {
  return (
    <React.Fragment>
      <Header />
      <div className='app-main'>
        <Sidebar />
        <div className='app-content'>
          <div className='app-content--inner'>
            <div className='app-content--inner__wrapper'>
              <BodyProfile tab='account' />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Account.getInitialProps = () => {
  return {
    namespacesRequired: ['profile'],
  };
};

export default Account;
