import React, { FunctionComponent } from 'react';
import { FormControl, InputLabel, Input, InputAdornment } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
interface InitialProps {
  id: string;
  name: string;
  onChange?: (e) => void;
  value?: string;
  readOnly?: boolean;
  type?: string;
}
const InputForm: FunctionComponent<InitialProps> =
({
  name= '',
  id= '',
  onChange ,
  value= '',
  type= '',
  readOnly= false,
}) => {
  return(
    <FormControl key={id} fullWidth className='profile__body--input'>
      <InputLabel className='profile__body--label' htmlFor={id}>
        {name}
      </InputLabel>
      <Input
        onChange={onChange}
        value={convertNumber(type, value)}
        id={id}
        readOnly={readOnly}
        type={type}
        name={id}
        className={id}
        endAdornment={
          <InputAdornment position='end'>
            <AccountCircle />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
const convertNumber = (type, value) => {
  if (value) {
    return value;
  }

  if (type === 'number') {
    return 0;
  }

  return '';
};

export default InputForm;
