import React from 'react';
import * as Sentry from '@sentry/browser';

class ErrorBoundary extends React.Component<{}, { error: string, eventId: string  }> {
  constructor(props) {
    super(props);
    this.state = { error: '', eventId: '' };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope((scope) => {
      // scope.setTag('Custom-Tag', 'ErrorBoundary');
      scope.setLevel(Sentry.Severity.Error);
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  render() {
    if (this.state.error) {
      // render fallback UI
      return (
        // <button onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}>Report feedback</button>
        <div>SOMETHING ERROR</div>
      );
    }

    // when there's not an error, render children untouched
    return this.props.children;
  }
}

export default ErrorBoundary;
