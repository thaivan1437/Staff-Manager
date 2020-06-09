import React, { useState } from 'react';
import { IconButton, AppBar, Grid, Typography, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { Link } from 'i18n';
import { listCard } from '../../constants/sliderbar_tab';

const Sidebar: React.FunctionComponent = () => {
  const [isSlide, setIsSlide] = useState(true);
  const [isCollapse, setIsCollapse] = useState('');
  const sateCollapse = (tab) => {
    isCollapse === '' ?
    setIsCollapse(tab) :
    setIsCollapse('');
  };

  return (
    <React.Fragment>
      <AppBar position='relative' className={`${isSlide ? 'active' : 'nonactive'} box__slidebar`}>
        <Toolbar className='bg__slider w__full'>
          <Grid container alignItems='center' className=''>
            <Grid item md={7}>
              <Typography component='div' className='topbar__wrap--title'>Logo</Typography>
            </Grid>
            <Grid container item sm={12} md={5} justify='flex-end' alignContent='flex-end'>
              <IconButton color='inherit' aria-label='menu' onClick={() => setIsSlide(!isSlide)}>
                <MenuIcon style={{ color: '#000' }} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
        <div>
          {
            listCard.map((item, index) => (
              <div key={index} className='card__wrap'>
                <div className='card__header'>{item.name}</div>
                <div className='card__list'>
                  {item.object.map((value, indexP) => (
                    <div key={indexP} className='card__item'>
                      <button className={`flex justify-between items-center w__full btn--slider ${value.tab === isCollapse ? 'bold' : 'unbold'}`} onClick={() => sateCollapse(value.tab)}>
                        <div>
                          <MenuIcon style={{ color: '#000', opacity: 0.3 }} />
                        </div>
                        <div className='hiddenOn'>
                          <Link href={value.router} ><a>{value.name}</a></Link>
                        </div>
                        <div className='hiddenOn'>
                          {value.tab === isCollapse ?
                          <ArrowDropUpIcon style={{ opacity: 0.3 }} /> :
                          <ArrowDropDownIcon style={{ opacity: 0.3 }} />}
                        </div>
                      </button>
                      {
                        <div className={`slidebar__collapse ${value.tab === isCollapse ? 'show' : ''}`}>
                          <div className='slidebar__collapse--body'>
                            <div className='slidebar__collapse--list'>
                              {value.objectChild.map((obj, indexChild) => (
                                <div key={indexChild} className='slidebar__collapse--item'>
                                  <Link href={obj.router} >
                                    <a>
                                      <span className='slidebar__collapse--title'>{obj.name}</span>
                                    </a>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </AppBar>
    </React.Fragment>
  );
};

export default Sidebar;
