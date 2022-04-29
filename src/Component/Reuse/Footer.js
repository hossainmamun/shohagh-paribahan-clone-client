import React from 'react';

const Footer = () => {
    const date = new Date();
    return (
        <section className='bg-dark py-4'>
            <div className='text-center'>
                <p className='mb-0 text-white'>{date.getFullYear()} &copy; all right reserved. <span className='text-warning'> Shohag_Paribahan_Clone_Pvt.Ltd. Developed by <a href="https://mamunhossain.netlify.app/" target='_blank'>HMamun</a></span></p>
            </div>
        </section>
    );
};

export default Footer;