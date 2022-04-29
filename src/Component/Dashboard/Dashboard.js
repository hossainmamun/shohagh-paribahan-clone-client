import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../Style/Dashboard.scss';
import Sidebar from './Sidebar.js';

const Dashboard = () => {
    return (
        <section className='dashboard'>
            <div className="row">
                <div className="col-md-2 side-bar px-0">
                    <Sidebar/>
                </div>
                <div className="col-md-10 px-0">
                    <Outlet/>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;