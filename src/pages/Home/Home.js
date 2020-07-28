import React from 'react';
import { Grid, Container, Typography, makeStyles } from '@material-ui/core';
import ItemCard from '../../components/ItemCard';
import Slider from '../../components/Slider';
import Banner from './Banner';
import InstructorCard from '../../components/InstructorCard';
import Mockup from '../../assets/mockup.png';
import { NavLink } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
  section: {
    margin: `${theme.spacing(4)}px 0px`,
  },
  sectionTitle: {
    color: '#25274D',
    fontWeight: 'bolder',
  },
  fancySection: {
    padding: '40px 100px',
    color: '#25274d',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    }
  },
  ruler: {
    width: '40%',
    borderBottom: '4px solid #78dd96',
    marginBottom: 10,
  },
  categoryColumn: {
    padding: '0px 10px',
    '& h6': {
      color: '#25274d',
      marginBottom: '2px',
    },
    '& p': {
      '& a': {
        textDecoration: 'none',
        color: 'inherit',
      },
    },
  },
  smallRuler: {
    width: '20%',
    borderBottom: '2px solid #78dd96',
    marginBottom: 10,
  },
  sectionBody: {
    margin: '20px 0',
    padding: '0 20px',
  }
}));

const Home = () => {
  const classes = useStyle();

  return (<>
    <Banner />
    <Container maxWidth="xl" className={classes.section}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.sectionTitle}>
            Feature Courses
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Slider>
            {
              [1, 2, 3, 4, 5, 6, 7].map((value, index) =>
                <ItemCard key={index} />
              )
            }
          </Slider>
        </Grid>
      </Grid>
    </Container>
    <Container maxWidth="xl" className={classes.section}>
      <Grid container>
        <Grid item xs={12} md={6} container alignItems="center">
          <div className={classes.fancySection}>
            <h1>Don't let this pendemic stop you from learning.</h1>
            <div className={classes.ruler}></div>
            <Typography variant="body1" color="textSecondary">Take classes on the go from anywhere, and anytime. Stream on mobile too.</Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={Mockup} width="100%" height="100%" alt="EduPath" />
        </Grid>
      </Grid>
    </Container>
    <Container maxWidth="xl" className={classes.section}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.sectionTitle}>
            Top Instructors
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Slider>
            {
              [1, 2, 3, 4, 5, 6, 7].map((value, index) =>
                <InstructorCard key={index} />
              )
            }
          </Slider>
        </Grid>
      </Grid>
    </Container>
    <Container maxWidth="xl" className={classes.section}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.sectionTitle}>
            Personalised learning
          </Typography>
        </Grid>
        <Grid item xs={12} container className={classes.sectionBody}>
          <Grid item xs={12} md={3} className={classes.categoryColumn}>
            <Typography variant="h6">Category 1</Typography>
            <div className={classes.smallRuler}></div>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <NavLink to="/courses">More</NavLink>
          </Grid>
          <Grid item xs={12} md={3} className={classes.categoryColumn}>
            <Typography variant="h6">Category 2</Typography>
            <div className={classes.smallRuler}></div>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <NavLink to="/courses">More</NavLink>
          </Grid>
          <Grid item xs={12} md={3} className={classes.categoryColumn}>
            <Typography variant="h6">Category 3</Typography>
            <div className={classes.smallRuler}></div>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <NavLink to="/courses">More</NavLink>
          </Grid>
          <Grid item xs={12} md={3} className={classes.categoryColumn}>
            <Typography variant="h6">Category 4</Typography>
            <div className={classes.smallRuler}></div>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <Typography variant="body1" color="textSecondary"><NavLink to="/courses">Category 1</NavLink></Typography>
            <NavLink to="/courses">More</NavLink>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  </>
  );
}

export default Home;