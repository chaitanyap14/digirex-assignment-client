import "./App.css";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

//components
import Nav from "./components/Nav/Nav";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Update from "./components/Update/Update";
import Records from "./components/Records/Records";
import AddRecord from "./components/AddRecord/AddRecord";
import Account from "./components/Account/Account";

toast.configure();

function App() {
  const [auth, setAuth] = useState(false);
  const [userdata, setUserdata] = useState({});

  useEffect(() => {
    try {
      const token = Cookies.get("jwt_token");
      axios
        .post("http://localhost:5000/auth", { token })
        .then((res) => {
          setAuth(res.data.status);
          setUserdata(res.data.userdata.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route
            exact
            path="/"
            element={
              auth ? (
                <Dashboard userdata={userdata} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            exact
            path="/login"
            element={auth ? <Navigate to="/" /> : <Login />}
          />
          <Route
            exact
            path="/update"
            element={
              auth ? <Update userdata={userdata} /> : <Navigate to="/login" />
            }
          />
          <Route
            exact
            path="/records"
            element={
              auth ? <Records userdata={userdata} /> : <Navigate to="/login" />
            }
          />
          <Route
            exact
            path="/addrecord"
            element={
              auth ? (
                <AddRecord userdata={userdata} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            exact
            path="/account"
            element={
              auth ? <Account userdata={userdata} /> : <Navigate to="/login" />
            }
          />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
