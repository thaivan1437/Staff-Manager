import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { makeStore } from '../redux/store';
import { appWithTranslation, i18n } from '../i18n';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as Sentry from '@sentry/browser';
import ErrorBoundary from '../components/handle_errors/error_boundary';
import '../styles/sass/index.sass';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { config } from '../helpers/get_config';

if (['production', 'staging'].includes(config.ENV)) {
  Sentry.init({
    environment: config.ENV,
    dsn: config.DNS,
  });
}

const MyApp = ({ Component, pageProps, store }) => {
  const lng = i18n.language;
  const direction = i18n.dir(lng);

  return (
    <ErrorBoundary>
      <React.Fragment>
        <div dir={direction}>
          <CssBaseline />
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </div>
      </React.Fragment>
    </ErrorBoundary>
  );
};

MyApp.getInitialProps = (Component, ctx) => {
  const pageProps = Component.getInitialProps ? Component.getInitialProps(ctx) : {};

  return { pageProps };
};

export default withRedux(makeStore)(appWithTranslation(MyApp));
