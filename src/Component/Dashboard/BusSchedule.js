import React, { useState } from 'react';

const BusSchedule = () => {
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');

    const [busNo, setBusNo] = useState(null);
    const [departureTime, setDepartureTime] = useState('');
    const [ticketPrice, setTicketPrice] = useState(null);
    const [coachType, setCoachType] = useState('');
    const [starting, setStarting] = useState('');
    const [ending, setEnding] = useState('');

    const scheduleInfo = {
        departure,
        destination,
        busNo,
        departureTime,
        ticketPrice,
        coachType,
        starting,
        ending,
    }

    // ! SEND BUS SCHEDULE TO SERVER API
    const handleScheduleInfo = (e) => {
        e.preventDefault();
        if (scheduleInfo.departure === scheduleInfo.destination) {
            window.alert('Departure and Destination cannot be same.')
        }
        else {
            const url = 'https://polar-woodland-95265.herokuapp.com/add_bus_schedule'
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(scheduleInfo)
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        window.alert('Information send successfully');
                    }
                })
                .catch(err => {
                    window.alert('Information send failed');
                })
        }
    }

    // ! RETURN
    return (
        <section>
            <div className='container-fluid d-flex justify-content-around align-items-center py-4 text-white' style={{ background: '#f0ad4e' }}>
                <h2 className='text-uppercase fw-bold my-0'>add a bus schedule</h2>
                <h4 className='my-0'>dashboard/busSchedule</h4>
            </div>


            <div style={{ marginTop: '100px' }}>
                <div className="row justify-content-center">
                    <div className="col-md-8 p-5" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px' }}>
                        <form onSubmit={handleScheduleInfo}>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className='text-uppercase mb-1'>
                                            <h6 className='fw-bold'>Departure</h6>
                                        </label>
                                        <select type="text" name="departure" id="" onChange={(e) => setDeparture(e.target.value)} className="form-control form-select rounded-0 p-2" required>
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
                                        <select type="text" name="destination" id="" onChange={(e) => setDestination(e.target.value)} className="form-control form-select rounded-0 p-2" required>
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
                                        <input type="number" name="busNo" id="" onChange={(e) => setBusNo(e.target.value)} className='form-control rounded-0 p-2' placeholder='Enter Bus No' />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mt-4">
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className='text-uppercase mb-1'>
                                            <h6 className='fw-bold'>Departure Time</h6>
                                        </label>
                                        <select type="text" name="departureTime" id="" onChange={(e) => setDepartureTime(e.target.value)} className="form-control form-select rounded-0 p-2" required>
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
                                        <input type="number" name="ticketPrice" id="" onChange={(e) => setTicketPrice(e.target.value)} className="form-control rounded-0 p-2" placeholder='Ticket Price' required />
                                    </div>


                                    <div className="col-md-4">
                                        <label className='text-uppercase mb-1'>
                                            <h6 className='fw-bold'>Coach Type</h6>
                                        </label>
                                        <select type="text" name="coachType" id="" onChange={(e) => setCoachType(e.target.value)} className="form-control form-select rounded-0 p-2" required>
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
                                        <select type="text" name="starting" id="" onChange={(e) => setStarting(e.target.value)} className="form-control form-select rounded-0 p-2" required>
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
                                        <select type="text" name="ending" id="" onChange={(e) => setEnding(e.target.value)} className="form-control form-select rounded-0 p-2" required>
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
                                        <input type="submit" className='btn btn-outline-success rounded-0 form-control py-2 fw-bold focus-status' value="SUBMIT INFORMATION" />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="reset" name="reset" className='btn btn-outline-danger rounded-0 form-control py-2 fw-bold focus-status' value="RESET INFORMATION"></input>
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

export default BusSchedule;