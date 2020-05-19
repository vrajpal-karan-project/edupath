import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Layout as AdminLayout } from './admin/pages/Layout';
import { Layout as UserLayout } from './pages/Layout';

import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import WalsheimTTF from './assets/font/GT-Walsheim-Pro.ttf';
import './App.css';

const walsheim = {
  fontFamily: "walsheim",
  src: `url("${WalsheimTTF}") format("truetype")`,
}

const theme = createMuiTheme({
  typography: {
    fontFamily: `${walsheim}, -apple-system, BlinkMacSystemFont, 
    "Segoe UI", "Roboto","Oxygen", "Ubuntu", "Cantarell", 
    "Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif`,
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path={["/edupath/admin", "/admin"]} component={AdminLayout} />
          <Route path={["/edupath", ""]} component={UserLayout} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
