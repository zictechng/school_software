import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function StartMarkAttendnace() {
    document.title = "Attendance Sheet Details | " + window.companyName;
    const history = useHistory();
    const [fetch_attendance, setFetchAttendance] = useState([]);
    const [attendance_class, setAttendanceClass] = useState('');
    const [isfetchLoading, setIsFetchloading] = useState(false);
    const [is_loading, setIsLoading] = useState(false);


    var r_code = localStorage.getItem("tID");

    const getAttend = () => {
        var check_code = localStorage.getItem("tID");
        try {
            setIsFetchloading(true);
            // let create the api url here
            axios.get(`/api/fetch_start_attendance/${check_code}`).then(res => {
                if (res.data.status === 200) {
                    setFetchAttendance(res.data.start_attenDetails.proDetails);
                    setAttendanceClass(res.data.start_attenDetails.pDetails)
                    //console.log(res.data.history_record);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
                }
                setIsFetchloading(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setIsFetchloading(false);
        }
    }
    useEffect(() => {
        // call the function here
        getAttend();
    }, []);

    if (attendance_class === 'undefine') {
        toast.error("No record found!", { theme: 'colored' });
        history.push(`/staff/attendance`);
    }
    if (attendance_class == "null") {
        toast.error("No record found!", { theme: 'colored' });
        history.push(`/staff/attendance`);
    }

    // tick student for promotion here
    const markAttendance = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML =
            "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to mark the attendance here */
        try {
            axios.delete(`/api/mark_attend/${id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    getAttend();
                } else if (res.data.status === 402) {
                    toast.warning(res.data.message, { theme: "colored" });
                    getAttend();
                }
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error occurred! Try again. ".error, {
                theme: "colored",
            });
        }
    };

    // uncheck student attendance here...
    const returnAttend = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML =
            "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to returned attendance here */
        try {
            axios.delete(`/api/return_attendance/${id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    getAttend();
                } else if (res.data.status === 402) {
                    toast.warning(res.data.message, { theme: "colored" });
                }
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error occurred! Try again. ".error, {
                theme: "colored",
            });
        }
    };

    // mark all student at once here..
    const markAll = (e, activate_id) => {
        setIsLoading(true)
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML =
            "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to mark all attendance once here */

        try {
            axios.delete(`/api/mark_all/${activate_id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    //history.push(`/staff/attendance`);
                    thisClicked.innerHTML =
                        "<i className='fa fa-check'></i> Mark All";
                } else if (res.data.status === 402) {
                    toast.warning(res.data.message, { theme: "colored" });
                }
            });

            setActivateAll(false);
            setIsLoading(false);
            getAttend();
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error occurred! Try again. ".error, {
                theme: "colored",
            });
        }
    };

    // action activate all modal here...
    const [activate_id, setActivateID] = useState("");
    const [activateAll, setActivateAll] = useState(false);

    const handleAllClose = () => {
        setActivateAll(false)
    }
    const activate_all = (sta_tid) => {
        setActivateID(sta_tid);
        setActivateAll(true);
    }
    var buttonCheck = "";
    var pin_status = "";
    var delete_button = "";

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
                            <h4 className="m-0">Student attendance sheet:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <Link to='/staff/attendance'><button type="button" className="btn btn-block btn-warning btn-sm" data-tip="Dashboard" data-place="bottom">
                                        <i className='fa fa-arrow-left'></i> Back
                                    </button>
                                    </Link>
                                </li>
                                <li className='mr-3'>
                                    <Link to='#'><button type="button" onClick={() => activate_all(attendance_class.sta_tid)} className="btn btn-block btn-primary btn-sm" data-tip="Dashboard" data-place="bottom">
                                        <i className='fa fa-check'></i> Mark All
                                    </button>
                                    </Link>
                                </li>
                                <li className='mr-3'>
                                    <Link to='/staff/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom">
                                        <i className='fa fa-home'></i>
                                    </button>
                                    </Link>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <p style={p}>
                        Now you can easily manage student attendance and mark it at your convenient! Click on the checkbox to mark each student<br />
                        or
                        click on mark all to mark all student at once.
                    </p>
                    <div className="card-body">
                        <div className="card table-responsive">
                            <div className="card-header">
                                <h3 className="card-title"><p style={p}> Mark student attendance in |  <span className="badge bg-secondary mr-2" type="button">
                                    {attendance_class.sta_class_name}
                                </span> {" "}
                                </p>
                                </h3>
                                <div className="d-flex justify-content-between">
                                    <p></p>
                                    <small className="float-right">ID:  <a style={p}> <b>{attendance_class.sta_tid}</b></a> | {" "} Class: <a style={p}> <b>{attendance_class.sta_class_name}</b></a></small>
                                </div>
                            </div>
                            {/* /.card-header */}

                            <div className="invoice p-3 mb-3">
                                <div className="row">
                                    <div className="col-12 table-responsive">
                                        <div className="card-body">
                                            <div className='text-center'>
                                                {isfetchLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                            </div>
                                            <table className="table table-bordered table-sm">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: 10 }}>#</th>
                                                        <th>Full Name</th>
                                                        <th>Admin. No.</th>
                                                        <th>Current Class</th>
                                                        <th>Status</th>
                                                        <th>Mark Date</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {fetch_attendance.map((item, i) => {
                                                        if (item.sta_status == 'Active')// this mean product is active
                                                        {
                                                            pin_status = ""
                                                            buttonCheck =
                                                                <span className="badge bg-secondary mr-2" type="button" title='De-activate Pin'>
                                                                    <i
                                                                        onClick={(e) => markAttendance(e, item.id)}
                                                                        className="fa fa-check text-white"
                                                                    ></i>
                                                                </span>
                                                            delete_button = ""
                                                        } else if (item.sta_status == 'Marked') {
                                                            pin_status = <span className="badge bg-success">Present</span>
                                                            delete_button =
                                                                <span className="badge bg-danger mr-2" type="button" title='Cancel'>
                                                                    <i
                                                                        onClick={(e) => returnAttend(e, item.id)}
                                                                        className="fa fa-times text-white"
                                                                    ></i>
                                                                </span>
                                                            buttonCheck = ""
                                                        }
                                                        else if (item.sta_status == 'Pending') {
                                                            pin_status = <span className="badge bg-secondary">Pending</span>
                                                            buttonCheck =
                                                                <span className="badge bg-info mr-2" type="button" title='Mark Present'>
                                                                    <i
                                                                        onClick={(e) => markAttendance(e, item.id)}
                                                                        className="fa fa-check text-white"
                                                                    ></i>
                                                                </span>
                                                        }
                                                        return (
                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>{item.sta_stu_name}</td>
                                                                <td>{item.sta_admin_no}</td>
                                                                <td>{item.sta_class_name}</td>
                                                                <td>{pin_status}</td>
                                                                <td>{item.sta_mark_date}</td>
                                                                <td>
                                                                    {buttonCheck}
                                                                    {" "}
                                                                    {delete_button}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* this is to mark all attendance at once... */}
            <Modal show={activateAll} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Caution</Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Are you sure you want to mark all present?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleAllClose}>
                        Close
                    </Button>
                    <Button variant="info" size="sm" onClick={(e) => markAll(e, activate_id)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default StartMarkAttendnace;