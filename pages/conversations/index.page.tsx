import React, { } from 'react';
import Sidebar from '@components/sidebar/sidebar';
import Header from '../../components/header/header';
import { GetConverSations } from './UI/get_conversations';
import { withTranslation } from 'i18n';

const ConverSations = () => {

  return (
    <React.Fragment>
      <Header />
      <div className='app-main'>
        <Sidebar />
        <div className='app-content'>
          <div className='app-content--inner'>
            <div className='app-content--inner__wrapper'>
              <GetConverSations />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

ConverSations.getInitialProps = async () => {
  return {
    namespacesRequired: ['converSations'],
  };
};

export default withTranslation(['converSations'])(ConverSations);
