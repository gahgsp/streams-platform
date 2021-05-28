import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  renderInput = ({ input, label, meta }) => {
    // This 'meta' has properties from the field such as invalid, dirty, touched, error...
    return (
      <div className={`field ${meta.error && meta.touched ? 'error' : ''}`}>
        <label>{label}</label>
        <input {...input} />
        {this.renderErrorMessage(meta)}
      </div>
    );
  };

  renderErrorMessage = ({ error, touched }) => {
    if (error && touched) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" component={this.renderInput} label="Title" />
        <Field name="description" component={this.renderInput} label="Description" />
        <button className="ui button primary">Create</button>
      </form>
    );
  }
}

const validationsHandler = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'The title is a required field!';
  }
  if (!formValues.description) {
    errors.description = 'The description is a required field!';
  }
  return errors;
};

export default reduxForm({ form: 'streamForm', validate: validationsHandler })(StreamForm);
