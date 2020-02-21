import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(field => {
      return (
        <Field
          key={field.name}
          component={SurveyField}
          type="text"
          label={field.label}
          name={field.name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form // handleSubmit provided by reduxForm
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
        >
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>

          <button type="submit" className="teal btn-flat right white-text">
            Review
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  //obj that contains values coming off the form
  const errors = {};

  errors.emails = validateEmails(values.emails || "");

  formFields.forEach(field => {
    if (!values[field.name]) {
      errors[field.name] = "You must provide a value";
    }
  });

  return errors; // redux form sees error.title matches one of the fields we are trying to render- will pass error message as prop to <Field/>
}

export default reduxForm({
  validate: validate, //validate when user hits submit
  form: "surveyForm",
  destroyOnUnmount: false //true by default, false to not destroy values when form is not being shown
})(SurveyForm); //reduxForm adds additional props to SurveyForm (calls action creators, pulls data out of store and providing it to other components) allows our form to commiunicate with redux store
