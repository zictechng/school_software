import axios from 'axios';
import { toast } from 'react-toastify';
import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
const userID = sessionStorage.getItem("auth_loggedID");
import { useHistory } from 'react-router-dom';

export default function Header() {
    const history = useHistory();
    const { loggin_check, user, loggin_state, schLogo, schBanner } = useContext(UserContext);
    const [logged_status] = loggin_check;
    const [user_details] = user;
    const [user_loggin_state] = loggin_state;
    const [banner_school, setBannerSchool] = schBanner;
    const [logo_school, setLogoSchool] = schLogo;

    if (user_details.role === "Teacher") {
        toast.error("Access deny!, You are not Authorized", { theme: 'colored' });
        history.push('../login');
    }

    return (
        <>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="#" className="nav-link"><strong><h3>{logo_school.sch_name}</h3></strong></a>
                    </li>

                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            {user_details.name} | {user_details.role}

                        </a>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">

                            <img src="/../../../dist/img/user2-160x160.jpg" alt="AdminLTE Logo" className="brand-image img-circle" style={{ opacity: '.8', width: '30px' }} />
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span className="dropdown-item dropdown-header"><b>User Profile</b></span>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                                <i className="fas fa-user mr-2" /> Profile Details
                            </a>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                                <i className="fas fa-cog mr-2" /> Account Setting
                            </a>
                            <div className="dropdown-divider" />

                            <div className="dropdown-divider" />
                            <a href="#" data-toggle="modal"
                                data-target="#logoutModal"
                                className="dropdown-item dropdown-footer">
                                <i className='fa fa-sign-out mr-2 text-red' >

                                </i> Logout</a>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}
