import React, { FunctionComponent } from 'react';
import { FormControl, TextField } from '@material-ui/core';
interface InitialProps {
  id: string;
  onChange?: (e) => void;
  defaultValue?: string;
  type?: string;
  label?: string;
  rows?: number;
  multiline?: boolean;
  className?: string;
}
const TextFieldForm: FunctionComponent<InitialProps> =
({
  id= '',
  onChange ,
  defaultValue= '',
  type= '',
  label= '',
  rows= 1,
  multiline= false,
  className= '',
}) => {
  return(
  <FormControl key={id} fullWidth className={className}>
    <TextField
      id={id}
      multiline={multiline}
      label={label}
      name={id}
      className={id}
      onChange={onChange}
      type={type}
      rows={rows}
      defaultValue={defaultValue}
      InputLabelProps={{
        shrink: true,
      }}
    />
  </FormControl>
  );
};

export default TextFieldForm;
