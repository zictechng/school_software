import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";
const token = sessionStorage.getItem('auth_loggedID');

import { UserContext } from '../../context/UserContext';
import { useHistory } from 'react-router-dom';

export default function Sidemenu() {
    const history = useHistory();
    const { loggin_check } = useContext(UserContext);
    const [display_banner, setDisplayBanner] = useState([]);
    const [display_logo, setDisplayLogo] = useState([]);
    const [setting_details, setSettingDetails] = useState({});
    const userID = token;

    /* logout function goes here */
    const logoutSubmit = (e) => {
        e.preventDefault();
        setIsloading(true);
        axios.post(`/api/logout`).then(res => {
            /* check if logout is successful and clear all data store */
            if (res.data.status === 200) {
                sessionStorage.removeItem('auth_token');
                sessionStorage.removeItem('auth_loggedID');
                toast.success(res.data.message);
                document.getElementById("logoutModal").classList.remove("show");
                document.querySelectorAll(".modal-backdrop")
                    .forEach(el => el.classList.remove("modal-backdrop"));
                // history.push('/admin/dashboard');
                history.push('../login');
            }
            else if (res.data.status === 401) {
                toast.error(res.data.message);
            }
            setIsloading(false);
        });

    }
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
    const school_logo = (display_logo.sch_logo !== undefined && display_logo.sch_logo !== null) ?
        (display_logo.uploadedImageLogo ? display_logo.sch_logo : window.BASE_URL + display_logo.sch_logo) : "No Image";
    return (
        <>
            {/* Main Sidebar Container */}
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <Link to="/staff/index" className="brand-link">
                    {display_logo.sch_logo !== undefined && display_logo.sch_logo !== null ?
                        <img className="img-account-profile mb-2" src={school_logo} alt="logo" width={80} height={80} style={{ opacity: '.8' }} /> : ""}
                    <span className="brand-text font-weight-light"><strong>{display_logo.sch_name_short}</strong> </span>
                </Link>
                {/* Sidebar */}
                <div className="sidebar">
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                            <li className="nav-item">
                                <Link to="/staff/index" className="nav-link">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>
                                        Dashboard
                                    </p>
                                </Link>
                            </li>

                            <li className="nav-header"><span className="badge badge-warning"> Data</span></li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon fas fa-th" />
                                    <p>
                                        Student Data
                                        <i className="fas fa-angle-left right" />
                                        <span className="badge badge-danger right">1</span>
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/staff/student" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>My Student</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-header"><span className="badge badge-warning">Exam Result</span></li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon fas fa-copy" />
                                    <p>
                                        Manage Exam
                                        <i className="fas fa-angle-left right" />
                                        <span className="badge badge-danger right"> 4</span>
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/staff/add-result" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Post Result</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/staff/result-single" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Post Single Result</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/staff/result" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>View Result</p>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/staff/manage-upload" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Manage Upload </p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-header"><span className="badge badge-warning">CA Result</span></li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon fas fa-copy" />
                                    <p>
                                        Manage CA
                                        <i className="fas fa-angle-left right" />
                                        <span className="badge badge-danger right"> 3</span>
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/staff/add-ca" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Post CA Result</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/staff/single-ca" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Post Single CA Result</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/staff/ca-result" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>View CA Result</p>
                                        </Link>
                                    </li>

                                </ul>
                            </li>

                            <li className="nav-item">
                                <Link to="/staff/student-result" className="nav-link">
                                    <i className="nav-icon fas fa-th" />
                                    <p>
                                        View Result Details
                                    </p>
                                </Link>
                            </li>

                            <li className="nav-header"><span className="badge badge-warning">Assignment</span></li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon fas fa-edit" />
                                    <p>
                                        Assignment
                                        <i className="fas fa-angle-left right" />
                                        <span className="badge badge-danger right"> 2</span>
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/staff/add-assignment" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Post Assignment</p>
                                        </Link>
                                    </li>
                                    {/* <li className="nav-item">
                                        <Link to="#" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Grade Subject Position</p>
                                        </Link>
                                    </li> */}
                                    <li className="nav-item">
                                        <Link to="/staff/assignment" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>View Assignment</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/staff/submission" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>View Submission</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-header"><span className="badge badge-warning"> Attendance</span></li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon fas fa-check" />
                                    <p>
                                        Attendance
                                        <i className="fas fa-angle-left right" />
                                        <span className="badge badge-danger right"> 2</span>
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/staff/post-attendance" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Mark Attendance</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/staff/attendance" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>View Attendance</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-header"><span className="badge badge-warning"> Psychomotor</span></li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon fas fa-columns" />
                                    <p>
                                        Manage PsychomotorDomain
                                        <i className="fas fa-angle-left right" />
                                        <span className="badge badge-danger right"> 2</span>
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/staff/post-psychomotor" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Post Report</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/staff/my-psychomotor" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>View Report</p>
                                        </Link>
                                    </li>

                                </ul>
                            </li>

                            <li className="nav-header"><span className="badge badge-warning"> Comment</span></li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon fas fa-comment" />
                                    <p>
                                        Manage Comments
                                        <i className="fas fa-angle-left right" />
                                        <span className="badge badge-danger right"> 2</span>
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/staff/post-comment" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Post Comments</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/staff/comment" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>View Comments</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <Link to="/staff/message" className="nav-link">
                                    <i className="far fa-support" />
                                    <p> System Support </p>
                                </Link>
                            </li>
                            <hr />
                            <li className="nav-header"><span className="badge badge-info"> Action</span></li>
                            <li className="nav-item">
                                <Link to="#" data-toggle="modal"
                                    data-target="#logoutModal" className="nav-link">
                                    <i className="nav-icon ion ion-power text-red" />
                                    <p>
                                        Sign out
                                    </p>
                                </Link>
                            </li>
                            <hr></hr>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <p></p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}
