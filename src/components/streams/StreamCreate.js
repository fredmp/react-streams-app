import React from "react";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {
  renderInput = ({ input, label, meta }) => {
    const className = `field ${this.showError(meta) ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  }

  renderError = (meta) => {
    if (this.showError(meta)) {
      return <span className="ui error message">{meta.error}</span>;
    }
  }

  showError = ({ active, touched, error }) => {
    return !active && touched && error;
  }

  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  }

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
      </form>
    );
  }
}

const validate = ({ title, description }) => {
  const errors = {};
  if (!title) errors.title = "You must enter a title";
  if (!description) errors.description = "You must enter a description";
  if (title && title.length < 3) errors.title = "Title must have at least 3 characters";
  return errors;
};

const wrappedForm = reduxForm({
  form: 'streamCreate',
  validate
})(StreamCreate);

export default connect(null, { createStream })(wrappedForm);
