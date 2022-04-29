import React from 'react';
import banner from '../../image/Shohagh-Paribahan-Pvt-Ltd-.png';

const Banner = () => {
    return (
        <section>
            <img src={banner} className="img-fluid" alt="" style={{ maxHeight: '420px' }} />
        </section>
    );
};

export default Banner;