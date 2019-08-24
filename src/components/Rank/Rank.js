import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div className="ui container">
      <div className="white f3 pa2">{`${name} , your current entry count is ...`}</div>
      <div className="white f1 pa2">{entries}</div>
    </div>
  );
};

export default Rank;
