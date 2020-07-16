import React, { } from 'react';
import Sidebar from '@components/sidebar/sidebar';
import Header from '../../components/header/header';
import DepartmentMembers from './UI/body';
import { withTranslation } from 'i18n';

const Departments = () => {

  return (
    <React.Fragment>
      <Header />
      <div className='app-main'>
        <Sidebar />
        <div className='app-content'>
          <div className='app-content--inner'>
            <div className='app-content--inner__wrapper'>
              <DepartmentMembers />
            </div>
          </div>
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
