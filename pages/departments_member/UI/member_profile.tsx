import React from 'react';
import { useSelector } from 'react-redux';
import { convertDateFormat } from 'helpers/date';
import { Button } from '@material-ui/core';
import Loading from '../../../components/loading/loading';
import { TFunction } from 'next-i18next';
import { useTranslation } from 'i18n';
interface DataType {
  t: TFunction;
}
const MemberProfile: React.FunctionComponent = () => {
  const { t }: DataType = useTranslation();
  const departments = useSelector((state) => state.departments);
  const loading = departments.loadingProfiles;

  if (departments.status === 1) {
    return (
      <div className='departments__right'>
        <p className='departments__notification'>Inactive</p>
        <Loading loading={loading}/>
      </div>
    );
  }

  return (
    <div className='departments__right'>
      <div className='departments__card'>
        <img src={departments.memberItem.photo} className='departments__avatar'/>
        <div className='departments__cardS'>
          <p className='departments__nameCard'>{departments.memberItem.firstName} {departments.memberItem.lastName}</p>
          <p className='departments__birth'>{convertDateFormat(new Date(departments.memberItem.birthday))}</p>
          <div className='departments__card'>
            <Button variant='contained' color='primary'>Link</Button>
            <Button variant='outlined' className='departments__view'>{t('departments:view')}</Button>
          </div>
        </div>
      </div>
      <div className='departments__rounded'>
        <div className='departments__info'>
          <p className=''>Email:</p>
          <p className=''>{departments.memberItem.email}</p>
        </div>
        <div className='departments__info'>
          <p className=''>{t('departments:description')}:</p>
          <p className=''>{departments.memberItem.descriptions}</p>
        </div>
        <div className='departments__info'>
          <p className=''>{t('departments:address')}:</p>
          <p className=''>{departments.memberItem.address}</p>
        </div>
      </div>
      <p className=''>{departments.memberItem.descriptions}</p>
      <Loading loading={loading}/>
    </div>
  );
};

export default(MemberProfile);
