import React, { useContext, useState } from 'react';
import { pickedDate, selectSeat } from '../../App.js';
import AvailableSeat from './AvailableSeat.js';

const AvailableSchedule = ({ scheduleList }) => {
    // declare useState hook
    const [seatNumber, setSeatNumber] = useContext(selectSeat)
    const [startDate, setStartDate] = useContext(pickedDate)
    const [viewSeat, setViewSeat] = useState({});
    const [modalIsOpen, setIsOpen] = useState(false);

    // open modal and get individual schedule by id from server
    const openModal = (id) => {
        setIsOpen(true);
        fetch(`https://polar-woodland-95265.herokuapp.com/bus_schedule_list/${id}`)
            .then(response => response.json())
            .then(data => {
                setViewSeat(data);
            })
    }
    // close modal
    const closeModal = () => {
        setIsOpen(false);
        setSeatNumber('');
    }

    // return
    return (
        <section>
            <div className='container'>
                {/* ------------ available trip length ---------- */}
                <div className='mt-5'>
                    {
                        scheduleList &&
                        <h5>Available Trips: {scheduleList.length}</h5>
                    }
                </div>
                {/* ------------ load schedule list ------------- */}
                {
                    scheduleList.map(item => (
                        <div className="card p-4 my-3 rounded-0" key={item._id}>
                            <div className="row">
                                <div className="col-sm-2">
                                    <p className='fw-bold'>Coach No: {item.busNo}</p>
                                    <h5>{item.departure}</h5>
                                    <div className='my-3'>
                                        <i class="fa-solid fa-arrow-down-long"></i>
                                        <i class="fa-solid fa-arrow-up-long"></i>
                                    </div>
                                    <h5>{item.destination}</h5>
                                </div>

                                <div className="col-sm-2">
                                    <h5 className='text-danger'>Departure Time</h5>
                                    <p className='mb-2'>{item.departureTime}</p>
                                    <p className='mb-0'>{startDate.toDateString('dd/mm/yyyy')}</p>
                                </div>

                                <div className="col-sm-3">
                                    <h5 className='text-danger'>Boarding</h5>
                                    <h5>{item.starting}</h5>
                                    <div className='my-3'>
                                        <i class="fa-solid fa-arrow-down-long"></i>
                                        <i class="fa-solid fa-arrow-up-long"></i>
                                    </div>
                                    <h5>{item.ending}</h5>
                                </div>

                                <div className="col-sm-2">
                                    <h5 className='text-danger'>Ticket Price</h5>
                                    <p>{item.ticketPrice} .tk</p>
                                </div>

                                <div className="col-sm-1">
                                    <h5 className='text-danger'>Type</h5>
                                    <p>{item.coachType}</p>
                                </div>

                                <div className="col-sm-2 text-center">
                                    <button onClick={() => openModal(item._id)} className='btn btn-primary rounded-0'>view site</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* ------------------ react modal --------------- */}
            <AvailableSeat modalIsOpen={modalIsOpen} closeModal={closeModal} viewSeat={viewSeat} />
        </section>
    );
};

export default AvailableSchedule;