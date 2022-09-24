import { toast } from 'react-toastify';
import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
const userID = sessionStorage.getItem("auth_loggedID");
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function HeaderBar() {

    const history = useHistory();
    const [isLoading, setIsloading] = useState(false);
    const { loggin_check, user, loggin_state, message_count, user_image, student_user, schLogo, schBanner } = useContext(UserContext);
    const [logged_status] = loggin_check;
    const [user_loggin_state] = loggin_state;
    const [user_details] = user;
    const [count_message] = message_count;
    const [student_user_details] = student_user;
    const [banner_school, setBannerSchool] = schBanner;
    const [logo_school, setLogoSchool] = schLogo;

    /* logout function goes here */
    const logoutSubmit = (e) => {
        e.preventDefault();
        setIsloading(true);
        axios.post(`/api/logout`).then(res => {
            /* check if logout is successful and clear all data store */
            if (res.data.status === 200) {
                sessionStorage.removeItem('auth_token');
                sessionStorage.removeItem('auth_loggedID');
                toast.success(res.data.message, { theme: 'colored' });
                document.getElementById("logoutModal").classList.remove("show");
                document.querySelectorAll(".modal-backdrop")
                    .forEach(el => el.classList.remove("modal-backdrop"));
                // history.push('/admin/dashboard');
                history.push("../student-login");
                setIsloading(false);
            }
            else if (res.data.status === 401) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            setIsloading(false);
        });
    }
    // create a function to fetch all term here
    const getSettingDetails = () => {
        // let create the api url here
        axios.get(`/api/fetch_setting_details`).then(res => {
            if (res.data.status === 200) {
                setBannerSchool(res.data.setting_record);
                setLogoSchool(res.data.setting_record);
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
    const school_logo = (logo_school.sch_logo !== undefined && logo_school.sch_logo !== null) ?
        (logo_school.uploadedImageLogo ? logo_school.sch_logo : window.BASE_URL + logo_school.sch_logo) : "Logo";
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light navbar-dark">
                <div className="container-md">
                    <Link to="/student/index" className="navbar-brand">
                        {logo_school.sch_logo !== undefined && logo_school.sch_logo !== null ?
                            <img className="img-account-profile mb-2" src={school_logo} alt="logo" width={80} height={80} style={{ opacity: '.8' }} /> : ""}
                        <span className="brand-text font-weight-light"><strong>{logo_school.sch_name_short} </strong> </span>
                    </Link>
                    <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse order-3" id="navbarCollapse">
                        {/* Left navbar links */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/student/index" className="nav-link">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/student/assignment" className="nav-link">Assignment</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle">Result Checker</a>
                                <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow">
                                    <li><Link to="/student/result-checker" className="dropdown-item">Check Result </Link></li>
                                    <li className="dropdown-divider" />
                                    <li>
                                        <Link to="/student/ca-checker" className="dropdown-item">Check CA Result</Link>
                                    </li>
                                    <li className="dropdown-divider" />
                                    {/* Level two dropdown*/}

                                    {/* End Level two */}
                                </ul>
                            </li>
                        </ul>
                    </div>
                    {/* Right navbar links */}
                    <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link" data-toggle="dropdown" href="#">
                                {count_message.total_message > 0 ? <div><i className="far fa-bell" />
                                    <span className="badge badge-warning navbar-badge">{count_message.total_message}</span></div> : ""}

                            </a>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                                <span className="dropdown-header">15 Notifications</span>
                                <div className="dropdown-divider" />
                                <a href="#" className="dropdown-item">
                                    <i className="fas fa-envelope mr-2" /> 4 new messages
                                    <span className="float-right text-muted text-sm">3 mins</span>
                                </a>
                                <div className="dropdown-divider" />
                                <a href="#" className="dropdown-item">
                                    <i className="fas fa-users mr-2" /> 8 friend requests
                                    <span className="float-right text-muted text-sm">12 hours</span>
                                </a>
                                <div className="dropdown-divider" />
                                <a href="#" className="dropdown-item">
                                    <i className="fas fa-file mr-2" /> 3 new reports
                                    <span className="float-right text-muted text-sm">2 days</span>
                                </a>
                                <div className="dropdown-divider" />
                                <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
                            </div>
                        </li>


                        <li className="nav-item dropdown">
                            <a className="nav-link" data-toggle="dropdown" href="#">
                                <span className="brand-text font-weight-bold"> {student_user_details.surname} {student_user_details.other_name}</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                                <span className="dropdown-item dropdown-header bg-info"><b>User Profile</b></span>
                                <div className="dropdown-divider" />
                                <Link to="/student/profile" className="dropdown-item">
                                    <i className="fas fa-user mr-2" /> Profile
                                </Link>
                                <div className="dropdown-divider" />
                                <Link to="/student/setting" className="dropdown-item">
                                    <i className="fas fa-key mr-2" /> Change Password
                                </Link>
                                <div className="dropdown-divider" />
                                <Link to="/student/notifications" className="dropdown-item">
                                    <i className="fas fa-envelope mr-2" />
                                    Notifications
                                </Link>
                                <div className="dropdown-divider" />
                                <Link to="/student/support" className="dropdown-item">
                                    <i className="fas fa-support mr-2" />
                                    Support
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

                </div>
            </nav>
            <div className="modal fade" id="logoutModal" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select <b>"Logout"</b> if you are ready to end your current session.</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button disabled={isLoading} className="btn btn-danger" onClick={logoutSubmit}>
                                {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}