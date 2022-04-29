import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopHeader from '../HomePage/TopHeader.js';
import Navigation from '../Reuse/Navigation.js';
import CheckOutForm from './CheckOutForm.js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIP_API_KEY)

const Payment = () => {
    const { payId } = useParams();
    const [reserveInfo, setReserveInfo] = useState({});

    // load reservation info by id
    useEffect(() => {
        fetch(`https://polar-woodland-95265.herokuapp.com/ticket_reserve_info/${payId}`)
            .then(response => response.json())
            .then(data => {
                setReserveInfo(data);
            })
    }, [payId])
    return (
        <section>
            {/* --------- top header & navigation -------- */}
            <TopHeader />
            <Navigation />
            {/* ---------- customer and strip element --------- */}
            <div className='container'>
                <div className='text-center my-5'>
                    <h4>Ticket Payment Information</h4>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-5 border p-4">
                        <div>
                            <h5 className='fw-bold'>CUSTOMER INFORMATION</h5>
                            <hr />
                        </div>
                        <div className='d-flex'>
                            <h5 className='me-4 w-50'>Customer Name:</h5>
                            <h5 className='fw-normal'>{reserveInfo.name}</h5>
                        </div>
                        <div className='d-flex'>
                            <h5 className='me-4 w-50'>Customer Email:</h5>
                            <h5 className='fw-normal'>{reserveInfo.email}</h5>
                        </div>
                        <div className='d-flex'>
                            <h5 className='me-4 w-50'>Bus No:</h5>
                            <h5 className='fw-normal'>{reserveInfo.coach}</h5>
                        </div>
                        <div className='d-flex'>
                            <h5 className='me-4 w-50'>Seat No:</h5>
                            <h5 className='fw-normal'>{reserveInfo.seatNum}</h5>
                        </div>
                        <div className='d-flex'>
                            <h5 className='me-4 w-50'>Ticket Price:</h5>
                            <h5 className='fw-normal'>{reserveInfo.totalRent}.TK Only</h5>
                        </div>
                    </div>

                    <div className="col-md-6 border p-4">
                        <div>
                            <h5 className='fw-bold'>CHECKOUT FORM</h5>
                            <hr />
                            {
                                reserveInfo.totalRent &&
                                <Elements stripe={stripePromise}>
                                    <CheckOutForm reserveInfo={reserveInfo} />
                                </Elements>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Payment;