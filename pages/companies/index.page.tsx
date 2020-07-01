import React, { } from 'react';
import Sidebar from '@components/sidebar/sidebar';
import Header from '../../components/topbar/header';
import BodyCompanies from './UI/create_companies';
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
          <BodyCompanies />
        </div>
      </div>
    </React.Fragment>
  );
};

Companies.getInitialProps = async () => {
  return {
    namespacesRequired: ['invitation'],
  };
};

export default withTranslation(['invitation'])(Companies);
