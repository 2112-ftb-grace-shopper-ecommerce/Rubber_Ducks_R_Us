import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home/home";
import ProductList from "./Products/products";
import ProductDetails from "./Products/productDetails";
import Login from "./Login/login";
import Register from "./Login/register";
import ShoppingCart from "./cart";
import UsersList from "./Admin/allUsers";
import ReviewsList from "./Admin/allReviews";
import AllProductsList from "./Admin/allProducts";
import AddProduct from "./Admin/addProduct";
import EditProduct from "./Admin/editProduct";
import Navbar from "./Navbar/Navbar";
import Search from './Search/search';
import Contact from "./contact";
import Admin from "./Admin/admin"

import { getAllUsers } from "../axios-services/user";
import {
  getAllActiveProducts,
  getAllProducts,
} from "../axios-services/products";
import { getAllReviews } from "../axios-services/reviews";
import { getCartProducts } from "../axios-services/cart";

import "../style/App.css";


const App = () => {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([])
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getProductList = async () => {
      const products = await getAllActiveProducts();
      setProducts(products);
    };
    const getCart = async () => {
      const currentCartProducts = await getCartProducts();
      setCartProducts(currentCartProducts);
    };
    const getUsersList = async () => {
      const users = await getAllUsers();
      setUsers(users);
    };

    const getProductsList = async () => {
      const products = await getAllProducts();
      setProducts(products);
    };

    const getReviewsList = async () => {
      const reviews = await getAllReviews();
      setReviews(reviews);
    };
    const validToken = localStorage.getItem("token");
    if (validToken) setIsLoggedIn(true);

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getProductList();
    getCart();
    getUsersList();
    getProductsList();
    getReviewsList();
  }, []);

  return (
    <div className="app-container">
      <div className="bg-image" />
      <header>
        <Navbar isLoggedIn={isLoggedIn}/>
      </header>
      <main>
        <Router>
        <Route exact path='/'>
          <Home />
        </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/products">
            <ProductList />
          </Route>
          <Route path="/products/:productId">
            <ProductDetails />
          </Route>
          <Route exact path="/login">
            <Login setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/cart">
            <ShoppingCart cartProducts={cartProducts} />
          </Route>
          <Route path="/allReviews">
            <ReviewsList reviews={reviews} />
          </Route>
          <Route path="/allUsers">
            <UsersList users={users} />
          </Route>
          <Route exact path="/allProducts">
            <AllProductsList products={products} />
          </Route>
          <Route path="/allProducts/add">
            <AddProduct />
          </Route>
          <Route path="/allProducts/edit/:productId">
            <EditProduct />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Router>
      </main>
      <footer></footer>
    </div>
  );
};

export default App;