import React from 'react';
import { SyncLoader } from 'react-spinners';
interface InitialProps{
  loading: boolean;
}

const initialSate : InitialProps = {
  loading: true,
};

const Loading: React.FunctionComponent<InitialProps> = ({ loading = initialSate }) => {
  if (loading === false) {
    return(
      <React.Fragment />
    );
  }

  return (
    <div className='loading'>
      <SyncLoader color={'#3d4977'}/>
    </div>
  );
};

export default(Loading);
