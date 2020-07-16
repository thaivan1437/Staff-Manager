import React, { } from 'react';
import Sidebar from '@components/sidebar/sidebar';
import Header from '../../components/header/header';
import  { GetPost }  from './UI/get_post';
import { withTranslation } from 'i18n';

const Post = () => {

  return (
    <React.Fragment>
      <Header />
      <div className='app-main'>
        <Sidebar />
        <div className='app-content'>
          <div className='app-content--inner'>
            <div className='app-content--inner__wrapper'>
              <GetPost />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Post.getInitialProps = async () => {
  return {
    namespacesRequired: ['post'],
  };
};

export default withTranslation(['post'])(Post);
