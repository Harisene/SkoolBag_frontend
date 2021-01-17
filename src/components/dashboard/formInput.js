import React from "react";
import PropType from "prop-types";
// create a component
const FormInput = ({ name, label, className, value, type, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={label}
        type={type || "text"}
        min={0}
        className={"form-control "+className}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

FormInput.prototype = {
  name: PropType.string,
  label: PropType.string,
  value: PropType.string,
  className: PropType.string,
  type: PropType.string,
  error: PropType.string,
  onChange: PropType.func,
};

//make this component available to the app
export default FormInput;
