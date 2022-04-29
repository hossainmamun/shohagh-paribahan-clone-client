import React, { useEffect, useState } from 'react';
import '../../Style/Dashboard.scss';
import { useForm } from "react-hook-form";

const BookingList = () => {
    const [bookings, setBookings] = useState([]);

    // load ticket reservation data from server
    useEffect(() => {
        loadReservation();
    }, [])

    // load ticket reservation function
    const loadReservation = () => {
        fetch('https://polar-woodland-95265.herokuapp.com/ticket_reserve_info')
            .then(response => response.json())
            .then(data => {
                setBookings(data);
            })
    }

    // delete booking info
    const handleDeleteReservation = (id) => {
        fetch(`https://polar-woodland-95265.herokuapp.com/ticket_reserve_info/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    window.alert('reservation delete successfully');
                    loadReservation();
                }
            })
            .catch(err => {
                window.alert('oops something is wrong');
            })
    }

    // use hook form to search table data
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        const searchKey = bookings.filter(item => (item.departure === data.departure) && (item.destination === data.destination))
        if (searchKey.length > 0) {
            setBookings(searchKey)
        }
        else {
            loadReservation();
        }
        reset();
    };

    // return
    return (
        <section className='booking-list'>
            <div className='container-fluid d-flex justify-content-around align-items-center py-4 text-white' style={{ background: '#f0ad4e' }}>
                <h2 className='text-uppercase fw-bold my-0'>Booking List</h2>
                <h4 className='my-0'>dashboard/bookingList</h4>
            </div>
            {/* ---------------- total schedule and search option ----------------- */}
            <div className="row my-5">
                <div className="col-md-3 text-center">
                    <h4>Total Schedules : {bookings.length}</h4>
                </div>
                <div className="col-md-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='row justify-content-center'>
                            <div className="col-5 px-1">
                                <div className='form-group'>
                                    <select type="text" name="departure" id="" {...register("departure")} className="form-control form-select rounded-0 p-2" required>
                                        <option selected hidden value="">FROM</option>
                                        <option value="Dhaka">Dhaka</option>
                                        <option value="Khulna">Khulna</option>
                                        <option value="Satkira">Satkira</option>
                                        <option value="Benapol">Benapol</option>
                                        <option value="Chittagong">Chittagong</option>
                                        <option value="Cox-bazar">Cox-bazar</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-5 px-1">
                                <div className='form-group'>
                                    <select type="text" name="destination" id="" {...register("destination")} className="form-control form-select rounded-0 p-2" required>
                                        <option selected hidden value="">TO</option>
                                        <option value="Dhaka">Dhaka</option>
                                        <option value="Khulna">Khulna</option>
                                        <option value="Satkira">Satkira</option>
                                        <option value="Benapol">Benapol</option>
                                        <option value="Chittagong">Chittagong</option>
                                        <option value="Cox-bazar">Cox-bazar</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-1 px-1">
                                <div className="form-group">
                                    <button type="input" className='btn btn-outline-dark rounded-0 form-control p-2'>
                                        <i class="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* ------------ booking list table ----------- */}
            <div className='table-responsive container-fluid'>
                {
                    bookings.length === 0 &&
                    <div className='text-center my-5'>
                        <button className="btn btn-primary" type="button">
                            <span className="spinner-border mx-3 spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    </div>
                }
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr className='text-capitalize text-center'>
                            <th>#</th>
                            <th>name</th>
                            <th>email</th>
                            <th>departure</th>
                            <th>destination</th>
                            <th>boarding</th>
                            <th>bookingDate</th>
                            <th>coach</th>
                            <th>tripDate</th>
                            <th>departureTime</th>
                            <th>seat</th>
                            <th>totalRent</th>
                            <th>status</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.departure}</td>
                                    <td>{item.destination}</td>
                                    <td>{item.boarding}</td>
                                    <td>{item.bookingDate}, {item.bookingTime}</td>
                                    <td>{item.coach} - {item.type}</td>
                                    <td>{item.tripDate}</td>
                                    <td>{item.departureTime}</td>
                                    <td>{item.seatNum}</td>
                                    <td>{item.totalRent} TK</td>
                                    <td className={item.payment ? 'p-0 payment-status bg-success' : 'p-0 payment-status bg-primary'}>
                                        {
                                            item.payment ?
                                                <div className='text-center'>
                                                    <p className='mb-0'>Paid</p>
                                                </div>
                                                :
                                                <div className='text-center'>
                                                    <p className='mb-0'>Unpaid</p>
                                                </div>
                                        }
                                    </td>
                                    <td className='p-0 payment-status bg-danger text-center'>
                                        <button onClick={() => handleDeleteReservation(item._id)} className='btn payment-status'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default BookingList;