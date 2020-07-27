import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, TextField } from '@material-ui/core';
import { createScript, statusScripts } from '../logic/scripts_actions';
import { createScriptAction } from '../logic/scripts_reducer';
import AddIcon from '@material-ui/icons/Add';
import Loading from '../../../components/loading/loading';
import Alert from '@material-ui/lab/Alert';
import { TFunction } from 'i18next';
import { useTranslation } from 'i18n';

interface DataType {
  t: TFunction;
}

const CreateScripts = () => {
  const { t }: DataType = useTranslation();
  const dispatch = useDispatch();
  const scripts = useSelector((state) => state.scripts);
  const status = scripts.status; // get status result API

  const [open, setOpen] = React.useState({ postAdd: false });
  const handleAdd = async() => {
    setOpen({ ...open, postAdd: true });
    await dispatch(statusScripts({ status: 0 })); // clear notification when closed dialog
  };

  return (
    <React.Fragment>
      <div className='script__create'>
        <div className='script__add--btn'>
          <p className='script__add--title'>{t('scripts:scripts')}</p>
          <Button
            onClick={handleAdd}
            variant='contained'
            endIcon={<AddIcon />}
            className='add-btn'
          >
            {t('scripts:createScript')}
          </Button>
        </div>
        <Dialog
          scroll='body'
          open={open.postAdd}
          onClose={() => setOpen({ ...open, postAdd: false })}
          fullWidth
          maxWidth='md'
          className='script__createDialog'
        >
          <div className='wrap__create'>
            <TextField
              className='test__add--title'
              label='Script title'
              fullWidth
              variant='outlined'
              name='title'
              onChange={(e) => {
                dispatch(createScript({ createScript: { [e.target.name]: e.target.value } }));
              }}
            />
            <TextField
              className='test__add--body'
              label='Script content'
              inputProps={{ maxLength : 1500 }}
              multiline
              rows='4'
              fullWidth
              variant='outlined'
              name='content'
              onChange={(e) => {
                dispatch(createScript({ createScript: { [e.target.name]: e.target.value } }));
              }}
            />
            <div className='script__add'>
              <Button
                className='script__add--action'
                variant='contained'
                onClick={() => dispatch(createScriptAction())}
              >
                <Loading loading={scripts.loading.loading}/>
                {t('scripts:createScript')}
              </Button>
            </div>
            <div className='status__wrap'>
              {(status === 201) &&
                <Alert variant='filled' severity='success'>
                  <div className='success'>{t('scripts:createSuccess')}</div>
                </Alert>
              }
              {(status === 1) &&
                <Alert variant='filled' severity='error'>
                  <div className='success'>{t('scripts:createFailed')}</div>
                </Alert>
              }
            </div>
          </div>
        </Dialog>
      </div>
    </React.Fragment>
  );
};
export default CreateScripts;
