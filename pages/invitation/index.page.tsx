import React, {  } from 'react';
import { withTranslation  } from '../../i18n';
import Sidebar from '../../components/sidebar/sidebar';
import InviteList from './UI/invite_list';
import Header from '../../components/topbar/header';

const Invited = () => {

  return (
    <React.Fragment>
      <div className='flex'>
        <div className='slide__bar'>
          <Sidebar />
        </div>
        <div className='w__full'>
          <Header />
          <InviteList />
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
