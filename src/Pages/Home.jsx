import React from 'react';
import Hero from '../Components/Hero';
import TopReviews from '../Components/TopReviews';
import { HowItWorks } from '../Components/HowItWorks';
import { Testimonials } from '../Components/Testimonials';

const Home = () => {
    return (
        <div>
            <Hero/>
            <TopReviews/>
            <HowItWorks/>
            <Testimonials/>
        </div>
    );
};

export default Home;