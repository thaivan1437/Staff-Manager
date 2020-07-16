import React, { FunctionComponent } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useTranslation } from 'i18n';
import { TFunction } from 'next-i18next';
interface DataType {
  t: TFunction;
}
interface Ob {
  id?: number;
  name: string;
}
interface InitialProps {
  attribute: string;
  name: string;
  onChange?: (e) => void;
  value: string;
  options?: Ob[];
  className?: string;
  defaultValue?: string;
}
const SelectForm: FunctionComponent<InitialProps> =
({
  attribute= '',
  onChange ,
  name= '',
  value= '',
  options = [],
  className= '',
  defaultValue = '',
}) => {
  const { t }: DataType = useTranslation();
  const ExcludeList: string[] = ['ADMIN', 'CLIENT', 'STAFF'];

  return(
    <FormControl key={attribute} fullWidth className={className}>
      <InputLabel id={attribute}>{name}</InputLabel>
      <Select
        labelId={attribute}
        id={attribute}
        value={value}
        name={attribute}
        className={attribute}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {options.map((item, index) => (
          attribute === 'gender' ?
            <MenuItem key={index} value={item.name}>{item.name}</MenuItem> :
            !ExcludeList.includes(item.name) &&
              <MenuItem key={index} value={(item.id) ? item.id : item[attribute]}>{t(`invitation:${item.name}`)}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectForm;
