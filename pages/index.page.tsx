import React, { useEffect } from 'react';
import { withTranslation, i18n } from '../i18n';
import Header from '../components/topbar/header';
import Sidebar from '../components/sidebar/sidebar';

const Home = () => {

  useEffect(() => {
    const lng = localStorage.getItem('lang') !== null && typeof localStorage !== 'undefined'
    ? localStorage.getItem('lang') : 'vi ';
    void i18n.changeLanguage(String(lng));
  }, []);

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
