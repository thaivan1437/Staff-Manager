import React from 'react';
import Slider from 'react-slick';
import { Typography } from '@material-ui/core';

const LeftSidebar: React.FunctionComponent = () => {
  const setting = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: false,
  };

  return (
      <React.Fragment>
        <Slider {...setting}>
          <div className="left-sidebar">
            <div className="left-sidebar__item">
              <Typography className="left-sidebar__title" variant="h5" align="center">Perfect Balance</Typography>
              <p className="left-sidebar__description">
                ArchitectUI is like a dream.
                Some think it's too good to be true! Extensive collection of unified Vue Bootstrap Components and Elements.
              </p>
            </div>
          </div>
          <div className="left-sidebar">
            <div className="left-sidebar__item">
              <Typography className="left-sidebar__title" variant="h5" align="center">Perfect Balance</Typography>
              <p className="left-sidebar__description">
                ArchitectUI is like a dream.
                Some think it's too good to be true! Extensive collection of unified Vue Bootstrap Components and Elements.
              </p>
            </div>
          </div>
        </Slider>
    </React.Fragment>
  );
};
export default LeftSidebar;
