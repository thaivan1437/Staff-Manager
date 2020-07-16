import React, { useEffect } from 'react';
import { FormControl, Grid, Button, InputAdornment, InputLabel, Input } from '@material-ui/core';
import { TFunction } from 'next-i18next';
import { useTranslation } from 'i18n';
import { useSelector, useDispatch } from 'react-redux';
import { updateCompanyAction, getCompanyAction } from '../logic/companies_reducer';
import { Icons } from '../../../components/icon/icon';
import { NameFields } from '../../../constants/companies';
import  BodyFields from '../../fields/UI/body_fields';
import SaveIcon from '@material-ui/icons/Save';
import { addDataCompany } from '../logic/companies_actions';

interface DataType {
  t: TFunction;
}

const UpdateCompany: React.FunctionComponent = () => {
  const { t }: DataType = useTranslation();
  const authData = useSelector((state) => state.auth);
  const companies = useSelector((state) => state.companies);
  const status = companies.loading['loading'] ? 'updating' :  'update';
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
      dispatch(addDataCompany({
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
      <Grid container spacing={2}>
        <Grid item xs={7}>
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
          {(companies.loading['result'] === 1) &&
            <div className='companies__fail'>{t('companies:updateFail')}</div>
          }
          {(companies.loading['result'] === 200) &&
            <div className='companies__success'>{t('companies:updateSuccess')}</div>
          }
        </Grid>
        <Grid item xs={5}>
          <BodyFields />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default(UpdateCompany);
