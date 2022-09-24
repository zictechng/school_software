import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { UserContext } from '../../../context/UserContext';
import Dash4 from './Dash4';
import Dash2 from './Dash2';
import { toast } from 'react-toastify';
const userID = sessionStorage.getItem('auth_loggedID');
const token = sessionStorage.getItem('auth_token');

function StudentDashboardPage() {
    document.title = "Dashboard | " + window.companyName;
    const date = new Date();
    // get date here...
    // const currentDate_time = today_date + ' ' + time.toLocaleString();
    const dateTime = date.toLocaleTimeString();
    const todayDate = date.toDateString()
    const history = useHistory();

    const { loggin_check, loggin_state, user, userip } = useContext(UserContext);
    const [logged_status] = loggin_check;
    const [user_loggin_state] = loggin_state;
    const [user_details] = user;
    const [user_ip] = userip;

    const [showModal, setShowModal] = useState(false);
    const [system_setup, setSystemSetup] = useState([]);
    const [loading_page, setLoadingPage] = useState(true);
    const reload = () => window.location.reload();
    // show modal when the user login and stop after page reload.
    useEffect(() => {
        //setTimeout(() => setShowModal(true), 3000);
        // const timeId = setTimeout(() => setShowModal(true), 3000)
        if (!user_loggin_state.login_uid == '' || !user_loggin_state.login_uid == undefined) {
            //console.log("Dashboard Page UID, Active");
            setTimeout(() => setShowModal(true), 1000);
        }
    }, []);
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    const handleClose = () => {
        setShowModal(false)
        reload();
        return () => clearTimeout(timeId)
    };
    if (!sessionStorage.getItem('auth_token')) {
        history.push("../student-login");
    }
    //creating IP state
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    useEffect(() => {
        const getLoggedInUser = async () => {
            const userID = sessionStorage.getItem("auth_loggedID");
            try {
                const res = await axios.get(`/api/system_setting`);
                if (res.status === 200) {
                    setSystemSetup(res.data.system_setting);
                    // console.log(res.data.system_setting);
                    setLoadingPage(false);
                }
            } catch (error) {
                // Handle the error
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            setLoadingPage(false);
        };
        getLoggedInUser();
    }, []);
    if (loading_page) {
        return (
            <div style={style} className="card-body">
                <div className="text-center">
                    <div
                        className="spinner-border spinner-border text-info"
                        role="status"
                    ></div>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="content-header">
                <div className="container" >
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-7">
                                <h1 className="m-0" style={p}>Student Portal <small></small></h1>
                            </div>
                            <div className="col-sm-5">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><span className="badge badge-info mr-3"> Last Login: {todayDate} {dateTime} | IP: {user_ip !== undefined ? user_ip : "No IP"}</span></li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className='col-12'>
                            <div className="alert alert-info alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h5><i className="icon fas fa-info" /> Alert!</h5>
                                Any general message or Announcements will come here from the admin to the general student.
                            </div>

                        </div>
                    </div>

                    {system_setup.app_student_portal === "Active" ?
                        <div>
                            <Dash2 />
                            <Dash4 />
                        </div>
                        : <div className="row mt-5">
                            <div className='col-12'>
                                <div className="alert alert-danger alert-dismissible">
                                    <h5><i className="icon fas fa-info" /> Alert!</h5>
                                    Sorry, the system is current out off service. Contact the service provide for support thank you.
                                </div>

                            </div>
                        </div>}

                    {/* <Dash2 />
                    <Dash4 /> */}
                </div>
            </div>
        </>
    )
}

export default StudentDashboardPage;