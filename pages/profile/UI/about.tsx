import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, Input, InputAdornment, Button } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import FaceIcon from '@material-ui/icons/Face';
import MailIcon from '@material-ui/icons/Mail';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, loading } from '../logic/profile_actions';
import { putProfile } from '../logic/profile_reducer';
import { TFunction } from 'i18next';
import { useTranslation } from 'i18n';
interface DataType {
  t: TFunction;
}

const About: React.FunctionComponent = () => {
  const { t }: DataType = useTranslation();
  const profileList = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(0);

  const handleAddProfile = async () => {
    await dispatch(loading(true));
    const result = await dispatch(putProfile('ABOUT'));
    await dispatch(loading(false));
    if (!result){
      return setStatus(1);
    }
    setStatus(result.status);
  };
  let nameLoading: string = '';
  nameLoading = (profileList.loading === true) ? 'Saving' : 'Save';

  return(
    <div className='profile__body'>
      <Grid container justify='center' alignItems='center' className=''>
        <Grid item xs={12} sm={12}>
          <h4 className='profile__body--title'>{t('profile:startInformation')}</h4>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className='profile__body--picture--container'>
            <div className='profile__body--picture'>
            <img src={profileList.profilePhoto ? profileList.profilePhoto : '../../static/profile_photo.png'} className='profile__body--picture--src' alt='...' />
            <input type='file' name='profilePhoto' />
            </div>
            <h6 className='profile__body--picture--des'>{t('profile:ChoosePicture')}</h6>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth className='profile__body--input'>
            <InputLabel htmlFor='first-name'>{t('profile:FirstName')}</InputLabel>
            <Input
              onChange={(e) => {
                dispatch(updateProfile({ [e.target.name]: e.target.value }));
              }}
              required
              name='firstName'
              className='firstName'
              value={profileList.firstName}
              id='first-name'
              endAdornment={
              <InputAdornment position='end'>
                  <FaceIcon />
              </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth className='profile__body--input'>
            <InputLabel className='profile__body--label' htmlFor='last-name'>{t('profile:LastName')}</InputLabel>
            <Input
              onChange={(e) => {
                dispatch(updateProfile({ [e.target.name]: e.target.value }));
              }}
              required
              value={profileList.lastName}
              name='lastName'
              className='lastName'
              id='last-name'
              endAdornment={
              <InputAdornment position='end'>
                  <AccountCircle />
              </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={10}>
          <FormControl fullWidth className='profile__body--input'>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <Input
              disabled
              value={profileList.email}
              name='email'
              className='email'
              type='email'
              id='email'
              endAdornment={
              <InputAdornment position='end'>
                  <MailIcon />
              </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      </Grid>
      <div className='profile__body--button'>
        <div className='floatleft' >
          {(status === 200) &&
            <div className='success'>{t('profile:SaveSuccess')}</div>
          }
          {(status !== 200 && status !== 0) &&
            <div className='success'>{t('profile:SaveNotSuccess')}</div>
          }
        </div>
        <div className='floatright'>
          <Button
            className='btn__save'
            variant='contained'
            color='secondary'
            type='submit'
            onClick={handleAddProfile}
          >
            {t(`profile:${nameLoading}`)}
          </Button>
        </div>
        <div className='clear' />
      </div>
    </div>
  );
};

export default About;
