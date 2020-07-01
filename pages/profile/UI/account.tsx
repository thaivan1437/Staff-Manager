import React, {} from 'react';
import { Grid, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../logic/profile_actions';
import { putProfile } from '../logic/profile_reducer';
import { initialProfiles } from '../../../constants/profiles_tab';
import { convertDateFormat } from '../../../helpers/date';
import  InputForm  from '../../../components/input/input';
import TextFieldForm from '@components/input/text_field';
import SelectForm from '@components/input/select';
import { TFunction } from 'i18next';
import { useTranslation } from 'i18n';
interface DataType {
  t: TFunction;
}

const Account: React.FunctionComponent = () => {
  const profileList = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { t }: DataType = useTranslation();

  const handleAccount = async () => {
    await dispatch(putProfile('ACCOUNT'));
  };

  const handleSelect = (e: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(updateProfile({ gender : e.target.value }));
  };

  const pareNumber = (type, e) => {
    let  convert  = e.target.value;

    if (type === 'number'){
      convert = parseInt(convert, 10);
    }

    dispatch(updateProfile({
      [e.target.name]: convert ,
    }));
  };
  const dayconvert = (e) => {
    const convert = e.target.value.replace(/-/g, '/');

    return (
      dispatch(updateProfile({ [e.target.name]: convert }))
    );
  };
  const options = [
    { name: 'FEMALE' },
    { name: 'MALE' },
    { name: 'ORTHER' },
  ];

  const nameLoading: string = (profileList.loading['loading'] === true) ? 'Saving' : 'Save';

  return (
    <div className='profile__body'>
      <Grid container justify='center' alignItems='center' className=''>
        <Grid item xs={12} sm={12}>
          <h4 className='profile__body--title'>{t('profile:startInformation')}</h4>
        </Grid>
        {
          initialProfiles.map((item, index) => {
            return (
              <Grid key={index} item xs={item.sm} className='p--15'>
                {item.object.map((obitem) => {
                  switch (obitem.type){
                    case 'number':
                    case 'text':
                      return(
                        <InputForm
                          key={obitem.attribute}
                          value={profileList[obitem.attribute]}
                          onChange={(e) => pareNumber(obitem.type, e)}
                          type={obitem.type}
                          readOnly={obitem.readonly}
                          name={t(`profile:${obitem.attribute}`)}
                          id={obitem.attribute}
                          className='profile__body--input'
                        />
                      );
                    case 'date':
                      return(
                        <TextFieldForm
                          key={obitem.attribute}
                          id={obitem.attribute}
                          label={t(`profile:${obitem.attribute}`)}
                          type={obitem.type}
                          className='profile__body--input'
                          onChange={(e) => dayconvert(e)}
                          defaultValue={convertDateFormat(new Date(profileList[obitem.attribute]))}
                        />
                      );
                    case 'select':
                      return(
                        <SelectForm
                          key={obitem.attribute}
                          attribute={obitem.attribute}
                          name={t(`profile:${obitem.attribute}`)}
                          options={options}
                          className='profile__body--input'
                          onChange={handleSelect}
                          value={profileList[obitem.attribute]}
                        />
                      );
                  }
                })}
              </Grid>
            );
          })
        }
      </Grid>
      <div className='profile__body--button'>
        <div className='floatleft' >
          {(profileList.loading['result'] === 200) &&
            <div className='success'>{t('profile:SaveSuccess')}</div>
          }
          {(profileList.loading['result'] === 1) &&
            <div className='success'>{t('profile:SaveNotSuccess')}</div>
          }
        </div>
        <div className='floatright'>
          <Button
            className='btn__save'
            variant='contained'
            color='secondary'
            type='submit'
            onClick={handleAccount}
          >
            {t(`profile:${nameLoading}`)}
          </Button>
        </div>
        <div className='clear' />
      </div>
    </div>
  );
};

export default Account;
