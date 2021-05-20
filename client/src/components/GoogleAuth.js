import React from 'react';
import { connect } from 'react-redux';
import { GOOGLE_KEY } from '../../properties';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: GOOGLE_KEY,
          scope: 'email',
        })
        .then(() => {
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

  onLoginClick = () => {
    this.auth.signIn();
  };

  onLogoutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onLogoutClick}>
          <i className="google icon" />
          Logout
        </button>
      );
    }
    return (
      <button className="ui red google button" onClick={this.onLoginClick}>
        <i className="google icon" />
        Login With Google
      </button>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapToStateProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapToStateProps, { signIn, signOut })(GoogleAuth);
