import React, { } from 'react';
import Sidebar from '@components/sidebar/sidebar';
import Header from '../../components/topbar/header';
import DepartmentMembers from './UI/body';
import { withTranslation } from 'i18n';

const Departments = () => {

  return (
    <React.Fragment>
      <div className='flex'>
        <div className='slide__bar'>
          <Sidebar />
        </div>
        <div className='w__full'>
          <Header />
          <DepartmentMembers />
        </div>
      </div>
    </React.Fragment>
  );
};

Departments.getInitialProps = async () => {
  return {
    namespacesRequired: ['departments'],
  };
};

export default withTranslation(['departments'])(Departments);
