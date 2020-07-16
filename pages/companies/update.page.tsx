import React, { } from 'react';
import Sidebar from '@components/sidebar/sidebar';
import Header from '../../components/header/header';
import BodyCompany from './UI/update_company';
import { withTranslation } from 'i18n';

const Companies = () => {

  return (
    <React.Fragment>
      <Header />
      <div className='app-main'>
        <Sidebar />
        <div className='app-content'>
          <div className='app-content--inner'>
            <div className='app-content--inner__wrapper'>
              <BodyCompany />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Companies.getInitialProps = async () => {
  return {
    namespacesRequired: ['companies'],
  };
};

export default withTranslation(['companies'])(Companies);
