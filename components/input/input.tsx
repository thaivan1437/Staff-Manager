import React, { FunctionComponent } from 'react';
import { FormControl, InputLabel, Input, InputAdornment } from '@material-ui/core';
interface InitialProps {
  id: string;
  name?: string;
  onChange?: (e) => void;
  value?: string;
  readOnly?: boolean;
  type?: string;
  className?: string;
  icon?: React.ReactNode;
  hidden?: boolean;
}
const InputForm: FunctionComponent<InitialProps> =
({
  name= '',
  id= '',
  onChange ,
  value= '',
  type= '',
  readOnly= false,
  className= '',
  hidden = false,
  icon,
}) => {
  return(
    <FormControl key={id} fullWidth className={className}>
      <InputLabel htmlFor={id}>
        {name}
      </InputLabel>
      <Input
        onChange={onChange}
        value={convertNumber(type, value)}
        id={id}
        hidden={hidden}
        readOnly={readOnly}
        type={type}
        name={id}
        className={id}
        endAdornment={icon &&
          <InputAdornment position='end'>
            {icon}
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
