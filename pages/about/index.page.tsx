import React from 'react';
// import Header from '../../components/topbar/header';
import Sidebar from '../../components/sidebar/sidebar';
import { Grid } from '@material-ui/core';

const About = () => {
  return (
    <React.Fragment>
      <Grid container >
        <Grid container item md={3}>
          <Sidebar />
        </Grid>
        <Grid container item md={9}>
          {/* <Header /> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default About;
