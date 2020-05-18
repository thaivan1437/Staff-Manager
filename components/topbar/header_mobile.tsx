import { Link, i18n } from '../../i18n';
import React from 'react';
import { AppBar, Toolbar, Switch, Grid, FormControlLabel } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const HeaderMobile: React.FunctionComponent = () => {
  async function onSwitchLanguage(event) {
    if (event.target.checked) {
      await i18n.changeLanguage('en');

      return;
    }
    await i18n.changeLanguage('vi');
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container direction="row" alignItems="center">
          <Grid container item xs={8} justify="flex-start">
            <FormControlLabel
              control={
                <Switch
                  onChange={onSwitchLanguage}
                  value="checked"
                  color="primary"
                  checked={i18n.language ? !(i18n.language === 'vi') : false}
                />
              }
              labelPlacement="start"
              label={i18n.language ? i18n.language.toUpperCase() : 'VI'}
            />
            <Link href="/account/UI/login">
              <PersonIcon fontSize="large"/>
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderMobile;
