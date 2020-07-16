import React, { } from 'react';
import Sidebar from '@components/sidebar/sidebar';
import Header from '../../components/header/header';
import  Field  from './UI/body_fields';
import { withTranslation } from 'i18n';

const Fields = () => {

  return (
    <React.Fragment>
      <Header />
      <div className='app-main'>
        <Sidebar />
        <div className='app-content'>
          <div className='app-content--inner'>
            <div className='app-content--inner__wrapper'>
              <Field />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Fields.getInitialProps = async () => {
  return {
    namespacesRequired: ['fields'],
  };
};

export default withTranslation(['fields'])(Fields);
