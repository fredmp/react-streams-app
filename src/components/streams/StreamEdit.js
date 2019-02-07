import React from "react";
import { connect } from 'react-redux';
import { fetchStream, updateStream } from '../../actions';

import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    if (!this.props.stream) {
      const { id } = this.props.match.params;
      this.props.fetchStream(id);
    }
  }

  onSubmit = formValues => {
    this.props.updateStream(formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={this.props.stream}
        />
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return { stream: state.streams[id] };
};

const mapDispatchToProps = {
  fetchStream,
  updateStream
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamEdit);
