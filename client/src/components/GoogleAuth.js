import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

const clientId = '658690977507-4molomfs8nbtc90ma1acrd2gobvm9ci7.apps.googleusercontent.com';
const scope = 'email';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client.init({ clientId, scope }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  renderAuthButton() {
    if (this.props.isSignedIn == null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button
          className="ui blue google button"
          onClick={() => this.auth.signOut()}
        >
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button
          className="ui blue google button"
          onClick={() => this.auth.signIn()}
        >
          <i className="google icon" />
          Sign in with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
};

const mapStateToProps = state => ({ isSignedIn: state.auth.isSignedIn });

const mapDispatchToProps = { signIn, signOut };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleAuth);
