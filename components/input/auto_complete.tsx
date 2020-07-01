import React, { FunctionComponent } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Chip, TextField } from '@material-ui/core';
interface InitialProps {
  id: string;
  name: string;
  onChange?: (_, e) => void;
  value?: string;
  freeSolo?: boolean;
  multiple?: boolean;
  type?: string;
  className?: string;
  icon?: React.ReactNode;
  defaultValue?: string[];
  options?: string[];
}
const AutoComplete: FunctionComponent<InitialProps> =
({
  name= '',
  id= '',
  onChange ,
  freeSolo = false,
  multiple = false,
  className= '',
  defaultValue= [],
  options= [],
}) => {
  return(
    <Autocomplete
      multiple={multiple}
      id={id}
      options={options}
      defaultValue={defaultValue}
      onChange={onChange}
      className={className}
      freeSolo={freeSolo}
      renderTags={(value: string[], getTagProps) =>
        value.map((item: string, index) => (
          <Chip key={item} variant='outlined' label={item} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} variant='filled' label={name} placeholder='Favorites' />
      )}
    />
  );
};
export default AutoComplete;
