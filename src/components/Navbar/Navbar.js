import React from "react";
import { MenuItems } from "./MenuItems";
<<<<<<< HEAD
// import { Button } from "./Button";
=======
>>>>>>> origin/main
import "./NavStyle.css";

const Navbar = (props) => {




    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">
<<<<<<< HEAD
          <a href="https://imgbb.com/"><img src="https://i.ibb.co/3TYvCMq/8850cbee960349b896d3845ddd45fc32.png" alt="8850cbee960349b896d3845ddd45fc32" border="0" /></a>
=======
          Ducks 'R' Us
>>>>>>> origin/main
        </h1>

        <div className="navbar-links">
          {MenuItems.map((item, index) => {
            return (
              <>
              <div>
              </div>
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
              </>
            );
          })}
        </div>
      </nav>

    );
  
}

export default Navbar;
