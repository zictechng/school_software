import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Select from "react-select";

function Attendance() {
    const history = useHistory();
    document.title = "Attendance | ";

    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [attendance, setAttendance] = useState([]);
    const [list_error, setListError] = useState([]);
    const [all_class, setAllClass] = useState([]);
    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);
    const [is_loading, setIsLoading] = useState(false);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        sch_class: '',
        school_year: '',
        sch_term: '',
    });
    const [add_attendInput, setAddAttenInput] = useState({
        mark_date: '',
    });
    const handleInput = (e) => {
        e.persist();
        setAddAttenInput({ ...add_attendInput, [e.target.name]: e.target.value })
    }
    // create a function to fetch all data here
    const getAttendace = () => {
        setIsLoading(true)
        try {
            // let create the api url here
            axios.get(`/api/fetch_attendance`).then(res => {
                if (res.data.status === 200) {
                    setAttendance(res.data.attan_Details.attendance_Details);
                    setIsLoading(false);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
                }
                setIsFetchloading(false);
                setIsLoading(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
        }
    }
    useEffect(() => {
        // call the function here
        getAttendace();
        return () => {
        };
    }, []);

    const submitGraduation = (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            mark_date: add_attendInput.mark_date,
        }
        try {
            // let create the api url here
            axios.post(`/api/start_attendance`,
                {
                    data: formData,
                    ...{
                        mark_date: add_attendInput.mark_date,
                    },
                }).then(res => {
                    if (res.data.status === 200) {
                        // successful message
                        localStorage.setItem("tID", res.data.gDetails.tID);
                        setFormData({
                            ...formData,
                            sch_class: '',
                            school_year: '',
                            mark_date: '',
                            sch_term: '',
                        });
                        e.target.reset();
                        setListError([]);
                        history.push(`/admin/attendance-view`);
                        setLoading(false);
                    }
                    // record not exist
                    else if (res.data.status === 404) {
                        toast.error(res.data.message, { theme: 'colored' });
                    }
                    // data input required
                    else if (res.data.status === 422) {
                        toast.error('Missing Data Required', { theme: 'colored' });
                        setListError(res.data.errors);
                    }
                    // data input required
                    else if (res.data.status === 403) {
                        toast.error(res.data.message, { theme: 'colored' });
                    }
                    // login required
                    else if (res.data.status === 401) {
                        toast.error(res.data.message, { theme: 'colored' });
                    }
                    setLoading(false);

                });

        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setLoading(false);
        }
    }
    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_all_details`).then(res => {
            if (res.data.status === 200) {
                setAllClass(res.data.allDetails.class_details);
                setSchoolYear(res.data.allDetails.session_details);
                setSchoolTerm(res.data.allDetails.term_details);
            }
            else {
                toast.error("sorry, data missing! Try again.", { theme: 'colored' });
            }
        });
    }, []);
    const [showModal, setShowModal] = useState(false);
    const handleModal = () => {
        setShowModal(true);
    }
    const handleClosegrade = () => {
        setShowModal(false);
    }
    // CODE FOR SELECT 2
    const classOptions = [];
    all_class.map((term) => {
        classOptions.push({ value: term.id, label: term.class_name });
    });

    const yearOptions = [];
    schoolYears.map((term) => {
        yearOptions.push({ value: term.id, label: term.academic_name });
    });
    const termOptions = [];
    schoolTerm.map((term) => {
        termOptions.push({ value: term.id, label: term.term_name });
    });
    function handleSelectInput(stateName, selectedItem) {
        setFormData({ ...formData, [stateName]: selectedItem.value });

    }
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    if (isfetchLoading) {
        return (
            <div className="card-body">
                <div className='text-center'>
                    <div className="spinner-border spinner-border-sm text-info" role="status">
                    </div> Loading
                </div>
            </div>
        )
    }
    var table_record = "";
    if (attendance.length > 0) {
        table_record = <div>
            <div className="card-header">
                <h3 className="card-title"><span className='text-danger'></span>
                </h3>
                <div className="d-flex justify-content-between">
                    <p></p>
                    <span className="badge bg-danger mr-2" type="button"></span>
                </div>

            </div>
            <table id="example1" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Class Name</th>
                        <th>Term</th>
                        <th>Year</th>
                        <th>Added By</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.atten_class_name}</td>
                                <td>{item.atten_term_name}</td>
                                <td>{item.atten_year_name}</td>
                                <td>{item.atten_addeby}</td>
                                <td>{item.atten_mark_date}</td>
                                <td>
                                    <Link to={`view-attendance/${item.id}`}><span className='badge bg-info mr-2' type='button'><i className='fa fa-eye text-white'></i></span></Link>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    }
    else {
        table_record = <div className='text-center'>
            <p>No record at the moment</p>
        </div>
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Attendance:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-info btn-sm" data-tip="Graduate Student" data-place="bottom" onClick={handleModal}>Run Attendance</button>
                                </li>
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>
                    <p style={p}>
                        Run and manage student attendance with easy! Click on the run attendance to start
                    </p>
                    <div className="card table-responsive">
                        <div className="card-header bg-dark">
                            <h3 className="card-title"> Student attendance details </h3>
                        </div>

                        <div className="card-body">
                            <div className='text-center'>
                                {is_loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            </div>
                            <div className="card table-responsive">
                                {table_record}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} >
                <Modal.Header style={{ background: '#333234', color: 'white' }}>
                    <Modal.Title>Select Class</Modal.Title>
                </Modal.Header>
                {loading && <div className='overlay text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div>
                </div>}
                <Modal.Body>
                    <form onSubmit={submitGraduation} className="form-horizontal">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Class</label>
                                    <Select
                                        name="sch_class"
                                        options={classOptions}
                                        isClearable={true}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        onChange={(e) => handleSelectInput("sch_class", e)}
                                    />
                                    <small className='text-danger'>{list_error.sch_class}</small>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Year</label>
                                    <Select
                                        name="school_year"
                                        options={yearOptions}
                                        isClearable={true}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        onChange={(e) => handleSelectInput("school_year", e)}
                                    />
                                    <span className="text-danger">
                                        {list_error.school_year}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Term</label>
                                    <Select
                                        name="sch_term"
                                        options={termOptions}
                                        isClearable={true}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        onChange={(e) => handleSelectInput("sch_term", e)}
                                    />
                                    <small className='text-danger'>{list_error.sch_term}</small>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Mark Date</label>
                                    <input type="date" name='mark_date' onChange={handleInput} value={add_attendInput.mark_date} className="form-control" placeholder="Surname" />
                                    <span className='text-danger'>{list_error.mark_date}</span>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button disabled={loading} className="btn btn-success">
                                {loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Proceed
                            </button>
                        </div>
                    </form>
                </Modal.Body>
                <button onClick={handleClosegrade} className="btn btn-danger">Cancel</button>
            </Modal>
        </>
    )
}

export default Attendance;