import React, { } from 'react';
import Sidebar from '@components/sidebar/sidebar';
import Header from '../../components/topbar/header';
import BodyProfile from './UI/body';
import { withTranslation } from 'i18n';

const Profile = () => {

  return (
    <React.Fragment>
      <div className='flex'>
        <div className='slide__bar'>
          <Sidebar />
        </div>
        <div className='w__full'>
          <Header />
          <BodyProfile tab='about' />
        </div>
      </div>
    </React.Fragment>
  );
};

Profile.getInitialProps = async () => {
  return {
    namespacesRequired: ['profile'],
  };
};

export default withTranslation(['profile'])(Profile);
