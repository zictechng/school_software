import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Select from "react-select";

function TimeTable() {
    const history = useHistory();
    document.title = "School Time Table | ";

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
    });

    const submitGraduation = (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            // let create the api url here
            axios.post(`/api/start_attendance`, formData)
                .then(res => {
                    if (res.data.status === 200) {
                        // successful message
                        setFormData({
                            ...formData,
                            sch_class: '',
                        });
                        e.target.reset();
                        setListError([]);
                        // history.push(`/admin/attendance-view`);
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
            setIsFetchloading(false);
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

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">School Time Table:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-info btn-sm" data-tip="Graduate Student" data-place="bottom" onClick={handleModal}>Add Time Table</button>
                                </li>
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>
                    <p style={p}>
                        School time table will be integrated base on school requirement
                    </p>
                    <div className="card table-responsive">
                        <div className="card-header bg-dark">
                            <h3 className="card-title"> School time table details base on class </h3>
                        </div>
                        <div className="card-body">
                            <div className='text-center'>
                                {is_loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            </div>
                            <div className="card table-responsive">

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} >
                <Modal.Header style={{ background: '#333234', color: 'white' }}>
                    <Modal.Title>Choose class to add time table</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={submitGraduation} className="form-horizontal">
                        <div className="row">
                            <div className="col-sm-9">
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

export default TimeTable;