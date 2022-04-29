import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App.js';

const CheckOutForm = ({ reserveInfo }) => {
    const [loggedINUser, setLoggedInUser] = useContext(userContext)
    const stripe = useStripe();
    const elements = useElements();
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [secret, setSecret] = useState('');
    // destructure of reserveInfo
    const { name, totalRent, email, _id } = reserveInfo;

    // ticketRent send to stripe server
    useEffect(() => {
        const url = 'https://polar-woodland-95265.herokuapp.com/create-payment-intent';
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ totalRent: totalRent })
        })
            .then(response => response.json())
            .then(data => {
                setSecret(data.clientSecret);
            })
    }, [totalRent])

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            setErrorMsg(error);
        }
        else {
            setErrorMsg('');
        }

        // confirm payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            secret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email,
                    },
                },
            },
        );

        if (intentError) {
            setErrorMsg(intentError);
            setSuccess('');
        }
        else {
            setErrorMsg('');
            setSuccess('Payment SuccessFully Done');
            setProcessing(false);
            // set payment info to database
            const payment = {
                amount: paymentIntent.amount,
                transition: paymentIntent.client_secret,
                currency: paymentIntent.currency,

            }
            const url = `https://polar-woodland-95265.herokuapp.com/confirm_payment/${_id}`;
            fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payment)
            })
                .then(response => response.json())
                .then(data => {

                })
        }

    }
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className='text-center'>
                    {
                        processing ?
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                </div>
                            </div>
                            :
                            <div>
                                {
                                    loggedINUser.userEmail ?
                                        <button type="submit" className='btn btn-primary mt-5 px-3 border-1' disabled={!stripe || success}>Pay</button>
                                        :
                                        <Link to="/login_signup">
                                            <button className='btn btn-primary mt-5 px-3 border-1'>Login To Payment</button>
                                        </Link>
                                }

                            </div>

                    }
                </div>

                <div className='text-center mt-5'>
                    {
                        errorMsg &&
                        <p className='text-danger'>{errorMsg.message}</p>
                    }
                    {
                        success &&
                        <p className='text-success'>{success}</p>
                    }
                </div>
            </form>
        </section>
    );
};

export default CheckOutForm;