import React from 'react';
import { useSelector } from 'react-redux';
import { TFunction } from 'next-i18next';
import { useTranslation } from 'i18n';
import { FormControl, NativeSelect } from '@material-ui/core';

interface DataType {
  t: TFunction;
}

const SelectStatus: React.FunctionComponent = () => {
  const { t }: DataType = useTranslation();
  const departments = useSelector((state) => state.departments);

  const departmentsList = departments && departments.list && Array.isArray(departments.list)
  ?  departments.list.map((each) => each) : [];

  const [value, setValue] = React.useState('');

  const handleSelectStatus = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className='departments__top'>
      <p className='departments__title'>{t('departments:departments')}</p>
      <div className='departments__select'>
        <FormControl>
          <NativeSelect value={value} onChange={handleSelectStatus}>
            <option value='' />
            {
              departmentsList.map((item) => (
                <option key={item.id} value={item.userID.status}>
                  {item.userID.status}
                </option>
              ))
            }
          </NativeSelect>
        </FormControl>
      </div>
    </div>
  );
};

export default(SelectStatus);
