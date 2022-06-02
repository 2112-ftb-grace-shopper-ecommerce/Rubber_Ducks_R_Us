import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import "./NavStyle.css";

class Navbar extends Component {

  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">
          Ducks 'R' Us
        </h1>
        <div className="navbar-links">
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </div>
      </nav>

    );
  }
}

export default Navbar;
