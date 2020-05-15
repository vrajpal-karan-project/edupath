import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Layout as AdminLayout } from './admin/pages/Layout';
import { Layout as UserLayout } from './pages/Layout';

import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/admin" component={AdminLayout} />
          <Route path="" component={UserLayout} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
