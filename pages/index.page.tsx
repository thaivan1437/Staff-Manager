import React from 'react';
import { withTranslation } from '../i18n';
import Header from '../components/topbar/header';
import Sidebar from '../components/sidebar/sidebar';

const Home = () => {

  return (
    <React.Fragment>
      <div className='flex'>
        <div className='slide__bar'>
          <Sidebar />
        </div>
        <div className='w__full'>
          <Header />
          <div className='dashboard--title'>
            Dashboard
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Home.getInitialProps = async () => {
  return {
    namespacesRequired: ['auth'],
  };
};

export default withTranslation(['auth'])(Home);
