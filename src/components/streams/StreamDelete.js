import React from "react";
import Modal from '../Modal';
import { connect } from 'react-redux';

import history from "../../history";
import { fetchStream, deleteStream } from '../../actions'

class StreamDelete extends React.Component {
  onDismiss = () => history.push("/");
  onSubmit = formValues => {
    this.props.deleteStream(formValues);
    this.onDismiss();
  };

  content = (title) => <p>Are you sure you want to delete {title}?</p>;

  actions = () => (
    <React.Fragment>
      <div
        className="ui red button"
        onClick={() => this.onSubmit(this.props.stream)}
      >
        Delete
      </div>
      <div className="ui cancel button" onClick={this.onDismiss}>
        Cancel
      </div>
    </React.Fragment>
  );

  componentDidMount() {
    if (!this.props.stream) {
      const { id } = this.props.match.params;
      this.props.fetchStream(id);
    }
  }

  render() {
    if (!this.props.stream) {
      return <Modal title="Loading..." />
    }
    return (
      <div>
        StreamDelete
        <Modal
          title="Delete Stream"
          content={this.content(this.props.stream.title)}
          actions={this.actions()}
          onDismiss={this.onDismiss}
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
  deleteStream
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamDelete);
