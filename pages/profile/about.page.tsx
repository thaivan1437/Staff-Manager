import React, {  } from 'react';
import Sidebar from '@components/sidebar/sidebar';
import Header from '../../components/topbar/header';
import BodyProfile from './UI/body';
import { withTranslation } from 'i18n';

const About = () => {

  return (
    <div className='flex'>
      <div className='slide__bar'>
        <Sidebar />
      </div>
      <div className='w__full'>
        <Header />
        <BodyProfile tab='about'/>
      </div>
    </div>
  );
};

About.getInitialProps = async () => {
  return {
    namespacesRequired: ['profile'],
  };
};

export default withTranslation(['profile'])(About);
