import React, { Component } from "react";
import FormInput from "./formInput";
import Joi from "joi-browser";
import axios from "axios";
import { URL } from "../../config";

class CreateSchool extends Component {
  state = {
    details: {
      schoolName: "",
      noOfStudents: 0,
      street: "",
      suburb: "",
      state: "",
      postalCode: "",
    },
    errors: {
      schoolName: "",
      noOfStudents: "",
      street: "",
      suburb: "",
      state: "",
      postalCode: "",
    },
    disableSubmitButton: false,
    submitButtonText: "SUBMIT",
  };

  schema = {
    schoolName: Joi.string().required().label("School Name"),
    noOfStudents: Joi.number().min(0).required().label("Number of Students"),
    street: Joi.string().required().label("Street"),
    suburb: Joi.string().required().label("Suburb"),
    state: Joi.string().required().label("State"),
    postalCode: Joi.string().required().label("Postal Code"),
  };

  validate = () => {
    const { error } = Joi.validate(this.state.details, this.schema, {
      abortEarly: false,
    });

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      disableSubmitButton: true,
      submitButtonText: "SUBMITTING...",
    });
    const errors = this.validate();

    if (errors) {
      this.setState({
        errors,
        disableSubmitButton: false,
        submitButtonText: "SUBMIT",
      });
    } else {
      const {
        schoolName,
        noOfStudents,
        street,
        suburb,
        state,
        postalCode,
      } = this.state.details;

      const address = {
        street,
        suburb,
        state,
        postalCode,
      };
      //API call
      axios
        .post(URL + "/add", {
          schoolName: schoolName,
          numberOfStudents: noOfStudents,
          address,
        })
        .then((res) => {
          console.log(res);

          const newSchool = {
            _id: res.data.id,
            address,
            schoolName,
            numberOfStudents: parseInt(noOfStudents),
          };
          this.setState({
            disableSubmitButton: false,
            submitButtonText: "SUBMIT",
          });

          const alertMessage = {
            type: "success",
            message: res.data.message,
          };

          this.props.onCreateSchool(newSchool, alertMessage);
        })
        .catch((err) => {          
          console.log(err);
          const alertMessage = {
            type: "error",
            message: "internal server error",
          };
          this.setState({
            disableSubmitButton: false,
            submitButtonText: "SUBMIT",
          });
          this.props.onCreateSchool(null, alertMessage);
        });
    }
  };

  handleChange = (e) => {
    const details = { ...this.state.details };
    const { name, value } = e.currentTarget;
    details[name] = value;

    this.setState({ details });
  };

  render() {
    const {
      schoolName,
      noOfStudents,
      street,
      suburb,
      state,
      postalCode,
    } = this.state.details;

    const { errors } = this.state;

    const { toggleCreateNewSchool } = this.props;

    return (
      <div className="container m-5">
        <div className="card bg col-16">
          <div className="card-header text-center">
            <h4 className="text-primary">Create School</h4>
          </div>

          <form className="m-3" onSubmit={this.handleSubmit}>
            <FormInput
              name="schoolName"
              label="School Name"
              value={schoolName}
              onChange={this.handleChange}
              error={errors.schoolName}
            />

            <FormInput
              name="noOfStudents"
              label="Number of Student"
              type="number"
              value={noOfStudents}
              onChange={this.handleChange}
              error={errors.noOfStudents}
            />

            <FormInput
              name="street"
              label="Street"
              value={street}
              onChange={this.handleChange}
              error={errors.street}
            />

            <FormInput
              name="suburb"
              label="Suburb"
              value={suburb}
              onChange={this.handleChange}
              error={errors.suburb}
            />

            <FormInput
              name="state"
              label="State"
              value={state}
              onChange={this.handleChange}
              error={errors.state}
            />

            <FormInput
              name="postalCode"
              label="Postal Code"
              value={postalCode}
              onChange={this.handleChange}
              error={errors.postalCode}
            />

            <div className="row d-flex justify-content-end col-12">
              <button
                onClick={toggleCreateNewSchool}
                type="button"
                className="btn btn-info mb-4 mr-3"
              >
                HIDE
              </button>
              <button
                className="btn btn-primary mb-4"
                disabled={this.state.disableSubmitButton}
              >
                {this.state.submitButtonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateSchool;
