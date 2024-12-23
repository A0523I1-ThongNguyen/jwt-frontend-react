import React, { useEffect, useState } from "react";
import "./nav.scss";
import { NavLink, useLocation } from "react-router-dom";

const Nav = (props) => {
  const [isShow, setIsShow] = useState(true);

  let location = useLocation();

  useEffect(() => {
    console.log(" check loc", location);
    let session = sessionStorage.getItem("account");
    if (location.pathname === "/login") {
      setIsShow(false);
    }
  }, []);

  return (
    <>
      {isShow === true && (
        <div className="topnav">
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/login">login</NavLink>
        </div>
      )}
      {/* <Link to="/dn">move login</Link> */}
    </>
  );
};

export default Nav;
