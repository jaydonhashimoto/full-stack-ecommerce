import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Dashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        <h1>{user ? user.email : ''}</h1>
        <h1>{user ? user.id : ''}</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Dashboard);
