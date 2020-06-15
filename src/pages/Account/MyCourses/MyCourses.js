import React from 'react';
import {
  Grid,
  Paper,
  InputBase,
  makeStyles,
  IconButton
} from '@material-ui/core';
import ItemCard from '../../../components/ItemCard';
import Pagination from '../../../components/Pagination';

const useStyle = makeStyles(theme => ({
  searchBar: {
    display: 'flex',
    padding: '2px 2px 2px 12px',
  },
  input: {
    flexGrow: 1,
  },
  searchButton: {
    fontSize: 20,
  }
}));

const MyCourses = () => {
  const classes = useStyle();
  return (
    <Grid item xs={12} container justify="center">
      <Grid item md={6} xs={12}>
        <Paper elevation={4} className={classes.searchBar}>
          <InputBase
            className={classes.input}
            placeholder="Search My Courses"
          />
          <IconButton className={classes.searchButton}>
            <span className="fa fa-search" />
          </IconButton>
        </Paper>
      </Grid>
      <Grid item container xs={12}>
        {
          [1, 2, 3, 4, 5, 6, 7].map((value, index) =>
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ItemCard tilt={true} tooltip={true} index={index} />
            </Grid>
          )
        }
      </Grid>
      <Grid item xs={12}>
        <Pagination count={10} />
      </Grid>
    </Grid>
  );
};

export default MyCourses;