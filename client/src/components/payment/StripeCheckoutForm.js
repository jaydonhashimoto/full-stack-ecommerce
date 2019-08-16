import React, { Component } from 'react';
import axios from 'axios';
import { StripeProvider, Elements } from 'react-stripe-elements';

import StripePaymentForm from './StripePaymentForm';

export class StripeCheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      ebook: this.props.ebook,
      customer: {},
      publishableKey: ''
    };
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

  render() {
    return (
      <div>
        <StripeProvider apiKey="pk_test_myKTteZEnSRLZ4scMbz6Jnwg00SulcmKnU">
          <Elements>
            <StripePaymentForm
              price={this.state.ebook.price}
              title={this.state.ebook.title}
            />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}

export default StripeCheckoutForm;
