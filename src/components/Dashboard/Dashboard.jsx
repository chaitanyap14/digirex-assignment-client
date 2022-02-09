import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dash">
      <Link to="/account" style={{ textDecoration: "none", color: "black" }}>
        <div className="accountdash">
          <h1>Account Details</h1>
        </div>
      </Link>
      <Link to="/records" style={{ textDecoration: "none", color: "black" }}>
        <div className="recorddash">
          <h1>Records</h1>
        </div>
      </Link>
    </div>
  );
};

export default Dashboard;
