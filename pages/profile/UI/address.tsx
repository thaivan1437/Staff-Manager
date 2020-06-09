import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, loading } from '../logic/profile_actions';
import { putProfile } from '../logic/profile_reducer';
import TextFieldForm from '@components/input/text_field';
import { TFunction } from 'i18next';
import { useTranslation } from 'i18n';
interface DataType {
  t: TFunction;
}
const Address: React.FunctionComponent = () => {
  const profileList = useSelector((state) => state.profile);
  const { t }: DataType = useTranslation();
  const dispatch = useDispatch();
  const dataAddress = [
    { attribute: 'address', rows: 3, name: 'Address', type: 'text' , multiline: true },
    { attribute: 'descriptions', rows: 3, name: 'Descriptions' , type: 'text', multiline: true },
  ];
  const [status, setStatus] = useState(0);

  const handleAddress = async () => {
    await dispatch(loading(true));
    const result = await dispatch(putProfile('ADDRESS'));
    if (!result){
      return setStatus(1);
    }
    await dispatch(loading(false));
    setStatus(result.status);
  };
  let nameLoading: string = '';
  nameLoading = (profileList.loading === true) ? 'Saving' : 'Save';

  return(
    <div className='profile__body'>
      <Grid container justify='center' alignItems='center' >
        <Grid item xs={12} sm={12}>
            <h4 className='profile__body--title'>{t('profile:startInformation')}</h4>
        </Grid>
        {
          dataAddress.map((item, index) => (
            <Grid key={index} item xs={12} sm={10}>
              <TextFieldForm
                multiline={item.multiline}
                id={item.attribute}
                rows={item.rows}
                label={t(`profile:${item.attribute}`)}
                type={item.type}
                onChange={(e) => {
                  dispatch(updateProfile({ [e.target.name]: e.target.value }));
                }}
                defaultValue={profileList[item.attribute]}
              />
          </Grid>
          ))
        }
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
            onClick={handleAddress}
          >
            {t(`profile:${nameLoading}`)}
          </Button>
        </div>
        <div className='clear' />
      </div>
    </div>
  );
};

export default Address;
