import React, { useContext, useState } from 'react';
import '../../Style/BookingForm.scss';
import AvailableSchedule from './AvailableSchedule.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { pickedDate } from '../../App.js';

const BookingForm = () => {
    //  declare useState hook & useContext api
    const [scheduleList, setScheduleList] = useState([]);
    const [buyTicket, setBuyTicket] = useState(true);
    const [operation, setOperation] = useState(false);
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useContext(pickedDate);
    const [departureTime, setDepartureTime] = useState('');
    const [coachType, setCoachType] = useState('');

    //  date formation
    const tomorrow = new Date();

    const scheduleInfo = {
        departure,
        destination,
        departureTime,
        coachType,
    }
    //  handleInfoSearch function for search 
    const handleInfoSearch = (e) => {
        e.preventDefault();
        if (departure === destination) {
            window.alert('departure and destination can not be same');
        }
        // !todo load schedule information from server by post method
        fetch('https://polar-woodland-95265.herokuapp.com/filter_schedule_list', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(scheduleInfo)
        })
            .then(res => res.json())
            .then(data => {
                setScheduleList(data)
            })
    }
    //  booking & option button
    const buyTicketBtn = () => {
        setBuyTicket(true);
        setOperation(false);
    }
    const ticketOperationBtn = () => {
        setOperation(true);
        setBuyTicket(false);
    }


    return (
        <section className='booking-form'>
            <div className={buyTicket ? "container active-bg1" : "container active-bg2"}>
                <div className="row">
                    <div className="col-md-6 text-center px-0 option">
                        <button onClick={buyTicketBtn} className='btn rounded-0 w-100 option-btn1'>
                            <i class="fa fa-ticket"></i> buy ticket
                        </button>
                    </div>
                    <div className="col-md-6 text-center px-0">
                        <button onClick={ticketOperationBtn} className='btn rounded-0 w-100 option-btn2'>
                            <i class="fa fa-cog"> </i> ticket operation
                        </button>
                    </div>
                </div>
                {/* ------------- search form section ------------- */}
                {
                    buyTicket &&
                    <form onSubmit={handleInfoSearch}>
                        <div className="row py-5 booking-form">
                            <div className="col-md-2 my-sm-2">
                                <div className="form-group">
                                    <select type="text" name="departure" id="" onChange={(e) => setDeparture(e.target.value)} className="form-control form-select rounded-0" required>
                                        <option selected hidden value="">From</option>
                                        <option value="Dhaka">Dhaka</option>
                                        <option value="Khulna">Khulna</option>
                                        <option value="Satkira">Satkira</option>
                                        <option value="Benapol">Benapol</option>
                                        <option value="Chittagong">Chittagong</option>
                                        <option value="Cox-bazar">Cox-bazar</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-2 my-sm-2">
                                <div className="form-group">
                                    <select type="text" name="destination" id="" onChange={(e) => setDestination(e.target.value)} className="form-control form-select rounded-0" required>
                                        <option selected hidden value="">To</option>
                                        <option value="Dhaka">Dhaka</option>
                                        <option value="Khulna">Khulna</option>
                                        <option value="Satkira">Satkira</option>
                                        <option value="Benapol">Benapol</option>
                                        <option value="Chittagong">Chittagong</option>
                                        <option value="Cox-bazar">Cox-bazar</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-2 my-sm-2">
                                <div className="form-group">
                                    <DatePicker
                                        className='form-control rounded-0'
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        minDate={(tomorrow.setDate(tomorrow.getDate() + 1))}
                                        placeholderText="MM-DD-YYY"
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 my-sm-2">
                                <div className="form-group">
                                    <select type="text" name="timePeriod" id="" onChange={(e) => setDepartureTime(e.target.value)} className="form-control form-select rounded-0" required>
                                        <option selected hidden value="">Time Period</option>
                                        <option value="07:30AM">07:30AM</option>
                                        <option value="10:30AM">10:30AM</option>
                                        <option value="01:30PM">01:30PM</option>
                                        <option value="04:30PM">04:30PM</option>
                                        <option value="07:30PM">07:30PM</option>
                                        <option value="10:30PM">10:30PM</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-2 my-sm-2">
                                <div className="form-group">
                                    <select type="text" name="coachType" onChange={(e) => setCoachType(e.target.value)} id="" className="form-control form-select rounded-0" required>
                                        <option selected hidden value="">Coach Type</option>
                                        <option value="Ac">Ac</option>
                                        <option value="NoneAc">NoneAc</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-1 my-sm-2">
                                <div className="form-group">
                                    <button type="submit" className='btn btn-outline-light form-control rounded-0'>
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                }
                {/*------------------------ Ticket pnr section ------------------------ */}
                {
                    operation &&
                    <div>
                        <div className="row justify-content-center py-5">
                            <div className="col-md-5">
                                <div className="form-group d-flex">
                                    <input type="text" name="" id="" className='form-control rounded-0' placeholder='Please Enter Ticket PNR' />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button type="submit" className='btn btn-outline-light form-control rounded-0'>
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {/* ---------- {AvailableSchedule component } ---------- */}
            <AvailableSchedule scheduleList={scheduleList} />
        </section>
    );
};

export default BookingForm;