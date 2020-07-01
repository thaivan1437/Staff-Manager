import React, {} from 'react';
import { Grid, Button, TextField, Chip } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'i18n';
import { TFunction } from 'i18next';
import InputForm from '@components/input/input';
import { initialFieldInvite } from '../../../constants/invite_admin';
import Autocomplete from '@material-ui/lab/Autocomplete';
import BodyFields from 'pages/fields/UI/body_fields';
import { createDataCompany } from '../logic/companies_reducer';
import { addDataCompany } from '../logic/companies_actions';

interface ExPhones{
  phone: string;
}
interface DataType {
  t: TFunction;
}
const BodyCompanies = () => {
  const { t }: DataType = useTranslation();
  const companies = useSelector((state) => state.companies);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCreateCompany = async() => {
    await dispatch(createDataCompany());
  };
  const phones: ExPhones[] = [
    { phone: '03963xxx' },
  ];

  const checkTypes = (e, type) => {
    let TypeValue = e.target.value;
    if (type === 'number') {
      TypeValue = parseInt(TypeValue, 10);
    }

    return (
      dispatch(addDataCompany({
        [e.target.name]: TypeValue,
      }))
    );
  };

  const nameLoading: string = (companies.loading['loading'] === true) ? 'Sending' : 'Create';

  return (
    <React.Fragment>
      <div className='root-page'>
        <Grid container justify='space-between' alignItems='flex-start' spacing={2} className='invite'>
          {auth.access &&
            auth.isAdmin === true ?
            <>
              <div className='create--company' />
              <Grid item xs={12} sm={7} container justify='space-between' alignItems='center'>
                <div className='root-pages'>
                  <p className='companies__title'>{t('companies:CreateCompany')}</p>
                </div>
                <Grid item xs={12} sm={12} container justify='space-between' alignItems='center' className='invite__company'>
                  {initialFieldInvite.map((item, index) => {
                    return(
                      <Grid key={index} item xs={12} sm={item.sm} className='invite__company--box'>
                        {item.objectInvite.map((object) => {
                          return(
                            <InputForm
                              className='invite--m20'
                              key={object.attribute}
                              id={object.attribute}
                              name={t(`companies:${object.attribute}`)}
                              onChange={(e) => checkTypes(e, object.type)}
                              type={object.type}
                              value={companies[object.attribute]}
                            />
                          );
                        })}
                      </Grid>
                    );
                  })}
                </Grid>
                <Grid item xs={12} sm={12} className='invite__company--box'>
                  <Autocomplete
                    multiple
                    id='hotlines'
                    options={phones.map((option) => option.phone)}
                    defaultValue={[phones[0].phone]}
                    onChange={(_, newInputValue) => {
                      dispatch(addDataCompany({ ['hotlines']: newInputValue }));
                    }}
                    className='invite--listEmail invite--m20'
                    freeSolo
                    renderTags={(value: string[], getTagProps) =>
                      value.map((option: string, index: number) => (
                        <Chip key={index} variant='outlined' label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField {...params} variant='filled' label='Hotlines' placeholder='Favorites' />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} className='invite__company--box'>
                  <Autocomplete
                    multiple
                    id='phones'
                    options={phones.map((option) => option.phone)}
                    defaultValue={[phones[0].phone]}
                    onChange={(_, newInputValue) => {
                      dispatch(addDataCompany({ ['phones']: newInputValue }));
                    }}
                    className='invite--listPhones invite--autocomplete invite--m20'
                    freeSolo
                    renderTags={(value: string[], getTagProps) =>
                      value.map((option: string, index: number) => (
                        <Chip key={index} variant='outlined' label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField {...params} variant='filled' label={t('companies:phones')} placeholder='Favorites' />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} container justify='space-between' alignItems='center'>
                  <div className=''>
                    {(companies.loading['result'] === 201) &&
                      <div className='success'>{t('companies:CreateSuccess')}</div>
                    }
                    {(companies.loading['result'] === 1) &&
                      <div className='success'>{t('companies:CreateNotSuccess')}</div>
                    }
                  </div>
                  <Button
                    className='invite--btn btn--send'
                    variant='contained'
                    color='primary'
                    onClick={handleCreateCompany}
                  >
                    {t(`companies:${nameLoading}`)}
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={5} container justify='space-between' alignItems='center'>
                <BodyFields />
              </Grid>
            </> :
            <div className='invite--notify'>
              {t('companies:IsAdmin')}
            </div>
          }
        </Grid>
      </div>
    </React.Fragment>
  );
};
export default BodyCompanies;
