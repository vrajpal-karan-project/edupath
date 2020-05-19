import React, { useRef } from 'react';
import {
  makeStyles,
  Grid,
  IconButton,
  fade
} from '@material-ui/core';
import { default as SlickSlider } from 'react-slick';

const useStyle = makeStyles(theme => ({
  slide: {
    marginBottom: theme.spacing(2),
  },
  sliderArrowBtn: {
    boxShadow: theme.shadows[1],
    padding: 0,
    margin: `0px ${theme.spacing(1)}px`,
    height: theme.spacing(3),
    width: theme.spacing(3),
    color: '#5CDB94',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
      display: 'none',
    },
  },
  sliderDots: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& ul': {
      padding: 0,
      display: 'flex',
    },
    '& li': {
      margin: `0px ${theme.spacing(0.5)}px`,
      listStyle: 'none',
      height: theme.spacing(1.5),
      borderRadius: '50%',
      backgroundColor: fade('#25274D', 0.3),
      '&.slick-active': {
        backgroundColor: '#25274D',
      },
      '& span': {
        cursor: 'pointer',
        display: 'inline-block',
        height: 'inherit',
        width: theme.spacing(1.5),
      },
    }
  }
}));

const Slider = ({ children }) => {
  const classes = useStyle();

  const slider = useRef();

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    dotsClass: classes.sliderDots,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
    ],
    appendDots: dots => (
      <div>
        <IconButton className={classes.sliderArrowBtn} onClick={() => slider.current.slickPrev()}>
          <span className="fa fa-angle-left" />
        </IconButton>
        <ul> {dots} </ul>
        <IconButton className={classes.sliderArrowBtn} onClick={() => slider.current.slickNext()}>
          <span className="fa fa-angle-right" />
        </IconButton>
      </div>
    ),
    customPaging: i => (
      <span>&nbsp;</span>
    ),
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <SlickSlider ref={c => slider.current = c} {...settings}>
          {
            children.map((slide, index) =>
              <div className={classes.slide} key={index}>
                {slide}
              </div>
            )
          }
        </SlickSlider>
      </Grid>
    </Grid>
  );
};

export default Slider;