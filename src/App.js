import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Layout as AdminLayout } from './admin/pages/Layout';
import { Layout as UserLayout } from './pages/Layout';

import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={AdminLayout} />
        <Route path="" component={UserLayout} />
      </Switch>
    </Router>
  );
}

export default App;
