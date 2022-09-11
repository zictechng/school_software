import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function ViewAttendance(props) {
    document.title = "View Attendance Report Sheet | " + window.companyName;
    const history = useHistory();
    const [fetch_attendance, setFetchAttendance] = useState([]);
    const [attendance_class, setAttendanceClass] = useState('');
    const [isfetchLoading, setIsFetchloading] = useState(false);
    const [loading, setLoading] = useState(true);

    // create a function to fetch class data here
    const getDetails = () => {
        const id = props.match.params.id;
        axios.get(`/api/fetch_view_attend/${id}`).then(res => {
            if (res.data.status === 200) {
                setFetchAttendance(res.data.all_attenDetails.proDetails);
                setAttendanceClass(res.data.all_attenDetails.pDetails)
            }
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
                //history.push('/staff/attendance');
            }
            else {
                toast.warning("Something went wrong! Try again", { position: 'top-center', theme: 'colored' });
                //history.push('/staff/attendance');
            }
            setLoading(false);

        });
    }
    useEffect(() => {
        getDetails();
    }, [props.match.params.id, history]);

    // remove student attendance here...
    const removeAttend = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML =
            "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to returned attendance here */
        try {
            axios.delete(`/api/remove_attendance/${id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    getDetails();
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

    // delete all student attendance at once here..
    const deleteAll = (e, delete_id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML =
            "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to mark all attendance once here */
        try {
            axios.delete(`/api/delete_attend_all/${delete_id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    history.push(`/staff/attendance`);
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
    // action activate all modal here...
    const [delete_id, setDeleteID] = useState("");
    const [deleteAll_data, setDeleteAllData] = useState(false);

    const handleAllClose = () => {
        setDeleteAllData(false)
    }
    const delete_alls = (atten_tid) => {
        setDeleteID(atten_tid);
        setDeleteAllData(true);
    }
    var table_record = "";
    var buttonMark = '';
    var buttonCheck = "";
    if (fetch_attendance.length > 0) {
        table_record = <div>
            <table id="example1" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Admin. No.</th>
                        <th>Current Class</th>
                        <th>Mark Date</th>
                        <th>Submitted Date</th>
                        <th>Added By</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {fetch_attendance.map((item, i) => {
                        if (item.atten_status == 'Active')// this mean product is active
                        {
                            buttonCheck =
                                <span className="badge bg-info mr-2" type="button" title='Delete Attendance'>
                                    <i
                                        onClick={(e) => removeAttend(e, item.id)}
                                        className="fa fa-times text-white"
                                    ></i>
                                </span>
                        } else if (item.atten_status == 'Deleted') {
                            buttonCheck =
                                <span className="badge bg-danger mr-2" type="button">
                                    Deleted
                                </span>
                        }
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.atten_stu_name}</td>
                                <td>{item.atten_admin_no}</td>
                                <td>{item.atten_class_name}</td>
                                <td>{item.atten_mark_date}</td>
                                <td>{item.atten_submit_date}</td>
                                <td>{item.atten_addeby}</td>
                                <td>
                                    {buttonCheck}
                                    {buttonMark}
                                </td>

                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    }
    else if (fetch_attendance.length < 1) {
        table_record = <div className='text-center'>
            <p>No record at the moment</p>
        </div>
    }
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    if (loading) {
        return (
            <div className="card-body">
                <div className='text-center'>
                    <div className="spinner-border spinner-border-sm text-info" role="status">
                    </div> Loading
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Student attendance marked sheet:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <Link to='/staff/attendance'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom">
                                        <i className='fa fa-arrow-left'></i> Back
                                    </button>
                                    </Link>
                                </li>
                                <li className='mr-3'>
                                    <Link to='#'><button type="button" onClick={(e) => delete_alls(attendance_class.atten_tid)} className="btn btn-block btn-danger btn-sm" data-tip="Delete All" data-place="bottom">
                                        <i className='fa fa-trash'></i> Trash All
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
                        Preview already marked attendance details for any correction here...
                    </p>
                    <div className="card-body">
                        <div className="card table-responsive">
                            <div className="card-header">
                                <h3 className="card-title"><p style={p}> List of all student attendance marked for |  <span className="badge bg-secondary mr-2" type="button">
                                    {attendance_class.atten_class_name}
                                </span> {" "}
                                    Marked Date
                                    {" "}
                                    <span className="badge bg-secondary mr-2" type="button">
                                        {attendance_class.atten_mark_date}
                                    </span>
                                </p>
                                </h3>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body">
                                <div className='text-center'>
                                    {isfetchLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                </div>
                                {table_record}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* this is to delete all attendance at once... */}
            <Modal show={deleteAll_data} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Caution</Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Are you sure you want to delete this?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleAllClose}>
                        Close
                    </Button>
                    <Button variant="info" size="sm" onClick={(e) => deleteAll(e, delete_id)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default ViewAttendance;