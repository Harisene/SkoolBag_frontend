import React from "react";
import PropTypes from "prop-types";

const SearchInput = ({ id, placeholder, col, onChange }) => {

  return (
    <div className={"input-groups " + col}>
      <input
        type="text"
        id={id}
        onChange={onChange}
        className="form-control"
        placeholder={placeholder}
      />     
    </div>
  );
};

SearchInput.prototype = {
  placeholder: PropTypes.string,
  id: PropTypes.string,
  col: PropTypes.string,
  onChange: PropTypes.func,
};

export default SearchInput;
