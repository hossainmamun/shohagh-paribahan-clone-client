import React from 'react';
import '../../Style/Navbar.scss';
import brandLogo from '../../image/logo-sp2.png'
import { Link, NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <section className='navigation py-0 sticky-top'>
            <nav className="navbar navbar-expand-lg py-0">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <img src={brandLogo} className="img-fluid brand" alt="img" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fa-solid fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " nav-link active-link" : "")}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/location" className={({ isActive }) => "nav-link" + (isActive ? " nav-link active-link" : "")}>Location</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contact-information" className={({ isActive }) => "nav-link" + (isActive ? " nav-link active-link" : "")}>Contact Us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/faq" className={({ isActive }) => "nav-link" + (isActive ? " nav-link active-link" : "")}>Faq</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/dashboard/dashboardHome" className={({ isActive }) => "nav-link" + (isActive ? " nav-link active-link" : "")}>Dashboard</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </section>
    );
};

export default Navigation;