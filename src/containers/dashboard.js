import React, { Component } from "react";
import SearchPanel from "../components/dashboard/searchPanel";
// import getAllSchools from "../service/schools";
import SchoolsTable from "../components/dashboard/schoolsTable";
import CreateSchool from "../components/dashboard/createSchool";
import Loading from "../components/dashboard/loading";
import axios from "axios";
import { URL } from "../config";
import Alert from "../components/dashboard/alert";

class DashBoard extends Component {
  state = {
    schools: [],
    filteredSchools: [],
    createNewSchool: false,
    alertMessage: {
      type: "",
      message: "",
    },
    loading: true,
  };

  searchOptions = {
    schoolName: null,
    suburb: null,
    state: null,
    street: null,
    postalCode: null,
  };

  componentDidMount() {
    axios
      .get(URL + "/all")
      .then((res) => {
        // console.log(res);
        this.setState({
          schools: res.data,
          filteredSchools: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          alertMessage: { type: "error", message: "internal server error" },
          loading: false,
        });
      });
  }

  handleSearch = () => {
    let filteredSchools = this.state.schools;

    for (let element in this.searchOptions) {
      const value = this.searchOptions[element];
      if (value) {
        if (element === "schoolName")
          filteredSchools = filteredSchools.filter((school) => {
            if (school[element].toUpperCase() === value.toUpperCase().trim()) {
              return school;
            }
            return null;
          });
        else {
          filteredSchools = filteredSchools.filter((school) => {
            if (school.address[element].toString().toUpperCase() === value.toUpperCase().trim()) {
              return school;
            }
            return null;
          });
        }
      }
    }

    // console.log(filteredSchools);
    this.setState({ filteredSchools });
  };

  handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;

    if (value.length === 0) {
      this.searchOptions[id] = null;
    } else {
      this.searchOptions[id] = value;
    }
  };

  toggleCreateNewSchool = () => {
    this.setState({ createNewSchool: !this.state.createNewSchool });
  };

  handleCreateSchool = (newSchool, alertMessage) => {
    if (newSchool) {
      const schools = [...this.state.schools, newSchool];
      this.setState({
        schools,
        filteredSchools: schools,
        createNewSchool: false,
        alertMessage,
      });
      console.log(this.state.schools);
    } else {
      this.setState({ alertMessage });
    }
  };

  handleShowAll = () => {
    this.setState({ filteredSchools: this.state.schools });
  };

  render() {
    const {
      filteredSchools,
      schools,
      createNewSchool,
      loading,
      alertMessage,
    } = this.state;

    if (loading) return <Loading />;
    return (
      <div className="container">
        <h1 className="text-center m-5">Dashboard</h1>
        <Alert data={alertMessage} />

        {/* toggle between createSchool component and searchPanel component*/}
        {createNewSchool ? (
          <CreateSchool
            onCreateSchool={this.handleCreateSchool}
            toggleCreateNewSchool={this.toggleCreateNewSchool}
          />
        ) : (
          <SearchPanel
            onChange={this.handleChange}
            onSubmit={this.handleSearch}
            size={filteredSchools.length}
            displayShowAllButton={schools === filteredSchools ? false : true}
            onShowAll={this.handleShowAll}
          />
        )}

        {!this.state.createNewSchool && (
          <div className="d-flex flex-row-reverse mb-3">
            <button
              type="button"
              className="btn btn-info"
              onClick={this.toggleCreateNewSchool}
            >
              Add new School
            </button>
          </div>
        )}

        {filteredSchools.length > 0 ? (
          <SchoolsTable data={this.state.filteredSchools} />
        ) : (
          <p className="text-center">No schools were found.</p>
        )}
      </div>
    );
  }
}

export default DashBoard;
