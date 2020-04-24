import React from 'react';
import Footer from '../../components/Footer';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";
import ItemCard from '../../components/ItemCard';


const Home = () => {
  return (
    <div style={{ background: "#F2F2F2" }}>
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route exact path="/">
            This is home page.
         </Route>
          <Route exact path="/about">
            This is About page.
         </Route>
          <Route exact path="/contact">
            This is Contact US page.
         </Route>
          <Route exact path="/account">
            This is ACCOUNT page.
         </Route>
          <Route exact path="/courses">
            <div>
              <p>
                This is COURSES page.
            </p>
              <Grid container spacing={3} style={{ transform: "scale(0.9)" }} className="coursesContainer">
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <ItemCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <ItemCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <ItemCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <ItemCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <ItemCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <ItemCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <ItemCard />
                </Grid>

              </Grid>
            </div>
          </Route>
          <Route exact path="/instructors">
            This is instructors page.
         </Route>
        </Switch>

        <Footer />

      </Router>

    </div>
  );
}

export default Home;