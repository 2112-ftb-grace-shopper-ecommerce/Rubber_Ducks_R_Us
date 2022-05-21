import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ProductList from './products';
import ProductDetails from './productDetails';
import UsersList from './allUsers'
import ReviewsList from './allReviews'
import AllProductsList from './allProducts';
import AddProduct from './addProduct';
import EditProduct from './editProduct';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth, getAllUsers, getAllReviews, getAllProducts } from '../axios-services';
import '../style/App.css';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);


  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    const getUsersList = async () => {
      const users = await getAllUsers()
      setUsers(users)
    }

    const getProductsList = async () => {
      const products = await getAllProducts();
      setProducts(products);
    }

    const getReviewsList = async () => {
      const reviews = await getAllReviews()
      setReviews(reviews)
    }
    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
    getUsersList();
    getProductsList();
    getReviewsList();
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
        <Route path="/allReviews">
          <ReviewsList reviews={reviews} />
        </Route>
        <Route path="/allUsers">
          <UsersList users={users} />
        </Route>
        <Route exact path='/allProducts'>
          <AllProductsList products={products} />
        </Route>
        <Route path='/allProducts/add'>
          <AddProduct />
        </Route>
        <Route path='/allProducts/edit/:productId'>
          <EditProduct />
        </Route>

      </Router>
    </div>
  );
};

export default App;
