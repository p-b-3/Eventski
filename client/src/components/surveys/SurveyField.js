import React from "react";
//redux form gives SurveyField props since is being used by redux form
//pass entire props.input object
export default props => {
  console.log(props.input);
  return (
    <div>
      <label>{props.label}</label>
      <input {...props.input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {props.meta.touched && props.meta.error}
      </div>
    </div>
  );
};
