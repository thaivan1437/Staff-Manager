import React, { } from 'react';
import { Grid, Button, TextField, Chip } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'i18n';
import { TFunction } from 'i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createAdminInvitation } from '../logic/invitation_reducer';
import { addInviteData } from '../logic/invitation_actions';

interface ExEmail{
  email: string;
}
interface DataType {
  t: TFunction;
}
const BodySupperAdmin = () => {
  const { t }: DataType = useTranslation();
  const invite = useSelector((state) => state.invitation);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleInvitation = async() => {
    await dispatch(createAdminInvitation());
  };
  const exEmail: ExEmail[] = [
    { email: 'example@gmail.com' },
  ];

  const nameLoading: string = (invite.loading['loading'] === true) ? 'Sending' : 'Send';

  return (
    <React.Fragment>
      <div className='invite'>
        <Grid container justify='center' alignItems='center' className=''>
          <Grid item xs={12} sm={12}>
            <div className='invite--title'>{t('invitation:InvitationAdmin')}</div>
          </Grid>
          {auth.access &&
            auth.isAdmin === true ?
            <>
              <Grid item xs={12} sm={8} className='invite__company--box'>
                <Autocomplete
                  multiple
                  id='emails'
                  options={exEmail.map((option) => option.email)}
                  defaultValue={[exEmail[0].email]}
                  onChange={(_, newInputValue) => {
                    dispatch(addInviteData({ ['emails']: newInputValue }));
                  }}
                  className='invite--listEmail invite--m20'
                  freeSolo
                  renderTags={(value: string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      <Chip key={index} variant='outlined' label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField {...params} variant='filled' label='Emails' placeholder='Favorites' />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={8} container justify='space-between' alignItems='center'>
                <div className=''>
                  {(invite.loading['result'] === 201) &&
                    <div className='success'>{t('invitation:SendSuccess')}</div>
                  }
                  {(invite.loading['result'] === 1) &&
                    <div className='success'>{t('invitation:SendNotSuccess')}</div>
                  }
                </div>
                <Button
                  className='invite--btn send'
                  variant='contained'
                  color='primary'
                  onClick={handleInvitation}
                >
                  {t(`invitation:${nameLoading}`)}
                </Button>
              </Grid>
            </> :
            <div className='invite--notify'>
              {t('invitation:IsAdmin')}
            </div>
          }
        </Grid>
      </div>
    </React.Fragment>
  );
};
export default BodySupperAdmin;
