import React, { useEffect } from 'react';
import { Grid, Paper } from '@material-ui/core';
import About from './about';
import Account from './account';
import Address from './address';
import { Link, useTranslation } from 'i18n';
import { getDataThunkAction } from '../logic/profile_reducer';
import { useSelector, useDispatch } from 'react-redux';
import { TFunction } from 'i18next';
interface DataType {
  t: TFunction;
}
interface InitialProps {
  tab: string;
}
const steps = ['about', 'account', 'address'];

function getStepContent(step) {
  switch (step) {
    case 'about':
      return <About />;
    case 'account':
      return <Account />;
    case 'address':
      return <Address />;
    default:
      return <About />;
  }
}

const BodyProfile: React.FunctionComponent<InitialProps> = ({
  tab= '',
}) => {
  const { t }: DataType = useTranslation();
  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState('about');
  useEffect(() => {
    async function fetchData() {
      await dispatch(getDataThunkAction());
    }
    void fetchData();
  }, [authData]);

  const setActive = () => {
    setActiveStep(tab);
  };
  useEffect(() => {
    setActive();
  }, []);

  return (
    <div className='root__profile'>
      <Paper>
        <Grid container justify='center' alignItems='center' className='root__profile--box'>
          <Grid item xs={12} sm={8} className='root__profile--wrap'>
            <div className='profile__header'>
              <h3 className='profile__header--title'>{t('profile:BuildProfile')}</h3>
              <h5 className='profile__header--des'>{t('profile:information')}</h5>
            </div>
            <div className='profile__tab'>
              <ul className='profile__tab--ul'>
                {steps.map((item, index) => (
                  <li className='profile__tab--li' key={index}>
                    <span className='profile__tab--name'>
                      <Link href={`/profile/${item}`}>
                        <a> {t(`profile:${item}`)} </a>
                      </Link>
                    </span>
                    {activeStep === item &&
                      <div className='profile__tab--active'>
                        {t(`profile:${activeStep}`)}
                      </div>
                    }
                  </li>
                ))}
              </ul>
            </div>
            {getStepContent(activeStep)}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default BodyProfile;
