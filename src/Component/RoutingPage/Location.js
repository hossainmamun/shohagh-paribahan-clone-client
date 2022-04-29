import React from 'react';
import Navigation from '../Reuse/Navigation.js';
import TopHeader from '../HomePage/TopHeader.js';
import Footer from '../Reuse/Footer.js';
import location from '../../DataProvider/counterLocation.js';
import '../../Style/Location.scss'

const Location = () => {
    const locationData = location;
    return (
        <section>
            <TopHeader />
            <Navigation />

            <div className='container location'>
                <div className="row">
                    {
                        locationData.map(item => (
                            <div className="col-md-4 my-3" key={item.id}>
                                {
                                    item.district ?
                                        <h4 className='text-uppercase mt-5 mb-3 text-secondary'>{item.district}</h4> :
                                        <h4 className='text-uppercase mt-5 mb-3 text-secondary'>Dhaka</h4>
                                }
                                <div className="card p-4 text-secondary rounded-0">
                                    <h4 className='text-capitalize fw-light mb-3'>{item.title}</h4>
                                    <div className='card-body p-0'>
                                        <div className='d-flex align-items-center mb-2'>
                                            <i class="fa-solid fa-location-dot"></i>
                                            <span className='ms-2'>address:</span>
                                            <p className='mb-0 ms-2'>{item.address}</p>
                                        </div>
                                        <div className='d-flex align-items-center mb-2'>
                                            <i class="fa-solid fa-phone-volume"></i>
                                            <span className='ms-2'>phone:</span>
                                            <p className='mb-0 ms-2'>{item.phone}</p>
                                        </div>
                                        <div className='d-flex align-items-center mb-2'>
                                            <i class="fa-solid fa-mobile-screen"></i>
                                            <span className='ms-2'>mobile:</span>
                                            <p className='mb-0 ms-2'>{item.mobile}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* footer */}
            <Footer />
        </section>
    );
};

export default Location;