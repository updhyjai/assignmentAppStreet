import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {Button} from 'reactstrap';
import DetailPage from './components/ProductDetail';
import Card from './components/ProductCard';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { NavLink as RRNavLink } from 'react-router-dom';
import Navigation from './components/Home';
import ProductList from './components/ProductList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cart : []
    }
    this.HandleCart = this.HandleCart.bind(this);
   //this.onClick = this.onClick.bind(this);
  }
  
HandleCart(cartData){
  console.log(cartData)
}
  
  
  

  render() {
   
    return (
      <Router>
        
      <div>
        <Navigation />
          
          <Switch>
            <Route component = {ProductList} exact path ='/' />
            <Route component={DetailPage} path='/details/:productId' />
           
          </Switch>
        </div>
        
      </Router>
    );
  }
}

export default App;
