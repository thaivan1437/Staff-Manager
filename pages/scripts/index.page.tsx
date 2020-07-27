import React, { } from 'react';
import Sidebar from '@components/sidebar/sidebar';
import Header from '../../components/header/header';
import BodyScripts from './UI/body_scripts';
import { withTranslation } from 'i18n';

const Scripts = () => {

  return (
    <React.Fragment>
      <Header />
      <div className='app-main'>
        <Sidebar />
        <div className='app-content'>
          <div className='app-content--inner'>
            <div className='app-content--inner__wrapper'>
              <BodyScripts />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Scripts.getInitialProps = async () => {
  return {
    namespacesRequired: ['scripts'],
  };
};

export default withTranslation(['scripts'])(Scripts);
