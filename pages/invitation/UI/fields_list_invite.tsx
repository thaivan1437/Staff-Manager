import Alert from '@material-ui/lab/Alert';
import AutoComplete from '@components/input/auto_complete';
import SelectForm from '@components/input/select';
import { Grid, Button } from '@material-ui/core';
import { FunctionComponent } from 'react';
import { useTranslation } from 'i18n';
import { TFunction } from 'next-i18next';
interface DataType {
  t: TFunction;
}
interface ObjectSelect {
  name: string;
}
interface InitialProps {
  idEmail?: string;
  optionsEmail?: string[];
  defaultValueEmail?: string[];
  onChangeEmail?: (_, e) => void;
  optionsRoles?: ObjectSelect[];
  handleSelectRole?: (e) => void;
  valueRoleID?: string;
  optionsDepartment?: ObjectSelect[];
  handleSelectDepartment?: (e) => void;
  defaultValueDepartmentID?: string;
  valueDepartment?: string;
  resultStatusInvite?: number;
  nameLoading?: string;
  CreateMemeberInvite?: (e) => void;
}

export const FieldsListInvite: FunctionComponent<InitialProps> = (
{
  idEmail= '',
  optionsEmail= [],
  defaultValueEmail= [],
  onChangeEmail,
  handleSelectRole,
  optionsRoles= [],
  valueRoleID= '',
  optionsDepartment= [],
  handleSelectDepartment,
  defaultValueDepartmentID= '',
  valueDepartment= '',
  resultStatusInvite= 0,
  nameLoading= '',
  CreateMemeberInvite,
}) => {
  const { t }: DataType = useTranslation();

  return(
    <Grid container justify='space-between' alignItems='center' spacing={3}>
      <Grid item xs={12} sm={12}>
        <AutoComplete
          multiple={true}
          id={idEmail}
          options={optionsEmail}
          defaultValue={defaultValueEmail}
          onChange={onChangeEmail}
          name='Emails'
          className='invite--listEmail invite--m20'
          freeSolo={true}
        />
      </Grid>
      <Grid item xs={12} sm={6} >
        <SelectForm
          attribute='roleID'
          name={t('invitation:roles')}
          options={optionsRoles}
          className='invite--roles'
          onChange={handleSelectRole}
          value={valueRoleID}
        />
      </Grid>
      <Grid item xs={12} sm={6} >
        <SelectForm
          attribute='departmentID'
          name={t('invitation:department')}
          options={optionsDepartment}
          className='invite--department'
          onChange={handleSelectDepartment}
          defaultValue={defaultValueDepartmentID}
          value={valueDepartment}
        />
      </Grid>
      <Grid item xs={12} sm={12} container justify='space-between' alignItems='center' spacing={3}>
        <div className=''>
          {(resultStatusInvite === 201) &&
            <Alert variant='filled' severity='success'>
              <div className='success'>{t('invitation:SendSuccess')}</div>
            </Alert>
          }
          {(resultStatusInvite === 1) &&
            <Alert variant='filled' severity='error'>
              <div className='success'>{t('invitation:SendNotSuccess')}</div>
            </Alert>
          }
        </div>
        <Button
          className='invite--btnSave'
          variant='contained'
          color='primary'
          onClick={CreateMemeberInvite}
        >
          {t(`invitation:${nameLoading}`)}
        </Button>
      </Grid>
    </Grid>
  );
};
