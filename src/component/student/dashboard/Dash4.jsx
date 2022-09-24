import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Image from '../../../assets/dist/img/avatar_2.png';

export default function Dash4() {
    const [log_activities, setLogActivities] = useState([]);
    const [student_birthday, setStudentBirthday] = useState([]);
    const [my_message, setMyMessage] = useState([]);

    const [assignment_count, setAssignmentCount] = useState([]);
    const [my_class_name, setMyClassName] = useState([]);
    const [view_details, setViewDetails] = useState([]);
    const [assignment_home, setAssignmentHome] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [iloading, setILoading] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const { loggin_check, user, loggin_state, message_count, user_image } = useContext(UserContext);

    const [logged_status] = loggin_check;
    const [user_loggin_state] = loggin_state;
    const [user_details] = user;
    const [my_photo, setMyPhoto] = user_image;

    const [loading, setLoading] = useState(false);
    // dash2 request api call
    const fetchDetails = () => {
        setLoading(true);
        // let create the api url here
        axios.get(`/api/fetch_student_profile`).then(res => {
            if (res.data.status === 200) {
                setViewDetails(res.data.student_profileDetails);
                setMyPhoto(res.data.student_profileDetails);
                setMyMessage(res.data.get_mymessage);
                setStudentBirthday(res.data.get_myclassBirthday);
                setAssignmentCount(res.data.get_myAssignment);
                setAssignmentHome(res.data.get_assignmentDetails);
                setMyClassName(res.data.get_className);
                //console.log(res.data.history_record);
            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            // no record found
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
            }
            setLoading(false);
        });
    }
    useEffect(() => {
        // call the function here
        fetchDetails();
    }, []);
    const getLogDetails = (PageNumber = 1) => {
        setILoading(true);
        // let create the api url here
        axios.get(`/api/fetch_my_log?page=${PageNumber}`).then(res => {
            if (res.data.status === 200) {
                setLogActivities(res.data.myLog.data);
            }
            // login required
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
            }
            setILoading(false);
        });
    }
    useEffect(() => {
        // call the function here
        getLogDetails();
    }, []);

    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };

    var table_record = "";
    var pstatus = "";

    table_record = <div>
        <table className="table table-sm">
            <thead>
                <tr>
                    <th style={{ width: 10 }}>#</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th style={{ width: 60 }}>Date</th>
                </tr>
            </thead>
            <tbody>
                {log_activities.map((item, i) => {
                    if (item.m_action == 'Logout')// this mean product is active
                    {
                        pstatus =
                            <span className="badge badge-danger mr-2">
                                Logout
                            </span>
                    } else if (item.m_action == 'Login') {
                        pstatus =
                            <span className="badge badge-success mr-2">
                                Login
                            </span>
                    }
                    else {
                        pstatus =
                            <span className="badge badge-secondary mr-2">
                                {item.m_action}
                            </span>
                    }
                    return (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{pstatus}</td>
                            <td>
                                {item.m_details}
                            </td>
                            <td><span className="badge bg-danger">{item.m_date}</span></td>
                        </tr>
                    )
                })
                }
            </tbody>
        </table>
    </div>
    return (
        <>
            <div className='col-12 mt-5'>
                <div className="row">
                    <div className="col-md-7">
                        <div className="card card-secondary card-outline shadow-lg">
                            <div className="card-body ">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Recent activities</h3>
                                    </div>
                                    {/* /.card-header */}

                                    {iloading
                                        ? <div className='overlay text-center'>
                                            <div className="spinner-border spinner-border text-info" role="status">
                                            </div>
                                        </div>
                                        : log_activities.length > 0
                                            ? <div>
                                                {table_record}
                                            </div>
                                            :
                                            <div>
                                                <div className="card-body text-center">
                                                    <span style={p}> No recent activities at the moment</span>
                                                </div>
                                            </div>
                                    }

                                    {/* /.card-body */}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-5">
                        <div className="card shadow-lg">
                            <div className="card-header">
                                <h3 className="card-title">Performance Statistics </h3>
                            </div>
                            {/* /.card-header */}
                            {iloading
                                ? <div className='overlay text-center'>
                                    <div className="spinner-border spinner-border text-info" role="status">
                                    </div>
                                </div>
                                : log_activities.length > 0
                                    ? <div>
                                        <div className="card-body text-center">
                                            {/* <p>By adding the class <code>.vertical</code> we achieve:</p> */}
                                            <div className="progress vertical">
                                                <div className="progress-bar bg-success progress-bar-striped" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} style={{ height: '40%' }}>
                                                    <span className="">40%</span>
                                                </div>
                                            </div>
                                            <div className="progress vertical">
                                                <div className="progress-bar bg-info progress-bar-striped" role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} style={{ height: '20%' }}>
                                                    <span className="">20%</span>
                                                </div>
                                            </div>
                                            <div className="progress vertical">
                                                <div className="progress-bar bg-warning progress-bar-striped" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{ height: '60%' }}>
                                                    <span className="">60%</span>
                                                </div>
                                            </div>
                                            <div className="progress vertical">
                                                <div className="progress-bar bg-danger progress-bar-striped" role="progressbar" aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} style={{ height: '80%' }}>
                                                    <span className="">80%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div className="card-body text-center">
                                            <span style={p}> No recent performance at the moment</span>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}