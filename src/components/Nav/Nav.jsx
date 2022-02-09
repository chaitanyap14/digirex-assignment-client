import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBook } from "@fortawesome/free-solid-svg-icons";

//stylesheets
import "./Nav.css";

const Nav = () => {
  return (
    <div className="nav">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className="logo">Medrec</h1>
      </Link>
      <ul className="linklist">
        <li>
          <Link to="/records" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faBook} className="recordlink" />
          </Link>
        </li>
        <li>
          <Link to="/account" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faUser} className="accountlink" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
