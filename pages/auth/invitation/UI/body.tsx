import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { useTranslation } from 'i18n';
import { TFunction } from 'i18next';
import { config } from '../../../../helpers/get_config';
interface DataType {
  t: TFunction;
}

const BodyInvitation = () => {
  const { t }: DataType = useTranslation();
  const [invitation, setInvitation] = useState('');
  useEffect(() => {
    const token = window.location.search;
    if (!token) {
      return;
    }
    const accessToken = token.replace('?token=', '');
    setInvitation(accessToken);
  }, []);

  return (
    <React.Fragment>
      <div className='invitation'>
        <Grid container justify='center' alignItems='center' >
          <Grid item xs={12} sm={12}>
            <div className='title'>{t('invitation:Invitation')}</div>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Button
              className='btnSave'
              variant='contained'
              color='primary'
              // onClick={}
            >
              <a href={`${config.API_HOST}/s1/users/invitations/google/accept?token=${invitation}`}>
                {t('invitation:Continue')}
              </a>
            </Button>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};
export default BodyInvitation;
