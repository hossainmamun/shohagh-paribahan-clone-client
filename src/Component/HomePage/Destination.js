import React from 'react';

const destinationData = [
    {
        id: '1',
        img: 'https://shohagh.com/images/Dhaka.png',
        title: 'Dhaka'
    },
    {
        id: '2',
        img: 'https://shohagh.com/images/Chittagong.png',
        title: 'chittagong'
    },
    {
        id: '3',
        img: 'https://shohagh.com/images/Jessore.png',
        title: 'jessore'
    },
    {
        id: '4',
        img: 'https://shohagh.com/images/Khulna.png',
        title: 'khulna'
    },
    {
        id: '5',
        img: 'https://shohagh.com/images/Coxsbazar-02.png',
        title: 'cox-bazar'
    },
    {
        id: '6',
        img: 'https://shohagh.com/images/Satkhira-02.png',
        title: 'satkhira'
    },
    {
        id: '7',
        img: 'https://shohagh.com/images/Kolkata-02.png',
        title: 'kholkata'
    },
    {
        id: '8',
        img: 'https://shohagh.com/images/Benapole.png',
        title: 'benapole'
    },
]

const Destination = () => {
    return (
        <section className='destination my-5'>
            <div className='text-center mb-4'>
                <h2>DESTINATION</h2>
            </div>

            <div className="container">
                <div className="row">
                    {
                        destinationData.map(data => (
                            <div className="col-md-3 my-3" key={data.id}>
                                <div className="card text-center rounded-0">
                                    <img src={data.img} className="img-fluid" alt="img" style={{height: '300px'}} />
                                    <div className="card-body">
                                        <h4 className='text-capitalize'>{data.title}</h4>
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

export default Destination;