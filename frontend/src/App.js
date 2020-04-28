import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import SignUp from './home';
import Signin from './signin';
import Dashboard from './dashboard'
import SendTokens from './sendTokens'
import RecieveTokens from './recieveTokens';
import Transactions from './transactions'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>

            <Typography variant="h6" className={classes.title} align="left">
              Pay U Coin
    </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/send" component={SendTokens} />
          <Route exact path="/recieve" component={RecieveTokens} />
          <Route exact path="/transactions" component={Transactions} />
        </div>
      </div>
    </Router>
  );
}

export default App;
