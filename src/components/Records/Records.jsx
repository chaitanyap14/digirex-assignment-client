import React, { useEffect, useState } from "react";
import "./Records.css";

import RecordCard from "../RecordCard/RecordCard";

import { Navigate } from "react-router-dom";
import axios from "axios";

const Records = (props) => {
  const [add, setAdd] = useState(false);
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState([]);
  const email = props.userdata.email;

  const handleAdd = () => {
    setAdd(true);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
    console.log(e.target.value);
  };

  const Records = filtered.map((r) => {
    return (
      <li>
        <RecordCard data={r} />
      </li>
    );
  });

  useEffect(() => {
    const newlist = [];
    records.map((r) => {
      if (r.record_name.includes(filter.toLowerCase())) {
        newlist.push(r);
      }
    });
    setFiltered(newlist);
  }, [filter, records]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/records", { email })
      .then((res) => {
        setRecords(res.data.records);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [records, email]);

  if (add) {
    return <Navigate to="/addrecord" />;
  } else {
    return (
      <div className="records">
        <h1 className="recordtitle">Records</h1>
        <div className="recordops">
          <button onClick={handleAdd} className="btn">
            +
          </button>
          <input
            type="search"
            name="searchrecords"
            id="searchrecords"
            placeholder="Filter by disease name"
            onChange={handleFilter}
            className="inputs"
          />
        </div>
        <div className="recordlist">
          <ul className="list">{Records}</ul>
        </div>
      </div>
    );
  }
};

export default Records;
