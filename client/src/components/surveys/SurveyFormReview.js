import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
  //destructuring of props
  const reviewFields = formFields.map(field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{formValues[field.name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please review your details</h5>
      {reviewFields}
      <button
        className="yellow white-text darken-3 btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues)} //on click call action creator submitSurvey (addes as prop via connect below)
        className="teal btn-flat white-text right"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  // state from redux store to props
  console.log(state);
  return {
    formValues: state.form.surveyForm.values // to get access to form values stored in redux store by redux form
  };
}
export default connect(
  mapStateToProps,
  actions
)(SurveyFormReview);
