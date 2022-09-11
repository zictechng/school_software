import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import ReactToPrint from "react-to-print";

function ViewResultDetails(props) {
    document.title = "View Subject Result Details | " + window.companyName;
    const componentRef = useRef(null);

    const history = useHistory();
    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [show_subjects, setShowSubject] = useState([]);
    const [get_staff_details, setStaffDetails] = useState('');
    const [get_all_subject, setGetAllSubject] = useState([]);
    const [get_subject, setGetSubject] = useState([]);
    const [get_class, setGetClass] = useState([]);
    const [list_error, setListError] = useState([]);
    const [is_loading, setIsLoading] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [current_subject, setCurrentSubject] = useState(false);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        sub_subject_name: ''
    });
    const [subjectInputs, setSubjectInputs] = useState({
        id: '',
        first_ca: '',
        second_ca: '',
        tca_score: '',
        exam_scores: '',
        total_scores: '',
        grade: '',
        remark: '',
        position: '',
        average_scores: '',
        result_highest: '',
        result_lowest: '',

    });
    const handleEdit = (e) => {
        e.persist();
        setSubjectInputs({ ...subjectInputs, [e.target.name]: e.target.value })
    }
    // update subject edit here..
    const submitUpdate = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const recordId = {
            id: subjectInputs.id,
            first_ca: subjectInputs.first_ca,
            second_ca: subjectInputs.second_ca,
            tca_score: subjectInputs.tca_score,
            exam_scores: subjectInputs.exam_scores,
            total_scores: subjectInputs.total_scores,
            grade: subjectInputs.grade,
            remark: subjectInputs.remark,
            position: subjectInputs.position,
            average_scores: subjectInputs.average_scores,
            result_highest: subjectInputs.result_highest,
            result_lowest: subjectInputs.result_lowest,

        }
        // let create the api url here
        axios.post(`/api/save_result_subject_update`, recordId).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                setSubjectInputs({
                    sub_subject_name: subjectInputs.sub_subject_name,
                    id: subjectInputs.id,
                });
                getSubject();
                setEditSubjectDetails(false)
                setListError([]);
                setIsLoading(false);
            }
            // record already exist
            else if (res.data.status === 402) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // data input required
            else if (res.data.status === 422) {
                toast.error('Missing Data Required', { theme: 'colored' });
                setListError(res.data.errors);

            }
            // error record not save
            else if (res.data.status === 500) {
                toast.warning('Error occurred, try again', { position: 'top-center', theme: 'colored' });
                setListError(res.data.errors);

            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { theme: 'colored' });
            }
            setIsLoading(false);

        });
    }
    // create a function to fetch all data here
    const getSubject = () => {
        const id = props.match.params.id;
        //console.log(props.match.params.id);
        setIsLoading(true)
        try {
            // let create the api url here
            axios.get(`/api/get_subject_id/${id}`).then(res => {
                if (res.data.status === 200) {
                    setShowSubject(res.data.sub_assignDetails.proDetails);
                    setStaffDetails(res.data.sub_assignDetails.pDetails);
                    setGetSubject(res.data.sub_assignDetails.pSubject);
                    setGetClass(res.data.sub_assignDetails.pClass);
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
        getSubject();
        return () => {
        };
    }, [props.match.params.id, history]);

    // Activate single scratch card here...
    const deleteAll = (e, delete_all_id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML =
            "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to returned attendance here */
        try {
            axios.delete(`/api/delete_all_subject_result/${delete_all_id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    getSubject();
                    thisClicked.innerHTML =
                        "Delete All";

                } else if (res.data.status === 402) {
                    toast.warning(res.data.message, { theme: "colored" });
                }
                else if (res.data.status === 404) {
                    toast.warning(res.data.message, { theme: "colored" });
                    thisClicked.innerHTML =
                        "Delete All";
                }
                setDeActivateAll(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error occurred! Try again. ".error, {
                theme: "colored",
            });
        }
    };

    // create a function to fetch class data here
    useEffect(() => {
        setLoading(true);
        axios.get(`/api/fetch_subject`).then(res => {
            if (res.data.status === 200) {
                setGetAllSubject(res.data.subject_record);
            }
            else {
                toast.error("sorry, data missing! Try again.", { theme: 'colored' });
            }
            setLoading(false);
        });
    }, []);
    // Delete single subject here...
    const deleteSubjectDetails = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML =
            "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to returned attendance here */
        try {
            axios.delete(`/api/delete_subject_result/${id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    getSubject();
                    thisClicked.innerHTML = ""
                } else if (res.data.status === 402) {
                    toast.warning(res.data.message, { theme: "colored" });
                }
            });
            setDeleteDetails(false);
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error occurred! Try again. ".error, {
                theme: "colored",
            });
        }
    };

    // action de-activate all modal here...
    const [delete_all_id, setDeleteAllID] = useState("");
    const [deactivateAll, setDeActivateAll] = useState(false);

    const handleDeAllClose = () => {
        setDeActivateAll(false)
    }
    const deactivate_all = (tid_code) => {
        setDeleteAllID(tid_code);
        setDeActivateAll(true);
    }

    // delete scratch card modal here
    const [id, setDeleteID] = useState("");
    const [deleteDetails, setDeleteDetails] = useState(false);
    // action modal here...
    const handleDeleteClose = () => {
        setDeleteDetails(false)
    }
    const delete_id = (id) => {
        setDeleteID(id);
        setDeleteDetails(true);
    }

    // Activate scratch card modal here
    const [subjectId, setEditSubject] = useState("");
    const [editSubjectModal, setEditSubjectDetails] = useState(false);
    // action modal here...
    const handleActivateClose = () => {
        setEditSubjectDetails(false)
    }
    const editModal = (id) => {
        setEditSubject(id);
        setEditSubjectDetails(true);
    }

    // get academic term on button click here 
    const editSchoolCategory = (subjectId) => {
        // let create the api url here
        axios.get(`/api/fetch_subject_result/${subjectId}`).then(res => {
            if (res.data.status === 200) {
                setSubjectInputs(res.data.fetch_info);
                //setCurrentSubject(res.data.fetch_info.sub_subject_name)
                setEditSubjectDetails(true)
            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { theme: 'colored' });
            }

        });
    }
    // CODE FOR SELECT 2
    const subjectOption = [];
    get_all_subject.map((term) => {
        subjectOption.push({ value: term.id, label: term.subject_name });
    });
    function handleSelectInput(stateName, selectedItem) {
        setFormData({ ...formData, [stateName]: selectedItem.value });
    }

    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    var buttonCheck = ""
    var pin_status = ""
    var delete_button = ""
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
                            <h4 className="m-0">Result Details Preview:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <Link to='/staff/result'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Back" data-place="bottom"><i className='fa fa-arrow-left'> Back</i> </button>
                                    </Link>
                                </li>
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-danger btn-sm" data-tip="Delete all" onClick={(e) => deactivate_all(get_staff_details.tid_code)} data-place="bottom">Delete All</button>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <p style={p}>
                        You can easily preview the result details in the system here delete /
                        edit any time.
                    </p>
                    <section className="content" >
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="invoice p-3 mb-3">
                                        <div className='' ref={componentRef}>
                                            <div className="row">
                                                <div className="col-12">
                                                    <h4>
                                                        <i className="fas fa-th" /> <a style={p}> Subjects:  {get_subject.subject_name} | Class: {get_class.class_name}</a>
                                                        <small className="float-right">Btach ID: <a style={p}> {get_staff_details.tid_code}</a></small>
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 table-responsive">
                                                    <div className="card-body">
                                                        <table className="table table-bordered table-sm">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ width: 10 }}>#</th>
                                                                    <th>Admin Number</th>
                                                                    <th>Student Name</th>
                                                                    <th>CA 1</th>
                                                                    <th>CA 2</th>
                                                                    <th>Total CA</th>
                                                                    <th>Exam Score</th>
                                                                    <th>Total</th>
                                                                    <th>Grade</th>
                                                                    <th>Remark</th>
                                                                    <th>Position</th>
                                                                    <th>Average Score</th>
                                                                    <th>Status</th>
                                                                    <th>Added By</th>
                                                                    <th>Date</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {show_subjects.map((item, i) => {
                                                                    if (item.result_status == 'Active')// this mean product is active
                                                                    {
                                                                        pin_status = <span className="badge bg-success">Active</span>
                                                                        buttonCheck =
                                                                            <span className="badge bg-secondary mr-2" type="button" title='Edit Subject'>
                                                                                <i
                                                                                    onClick={(e) => editSchoolCategory(item.id)}
                                                                                    className="fa fa-edit text-white"
                                                                                ></i>
                                                                            </span>
                                                                        delete_button =
                                                                            <span className="badge bg-danger mr-2" type="button" title='Delete Subject'>
                                                                                <i
                                                                                    onClick={(e) => delete_id(item.id)}
                                                                                    className="fa fa-trash text-white"
                                                                                ></i>
                                                                            </span>
                                                                    }
                                                                    else if (item.result_status == 'Deleted')// this mean product is active
                                                                    {
                                                                        pin_status = <span style={p}>Deleted</span>
                                                                        buttonCheck =
                                                                            <span className="badge bg-danger">Deleted</span>
                                                                        delete_button = ""

                                                                    }
                                                                    else if (item.result_status == 'Pending') {
                                                                        pin_status = <span className="badge bg-secondary">Pending</span>
                                                                        buttonCheck =
                                                                            <span className="badge bg-info mr-2" type="button" title='Activate Subject'>
                                                                                <i
                                                                                    onClick={(e) => editSchoolCategory(item.id)}
                                                                                    className="fa fa-check text-white"
                                                                                ></i>
                                                                            </span>
                                                                        delete_button =
                                                                            <span className="badge bg-danger mr-2" type="button" title='Delete Subject'>
                                                                                <i
                                                                                    onClick={(e) => delete_id(item.id)}
                                                                                    className="fa fa-trash text-white"
                                                                                ></i>
                                                                            </span>
                                                                    }
                                                                    return (
                                                                        <tr key={i}>
                                                                            <td>{i + 1}</td>
                                                                            <td>{item.admin_number}</td>
                                                                            <td>{item.student_name}</td>
                                                                            <td>{item.first_ca}</td>
                                                                            <td>{item.second_ca}</td>
                                                                            <td>{item.tca_score}</td>
                                                                            <td>{item.exam_scores}</td>
                                                                            <td>{item.total_scores}</td>
                                                                            <td>{item.grade}</td>
                                                                            <td>{item.remark}</td>
                                                                            <td>{item.position}</td>
                                                                            <td>{item.average_scores}</td>
                                                                            <td>{pin_status}</td>
                                                                            <td>{item.username}</td>
                                                                            <td>{item.result_date}</td>
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
                                                {/* /.col */}
                                            </div>
                                        </div>
                                        <div className="row no-print">
                                            <div className="col-12">
                                                <ReactToPrint
                                                    trigger={() => <button className="btn btn-secondary float-right"><i className="fas fa-print" />Print</button>}
                                                    content={() => componentRef.current}
                                                    documentTile="Student Result Score"
                                                />

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            {/* this is to activate all card at once... */}

            <Modal show={deleteDetails} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Caution</Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Are you sure you want to delete this ?</h5>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleDeleteClose}>
                        Close
                    </Button>
                    <Button variant="info" size="sm" onClick={(e) => deleteSubjectDetails(e, id)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={editSubjectModal} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title><b>Caution:</b> Please be sure before you do this!</Modal.Title>
                </Modal.Header>
                {is_loading && <div className='overlay text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div>
                </div>}
                <form>
                    <Modal.Body>
                        <h4>Student Name: {subjectInputs.student_name}</h4>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label style={p}>CA 1</label>
                                    <input type="text" name="first_ca" value={subjectInputs.first_ca} onChange={handleEdit} className="form-control" placeholder="CA 1" />
                                    <small className='text-danger'>{list_error.first_ca}</small>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label style={p}>CA 2</label>
                                    <input type="text" name="second_ca" value={subjectInputs.second_ca} onChange={handleEdit} className="form-control" placeholder="CA 2" />
                                    <small className='text-danger'>{list_error.second_ca}</small>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label style={p}>Total CA</label>
                                    <input type="text" name="tca_score" value={subjectInputs.tca_score} onChange={handleEdit} className="form-control" placeholder="Total CA" />
                                    <small className='text-danger'>{list_error.tca_score}</small>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label style={p}>Exam Score</label>
                                    <input type="text" name="exam_scores" value={subjectInputs.exam_scores} onChange={handleEdit} className="form-control" placeholder="Exam Score" />
                                    <small className='text-danger'>{list_error.exam_scores}</small>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label style={p}>Total Score</label>
                                    <input type="text" name="total_scores" value={subjectInputs.total_scores} onChange={handleEdit} className="form-control" placeholder="Total Score" />
                                    <small className='text-danger'>{list_error.total_scores}</small>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label style={p}>Grade</label>
                                    <input type="text" name="grade" value={subjectInputs.grade} onChange={handleEdit} className="form-control" placeholder="Grade" />
                                    <small className='text-danger'>{list_error.grade}</small>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label style={p}>Remark</label>
                                    <input type="text" name="remark" value={subjectInputs.remark} onChange={handleEdit} className="form-control" placeholder="Remark" />
                                    <small className='text-danger'>{list_error.remark}</small>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label style={p}>Position</label>
                                    <input type="text" name="position" value={subjectInputs.position} onChange={handleEdit} className="form-control" placeholder="Position" />
                                    <small className='text-danger'>{list_error.position}</small>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label style={p}>Average</label>
                                    <input type="text" name="average_scores" value={subjectInputs.average_scores} onChange={handleEdit} className="form-control" placeholder="Average Score" />
                                    <small className='text-danger'>{list_error.average_scores}</small>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label style={p}>Highest Score</label>
                                    <input type="text" name="result_highest" value={subjectInputs.result_highest} onChange={handleEdit} className="form-control" placeholder="Highest Score" />
                                    <small className='text-danger'>{list_error.result_highest}</small>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label style={p}>Lowest Score</label>
                                    <input type="text" name="result_lowest" value={subjectInputs.result_lowest} onChange={handleEdit} className="form-control" placeholder="Lowest Score" />
                                    <small className='text-danger'>{list_error.result_lowest}</small>
                                </div>

                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label style={p}>Status</label>
                                    <input type="text" value={subjectInputs.result_status} onChange={handleEdit} className="form-control" placeholder="Status" />
                                </div>
                            </div>
                        </div>
                        <div className="row">

                            <input type="hidden" readOnly name='id' onChange={handleEdit} value={subjectInputs.id} className="form-control" placeholder="ID" />
                        </div>
                        {id}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" size="sm" onClick={handleActivateClose}>
                            Close
                        </Button>
                        <Button variant="info" size="sm" disabled={is_loading}
                            onClick={(e) => submitUpdate(e)}>
                            {is_loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Update
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal show={deactivateAll} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Caution</Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Are you sure you want to delete all results ?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleDeAllClose}>
                        Close
                    </Button>
                    <Button variant="info" size="sm" onClick={(e) => deleteAll(e, delete_all_id)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ViewResultDetails;