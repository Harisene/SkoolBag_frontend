import React from "react";
import School from "./school";

const SchoolsTable = ({ data }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">School Name</th>
          <th scope="col">Suburb</th>
          <th scope="col">State</th>
          <th scope="col">Street</th>
          <th scope="col">Postal Code</th>
          <th scope="col">No of Students</th>
        </tr>
      </thead>
      <tbody>
        {data.map((school, index) => {
          return <School key={school._id} data={school} index={index} />;
        })}
      </tbody>
    </table>
  );
};

export default SchoolsTable;
