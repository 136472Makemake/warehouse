import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProductList from './components/ProductList';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Error from './components/Error404';

function App() {

    return (
      <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path={["/home", "/"]} exact component={() => <Home />} />
          <Route path="/beanies" exact component={() => <ProductList category="beanies" />} />
          <Route path="/gloves" exact component={() => <ProductList category="gloves" />} />
          <Route path="/facemasks" exact component={() => <ProductList category="facemasks" />} />
          <Route path="*" exact component={() => <Error />} />
        </Switch>
      </Router>
      </div>
    );

}

export default App;

