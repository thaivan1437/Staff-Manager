import { AppBar, Toolbar, Switch, Grid, FormControlLabel, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { i18n, Link } from '../i18n';

const Header = () => {
  async function onSwitchLanguage(event) {
    if (event.target.checked) {
      await i18n.changeLanguage('en');
      return;
    }
    await i18n.changeLanguage('vi');
  }

  return (
    <AppBar position="relative">
      <Toolbar>
        <Grid container direction="row" alignItems="center">
          <Grid item md={3} justify="flex-start">
          <Link href="/about">
            <Typography variant="h6" color="inherit">
              About
            </Typography>
          </Link>
          </Grid>
          <Grid container item sm={8} md={6} justify="center">
            <Typography variant="h4" color="inherit">
              COMPANY WEB
            </Typography>
          </Grid>
          <Grid container item sm={4} md={3} justify="flex-end">
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
              <PersonIcon fontSize="large" className="person-icon"/>
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
