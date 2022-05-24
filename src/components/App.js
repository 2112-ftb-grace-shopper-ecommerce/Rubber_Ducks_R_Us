import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ProductList from './products';
import ProductDetails from './productDetails';

import ShoppingCart from  './cart';
import UsersList from './allUsers'
import ReviewsList from './allReviews'
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import { getAllUsers } from '../axios-services/user'
import { getAllReviews } from '../axios-services/reviews'
import { getAllActiveProducts, getActiveProductsByCategory } from '../axios-services/products'
import { getCartProducts } from '../axios-services/cart'


import '../style/App.css';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');

  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  const [users, setUsers] = useState([])
  const [reviews, setReviews] = useState([])


  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };
    const getProductList = async () => {
      const products = await getAllActiveProducts();
      setProducts(products);
    };
    const getCart = async () => {
      const currentCartProducts = await getCartProducts();
      setCartProducts(currentCartProducts)
    };
    const getUsersList = async () => {
      const users = await getAllUsers()
      setUsers(users)
    }
    const getReviewsList = async () => {
      const reviews = await getAllReviews()
      setReviews(reviews)
    }
  
    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getProductList();
    getCart();
    getAPIStatus();
    getUsersList()
    getReviewsList()

  }, []);

  return (
    <div className="app-container">
      <h1>Ducks 'R' Us</h1>
      <p>API Status: {APIHealth}</p>
      <Router>
        <Route exact path="/products">
          <ProductList />
        </Route>
        <Route path='/products/:productId'>
          <ProductDetails />
        </Route>

        <Route exact path="/cart">
          <ShoppingCart cartProducts={cartProducts} />
        </Route>

        <Route path="/allReviews">
          <ReviewsList reviews={reviews}/>
        </Route>
        <Route path="/allUsers">
          <UsersList users={users}/>
        </Route>
      </Router>
    </div>
  );
};

export default App;
