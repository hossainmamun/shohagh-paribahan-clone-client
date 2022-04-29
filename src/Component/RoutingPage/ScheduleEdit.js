import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ScheduleEdit = () => {
    const { scheduleId } = useParams();
    const [scheduleInfo, setScheduleInfo] = useState({});
    const [updateMsg, setUpdateMsg] = useState(false);

    // ! load schedule info from server by specific id;
    const url = `https://polar-woodland-95265.herokuapp.com/bus_schedule_list/${scheduleId}`
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setScheduleInfo(data);
            })
    }, [scheduleId]);

    // ! schedule edit function
    const editSchedule = (e) => {
        const newEditInfo = { ...scheduleInfo };
        newEditInfo[e.target.name] = e.target.value;
        setScheduleInfo(newEditInfo);
    }

    // ! update schedule information
    const UpdateSchedule = (e) => {
        e.preventDefault();
        const url = `https://polar-woodland-95265.herokuapp.com/bus_schedule_list/${scheduleId}`;
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(scheduleInfo)
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // window.alert('Update schedule successfully');
                    setUpdateMsg(true)
                }
            })
            .catch(err => {
                window.alert('update schedule failed');
            })
    }

    // ! return
    return (
        <section>
            <div className='container'>
                <div className="row justify-content-center" style={{ marginTop: '100px' }}>
                    <div className="col-md-8">
                        {
                            updateMsg &&
                            <div className='text-center py-4 bg-success'>
                                <h4 className='mb-0 text-white'>Schedule Update Successfully</h4>
                            </div>
                        }

                        <div className='text-center my-5'>
                            <h5>ID : {scheduleId}</h5>
                        </div>

                        <form onSubmit={UpdateSchedule}>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className='text-uppercase mb-1'>
                                            <h6 className='fw-bold'>Departure</h6>
                                        </label>
                                        <select type="text" name="departure" id="" value={scheduleInfo.departure || ''} onChange={editSchedule} className="form-control form-select rounded-0 p-2" required>
                                            <option selected hidden value="">Departure</option>
                                            <option value="Dhaka">Dhaka</option>
                                            <option value="Khulna">Khulna</option>
                                            <option value="Satkira">Satkira</option>
                                            <option value="Benapol">Benapol</option>
                                            <option value="Chittagong">Chittagong</option>
                                            <option value="Cox-bazar">Cox-bazar</option>
                                        </select>
                                    </div>


                                    <div className="col-md-4">
                                        <label className='text-uppercase mb-1'>
                                            <h6 className='fw-bold'>Destination</h6>
                                        </label>
                                        <select type="text" name="destination" id="" value={scheduleInfo.destination || ''} onChange={editSchedule} className="form-control form-select rounded-0 p-2" required>
                                            <option selected hidden value="">Destination</option>
                                            <option value="Dhaka">Dhaka</option>
                                            <option value="Khulna">Khulna</option>
                                            <option value="Satkira">Satkira</option>
                                            <option value="Benapol">Benapol</option>
                                            <option value="Chittagong">Chittagong</option>
                                            <option value="Cox-bazar">Cox-bazar</option>
                                        </select>
                                    </div>


                                    <div className="col-md-4">
                                        <label className='text-uppercase mb-1'>
                                            <h6 className='fw-bold'>Bus No</h6>
                                        </label>
                                        <input type="number" name="busNo" id="" value={scheduleInfo.busNo || ''} onChange={editSchedule} className='form-control rounded-0 p-2' placeholder='Enter Bus No' />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mt-4">
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className='text-uppercase mb-1'>
                                            <h6 className='fw-bold'>Departure Time</h6>
                                        </label>
                                        <select type="text" name="departureTime" id="" value={scheduleInfo.departureTime || ''} onChange={editSchedule} className="form-control form-select rounded-0 p-2" required>
                                            <option selected hidden value="">departure Time</option>
                                            <option value="07:30AM">07:30AM</option>
                                            <option value="10:30AM">10:30AM</option>
                                            <option value="01:30PM">01:30PM</option>
                                            <option value="04:30PM">04:30PM</option>
                                            <option value="07:30PM">07:30PM</option>
                                            <option value="10:30PM">10:30PM</option>
                                        </select>
                                    </div>


                                    <div className="col-md-4">
                                        <label className='text-uppercase mb-1'>
                                            <h6 className='fw-bold'>Ticket Price</h6>
                                        </label>
                                        <input type="number" name="ticketPrice" id="" value={scheduleInfo.ticketPrice || ''} onChange={editSchedule} className="form-control rounded-0 p-2" placeholder='Ticket Price' required />
                                    </div>


                                    <div className="col-md-4">
                                        <label className='text-uppercase mb-1'>
                                            <h6 className='fw-bold'>Coach Type</h6>
                                        </label>
                                        <select type="text" name="coachType" id="" value={scheduleInfo.coachType || ''} onChange={editSchedule} className="form-control form-select rounded-0 p-2" required>
                                            <option selected hidden value="">Coach Type</option>
                                            <option value="Ac">Ac</option>
                                            <option value="NoneAc">NoneAc</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mt-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className='text-uppercase mb-1'>
                                            <h6 className='fw-bold'>Starting Point</h6>
                                        </label>
                                        <select type="text" name="starting" id="" value={scheduleInfo.starting} onChange={editSchedule} className="form-control form-select rounded-0 p-2" required>
                                            <option selected hidden value="">Starting Point</option>
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


                                    <div className="col-md-6">
                                        <label className='text-uppercase mb-1'>
                                            <h6 className='fw-bold'>Ending Point</h6>
                                        </label>
                                        <select type="text" name="ending" id="" value={scheduleInfo.ending} onChange={editSchedule} className="form-control form-select rounded-0 p-2" required>
                                            <option selected hidden value="">Ending Point</option>
                                            <option value="Dhaka">Dhaka</option>
                                            <option value="Khulna">Khulna</option>
                                            <option value="Satkira">Satkira</option>
                                            <option value="Benapol">Benapol</option>
                                            <option value="Chittagong">Chittagong</option>
                                            <option value="Cox-bazar">Cox-bazar</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mt-5">
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="submit" className='btn btn-outline-success rounded-0 form-control py-2 fw-bold' value="UPDATE INFORMATION" />
                                    </div>
                                    <div className="col-md-6">
                                        <Link to="/Dashboard/scheduleList">
                                            <button className='btn btn-outline-danger rounded-0 form-control py-2 fw-bold'>BACK TO DASHBOARD</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScheduleEdit;