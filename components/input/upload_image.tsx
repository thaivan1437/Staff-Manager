import React, { FunctionComponent } from 'react';
import { useTranslation } from 'i18n';
import { TFunction } from 'next-i18next';
import Skeleton from '@material-ui/lab/Skeleton';

interface DataType {
  t: TFunction;
}
interface InitialProps {
  id: string;
  onChange?: (e) => void;
  alt?: string;
  src?: string;
  loading: boolean;
}
export const UploadImage: FunctionComponent<InitialProps> =
({
  id= '',
  onChange ,
  alt= '',
  src= 'static/images/no-image.png',
  loading= true,
}) => {
  const { t }: DataType = useTranslation();

  return(
    <div className='uploadImage'>
      <div className='input-group'>
        <input
          id={id}
          type='file'
          name={id}
          className='upload'
          onChange={onChange}
        />
        <label id='upload-label' htmlFor={id} className='upload-label'>
          {t('post:chooseFile')}
        </label>
        <div className='input-group-append'>
          <label htmlFor={id} className='imageLabel'>
            <i className='fa fa-cloud-upload mr-2' />
            <small>{t('post:chooseFile')}</small>
          </label>
        </div>
      </div>
      <p className='imageP'>
        {t('post:theImageUpload')}
      </p>
      <div className='image-area'>
        {loading ? <Skeleton variant='rect' height={118}/> :
        <img
          id='imageResult'
          src={src}
          alt={alt}
        />}

      </div>
    </div>
  );
};
