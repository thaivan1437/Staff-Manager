import { storiesOf } from '@storybook/react';
import { UploadImage } from './upload_image';

storiesOf('Upload images', module).add('Upload images', () => {
  return <UploadImage id='' loading={false} />;
});
