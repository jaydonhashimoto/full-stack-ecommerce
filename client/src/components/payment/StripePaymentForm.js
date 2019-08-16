import React, { Component } from 'react';
import axios from 'axios';
import {
  Button,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { CardElement, injectStripe } from 'react-stripe-elements';

export class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: '',
      email: '',
      price: this.props.price,
      ebookTitle: this.props.title,
      errorMessage: '',
      purchased: false
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/ebooks/key')
      .then(res => {
        this.setState({ publishableKey: res.data.stripePublishableKey });
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.stripe.createToken({ name: this.state.name }).then(res => {
      axios
        .post('/api/ebooks/charge', {
          name: this.state.name,
          email: this.state.email,
          price: this.state.price,
          title: this.state.ebookTitle,
          token: res.token
        })
        .then(response => {
          //confirmation
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    });
    this.setState({ purchased: !this.state.purchased });
  };

  render() {
    return (
      <div>
        <Button onClick={this.toggle}>Purchase</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader>Payment</ModalHeader>
          {this.state.errorMessage ? (
            <Alert color="danger">{this.state.errorMessage}</Alert>
          ) : null}
          {this.state.purchased ? (
            <Alert color="primary">Thank you for purchasing this eBook!</Alert>
          ) : null}
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <CardElement className="border border-dark" />
                <small>
                  Enter Test Data: 4242 4242 4242 4242 | 04/24 | 242 | 42424
                </small>
              </FormGroup>
              <hr />
              <Button color="primary">Make Payment</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default injectStripe(PaymentForm);
