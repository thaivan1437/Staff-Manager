import React from 'react';
import { withTranslation } from '../i18n';
import Header from '../components/header/header';
import Sidebar from '../components/sidebar/sidebar';

const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <div className='app-main'>
        <Sidebar />
        <div className='app-content'>
          <div className='app-content--inner'>
            <div className='app-content--inner__wrapper'>
              Index app
            </div>
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
