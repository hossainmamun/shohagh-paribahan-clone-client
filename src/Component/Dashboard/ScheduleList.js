import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ScheduleList = () => {
    const [scheduleList, setScheduleList] = useState([]);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    useEffect(() => {
        loadScheduleInfo()
    }, [])

    // ! schedule load function
    const loadScheduleInfo = () => {
        const url = 'https://polar-woodland-95265.herokuapp.com/bus_schedule_list';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setScheduleList(data)
            })
    }

    // ! delete schedule information
    const scheduleDelete = (id) => {
        const url = `https://polar-woodland-95265.herokuapp.com/delete_schedule/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    window.alert('Schedule delete successfully');
                    loadScheduleInfo();
                }
            })
            .catch(err => {
                window.alert('something wrong');
            })
    }


    // ! filter schedule form table
    const handleTableSearch = () => {
        const searching = scheduleList.filter(schedule => ((schedule.starting).toLowerCase() === start.toLowerCase()) && ((schedule.ending).toLowerCase() === end.toLowerCase()));
        if (searching.length > 0) {
            setScheduleList(searching);
        }
        else {
            window.alert('Nothing match press ok to reload table' && window.location.reload());
        }
    }

    // ! return
    return (
        <section>
            <div className='container-fluid d-flex justify-content-around align-items-center py-4 text-white' style={{ background: '#f0ad4e' }}>
                <h2 className='text-uppercase fw-bold my-0'>Bus schedule list</h2>
                <h4 className='my-0'>dashboard/scheduleList</h4>
            </div>

            {/* ---------------- total schedule and search option ----------------- */}
            <div className="row my-5">
                <div className="col-md-3 text-center">
                    <h4>Total Schedules : {scheduleList.length}</h4>
                </div>
                <div className="col-md-8">
                    <div className='row'>
                        <div className="col-5 px-1">
                            <div className='form-group'>
                                <select type="text" name="starting" id="" onChange={(e) => setStart(e.target.value)} className="form-control form-select rounded-0 p-2" required>
                                    <option selected hidden value="">FROM</option>
                                    <option value="Abdullapur(Dhaka)">Abdullapur(Dhaka)</option>
                                    <option value="Kallyanpur(Dhaka)">Kallyanpur(Dhaka)</option>
                                    <option value="Malibagh Super Market(Dhaka)">Malibagh Super Market(Dhaka)</option>
                                    <option value="Arambagh(Dhaka)">Arambagh(Dhaka)</option>
                                    <option value="Gabtoli(Dhaka)">Gabtoli(Dhaka)</option>
                                    <hr />
                                    <option value="Royal(Khulna)">Royal(Khulna)</option>
                                    <option value="Satkira">Satkira</option>
                                    <option value="Benapol">Benapol</option>
                                    <hr />
                                    <option value="Dampara(Chittagong)">Dampara(Chittagong)</option>
                                    <option value="Garibullah(Chittagong)">Garibullah(Chittagong)</option>
                                    <hr />
                                    <option value="Kalatoli(Cox-bazar)">Kalatoli(Cox-bazar)</option>
                                    <option value="Jhawtola(Cox-bazar)">Jhawtola(Cox-bazar)</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-5 px-1">
                            <div className='form-group'>
                                <select type="text" name="ending" id="" onChange={(e) => setEnd(e.target.value)} className="form-control form-select rounded-0 p-2" required>
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
                                <button onClick={handleTableSearch} className='btn btn-outline-dark rounded-0 form-control p-2'>
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------------ schedule list table ----------- */}
            <div className='table-responsive'>
                {
                    scheduleList.length === 0 &&
                    <div className='text-center my-5'>
                        <button className="btn btn-primary" type="button">
                            <span className="spinner-border mx-3 spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    </div>
                }
                <table className='table table-bordered'>
                    <thead>
                        <tr className='text-capitalize'>
                            <th>srl</th>
                            <th>departure</th>
                            <th>destination</th>
                            <th>Time</th>
                            <th>bus</th>
                            <th>Price</th>
                            <th>starting</th>
                            <th>ending</th>
                            <th>coach</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            scheduleList.map((schedule, index) => (
                                <tr key={schedule._id} className="text-uppercase">
                                    <td>{index + 1}</td>
                                    <td>{schedule.departure}</td>
                                    <td>{schedule.destination}</td>
                                    <td>{schedule.departureTime}</td>
                                    <td>{schedule.busNo}</td>
                                    <td>{schedule.ticketPrice} tk</td>
                                    <td>{schedule.starting}</td>
                                    <td>{schedule.ending}</td>
                                    <td>{schedule.coachType}</td>
                                    <td>
                                        <table className='table table-borderless mb-0'>
                                            <tbody>
                                                <tr className='text-center'>
                                                    <td className='p-0'>
                                                        <Link to={`/schedule-edit/${schedule._id}`}>
                                                            <i class="fas fa-edit" style={{ fontSize: '22px', cursor: 'pointer', color: 'green' }}></i>
                                                        </Link>

                                                    </td>
                                                    {/* CLICK HERE TO OPEN MODEL */}
                                                    <td className='p-0'>
                                                        <i onClick={() => scheduleDelete(schedule._id)} class="fas fa-trash-alt" style={{ fontSize: '22px', cursor: 'pointer', color: 'red' }}></i>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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

export default ScheduleList;