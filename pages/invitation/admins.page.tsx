import React, {  } from 'react';
import { withTranslation  } from '../../i18n';
import Sidebar from '../../components/sidebar/sidebar';
import Header from '../../components/topbar/header';
import BodySupperAdmin from './UI/supper_admin';

const SupperAdmin = () => {

  return (
    <React.Fragment>
      <div className='flex'>
        <div className='slide__bar'>
          <Sidebar />
        </div>
        <div className='w__full'>
          <Header />
          <BodySupperAdmin />
        </div>
      </div>
    </React.Fragment>
  );
};

SupperAdmin.getInitialProps = async () => {
  return {
    namespacesRequired: ['invitation'],
  };
};

export default withTranslation(['invitation'])(SupperAdmin);
