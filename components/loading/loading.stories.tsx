import { storiesOf } from '@storybook/react';
import Loading from './loading';

storiesOf('Loading', module).add('Loading', () => {
  return <Loading loading />;
});
