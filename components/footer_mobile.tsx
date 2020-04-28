import Link from 'next/link';
import React, { useState } from 'react';
import { TFunction } from 'next-i18next';
import { AppBar, Toolbar, Grid, Button, Fab, Collapse, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MoreIcon from '@material-ui/icons/More';
import { Facebook, Twitter, YouTube, Instagram } from '@material-ui/icons';

interface DataType {
  t: TFunction;
}

type FooterProps = DataType;

const FooterMobile: React.FunctionComponent<FooterProps> = ({ t }) => {
  const [isDisplayFolowUs, onDisplayFollowUs] = useState(false);
  const [isDisplayMore, onDisplayMore] = useState(false);

  function handleDisplayFollowUs() {
    onDisplayFollowUs(!isDisplayFolowUs);
    onDisplayMore(!isDisplayMore);
  }

  function handleDisplayMore() {
    onDisplayFollowUs(!isDisplayFolowUs);
    onDisplayMore(!isDisplayMore);
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container direction="row" alignItems="center">
          <Grid container item justify="center" xs={4}>
            <Link href="/">
              <Button color="primary" disableRipple={true}>
                <Grid container justify="center" alignItems="center" direction="column">
                  <HomeIcon />
                  {t('common:home')}
                </Grid>
              </Button>
            </Link>
          </Grid>
          <Grid container item justify="center" xs={4}>
            <Button color="primary" disableRipple={true} onClick={handleDisplayFollowUs}>
              <Grid container justify="flex-end" alignItems="center" direction="column">
                <Fab>
                  <AddCircleIcon fontSize="large" color="primary" />
                </Fab>
                <br/>
                {t('common:followUs')}
              </Grid>
            </Button>
          </Grid>
          <Grid container item justify="center" xs={4}>
            <Button color="primary" disableRipple={true} onClick={handleDisplayMore}>
              <Grid container justify="center" alignItems="center" direction="column">
                <MoreIcon />
                {t('common:more')}
              </Grid>
            </Button>
          </Grid>
        </Grid>
        <Collapse in={isDisplayFolowUs} timeout="auto" unmountOnExit>
          <Grid container direction="row" justify="space-evenly" alignItems="center">
            <Link href="/#">
              <Facebook/>
            </Link>
            <Link href="/#">
              <Twitter/>
            </Link>
            <Link href="/#">
              <YouTube/>
            </Link>
            <Link href="/#">
              <Instagram/>
            </Link>
          </Grid>
        </Collapse>
        <Collapse in={isDisplayMore} timeout="auto" unmountOnExit>
          <Grid container direction="column" justify="center" alignItems="center">
            <Link href="/#">
              <Typography component="h1" gutterBottom align="left">
                {t('footer:terms&conditions')}
              </Typography>
            </Link>
            <Link href="/#">
              <Typography component="h1" gutterBottom align="left">
                {t('footer:privacypolicy')}
              </Typography>
            </Link>
            <Link href="/#">
              <Typography component="h1" gutterBottom align="left">
                {t('footer:newsletter')}
              </Typography>
            </Link>
            <Link href="/#">
              <Typography component="h1" gutterBottom align="left">
                {t('footer:contactus')}
              </Typography>
            </Link>
            <Link href="/#">
              <Typography component="h1" gutterBottom align="left">
                {t('footer:eventsCalendar')}
              </Typography>
            </Link>
          </Grid>
        </Collapse>
      </Toolbar>
    </AppBar>
  );
};

export default FooterMobile;
