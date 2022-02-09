import React from "react";
import "./RecordCard.css";

const RecordCard = (props) => {
  return (
    <div className="card">
      <h1>{props.data.record_name}</h1>
      <h2>
        {props.data.record_start.slice(0, 10)}
        <br /> to
        <br />
        {props.data.record_end.slice(0, 10)}
      </h2>
      <h3>{props.data.record_notes}</h3>
    </div>
  );
};

export default RecordCard;
