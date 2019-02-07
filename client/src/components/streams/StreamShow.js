import React from "react";
import flv from 'flv.js';
import { connect } from "react-redux";

import { fetchStream, updateStream } from "../../actions";
import history from "../../history";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }
    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  componentDidMount() {
    const { stream, match } = this.props;
    const { id } = match.params;
    if (!stream) {
      this.props.fetchStream(id);
    }
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
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
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
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
