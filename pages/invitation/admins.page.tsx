import React, {  } from 'react';
import { withTranslation  } from '../../i18n';
import Sidebar from '../../components/sidebar/sidebar';
import Header from '../../components/header/header';
import BodySupperAdmin from './UI/supper_admin';

const SupperAdmin = () => {

  return (
    <React.Fragment>
      <Header />
      <div className='app-main'>
        <Sidebar />
        <div className='app-content'>
          <div className='app-content--inner'>
            <div className='app-content--inner__wrapper'>
              <BodySupperAdmin />
            </div>
          </div>
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
