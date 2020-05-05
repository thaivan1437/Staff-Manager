import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { makeStore } from '../redux/store'
import { appWithTranslation, i18n } from '../i18n'
import CssBaseline from '@material-ui/core/CssBaseline'
import * as Sentry from '@sentry/browser'
import ErrorBoundary from '../components/handle_errors/error_boundary'
import '../styles/sass/index.sass'
import getConfig from 'next/config'

const { publicRuntimeConfig } : {publicRuntimeConfig: object} = getConfig()
const ENV: string = publicRuntimeConfig['CLIENT_ENV']
const DNS: string = publicRuntimeConfig['DNS']

if (['production', 'staging'].includes(ENV)) {
  Sentry.init({
    environment: ENV,
    dsn: DNS,
  })
}

function MyApp({ Component, pageProps, store }) {
  useEffect(() => {
    void i18n.changeLanguage('vi')
  }, [])

  const lng = i18n.language
  const direction = i18n.dir(lng)

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
  )
}

MyApp.getInitialProps = async (Component, ctx) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

  return { pageProps }
}

export default withRedux(makeStore)(appWithTranslation(MyApp))
