import React from "react";
import { connect } from "react-redux";

import { fetchStream, updateStream } from "../../actions";
import history from "../../history";

class StreamShow extends React.Component {
  componentDidMount() {
    if (!this.props.stream) {
      const { id } = this.props.match.params;
      this.props.fetchStream(id);
    }
  }

  onSubmit = formValues => {
    this.props.updateStream(formValues);
    history.push("/");
  };

  render() {
    const { stream } = this.props;
    if (!stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h2>{stream.title}</h2>
        <span>{stream.description}</span>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return { stream: state.streams[id] };
};

const mapDispatchToProps = {
  fetchStream,
  updateStream
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamShow);
