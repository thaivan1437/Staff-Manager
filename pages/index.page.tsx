import React from 'react';
import { withTranslation } from '../i18n';
import Header from '../components/topbar/header';
import Sidebar from '../components/sidebar/sidebar';
import { Grid } from '@material-ui/core';
// import { TFunction } from 'next-i18next';

// interface DataType {
//   t: TFunction;
// }

const Home = () => {
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

Home.getInitialProps = () => {
  return {
    namespacesRequired: ['home', 'footer'],
  };
};

export default withTranslation(['home', 'footer'])(Home);
