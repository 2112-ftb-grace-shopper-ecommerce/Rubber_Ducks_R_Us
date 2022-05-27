import { Link } from "react-router-dom";
import React from "react";
import './navBarStyle.css

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Ducks 'R' Us
      </Link>
      <ul>
        <CustomLink to="/products">Products</CustomLink>
        <CustomLink to="#">Sign Up</CustomLink>
        <CustomLink to="#">Login</CustomLink>
        <CustomLink to="/cart">Cart</CustomLink>
      </ul>
    </nav>
  );
}
