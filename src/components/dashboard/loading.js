import React from "react";
import "../../styles/dashboard/loading.css";

const Loading = () => {
  return (
    <div className="loadingContainer">
      <div className="spinner-border" role="status"></div>
      <span className="visually-hidden ml-3">Loading...</span>
    </div>
  );
};

export default Loading;
