import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions/index';

class StreamCreate extends React.Component {
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
    this.props.createStream(formValues);
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

const wrappedForm = reduxForm({ form: 'streamCreate', validate: validationsHandler })(StreamCreate);

export default connect(null, { createStream })(wrappedForm);
