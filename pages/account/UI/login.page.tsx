import React from 'react';
import { TFunction } from 'next-i18next';
import { withTranslation, Link, useTranslation, Router } from '../../../i18n';
import { TextField, Typography, Button, Grid, Container } from '@material-ui/core';

interface DataType {
  t: TFunction;
}

const Login = () => {
  const { t }: DataType = useTranslation();

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <Typography className="login-title" component="h1" variant="h4">
          {t('account:login')}
        </Typography>
        <form noValidate>
          <Grid container>
            <div>{t('account:yourEmail')}</div>
          </Grid>
          <TextField
            required
            id="email"
            name="email"
            className="login-email"
            fullWidth
            margin="normal"
            autoComplete="email"
            // autoFocus
          />
          <Grid container>
            <div>{t('account:yourPassword')}</div>
          </Grid>
          <TextField
            required
            fullWidth
            id="password"
            name="password"
            className="login-password"
            type="password"
            autoComplete="current-password"
            margin="normal"
          />
          <Grid container>
            <Link href="/#">
              <a>{t('account:forgotPassword')}</a>
            </Link>
          </Grid>
          <Button className="login-button" type="submit" fullWidth variant="contained" color="primary" onClick={() => Router.push('/')}>
            {t('account:signin')}
          </Button>
          <Grid container>
            {t('account:noAccount')}&nbsp;
            <Link href="/#">
              <a>{t('account:signup')}</a>
            </Link>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
};

Login.getInitialProps = () => {
  return {
    namespacesRequired: ['account'],
  };
};

export default withTranslation(['account'])(Login);
