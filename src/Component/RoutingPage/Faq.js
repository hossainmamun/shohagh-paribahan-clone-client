import React from 'react';
import TopHeader from '../HomePage/TopHeader.js';
import Navigation from '../Reuse/Navigation.js';
import Collapsible from 'react-collapsible';
import faq from '../../DataProvider/faq.js';
import '../../Style/Faq.scss';
import Footer from '../Reuse/Footer.js';

const Faq = () => {
    const frequentlyQuestionAns = faq;
    return (
        <section>
            {/* !top header, navigation */}
            <TopHeader />
            <Navigation />

            <div className="container faq-collapse mb-5">
                <div>
                    <h3 className='text-capitalize fw-bold mb-4'>faq ?</h3>
                </div>
                {
                    frequentlyQuestionAns.map((item, index) => (
                        <div key={item.id} className="collapse-box d-flex align-items-center">
                            <span className='px-3'>{index + 1}.</span>
                            <Collapsible trigger={item.question} className="qus">
                                <p className='ans'>Ans: {item.ans}</p>
                            </Collapsible>
                        </div>
                    ))
                }
            </div>

            {/* footer */}
            <Footer/>
        </section>
    );
};

export default Faq;