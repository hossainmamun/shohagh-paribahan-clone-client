import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { pickedDate, selectSeat, userContext } from '../../App.js';
import TopHeader from '../HomePage/TopHeader.js';
import Navigation from '../Reuse/Navigation.js';

const ReservationTicket = () => {
    // use context api & useParams & declare useState hook
    const [seatNumber, setSeatNumber] = useContext(selectSeat);
    const [startDate, setStartDate] = useContext(pickedDate);
    const [loggedINUser, setLoggedInUser] = useContext(userContext)
    const [reserveInfo, setReserveInfo] = useState({});
    const [success, setSuccess] = useState(false);
    const { reserveId } = useParams();

    // reload window to redirect home function
    window.onload = function () {
        window.location = "/home";
    }

    // vat and total ticket price calculation
    const priceConvert = Number(reserveInfo.ticketPrice)
    const vat = Number(((priceConvert / 100) * 6).toFixed(2));
    const totalRent = priceConvert + vat;

    // booking time and date
    const bookingDate = new Date().toLocaleDateString();
    const bookingTime = new Date().toLocaleTimeString();

    // load reserved information by reserveId
    useEffect(() => {
        fetch(`https://polar-woodland-95265.herokuapp.com/bus_schedule_list/${reserveId}`)
            .then(response => response.json())
            .then(data => {
                setReserveInfo(data)
            })
    }, [reserveId])

    // make object data for ticket reserve info
    const reservationProperty = {
        coach: reserveInfo.busNo,
        type: reserveInfo.coachType,
        boarding: reserveInfo.starting,
        tripDate: startDate.toDateString('dd/mm/yyyy'),
        departureTime: reserveInfo.departureTime,
        seatNum: seatNumber,
        departure: reserveInfo.departure,
        destination: reserveInfo.destination,
        totalRent: totalRent,
        bookingDate: bookingDate,
        bookingTime: bookingTime,
        name: loggedINUser.userName,
        email: loggedINUser.userEmail
    }

    // post reserve information to server
    const handleReserveInfo = () => {
        fetch('https://polar-woodland-95265.herokuapp.com/ticket_reserve_info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservationProperty)
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setSuccess(true);
                }
            })
    }


    // return
    return (
        <section>
            {/* ---------- top header & navigation --------- */}
            <TopHeader />
            <Navigation />

            <div className="container" style={{ marginTop: '50px' }}>
                {
                    success &&
                    <div className='text-center py-3 bg-success mb-5'>
                        <h4 className='text-capitalize mb-3 text-white'>টিকিট সংরক্ষণ সফলভাবে সম্পন্ন হয়েছে</h4>
                        <p className='mb-0 text-warning'>{bookingTime} থেকে পরবর্তী আধা ঘন্টার মধ্যে লেনদেন সম্পূর্ণ করুন অন্যথায় রিজার্ভেশন বাতিল হতে পারে</p>
                        <Link to="/dashboard/dashboardHome">
                            <button className='btn btn-warning px-4 my-3 rounded-1'>পেমেন্ট সম্পন্ন করুন</button>
                        </Link>

                    </div>
                }
                <div className="row justify-content-evenly">
                    <div className='d-flex justify-content-between px-0'>
                        <h4 className='px-0'>Reservation Detail:</h4>
                        <h6>Booking Time: {bookingDate}  {bookingTime}</h6>
                    </div>
                    {/* --------- customer information --------- */}
                    <div className="col-md-4 border rounded-0 p-3">
                        <h5>Customer Information:</h5>
                        <hr />
                        <div>
                            <p className='mb-1'><strong>Name: </strong>{loggedINUser.userName}</p>
                            <p className='mb-1'><strong>Email: </strong>{loggedINUser.userEmail}</p>
                        </div>
                    </div>
                    {/* --------- coach information --------- */}
                    <div className="col-md-4 border rounded-0 p-3">
                        <h5>Coach Information:</h5>
                        <hr />
                        <div>
                            <p className='mb-1'><strong>Coach: </strong>Elite-M{reserveInfo.busNo}</p>
                            <p className='mb-1'><strong>Type: </strong>{reserveInfo.coachType}</p>
                            <p className='mb-1'><strong>Boarding: </strong>{reserveInfo.starting}</p>
                        </div>
                    </div>
                    {/* ---------- time information ----------- */}
                    <div className="col-md-4 border rounded-0 p-3">
                        <h5>Time Information:</h5>
                        <hr />
                        <p className='mb-1'><strong>Trip Date: </strong>{startDate.toDateString('dd/mm/yyyy')}</p>
                        <p className='mb-1'><strong>Departure: </strong>{reserveInfo.departureTime}</p>
                    </div>
                </div>
                {/* ------------ seat detail table ---------- */}
                <div className='mt-4'>
                    <h5>Seat Details</h5>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Seat</th>
                                <th>From-To</th>
                                <th>Type</th>
                                <th>Rent</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    {
                                        !seatNumber ?
                                            <p className='text-danger mb-0 text-capitalize'>you should must select a seat number !</p> :
                                            seatNumber
                                    }
                                </td>
                                <td>{reserveInfo.departure} - {reserveInfo.destination}</td>
                                <td>{reserveInfo.coachType}</td>
                                <td>{reserveInfo.ticketPrice}.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* -------- rent calculation ------ */}
                <div className='row mt-4'>
                    <div className="col-md-6 border rounded-0 p-3">
                        <p className='mb-1'><strong>Total Rent: </strong>{reserveInfo.ticketPrice}.00</p>
                        <p className='mb-1'><strong>Wallet Balance: </strong>0.00</p>
                        <hr />
                        <p className='mb-1'><strong>Total Amount: </strong>{reserveInfo.ticketPrice}.00</p>
                    </div>
                    <div className="col-md-6 text-end">
                        <p className='mb-1'><strong>Total Amount: </strong>{priceConvert}.00</p>
                        <p className='mb-2 border-bottom d-inline-block'><strong>Charges: </strong>{vat}</p>
                        <p className='mb-1'><strong>Grand Total: </strong>{totalRent}</p>
                    </div>
                </div>
                {/* ------------- button section ----------- */}
                <div className='mt-5 text-end'>
                    <Link to="/home">
                        <button className='btn btn-primary rounded-0 px-4 me-2'>
                            <i class="fa-solid fa-arrow-left-long" style={{ marginRight: '10px' }}></i>Back
                        </button>
                    </Link>
                    <button onClick={handleReserveInfo} disabled={success || !seatNumber} className='btn btn-success rounded-0 px-4'>Confirm</button>
                </div>
            </div>
        </section>
    );
};

export default ReservationTicket;