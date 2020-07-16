import React, {  } from 'react';
import { withTranslation  } from '../../i18n';
import Sidebar from '../../components/sidebar/sidebar';
import InviteList from './UI/invite_list';
import Header from '../../components/header/header';

const Invited = () => {

  return (
    <React.Fragment>
      <Header />
      <div className='app-main'>
        <Sidebar />
        <div className='app-content'>
          <div className='app-content--inner'>
            <div className='app-content--inner__wrapper'>
              <InviteList />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Invited.getInitialProps = async () => {
  return {
    namespacesRequired: ['invitation'],
  };
};

export default withTranslation(['invitation'])(Invited);
