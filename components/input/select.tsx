import React, { FunctionComponent } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
interface Ob {
  name: string;
}
interface InitialProps {
  attribute: string;
  name: string;
  onChange?: (e) => void;
  value: string;
  options?: Ob[];
}
const SelectForm: FunctionComponent<InitialProps> =
({
  attribute= '',
  onChange ,
  name= '',
  value= '',
  options = [],
}) => {
  return(
    <FormControl key={attribute} fullWidth className='profile__body--input'>
      <InputLabel id={attribute}>{name}</InputLabel>
      <Select
        labelId={attribute}
        id={attribute}
        value={value}
        name={attribute}
        className={attribute}
        onChange={onChange}
      >
        {options.map((item, index) => (
          <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectForm;
