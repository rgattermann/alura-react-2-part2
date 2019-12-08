import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Authors from "./pages/Authors";
import Books from "./pages/Books";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact={true} component={App}/>
      <Route path='/about' component={About}/>
      <Route path='/books' component={Books}/>
      <Route path='/authors' component={Authors}/>
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
