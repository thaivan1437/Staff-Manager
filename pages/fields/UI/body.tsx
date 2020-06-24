import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TFunction } from 'next-i18next';
import { useTranslation } from 'i18n';
import {  Dialog, Button, Typography, FormControl, InputLabel, NativeSelect, Input } from '@material-ui/core';
import { getFieldAction, createFieldAction } from '../logic/fields_reducer';
import { inputFieldChange } from '../logic/fields_action';
import SaveIcon from '@material-ui/icons/Save';

import { updateCompany } from 'pages/companies/logic/companies_action';
import { updateCompanyAction } from 'pages/companies/logic/companies_reducer';

interface DataType {
  t: TFunction;
}

export const Field: React.FunctionComponent = () => {
  const { t }: DataType = useTranslation();
  const dispatch = useDispatch();
  const fieldsData = useSelector((state) => state.fieldsReducer);

  useEffect(() => {
    void GetField();
  }, []);

  const GetField = async () => {
    await dispatch(getFieldAction());
  };

  const handleChangeFields = (e) => {
    dispatch(inputFieldChange(e.target.value));
  };

  const handleChangeSelect = async (e) => {
    dispatch(updateCompany({
      [e.target.name]: e.target.value,
    }));
    await dispatch(updateCompanyAction());
  };

  const handleSubmitField = async () => {
    await dispatch(createFieldAction());
  };

  const optionsField = fieldsData && fieldsData.list && Array.isArray(fieldsData.list)
  ?  fieldsData.list.map((each) => each) : [];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className='fields__page'>
        <div className='root-pages'>
          <p className='companies__title'>{t('fields:fields')}</p>
          <div className='companies__btn'>
            <Button
              className='fields__dialog'
              variant='contained'
              color='primary'
              size='large'
              onClick={handleClickOpen}
              startIcon={<SaveIcon />}
            >
              {t('fields:addFields')}
            </Button>
          </div>
        </div>
        <div className='root-wrap'>
          <div className='fields__form'>
            <FormControl fullWidth>
              <InputLabel>{t('fields:selectFields')}</InputLabel>
              <NativeSelect
                onChange={handleChangeSelect}
                name='fieldID'
              >
                <option aria-label='None' value='' />
                {
                  optionsField.map((item, index) => (
                    <option key={index} value={item.fieldID}>
                      {item.name}
                    </option>
                  ))
                }
              </NativeSelect>
            </FormControl>
          </div>
        </div>
        <div className='fields__create'>
          <Dialog
            open={open}
            onClose={handleClose}
          >
            <div className='fields'>
              <Typography className='fields__title'>
                {t('fields:fields')}
              </Typography>
              <Input
                value={fieldsData.newFieldInput}
                onChange={handleChangeFields}
              />
              {(fieldsData.result === 201) &&
                <div className='fields__success'>{t('fields:addSuccess')}</div>
              }
              {(fieldsData.result === 1) &&
                <div className='fields__fail'>{t('fields:addFail')}</div>
              }
              <Button
                className='fields__btn--success'
                variant='contained'
                color='primary'
                type='submit'
                onClick={() => handleSubmitField()}
              >
                {t('fields:save')}
              </Button>
            </div>
          </Dialog>
        </div>
      </div>
    </React.Fragment>
  );
};
