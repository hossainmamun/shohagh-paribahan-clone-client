import React from 'react';
import Footer from '../Reuse/Footer.js';
import Navigation from '../Reuse/Navigation.js';
import About from './About.js';
import Banner from './Banner.js';
import BookingForm from './BookingForm.js';
import BuyCancelGuide from './BuyCancelGuide.js';
import Destination from './Destination.js';
import TopHeader from './TopHeader.js';

const HomePage = () => {
    return (
        <>
            <TopHeader/>
            <Navigation/>
            <Banner/>
            <BuyCancelGuide/>
            <BookingForm/>
            <About/>
            <Destination/>
            <Footer/>
        </>
    );
};

export default HomePage;