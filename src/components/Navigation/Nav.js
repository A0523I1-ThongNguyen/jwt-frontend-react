import React from "react";
import "./nav.scss";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Nav = (props) => {
  return (
    <>
      <div className="topnav">
        <NavLink to="/" exact>
          Home
        </NavLink>
        <NavLink to="/news">News22</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/login">login</NavLink>
      </div>

      <Link to="/dn">move login</Link>
    </>
  );
};

export default Nav;
