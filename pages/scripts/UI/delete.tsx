import React, { } from 'react';
import { useTranslation } from 'i18n';
import { TFunction } from 'i18next';
import { Button, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { deleteScriptAction } from '../logic/scripts_reducer';
import Loading from '../../../components/loading/loading';
import Alert from '@material-ui/lab/Alert';

interface DataType {
  t: TFunction;
}

export const DeleteScript = () => {
  const { t }: DataType = useTranslation();
  const dispatch = useDispatch();
  const scripts = useSelector((state) => state.scripts);
  const status = scripts.status; // get status result API

  const handleConfirmDelete = async() => {
    await dispatch(deleteScriptAction());
  };

  return (
    <React.Fragment>
      <DialogContent>
        <DialogTitle id='alert-dialog-title' className='title--delete'>{t('scripts:notifications')}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {t('scripts:wantDelete')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {(status === 0) &&
            <Button
              className='confirmDeletePost'
              onClick={() => handleConfirmDelete()}
              color='primary'
              autoFocus
            >
              <Loading loading={scripts.loading.loading}/>
              {t('scripts:yes')}
            </Button>
          }
          <div className='status__wrap'>
            {(status === 200) &&
                <Alert variant='filled' severity='success'>
                  <div className='success'>{t('scripts:deleteSuccess')}</div>
                </Alert>
            }
            {(status === 1) &&
              <Alert variant='filled' severity='error'>
                <div className='success'>{t('scripts:deleteFailed')}</div>
              </Alert>
            }
          </div>
        </DialogActions>
      </DialogContent>
    </React.Fragment>
  );
};
