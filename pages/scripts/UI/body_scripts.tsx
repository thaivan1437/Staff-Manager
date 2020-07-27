import React from 'react';
import CreateScripts from './create';
import ListScripts from './list';

const BodyScripts = () => {
  return (
    <React.Fragment>
      <CreateScripts />
      <ListScripts />
    </React.Fragment>
  );
};
export default BodyScripts;
