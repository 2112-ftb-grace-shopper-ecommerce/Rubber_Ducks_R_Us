import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductList from './products';
import ProductDetails from './productDetails';
import ShoppingCart from  './cart';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth, getAllProducts, getCartProducts } from '../axios-services';
import '../style/App.css';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };
    const getProductList = async () => {
      const products = await getAllProducts();
    
      setProducts(products);
    };
    const getCart = async () => {
      const currentCartProducts = await getCartProducts();
      console.log(cartProducts)
      setCartProducts(currentCartProducts)
    };
    
    
    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
    getProductList();
    getCart();
  }, []);






  return (
    <div className="app-container">
      <h1>Ducks 'R' Us</h1>
      <p>API Status: {APIHealth}</p>
      <Router>
        <Route exact path="/products">
          <ProductList products={products} />
        </Route>
        <Route path='/products/:productId'>
          <ProductDetails />
        </Route>
        <Route exact path="/cart">
          <ShoppingCart cartProducts={cartProducts} />
        </Route>
      </Router>
    </div>
  );
};

export default App;
