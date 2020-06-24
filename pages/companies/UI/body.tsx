import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Grid, Button, InputAdornment, InputLabel, Input } from '@material-ui/core';
import { TFunction } from 'next-i18next';
import { useTranslation } from 'i18n';
import { updateCompany  } from '../logic/companies_action';
import { updateCompanyAction, getCompanyAction } from '../logic/companies_reducer';
import { Icons } from '../../../components/icon/icon';
import { NameFields } from '../../../constants/companies';
import { Field } from '../../fields/UI/body';
import SaveIcon from '@material-ui/icons/Save';

interface DataType {
  t: TFunction;
}

const BodyCompany: React.FunctionComponent = () => {
  const { t }: DataType = useTranslation();
  const companies = useSelector((state) => state.companiesReducer);
  const authData = useSelector((state) => state.auth);
  const status = companies.loading ? 'updating' :  'update';
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    await dispatch(updateCompanyAction());
  };

  const checkTypes = (e, type) => {
    let TypeValue = e.target.value;
    if (type === 'number') {
      TypeValue = parseInt(TypeValue, 10);
    }

    return (
      dispatch(updateCompany({
        [e.target.name]: TypeValue,
      }))
    );
  };

  useEffect(() => {
    if (!companies) {
      return;
    }
    const FetchData = async () => {
      await dispatch(getCompanyAction());
    };
    void FetchData();
  }, [authData]);

  return (
    <React.Fragment>
      <div className='flex__page'>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <div className='companies'>
              <div className='companies__left'>
                <div className='root-pages'>
                  <p className='companies__title'>{t('companies:companies')}</p>
                  <div className='companies__btn'>
                    <Button
                      className='companies__btn--success'
                      variant='contained'
                      color='primary'
                      size='large'
                      onClick={handleSubmit}
                      startIcon={<SaveIcon />}
                    >
                      {t(`companies:${status}`)}
                    </Button>
                  </div>
                </div>
                <div className='root-wrap'>
                  <Grid container spacing={5}>
                  {
                    NameFields.map((item, index) => (
                      <Grid key={index} item md={6} sm={10}>
                        <div className='companies__form'>
                          <FormControl fullWidth className=''>
                            <InputLabel htmlFor='standard-adornment-amount'>{t(`companies:${item.name}`)}</InputLabel>
                            <Input
                              className={`companies__input ${item.atrName}`}
                              value={companies[item.atrName]}
                              name={item.atrName}
                              onChange={(e) => checkTypes(e, item.type)}
                              endAdornment={
                                <InputAdornment position='end'>
                                    <Icons name={item.icon} />
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </div>
                      </Grid>
                    ))
                  }
                  </Grid>
                </div>
                {(companies.result !== 200 && companies.result !== 0) &&
                  <div className='companies__fail'>{t('companies:updateFail')}</div>
                }
                {(companies.result === 200) &&
                  <div className='companies__success'>{t('companies:updateSuccess')}</div>
                }
              </div>
            </div>
          </Grid>
          <Grid item xs={5}>
            <div className='field'>
              <Field />
            </div>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default(BodyCompany);
