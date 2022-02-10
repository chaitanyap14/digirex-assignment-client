import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./AddRecord.css";

import axios from "axios";

const AddRecord = (props) => {
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [notes, setNotes] = useState("");

  const [status, setStatus] = useState(null);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleStart = (e) => {
    setStart(e.target.value);
  };

  const handleEnd = (e) => {
    setEnd(e.target.value);
  };

  const handleNotes = (e) => {
    setNotes(e.target.value);
  };

  const handleSubmit = (e) => {
    const data = {
      name,
      start,
      end,
      notes,
      email: props.userdata.email,
    };

    axios
      .post("http://localhost:5003/addrecord", {
        data,
      })
      .then((res) => {
        setStatus(res.data.status);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (status) {
    return <Navigate to="/records" />;
  } else {
    return (
      <div className="addrecord">
        <h1>Add New Record</h1>
        <form action="" className="recordform" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name of Disease"
            className="inputs"
            onChange={handleName}
            maxLength="100"
          />
          <label htmlFor="start_date">Start Date:</label>
          <input
            type="date"
            name="start_date"
            id="start_date"
            className="inputs"
            onChange={handleStart}
          />
          <label htmlFor="end_date">End Date:</label>
          <input
            type="date"
            name="end_date"
            id="end_date"
            className="inputs"
            onChange={handleEnd}
          />
          <textarea
            name="notes"
            id="notes"
            cols="30"
            rows="10"
            placeholder="Additional Notes"
            onChange={handleNotes}
            maxLength="255"
          ></textarea>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
};

export default AddRecord;
