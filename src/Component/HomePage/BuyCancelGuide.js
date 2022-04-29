import React from 'react';
import '../../Style/BookingForm.scss';

const BuyCancelGuide = () => {
    return (
        <section className='buy-cancel-guide'>
            <div className='container my-5'>
                <div className="row justify-content-center">
                    <div className="col-md-4 text-center">
                        <button
                            className='btn rounded-0 w-100 buy-ticket py-3 text-capitalize fw-bold text-white'
                            data-bs-toggle="modal" data-bs-target="#byTicketGuide"
                        >how to buy ticket
                        </button>
                    </div>
                    <div className="col-md-4 text-center">
                        <button
                            className='btn rounded-0 w-100 cancel-ticket py-3 text-capitalize fw-bold text-white'
                            data-bs-toggle="modal" data-bs-target="#byCancelGuide"
                        >
                            how to cancel ticket
                        </button>
                    </div>
                </div>
            </div>

            {/* ----------- ticket buying guide model ----------- */}
            <div class="modal fade" id="byTicketGuide">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">How to Buy Ticket</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h3 className='fw-light'>Step 1</h3>
                            <div>
                                <p>Select From location, To location, Journey Date, Time Period and Coach Type.</p>
                                <p>Press Search button.</p>
                                <img src="https://shohagh.com/images/buy-step-1-search.v2.png" className='img-fluid' alt="" />
                            </div>
                            <div>
                                <p>You will get Available Trips. Select View Seats button to expand the details of a trip.</p>
                                <img src="https://shohagh.com/images/buy-step-1-trips.v2.png" className='img-fluid' alt="" />
                            </div>

                            <h3 className='fw-light'>Step 2</h3>
                            <div>
                                <p>1. Select seats.</p>
                                <p>2. Select your preferred boarding point.</p>
                                <p>3. Press Continue button.</p>
                                <img src="https://shohagh.com/images/buy-step-2-seats.v2.png" className='img-fluid' alt="" />
                            </div>

                            <h3 className='fw-light'>Step 3</h3>
                            <div>
                                <p>1. You will be taken to Login screen. If you already have created your user account before please login using your credentials. If not click on signup link and follow the process.</p>
                                <img src="https://shohagh.com/images/buy-step-3-signin.png" className='img-fluid' alt="" />
                                <p>2. After successful login you will get a glance of the ticket details based on your selections.</p>
                                <img src="https://shohagh.com/images/buy-step-3-booking.v2.png" className='img-fluid' alt="" />
                                <p>3. Select the checkbox agreeing the terms & conditions.</p>
                                <p>4. Press Proceed to Pay button.</p>
                            </div>

                            <h3 className='fw-light'>Step 4</h3>
                            <div>
                                <p>1. You will be taken to SSL Commerz payment gateway.</p>
                                <p>2. Select your preferred payment method and follow the gateway instructions.</p>
                                <img src="https://shohagh.com/images/buy-step-4-payment.v2.jpg" className='img-fluid' alt="" />
                                <p>3. Upon successful payment you will be redirected to confirmation page and your reservation is done.</p>
                                <img src="https://shohagh.com/images/buy-step-4-confirm.v2.png" className='img-fluid' alt="" />
                                <p>4. After successful reservation you will get a SMS and email stating the details of your ticket.</p>
                                <p>5. Done.</p>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger rounded-1" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ----------- ticket cancel guide model ----------- */}
            <div class="modal fade" id="byCancelGuide">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">How to cancel Ticket</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h3 className='fw-light'>Step 1</h3>
                            <div>
                                <p>1. Select Ticket Operation tab.</p>
                                <p>2. Enter ticket PNR and click on Search then you will get ticket information / details.</p>
                                <img src="https://shohagh.com/images/cancel-step-1-search.v2.png" className='img-fluid' alt="" />
                            </div>

                            <h3 className='fw-light'>Step 2</h3>
                            <div>
                                <p>1. From ticket information / details you will see Cancel Ticket button if the ticket is eligible for cancellation.</p>
                                <p>2. Read terms and conditions and click on chekbox to agree.</p>
                                <img src="https://shohagh.com/images/cancel-step-2-confirm.v2.png" className='img-fluid' alt="" />
                                <p>3. Press Cancel Ticket and Refund button to proceed.</p>
                                <p className='m-auto'>Refunds will be processed automatically at the time of cancellation. Depending on the customer’s Bank/Card/M-Cash, it may take 3-14 business days to reflect the credit in your account.</p>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger rounded-1" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BuyCancelGuide;