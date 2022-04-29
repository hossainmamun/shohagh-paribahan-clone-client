import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App.js';
import '../../Style/Dashboard.scss';

const DashboardHome = () => {
    const [loggedINUser, setLoggedInUser] = useContext(userContext);
    const [reservation, setReservation] = useState([]);

    useEffect(() => {
        fetch('https://polar-woodland-95265.herokuapp.com/ticket_reserve_info_by_email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: loggedINUser.userEmail })
        })
            .then(response => response.json())
            .then(data => {
                setReservation(data)
            })
    }, [])

    // return
    return (
        <section className='dashboard-home'>
            <div className='container-fluid d-flex justify-content-around align-items-center flex-sm-column py-4 text-white' style={{ background: '#f0ad4e' }}>
                <h2 className='text-uppercase fw-bold my-0'>Dashboard Home</h2>
                <h4 className='my-0'>dashboard/dashboardHome</h4>
            </div>

            <div className='my-4 text-center'>
                <h4 className='fw-bolder'>Customer Reservations</h4>
                <h5>Customer Name: {loggedINUser.userName}</h5>
                <h5>Total Reserved: {reservation.length}</h5>
            </div>

            {/* ------------ reservation list table ----------- */}
            <div className='table-responsive container-fluid'>
                {
                    reservation.length === 0 &&
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
                            reservation.map((item, index) => (
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
                                                </div> :
                                                <div className='text-center' >
                                                    <Link to={`/payment_information/${item._id}`}>
                                                        <button className='btn rounded-0 payment-status'>pay</button>
                                                    </Link>
                                                </div>
                                        }

                                    </td>
                                    <td className='p-0 payment-status bg-danger text-center'>
                                        <button className='btn rounded-0 payment-status'>cancel</button>
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

export default DashboardHome;