import React, { } from 'react';
import Sidebar from '@components/sidebar/sidebar';
import Header from '../../components/topbar/header';
import { Field } from './UI/body';
import { withTranslation } from 'i18n';

const Companies = () => {

  return (
    <React.Fragment>
      <div className='flex'>
        <div className='slide__bar'>
          <Sidebar />
        </div>
        <div className='w__full'>
          <Header />
          <Field />
        </div>
      </div>
    </React.Fragment>
  );
};

Companies.getInitialProps = async () => {
  return {
    namespacesRequired: ['fields'],
  };
};

export default withTranslation(['fields'])(Companies);
