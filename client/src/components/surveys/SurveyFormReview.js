import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";

const SurveyFormReview = props => {
  const reviewFields = formFields.map(field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{state.formValues[field.name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please review your details</h5>
      {reviewFields}
      <button className="yellow darken-3 btn-flat" onClick={props.onCancel}>
        Back
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
export default connect(mapStateToProps)(SurveyFormReview);
