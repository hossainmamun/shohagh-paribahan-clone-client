import React from 'react';
import seat from '../../image/seat.png';
import gps from '../../image/gps.png';
import ticket from '../../image/ticket.png';
import entertainment from '../../image/entertainment.png';
import '../../Style/About.scss';

const aboutData = [
    {
        id: '1',
        img: seat,
        title: 'COMFORTABLE',
        detail: 'We have very large leg space in between seats.You can spend 12 hours without any discomfort in our seats',
    },
    {
        id: '2',
        img: gps,
        title: 'GPS NAVIGATION',
        detail: 'All of our buses are equipped with GPS and Camera for safety of the valued passenger.',
    },
    {
        id: '3',
        img: ticket,
        title: 'BUY TICKETS EASILY',
        detail: 'You can buy ticket from our wide range of ticketing booth and online. You can book your seat through our call center +8809606444777.',
    },
    {
        id: '4',
        img: entertainment,
        title: 'ENTERTAINMENT ON BOARD',
        detail: 'Our buses are equipped with full HD Display and DVD player to play drama , music and movies in order to make the journey more enjoyable.',
    },
]

const About = () => {
    return (
        <section className='about my-5'>
            <div className='text-center mb-5'>
                <h2>WHY SHOHAGH PARIBAHAN</h2>
            </div>

            <div className="container">
                <div className="row">
                    {
                        aboutData.map(data => (
                            <div className="col-md-3 px-1" key={data.id}>
                                <div className="card text-center rounded-0">
                                    <img src={data.img} className="img-fluid" alt="img" />
                                    <div className="card-body p-0 mt-4">
                                        <h5>{data.title}</h5>
                                        <p>{data.detail}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default About;