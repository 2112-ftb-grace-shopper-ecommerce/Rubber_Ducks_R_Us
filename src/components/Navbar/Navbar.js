import { Link, useMatch, useResolvedPath } from "react-router-dom";
import React from "react";
import 'navBarStyle.css';

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Ducks 'R' Us
      </Link>
      <ul>
        <CustomLink to="#">Home</CustomLink>
        <CustomLink to="#">Products</CustomLink>
        <CustomLink to="#">Register</CustomLink>
        <CustomLink to="#">Login</CustomLink>
        <CustomLink to="#">Cart</CustomLink>
      </ul>
    </nav>
  );
}
function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}