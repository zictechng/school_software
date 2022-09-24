import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import Image from '../../assets/dist/img/avatar_2.png';

const userID = sessionStorage.getItem("auth_loggedID");

export default function Header() {

    const { loggin_check, user, loggin_state, message_count, user_image } = useContext(UserContext);
    const [logged_status] = loggin_check;
    const [user_details] = user;
    const [user_loggin_state] = loggin_state;
    const [count_message] = message_count;
    const [view_details, setViewDetails] = useState([]);
    const [my_photo, setMyPhoto] = user_image;
    const [display_banner, setDisplayBanner] = useState([]);
    const [display_logo, setDisplayLogo] = useState([]);
    const [setting_details, setSettingDetails] = useState({});
    //message fetch here...

    useEffect(() => {
        //const id = props.match.params.id;
        axios.get(`/api/fetch_my_profile`).then(res => {
            if (res.data.status === 200) {
                setViewDetails(res.data.staff_editDetails);
                setMyPhoto(res.data.staff_editDetails);
                (res.data.get_mymessage)
            }

        });
    }, []);

    // create a function to fetch all term here
    const getSettingDetails = () => {
        // let create the api url here
        axios.get(`/api/fetch_setting_details`).then(res => {
            if (res.data.status === 200) {
                setSettingDetails(res.data.setting_record);
                setDisplayBanner(res.data.setting_record);
                setDisplayLogo(res.data.setting_record);
            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
        });
    }
    useEffect(() => {
        // call the function here
        getSettingDetails();
        return () => {
        };
    }, []);

    // check if user have profile image and show it else, show default one.
    const myphoto = (my_photo.staff_image !== undefined && my_photo.staff_image !== null) ?
        (my_photo.uploadedImage ? my_photo.staff_image : window.BASE_URL + my_photo.staff_image) : Image;
    return (
        <>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="#" className="nav-link"><strong><h3>{display_logo.sch_name}</h3></strong></a>
                    </li>
                    {/* <li className="nav-item d-none d-sm-inline-block">
                        <a href="#" className="nav-link">Contact</a>
                    </li> */}
                </ul>
                <ul className="navbar-nav ml-auto">

                    {/* Notifications Dropdown Menu */}
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">
                            {count_message.total_message > 0 ? <i className="far fa-bell" /> : ""}
                            <span className="badge badge-warning navbar-badge">{count_message.total_message}</span>


                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span className="dropdown-item dropdown-header">{count_message.total_message} Notifications</span>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                                <i className="fas fa-envelope mr-2" /> {count_message.total_message} new messages

                            </a>

                            <div className="dropdown-divider" />
                            <Link to="/staff/message" className="dropdown-item dropdown-footer">See All Notifications</Link>
                        </div>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            {user_details.name} | {user_details.role}
                        </a>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">

                            <img src={myphoto} alt="prole_image" className="brand-image img-circle" style={{ opacity: '.8', width: '40px', height: '35px' }} />
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span className="dropdown-item dropdown-header bg-dark"><b>User Profile</b></span>
                            <div className="dropdown-divider" />
                            <Link to="/staff/profile" className="dropdown-item">
                                <i className="fas fa-user mr-2" /> Profile Details
                            </Link>
                            <div className="dropdown-divider" />
                            <a href="#/staff/setting" className="dropdown-item">
                                <i className="fas fa-cog mr-2" /> Account Setting
                            </a>
                            <div className="dropdown-divider" />
                            <Link to="/staff/message" className="dropdown-item">
                                <i className="fas fa-envelope mr-2" />
                                {count_message.total_message ? count_message.total_message + " message" : "0" + "message"}

                            </Link>
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
            {/* /.navbar */}

        </>
    )
}
