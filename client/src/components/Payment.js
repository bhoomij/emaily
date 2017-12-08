import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Payment extends Component {
    render() {

        return (
            <div>
                <StripeCheckout
                    name='Emaily'
                    description='Rs 1 for 5 email credits'
                    amount={100}
                    token={token => this.props.handlePaymentToken(token)}
                    country={'IN'}
                    currency={'INR'}
                    stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                >
                    <button className="btn">Add Credits</button>
                </StripeCheckout>
            </div >
        );
    }
}

export default connect(null, actions)(Payment);