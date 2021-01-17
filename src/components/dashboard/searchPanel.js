import React from "react";
import PropTypes from "prop-types";
import SearchInput from "./searchInput";
import '../../styles/dashboard/searchPanel.css';

const SearchPanel = ({ onChange, onSubmit, size, displayShowAllButton, onShowAll }) => {
  return (
    <div className="row m-3">
      <div className="card bg">
        <div className="card-header text-center"><h4 className="text-primary">Search</h4></div>
        <div className="card-body row">
          <SearchInput id="schoolName" placeholder="School name" onChange={onChange} col={"col-12"}/>
          <SearchInput id="suburb" placeholder="suburb" onChange={onChange} col={"col-3 mt-2"}/>         
          <SearchInput id="state" placeholder="state" onChange={onChange} col={"col-3 mt-2"}/>
          <SearchInput id="street" placeholder="street" onChange={onChange} col={"col-3 mt-2"}/>
          <SearchInput id="postalCode" placeholder="postal code" onChange={onChange} col={"col-3 mt-2"}/>          
        </div>
        <div className="row d-flex justify-content-between col-12">
        <p className="ml-4">{size} school(s) matches</p>
        <div>
        {displayShowAllButton && <button onClick={onShowAll} type="button" className="btn btn-success mb-4 mr-3">SHOW ALL</button>}
        <button onClick={onSubmit} type="button" className="btn btn-primary mb-4">SUBMIT</button>
        </div>
        </div>
      </div>
    </div>
  );
};

SearchPanel.prototype = {
  size: PropTypes.number,
  displayShowAllButton: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default SearchPanel;
