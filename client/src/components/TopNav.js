import React, { Component, Fragment } from 'react';
import {
  Container,
  Collapse,
  NavbarToggler,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddEBookModal from './AddEBookModal';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

export class TopNav extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  //toggle hamburger
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    //get variable from initialState
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.email}` : ''}</strong>
          </span>
        </NavItem>
        <NavItem>
          <AddEBookModal user={user} />
        </NavItem>
        <NavItem>
          <Link
            style={navLinkStyle}
            to={{
              pathname: '/dashboard'
            }}
          >
            <i className="fas fa-user" /> Dashboard
          </Link>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar
          style={{ background: '#333', color: '#fff' }}
          dark
          expand="sm"
          className="mb-5"
        >
          <Container>
            <NavbarBrand href="/" style={navLinkStyle}>
              <i className="fas fa-book" /> Mock eBook Store
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const navLinkStyle = {
  textDecoration: 'none',
  color: '#fff'
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(TopNav);
