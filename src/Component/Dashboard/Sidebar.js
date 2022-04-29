import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { userContext } from '../../App.js';

const Sidebar = () => {
    const [loggedINUser, setLoggedInUser] = useContext(userContext);
    const [admin, setAdmin] = useState(false);
    useEffect(() => {
        fetch('https://polar-woodland-95265.herokuapp.com/admin_list?email=' + loggedINUser.userEmail, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setAdmin(true);
                }
            })
    }, [])

    // return
    return (
        <section>
            <div className="profile-info mt-4">
                <div>
                    {
                        loggedINUser.userEmail &&
                        <div>
                            <img src={loggedINUser.photoURL} className="img-fluid" alt="img" />
                            <p>{loggedINUser.userName}</p>
                        </div>
                    }
                </div>
            </div>

            <div className="sidebar-link">
                <NavLink to="/" className='link'>
                    <i class="fas fa-home"></i>
                    Home
                </NavLink>

                <NavLink to="dashboardHome" className={({ isActive }) => "link" + (isActive ? " link active-style" : "")}>
                    <i class="fa-solid fa-screwdriver-wrench"></i>
                    Dashboard
                </NavLink>

                {
                    admin &&
                    <div>
                        <NavLink to="bookingList" className={({ isActive }) => "link" + (isActive ? " link active-style" : "")}>
                            <i class="fas fa-suitcase-rolling"></i>
                            Reservation List
                        </NavLink>

                        <NavLink to="busSchedule" className={({ isActive }) => "link" + (isActive ? " link active-style" : "")}>
                            <i class="fa-solid fa-bus"></i>
                            Add Schedule
                        </NavLink>

                        <NavLink to="scheduleList" className={({ isActive }) => "link" + (isActive ? " link active-style" : "")}>
                            <i class="fa-solid fa-list"></i>
                            Schedule List
                        </NavLink>

                        <NavLink to="makeAdmin" className={({ isActive }) => "link" + (isActive ? " link active-style" : "")}>
                            <i class="fa-solid fa-lock"></i>
                            Make Admin
                        </NavLink>
                    </div>
                }

            </div>
        </section>
    );
};

export default Sidebar;