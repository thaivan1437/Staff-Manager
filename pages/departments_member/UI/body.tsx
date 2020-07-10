import React from 'react';
import { Grid } from '@material-ui/core';
import SelectStatus  from './select';
import MemberList  from './member_list';
import MemberProfile  from './member_profile';

const DepartmentMembers: React.FunctionComponent = () => {

  return (
    <React.Fragment>
      <div className='departments'>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <div className='departments__left'>
              <SelectStatus />
              <MemberList />
            </div>
          </Grid>
          <Grid item xs={4}>
            <MemberProfile />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default(DepartmentMembers);
