import React from 'react';
import { Router } from 'react-router-dom';
import Routes from './Routes';
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();
function App() {
  return (
    <Router history={browserHistory}>
      <Routes />
    </Router>
  );
}

export default App;
