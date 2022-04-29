import React, { useContext } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { selectSeat } from '../../App.js';
import seatPlan from '../../DataProvider/seat_plan.js';

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        bottom: "auto",
        transform: "translate(-50%, -50%)",
        border: "0px",
        borderRadius: "none",
        padding: "25px",
        boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
    },
};

Modal.setAppElement('#root');

const AvailableSeat = ({ modalIsOpen, closeModal, viewSeat }) => {
    // use context api to select seat
    const [seatNumber, setSeatNumber] = useContext(selectSeat);

    // seat number function
    const getSeatNum = (id) => {
        setSeatNumber(id);
    }


    // return
    return (
        <section>
            <div className='container-fluid'>
                {/* ---------- react modal ---------- */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="row">
                        <div className='text-center my-3'>
                            <h4 className='text-capitalize'>Shohagh Paribahan pvt.ltd</h4>
                            <h6 className='fw-bold'>Seat Plan</h6>
                        </div>
                        <div className="col-4  p-2">
                            <div className="row">
                                {
                                    seatPlan.map(item => (
                                        <div className="col-3 text-center" key={item.id}>
                                            <p onClick={() => getSeatNum(item.seatNo)} className='my-1 border p-2' style={{ cursor: 'pointer' }}>{item.seatNo}</p>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>

                        <div className="col-4  p-2">
                            <div className='text-capitalize d-flex justify-content-center'>
                                <div>
                                    <p className='mb-2'>seat no: {seatNumber}</p>
                                    <p className='mb-2'>coach type: {viewSeat.coachType}</p>
                                    <p className='mb-2'>unit price: {viewSeat.ticketPrice} tk</p>
                                    {
                                        seatNumber &&
                                        <p className='mb-2'>Total: {Number(viewSeat.ticketPrice)}</p>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="col-4  p-2">
                            <h6>{viewSeat.starting}</h6>
                            <div className='my-3'>
                                <i class="fa-solid fa-arrow-down-long"></i>
                                <i class="fa-solid fa-arrow-up-long"></i>
                            </div>
                            <h6>{viewSeat.ending}</h6>
                            <div>
                                <p className='mb-2'>Departure Time: {viewSeat.departureTime}</p>
                                <p className='mb-2'>Bus No: {viewSeat.busNo}</p>
                            </div>
                        </div>
                    </div>

                    {/* -------------- close and continue btn ------------ */}
                    <div className='text-end mt-4'>
                        <button className='btn btn-danger rounded-0 me-3' onClick={closeModal}>Close</button>
                        <Link to={`/reservation-ticket/${viewSeat._id}`}>
                            <button className='btn btn-success rounded-0'>Continue</button>
                        </Link>
                    </div>
                </Modal>
            </div>
        </section>
    );
};

export default AvailableSeat;