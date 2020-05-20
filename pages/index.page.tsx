import React, { useEffect } from 'react';
import { withTranslation, i18n } from '../i18n';
import Header from '../components/topbar/header';
import Sidebar from '../components/sidebar/sidebar';
import { Grid } from '@material-ui/core';

const Home = () => {

  useEffect(() => {
    const lng = localStorage.getItem('lang') !== null && typeof localStorage !== 'undefined'
    ? localStorage.getItem('lang') : 'vi';
    void i18n.changeLanguage(String(lng));
  }, []);

  return (
    <React.Fragment>
      <Grid container className="sidebar">
        <Grid item md={3}>
         <Sidebar />
        </Grid>
        <Grid item md={9}>
          <Header />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Home.getInitialProps = async () => {
  return {
    namespacesRequired: ['auth'],
  };
};

export default withTranslation(['auth'])(Home);
