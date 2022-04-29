import React, { useRef, useState } from 'react';
import TopHeader from '../HomePage/TopHeader.js';
import Navigation from '../Reuse/Navigation.js';
import emailjs from '@emailjs/browser';
import Footer from '../Reuse/Footer.js';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';

// !google map style
const containerStyle = {
    width: '100%',
    height: '550px'
};

const center = {
    lat: 23.880954,
    lng: 90.399723
};

const position = {
    lat: 23.880954,
    lng: 90.399723
}

const ContactInformation = () => {
    const [status, setStatus] = useState('')
    const form = useRef();

    // ! email js
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(`${process.env.REACT_APP_EMAILJS_SERVICE}, ${process.env.REACT_APP_EMAILJS_TEMPLATE}, ${form.current
            }, ${process.env.REACT_APP_EMAILJS_API_KEY
            }`)
            .then((result) => {
                setStatus(result.text)
            }, (error) => {
                setStatus(error.text)
            });
    };

    const onLoad = marker => {

    }

    // !return
    return (
        <section>
            <TopHeader />
            <Navigation />

            {/* ------------ google map ------------ */}
            <div className="container">
                <LoadScript
                    googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                    >
                        <Marker
                            onLoad={onLoad}
                            position={position}
                        />
                    </GoogleMap>
                </LoadScript>
            </div>

            <div className="container">
                {/* ------------- contact info ------------- */}
                <div className="row justify-content-between mt-5">
                    <div className="col-md-6 text-secondary">
                        <h3 className='text-capitalize fw-normal'>help center</h3>
                        <div className='d-flex align-items-center mb-2'>
                            <i class="fa-solid fa-location-dot"></i>
                            <p className='mb-0 ms-4'>Address : Shohagh Paribahan Pvt. Ltd, 63 DIT Road, Malibagh, Dhaka-1217</p>
                        </div>
                        <div className='d-flex align-items-center mb-2'>
                            <i class="fa-solid fa-mobile-screen"></i>
                            <p className='mb-0 ms-4'>Call Center: +8809606444777</p>
                        </div>
                    </div>
                    <div className="col-md-5 text-secondary">
                        <h3 className='text-capitalize fw-normal mb-4'>send us your feedback!</h3>
                        <form ref={form} onSubmit={sendEmail} className="contact-form">
                            <div className="form-group mb-3">
                                <input type="text" name="name" id="" className="form-control rounded-0" placeholder="Full Name" required />
                            </div>
                            <div className="form-group mb-3">
                                <input type="text" name="email" id="" className="form-control rounded-0" placeholder="Your Email" required />
                            </div>
                            <div className="form-group mb-3">
                                <input type="text" name="phone" id="" className="form-control rounded-0" placeholder="Your Phone" required />
                            </div>
                            <div className="form-group mb-3">
                                <input type="text" name="subject" id="" className="form-control rounded-0" placeholder="Subject" />
                            </div>
                            <div className="form-group mb-3">
                                <textarea name="message" id="" cols="30" rows="10" className="form-control rounded-0" placeholder="Details" required />
                            </div>
                            <div className='text-end'>
                                <input type="submit" value="SEND" className="btn btn-primary rounded-0" />
                            </div>
                        </form>
                        <div className="text-center text-capitalize text-success mt-4">
                            {
                                status && <p>message send successfully</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* --------------- footer ------------- */}
            <Footer />
        </section>
    );
};

export default ContactInformation;