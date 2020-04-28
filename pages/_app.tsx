import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { makeStore } from '../redux/store';
import { appWithTranslation, i18n } from '../i18n';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../styles/sass/index.sass';

function MyApp({ Component, pageProps, store }) {
  useEffect(() => {
    void i18n.changeLanguage('vi');
  }, []);

  const lng = i18n.language;
  const direction = i18n.dir(lng);
  return (
    <React.Fragment>
      <div dir={direction}>
        <CssBaseline />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </div>
    </React.Fragment>
  );
}

MyApp.getInitialProps = async (Component, ctx) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  return { pageProps };
};

export default withRedux(makeStore)(appWithTranslation(MyApp));
