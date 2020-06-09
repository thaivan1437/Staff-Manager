import React, { } from 'react';
import Sidebar from '@components/sidebar/sidebar';
import Header from '../../components/topbar/header';
import BodyProfile from './UI/body';
import {  withTranslation } from 'i18n';

// tslint:disable-next-line:prefer-const
const Address = () => {

  return (
    <div className='flex'>
      <div className='slide__bar'>
        <Sidebar />
      </div>
      <div className='w__full'>
        <Header />
        <BodyProfile tab='address'/>
      </div>
    </div>
  );
};

Address.getInitialProps = () => {
  return {
    namespacesRequired: ['profile'],
  };
};

export default withTranslation('profile')(Address);
