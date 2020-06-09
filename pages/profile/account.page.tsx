import React, {  } from 'react';
import Sidebar from '@components/sidebar/sidebar';
import Header from '../../components/topbar/header';
import BodyProfile from './UI/body';
// import {  withTranslation } from 'i18n';

const Account = () => {
  return (
    <div className='flex'>
      <div className='slide__bar'>
        <Sidebar />
      </div>
      <div className='w__full'>
        <Header />
        <BodyProfile tab='account'/>
      </div>
    </div>
  );
};

Account.getInitialProps = () => {
  return {
    namespacesRequired: ['profile'],
  };
};

export default Account;
