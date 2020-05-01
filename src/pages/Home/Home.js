import React from 'react';
import { Grid, Container } from '@material-ui/core';
import ItemCard from '../../components/ItemCard';

const Home = () => {
  return (
    <Container maxWidth="xl" style={{ background: "silver" }}>
      <Grid container spacing={3} className="coursesContainer">
        {
          [1, 2, 3, 4, 5, 6, 7].map((value) =>
            <Grid item xs={12} sm={6} md={4} lg={3} key={value}>
              <ItemCard />
            </Grid>
          )
        }
      </Grid>
    </Container>
  );
}

export default Home;