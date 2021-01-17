import React from "react";
import PropTypes from "prop-types";

const Alert = ({ data }) => {
  if (data.message) {
    const { type, message } = data;

    return (
      <div
        className={
          type === "error" ? "alert alert-danger" : "alert alert-success"
        }
        role="alert"
      >
        {message}
      </div>
    );
  } else return null;
};

Alert.prototype = {  
  data: PropTypes.object,
};

export default Alert;
