import React from 'react';
import Footer from '../../components/Footer';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const Home = () => {
  return (
    <div>
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
            This is COURSES page.
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