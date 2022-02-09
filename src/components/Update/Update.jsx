import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

//stylesheets
import "./Update.css";

const Update = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [pass, setPass] = useState("");
  const [date, setDate] = useState("");

  const [status, setStatus] = useState(null);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleMobile = (e) => {
    setMobile(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      mobile,
      date,
      pass,
      medrecuser: props.userdata.email,
    };

    axios
      .post("https://digirex-assignment-backend.herokuapp.com/update", {
        data,
      })
      .then((res) => {
        setStatus(res.data.status);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (status === true) {
      toast.success("User Info Updated Successfully!!!");
    } else if (status === false) {
      toast.error("Update Failed!!!");
    }
  });

  if (status) {
    return <Navigate to="/account" />;
  } else {
    return (
      <div className="update">
        <h1 className="uptitle">Update Info</h1>
        <form className="upform" onSubmit={handleSubmit}>
          <input
            type="text"
            name="user_name"
            id="username"
            className="inputs"
            maxLength="50"
            placeholder="Enter Name"
            required
            onChange={handleName}
          />
          <input
            id="useremail"
            type="text"
            name="user_email"
            maxLength="50"
            className="inputs"
            placeholder="Enter Email"
            required
            onChange={handleEmail}
          />
          <input
            type="tel"
            name="user_mobile"
            id="usermobile"
            className="inputs"
            maxLength="12"
            placeholder="Enter Mobile Number"
            required
            onChange={handleMobile}
          />
          <input
            type="date"
            name="user_dob"
            id="userdob"
            placeholder="Enter Date of Birth"
            className="inputs"
            required
            onChange={handleDate}
          />
          <input
            type="password"
            name="password"
            id="password"
            className="inputs"
            maxLength="20"
            placeholder="Set Password"
            required
            onChange={handlePass}
          />
          <button type="submit" className="upbtn">
            Update
          </button>
        </form>
      </div>
    );
  }
};

export default Update;
