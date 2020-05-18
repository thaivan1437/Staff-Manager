import React from 'react'
import { Toolbar, Typography } from '@material-ui/core'
import DehazeIcon from '@material-ui/icons/Dehaze';

const Sidebar = () => {
  return (
    <React.Fragment>
      <Toolbar className="sidebar">
        <Typography>Architect</Typography>
        <DehazeIcon />
      </Toolbar>
    </React.Fragment>
  );
};

export default Sidebar;
