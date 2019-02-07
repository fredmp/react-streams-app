import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdminSection(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/${stream.id}/edit`} className="ui button primary">Edit</Link>
          <Link to={`/${stream.id}/delete`} className="ui button negative">Delete</Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdminSection(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/${stream.id}`} className="header">{stream.title}</Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreateButton() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreateButton()}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    isSignedIn: state.auth.isSignedIn,
    currentUserId: state.auth.userId
  };
};

const mapDispatchToProps = {
  fetchStreams
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamList);
