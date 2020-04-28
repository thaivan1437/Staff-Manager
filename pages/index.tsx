import React, { useEffect } from 'react';
import { withTranslation, useTranslation } from '../i18n';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/header';
import Body from './UI/body';
import Footer from '../components/footer';
import { TFunction } from 'next-i18next';
import { getDataThunkAction } from './logic/todo_reducer';

interface DataType {
  t: TFunction;
}

const Home = () => {
  const { t }: DataType = useTranslation();
  const content = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataThunkAction());
  }, []);

  return (
    <React.Fragment>
      <Header />
      <Body t={t} title={content.data.title} />
      <Footer />
    </React.Fragment>
  );
};

Home.getInitialProps = () => {
  return {
    namespacesRequired: ['home', 'footer'],
  };
};

export default withTranslation(['home', 'footer'])(Home);
