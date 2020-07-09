import React from 'react';

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
      <img src='../../static/images/loading.gif' />
    </div>
  );
};

export default(Loading);
