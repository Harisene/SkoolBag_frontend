import React from "react";
import PropTypes from "prop-types";

const School = ({ data, index }) => {
  const { schoolName, address, numberOfStudents } = data;
  const { street, suburb, postalCode, state } = address;

  return (
    <tr>
      <th scope="row">{index+1}</th>
      <td>{schoolName}</td>
      <td>{suburb}</td>
      <td>{state}</td>
      <td>{street}</td>
      <td>{postalCode}</td>
      <td>{numberOfStudents}</td>
    </tr>
  );
};

School.prototype = {
  data: PropTypes.objectOf({
    schoolName: PropTypes.string,
    address: PropTypes.objectOf({
      street: PropTypes.string,
      suburb: PropTypes.string,
      postalCode: PropTypes.string,
      state: PropTypes.string,
    }),
    numberOfStudents: PropTypes.number,
  }),
  index: PropTypes.number
};

export default School;
