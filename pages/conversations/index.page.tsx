import React, { } from 'react';
import Sidebar from '@components/sidebar/sidebar';
import Header from '../../components/topbar/header';
import { GetConverSations } from './UI/get_conversations';
import { withTranslation } from 'i18n';

const ConverSations = () => {

  return (
    <React.Fragment>
      <div className='flex'>
        <div className='slide__bar'>
          <Sidebar />
        </div>
        <div className='w__full'>
          <Header />
          <GetConverSations />
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
