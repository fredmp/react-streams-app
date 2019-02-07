import React from "react";
import { Field, reduxForm } from "redux-form";
import history from "../../history";

class StreamForm extends React.Component {
  renderInput = ({ input, label, meta }) => {
    const className = `field ${this.showError(meta) ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderError = meta => {
    if (this.showError(meta)) {
      return <span className="ui error message">{meta.error}</span>;
    }
  };

  showError = ({ active, touched, error }) => {
    return !active && touched && error;
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Description"
        />
        <button className="ui button primary">Submit</button>
        <button className="ui cancel button" onClick={() => history.push('/')}>
            Cancel
        </button>
      </form>
    );
  }
}

const validate = ({ title, description }) => {
  const errors = {};
  if (!title) errors.title = "You must enter a title";
  if (!description) errors.description = "You must enter a description";
  if (title && title.length < 3)
    errors.title = "Title must have at least 3 characters";
  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate
})(StreamForm);
