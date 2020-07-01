import React, {  } from 'react';
import { withTranslation  } from '../../../i18n';
import BodyInvitation from './UI/body';
import { Grid } from '@material-ui/core';
import LeftSidebar from '../UI/left_sidebar/left_sidebar';

const Invited = () => {

  return (
    <React.Fragment>
      <Grid container>
        <Grid className='' item md={4}>
          <LeftSidebar />
        </Grid>
        <Grid className='login-box' item md={8}>
          <BodyInvitation />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Invited.getInitialProps = async () => {
  return {
    namespacesRequired: ['invitation'],
  };
};

export default withTranslation(['invitation'])(Invited);
