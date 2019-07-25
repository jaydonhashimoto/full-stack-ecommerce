import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'reactstrap';

export class Dashboard extends Component {
  state = {
    ebooks: []
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { isAuthenticated, user } = this.props.auth;
    // user ? this.setState({ id: user.id }) : this.setState({ id: null });
    // console.log(user.id);
    if (isAuthenticated) {
      axios
        .post(`/api/ebooks/${user.id}`)
        .then(res => {
          this.setState({ ebooks: res.data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    const ebooks = this.state.ebooks;
    return (
      <div>
        <h1>Your Uploads</h1>
        <ListGroup>
          {ebooks.map(({ id, title }) => (
            <ListGroupItem key={id}>{title}</ListGroupItem>
          ))}
        </ListGroup>
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
