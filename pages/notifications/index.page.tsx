import React from 'react';
import { TFunction } from 'next-i18next';
import { withTranslation } from 'i18n';
import  Notification  from './UI/body_notification';
import { Card } from '@material-ui/core';
interface DataType {
  t: TFunction;
}

type HeaderProps = DataType;

const Notifications: React.FunctionComponent<HeaderProps> = ({ t }) => {

  return (
    <div className='popover-custom overflow-hidden'>
      <div>
        <Card className='card-box-alt card-border-top border-first px-3 py-4 position-relative'>
          <p className='notification__title mb-4 text-capitalize font-weight-bold'>{t('notification:notification')}</p>
          <Notification />
        </Card>
      </div>
    </div>
  );
};

export default withTranslation('auth')(Notifications);
