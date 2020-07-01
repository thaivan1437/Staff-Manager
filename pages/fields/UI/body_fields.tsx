import React, { useEffect } from 'react';
import { Grid, Button, TextField, DialogContentText, Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'i18n';
import { TFunction } from 'i18next';
import InputForm from '@components/input/input';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getFieldsThunkAction, createFieldAction } from '../logic/fields_reducer';
import { addField } from '../logic/fields_actions';
import SaveIcon from '@material-ui/icons/Save';

interface Options{
  name: string;
  fieldID: string;
}
interface DataType {
  t: TFunction;
}
const BodyFields = () => {
  const { t }: DataType = useTranslation();
  const [open, setOpen] = React.useState(false);
  const fields = useSelector((state) => state.fields);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchDataField() {
      await dispatch(getFieldsThunkAction());
    }
    void fetchDataField();
  }, []);
  const handleAddFields = async() => {
    await dispatch(createFieldAction());
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>{t('invitation:AddFields')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('invitation:tosub')}
          </DialogContentText>
          <InputForm
            className='invite--m20'
            id='name'
            name='Name Fields'
            onChange={(e) => {
              dispatch(addField({ [e.target.name]: e.target.value }));
            }}
            type='text'
            value={fields.name}
          />
        </DialogContent>
        <DialogActions className='invite--space'>
          <div className=''>
            {(fields.loading['result'] === 201) &&
              <div className='success'>{t('invitation:CreateSuccess')}</div>
            }
            {(fields.loading['result'] === 1) &&
              <div className='success'>{t('invitation:CreateNotSuccess')}</div>
            }
          </div>
          <div>
            <Button onClick={() => setOpen(false)} id='btn--Cancel' color='primary'>
              {t('invitation:cancel')}
            </Button>
            <Button onClick={handleAddFields} id='btn--AddField' color='primary'>
              {t('invitation:sub')}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <div className='fields'>
        <Grid container justify='center' alignItems='center' className='wrap--fields'>
          <div className='root-pages'>
            <p className='companies__title'>{t('fields:fields')}</p>
            <div className='companies__btn'>
              <Button
                className='fields__dialog'
                variant='contained'
                color='primary'
                size='large'
                onClick={() => setOpen(true)}
                startIcon={<SaveIcon />}
              >
                {t('fields:addFields')}
              </Button>
            </div>
          </div>
          <Grid item xs={12} sm={12} container justify='space-between' alignItems='center' className='content--fields'>
              <Grid item xs={12} sm={12} container alignItems='flex-start'>
                <Autocomplete
                  onChange={(_, newInputValue) => {
                    dispatch(addField({ ['fieldID']: newInputValue }));
                  }}
                  id='combo-box-demo'
                  className='invite--autocomplete'
                  options={fields.list}
                  getOptionLabel={(options: Options) => options.name}
                  renderInput={(params) => <TextField {...params} label={t('fields:selectFields')} variant='outlined' />}
                />
              </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};
export default BodyFields;
