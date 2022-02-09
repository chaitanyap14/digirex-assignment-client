import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

//stylesheets
import "./Register.css";

const Register = () => {
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
    };

    axios
      .post("https://digirex-assignment-backend.herokuapp.com/register", {
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
      toast.success("Registered Successfully!!!");
    } else if (status === false) {
      toast.error("Registration Failed!!!");
    }
  });

  if (status) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="register">
        <h1 className="regtitle">Register</h1>
        <form className="regform" onSubmit={handleSubmit}>
          <input
            type="text"
            name="pharm_name"
            id="pharmname"
            className="inputs"
            maxLength="50"
            placeholder="Enter Name"
            required
            onChange={handleName}
          />
          <input
            id="pharmemail"
            type="text"
            name="pharm_email"
            maxLength="50"
            className="inputs"
            placeholder="Enter Email"
            required
            onChange={handleEmail}
          />
          <input
            type="tel"
            name="pharm_mobile"
            id="pharmmobile"
            className="inputs"
            maxLength="12"
            placeholder="Enter Mobile Number"
            required
            onChange={handleMobile}
          />
          <input
            type="date"
            name="purch_date"
            id="purchdate"
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
          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </div>
    );
  }
};

export default Register;
