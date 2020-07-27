import React, { } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'i18n';
import { TFunction } from 'i18next';
import SaveIcon from '@material-ui/icons/Save';
import { updateScript } from '../logic/scripts_actions';
import { updateScriptAction } from '../logic/scripts_reducer';
import Loading from '../../../components/loading/loading';
import Alert from '@material-ui/lab/Alert';
interface DataType {
  t: TFunction;
}

export const UpdateScripts = () => {
  const { t }: DataType = useTranslation();
  const dispatch = useDispatch();
  const scripts = useSelector((state) => state.scripts);
  const loading = scripts.loading; // get status loading
  const status = scripts.status; // get status result API

  return (
    <React.Fragment>
      <div className='post root-page'>
        <div className='root-pages update--title'>
          <p className='companies__title'>{t('scripts:updateScript')}</p>
        </div>
        <TextField
          label='Title'
          variant='outlined'
          disabled
          fullWidth
          value={scripts.updateScript.title}
        />
        <TextField
          inputProps={{ maxLength : 1500 }}
          label='Content'
          variant='outlined'
          name='content'
          multiline
          rows='4'
          fullWidth
          value={scripts.updateScript.content}
          onChange={(e) =>  dispatch(updateScript({ updateScript:
            { [e.target.name]: e.target.value },
          }))}
          className='script__body'
        />
        <Button
          variant='contained'
          color='primary'
          className='updatePost'
          endIcon={<SaveIcon />}
          onClick={() => dispatch(updateScriptAction())}
        >
          <Loading loading={loading}/>
          {t('scripts:save')}
        </Button>
        <div className='status__wrap'>
          {(status === 200) &&
            <Alert variant='filled' severity='success'>
              <div className='success'>{t('scripts:updateSuccess')}</div>
            </Alert>
          }
          {(status === 1) &&
            <Alert variant='filled' severity='error'>
              <div className='success'>{t('scripts:updateFailed')}</div>
            </Alert>
          }
        </div>
      </div>
    </React.Fragment>
  );
};
