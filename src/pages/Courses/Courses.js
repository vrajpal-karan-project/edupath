import React, { useState } from 'react';
import {
  Grid,
  Container,
  Select,
  MenuItem,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ItemCard from '../../components/ItemCard';
import Pagination from '../../components/Pagination';
import Category from "./Category";

const useStyle = makeStyles(theme => ({
  pageTitle: {
    color: '#25274D',
    fontWeight: 'bolder',
  },
}));

const Courses = (props) => {
  const classes = useStyle();

  const [sortBy, setSortBy] = useState("alpha");
  const [checkedItems, setCheckedItems] = useState({});

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  }

  const handleCheck = (subcategory) => {
    const checkList = { ...checkedItems };

    if (checkList[subcategory] === undefined)
      checkList[subcategory] = subcategory;
    else
      delete checkList[subcategory];

    setCheckedItems(checkList);

    console.log(Object.entries(checkList).map(([k, v]) => (v)));
  };

  return (
    <Container maxWidth="xl" style={{ margin: "24px auto" }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.pageTitle}>
            All Courses
          </Typography>
        </Grid>
        <Grid item container xs={12} alignItems="flex-start">
          <Grid container item xs={12} md={3} style={{ padding: "12px" }}>
            <Grid item xs={12}>
              {
                ["IT", "Programming", "Software", "Hardware", "Android"].map((cat, i) =>
                  <Category category={cat} selected={["IT", "Software"]} checkedItems={checkedItems} handleCheck={handleCheck} key={i} />
                )
              }
            </Grid>
          </Grid>
          <Grid container item xs={12} md={9} justify="center" style={{ paddingLeft: "16px" }}>
            <Grid container item xs={12} justify="flex-end" style={{ padding: "12px" }}>
              <Grid item>
                SORT BY:
                <Select
                  value={sortBy}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Sort B' }}
                  onChange={handleSortBy}
                  style={{ minWidth: "18ch", textAlign: "right" }}
                >
                  <MenuItem value={"alpha"}>A-Z</MenuItem>
                  <MenuItem value={"date"}>Date Uploaded</MenuItem>
                  <MenuItem value={"price"}>Price Low To High</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              {
                [1, 2, 3, 4, 5, 6, 7].map((value, index) =>
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <ItemCard tilt={true} tooltip={true} index={index} />
                  </Grid>
                )
              }
            </Grid>
            <Grid item xs={12}>
              <Pagination
                count={10}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Courses;