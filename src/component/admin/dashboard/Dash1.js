import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function Dash1() {
    const [all_student, setAllStudent] = useState([]);
    const [active_student, setActiveStudent] = useState([]);
    const [all_staff, setAllStaff] = useState([]);
    const [active_staff, setActiveStaff] = useState([]);

    const [graduate_student, setGraduate] = useState([]);
    const [student_suspend, setStudentSuspend] = useState([]);
    const [reg_online, setRegOnline] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    // dash1 request api call
    const getAllDash1 = (e) => {
        setIsLoading(true);
        // let create the api url here
        axios.get(`/api/fetch_dash1`).then(res => {
            if (res.data.status === 200) {
                setAllStudent(res.data.all_details.all_student);
                setActiveStudent(res.data.all_details.active_student);
                setAllStaff(res.data.all_details.all_staff);
                setActiveStaff(res.data.all_details.active_staff);
                //console.log(res.data.history_record);
            }
            // login required
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
            }
            setIsLoading(false);
        });
    }
    useEffect(() => {
        // call the function here
        getAllDash1();
    }, []);

    // dash2 request api call
    const getAllDash2 = () => {
        setLoading(true);
        // let create the api url here
        axios.get(`/api/fetch_dash2`).then(res => {
            if (res.data.status === 200) {
                setGraduate(res.data.allDetails.all_graduated);
                setRegOnline(res.data.allDetails.all_regOnline);
                setStudentSuspend(res.data.allDetails.all_suspend);
                //console.log(res.data.history_record);
            }
            // login required
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
        getAllDash2();
    }, []);
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    return (
        <>
            <div className="row">
                <div className="col-12 col-sm-6 col-md-3">
                    <div className="info-box">
                        <span className="info-box-icon bg-info elevation-1"><i className="fas fa-user" /></span>
                        <div className="info-box-content">
                            {isloading
                                ? <div className='overlay text-center'>
                                    <div className="spinner-border spinner-border text-info" role="status">
                                    </div>
                                </div>
                                : all_student.all_user > 0
                                    ? <div>
                                        <span className="info-box-text">All Student</span>
                                        <span className="info-box-number">{all_student.all_user}</span>
                                    </div>
                                    :
                                    <div>
                                        <span className="info-box-text">All Student</span>
                                        <span style={p}>No registered student at the moment</span>
                                    </div>

                            }
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <div className="info-box mb-3">
                        <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-users" /></span>
                        <div className="info-box-content">
                            {isloading
                                ? <div className='overlay text-center'>
                                    <div className="spinner-border spinner-border text-info" role="status">
                                    </div>
                                </div>
                                : all_staff.all_staff > 0
                                    ? <div>
                                        <span className="info-box-text">All Staff</span>
                                        <span className="info-box-number">{all_staff.all_staff}</span>
                                    </div>
                                    :
                                    <div>
                                        <span className="info-box-text">All Staff</span>
                                        <span style={p}>No registered staff at the moment</span>
                                    </div>

                            }
                        </div>
                    </div>
                </div>
                <div className="clearfix hidden-md-up" />
                <div className="col-12 col-sm-6 col-md-3">
                    <div className="info-box mb-3">
                        <span className="info-box-icon bg-success elevation-1"><i className="fas fa-user" /></span>
                        <div className="info-box-content">
                            {isloading
                                ? <div className='overlay text-center'>
                                    <div className="spinner-border spinner-border text-info" role="status">
                                    </div>
                                </div>
                                : active_student.active_user > 0
                                    ? <div>
                                        <span className="info-box-text">Active Student</span>
                                        <span className="info-box-number">{active_student.active_user}</span>
                                    </div>
                                    :
                                    <div>
                                        <span className="info-box-text">Active Student</span>
                                        <span style={p}>No active student at the moment</span>
                                    </div>

                            }
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <div className="info-box mb-3">
                        <span className="info-box-icon bg-success elevation-1"><i className="fas fa-users" /></span>
                        <div className="info-box-content">
                            {/* {isloading && <div className='text-center'>
                                <div className="spinner-border spinner-border text-info" role="status">
                                </div>
                            </div>}
                            <span className="info-box-text">Active Staff</span>
                            <span className="info-box-number">{active_staff.staff_active}</span> */}

                            {isloading
                                ? <div className='overlay text-center'>
                                    <div className="spinner-border spinner-border text-info" role="status">
                                    </div>
                                </div>
                                : active_staff.staff_active > 0
                                    ? <div>
                                        <span className="info-box-text">Active Staff</span>
                                        <span className="info-box-number">{active_staff.staff_active}</span>
                                    </div>
                                    :
                                    <div>
                                        <span className="info-box-text">Active Staff</span>
                                        <span style={p}>No active staff at the moment</span>
                                    </div>

                            }
                        </div>
                        {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                </div>
                {/* /.col */}
            </div>
            <br></br><br></br>
            <div className="row">
                <div className="col-lg-4 col-6">
                    {/* small box */}
                    <div className="small-box bg-info">
                        <div className="inner">
                            {loading
                                ? <div className="spinner-border spinner-border text-secondary" role="status">
                                </div>
                                : graduate_student.all_graduate > 0
                                    ?
                                    <div>
                                        <h3>{graduate_student.all_graduate} </h3>
                                        <p>Graduated Student</p>
                                    </div>
                                    :
                                    <div><p style={p}>
                                        No Graduated Student at the moment
                                    </p>
                                        <p>Graduated Student</p>
                                    </div>

                            }
                        </div>
                        <div className="icon">
                            <i className="fa fa-graduation-cap" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-4 col-6">
                    {/* small box */}
                    <div className="small-box bg-default">
                        <div className="inner">
                            {loading
                                ? <div className="spinner-border spinner-border text-info" role="status">
                                </div>
                                : reg_online.online_user > 0
                                    ?
                                    <div>
                                        <h3>{reg_online.online_user}<sup style={{ fontSize: 20 }}>%</sup></h3>
                                        <p>Online Registrations</p>
                                    </div>
                                    :
                                    <div> <p style={p}>
                                        No online registration at the moment
                                    </p>
                                        <p>Online Registrations</p>
                                    </div>


                            }

                        </div>
                        <div className="icon">
                            <i className="ion ion-person-add" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-4 col-6">
                    {/* small box */}
                    <div className="small-box bg-warning">
                        <div className="inner">
                            {loading
                                ? <div className="spinner-border spinner-border text-info" role="status">
                                </div>
                                : student_suspend.all_suspend > 0
                                    ?
                                    <div>
                                        <h3>{student_suspend.all_suspend}</h3>
                                        <p>Suspended Account</p>
                                    </div>
                                    :
                                    <div> <p style={p}>
                                        No suspended account at the moment
                                    </p>
                                        <p>Suspended Account</p>
                                    </div>



                            }
                        </div>
                        <div className="icon">
                            <i className="ion ion-close-circled" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    {/* <div className="small-box bg-danger">
                        <div className="inner">
                            <h3>65</h3>
                            <p>Unique Visitors</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-pie-graph" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div> */}
                </div>
                {/* ./col */}
            </div>

        </>
    )
}
export default Dash1;
