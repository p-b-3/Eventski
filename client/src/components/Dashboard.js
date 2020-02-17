import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="fixed-action-btn">
      <Link
        to="/surveys/new"
        className="btn-flaoting btn-large deep-purple accent-1"
      >
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

export default Dashboard;
