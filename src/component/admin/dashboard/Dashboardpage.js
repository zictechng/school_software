import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Dash1 from './Dash1'
import Dash2 from './Dash2';
import { toast } from 'react-toastify';
import { UserContext } from '../../../context/UserContext';
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
const userID = localStorage.getItem('auth_loggedID');
const token = localStorage.getItem('auth_token');


function Dashboardpage() {
    const [logged_state, setLoggedState] = useState([]);

    document.title = "Dashboard | " + window.companyName;
    const date = new Date();

    const history = useHistory();
    // get date here...
    // const currentDate_time = today_date + ' ' + time.toLocaleString();
    const dateTime = date.toLocaleTimeString();
    const todayDate = date.toDateString();

    const [isLoggedIn, setisLoggedIn] = useState(true);

    const { checkLoggin, loggin_state, user, loggin_check, schLogo, userip } = useContext(UserContext);
    const [logged_check] = checkLoggin;
    const [user_loggin_state] = loggin_state;
    const [user_details] = user;
    const [logged_status] = loggin_check
    const [logo_school] = schLogo
    const [user_ip] = userip;
    const [user_info, setUserInfo] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const reload = () => window.location.reload();
    // show modal when the user login and stop after page reload.
    useEffect(() => {
        if (!user_loggin_state.login_uid == '' || !user_loggin_state.login_uid == undefined) {
            //console.log("Dashboard Page UID, Active");
            setTimeout(() => setShowModal(true), 1000);
        }
    }, []);
    const handleClose = () => {
        setShowModal(false)
        reload();
        return () => clearTimeout(timeId)
    };

    //creating IP state
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Dashboard

                            </h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li><span className="badge badge-danger mr-3"> Last Login: {todayDate} {dateTime} | IP: {user_ip !== undefined ? user_ip : "No IP"}</span></li>
                                <li className='mr-3'><button type="button" className="btn btn-block btn-info btn-sm">Student Portal</button></li>
                                <li className='mr-3'><button type="button" className="btn btn-block btn-dark btn-sm">Visit Website</button></li>
                            </ol>
                        </div>
                    </div>
                    <br />
                    <Dash1 />
                    <Dash2 />
                </div>
            </div>

            {showModal ? <Modal /> : null}
            <Modal show={showModal} >
                <div className="card card-widget widget-user shadow-lg">
                    {/* Add the bg color to the header using any of the bg-* classes */}
                    <div className="widget-user-header text-white" style={{ background: 'url("/../../../dist/img/photo1.png") center center' }}>
                        <h3 className="widget-user-username text-right">Hi,</h3>
                        <h5 className="widget-user-desc text-right">{user_details.name}</h5>
                    </div>
                    {/* <div className="widget-user-image">
                        <img className="img-circle" src="/../../../dist/img/user3-128x128.jpg" alt="User Avatar" />
                    </div> */}
                </div>
                <form className="form-horizontal">
                    <div className="card-footer card-comments">
                        <div className="comment-text">
                            <span className="username">
                                {logo_school.sch_name_short}
                                {/* <span className="text-muted float-right">8:03 PM Today</span> */}
                            </span>
                            It is a long established fact that a good software help you addressed and solve your bussiness need.

                        </div>
                    </div>

                    <div className="card-body">
                        {/* post text */}
                        <p style={p}>This is far far way, behind the word of software development for education activities you ever see. <br />
                            LiftSoft Edu is build with your school activities in mind to solve all of your need and even more! <br />
                            This software is for all countries education administrative activities. <br />
                            <b>Feel free to contact us for more features / consultation</b><a href='#'> info@zictech-ng.com</a></p>
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleClose} className="btn btn-success">
                            Ok
                        </button>
                        {/* <button onClick={handleClose} className="btn btn-danger">Cancel</button> */}
                    </div>
                </form>

            </Modal>
        </>
    )
}
export default Dashboardpage;
