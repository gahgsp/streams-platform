import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { editStream, fetchStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    const streamInitialValues = this.props.stream ? _.pick(this.props.stream, 'title', 'description') : null;
    return (
      <div>
        <h3>Edit a Stream</h3>
        {/* The "initialValues" property is a built-in property from ReduxForm. */}
        {/* If this property is defined, it will automatically fill the fields with the same names as the object. */}
        <StreamForm initialValues={streamInitialValues} onSubmit={this.onSubmit}></StreamForm>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { editStream, fetchStream })(StreamEdit);
