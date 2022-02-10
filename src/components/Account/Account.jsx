import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";

//stylesheets
import "./Account.css";

const Account = (props) => {
  const [data, setData] = useState({});
  const [update, setUpdate] = useState(null);
  const [deleteacc, setDelete] = useState(null);

  const logout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("medrec_user");
    toast.error("Logged Out!!!");
  };

  const deleteAcc = () => {
    axios
      .post("http://localhost:5003/deleteacc", {
        email: props.userdata.email,
      })
      .then((res) => {
        if (res.data.status === true) {
          toast.success("Account Deleted!!!");
          logout();
        }
        setDelete(res.data.status);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUpdate = () => {
    setUpdate(true);
  };

  useEffect(() => {
    axios
      .post("http://localhost:5003/account", {
        email: props.userdata.email,
      })
      .then((res) => {
        setData(res.data.result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [data, props]);

  if (update) {
    return <Navigate to="/update" />;
  } else if (deleteacc) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="account" style={{ cursor: "default" }}>
        <h1 className="accounttitle">Account</h1>
        <div className="accdata">
          <h2>
            <u>ID:</u> {data.user_id}
          </h2>
          <h2>
            <u>Name:</u> {data.user_name}
          </h2>
          <h2>
            <u>Email:</u> {data.user_email}
          </h2>
          <h2>
            <u>Mobile No.:</u> {data.user_phone}
          </h2>
          <h2>
            <u>Date of Birth:</u> {data.user_dob}
          </h2>
          <button className="btn" onClick={handleUpdate}>
            Update
          </button>
        </div>
        <button className="btn" onClick={logout}>
          Logout
        </button>
        <button className="btn" onClick={deleteAcc}>
          Delete Account
        </button>
      </div>
    );
  }
};

export default Account;
