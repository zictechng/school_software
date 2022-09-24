import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import ReactToPrint from "react-to-print";

function ViewAssignment(props) {
    document.title = "View Assignment Result Details | " + window.companyName;
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
    const [all_subjects, setAllSubjects] = useState([]);
    const [all_class, setAllClass] = useState([]);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        sub_subject_name: ''
    });
    const [picture, setPicture] = useState([]);

    /* this handle file/image fields */
    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    }

    const [subjectInputs, setSubjectInputs] = useState({
        id: '',
        assign_title: '',
        assign_body: '',
        assign_class: '',
        add_subject: '',
        assign_file: '',
        assign_type: '',
        assign_submission_date: '',
        assign_tid: '',
    });
    const handleEdit = (e) => {
        e.persist();
        setSubjectInputs({ ...subjectInputs, [e.target.name]: e.target.value })
    }
    // update subject edit here..
    const submitUpdate = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('message_body', subjectInputs.assign_body);
        formData.append('title', subjectInputs.assign_title);
        formData.append('submit_date', subjectInputs.assign_submission_date);
        formData.append('assignment_type', subjectInputs.assign_type);
        formData.append('tid', subjectInputs.assign_tid);
        formData.append('id', subjectInputs.id);

        formData.append('subject', subjectInputs.add_subject);

        // const recordId = {
        //     id: subjectInputs.id,
        //     assign_title: subjectInputs.assign_title,
        //     assign_body: subjectInputs.assign_body,
        //     assign_class: subjectInputs.assign_class,
        //     add_subject: subjectInputs.add_subject,
        //     assign_file: subjectInputs.assign_file,
        //     assign_type: subjectInputs.assign_type,
        //     assign_submission_date: subjectInputs.assign_submission_date,
        //     assign_tid: subjectInputs.assign_tid,
        // }
        // let create the api url here
        axios.post(`/api/save_assign_update`, formData).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                setSubjectInputs({
                    sub_subject_name: subjectInputs.sub_subject_name,
                    id: subjectInputs.id,
                });
                getAssignment();
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
    const getAssignment = () => {
        const id = props.match.params.id;
        //console.log(props.match.params.id);
        setIsLoading(true)
        try {
            // let create the api url here
            axios.get(`/api/get_assignment_id/${id}`).then(res => {
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
        getAssignment();
        return () => {
        };
    }, [props.match.params.id, history]);

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
                    getAssignment();
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
        axios.get(`/api/fetch_edit_assign/${subjectId}`).then(res => {
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

    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_myclass`).then(res => {
            if (res.data.status === 200) {
                setAllClass(res.data.allDetails.class_details);
                setAllSubjects(res.data.allDetails.subject_details);
                //console.log(res.data.allDetails.subject_details);
                //console.log(res.data.allDetails.class_details);
            }
        });
    }, []);
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
                            <h4 className="m-0">Assignment Details Preview:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <button type="button" onClick={(e) => editSchoolCategory(get_subject.assign_tid)} className="btn btn-block btn-danger btn-sm" data-tip="Delete all" data-place="bottom">
                                        <i className="fa fa-edit text-white"></i>
                                    </button>

                                </li>
                                <li className='mr-3'>
                                    <Link to='/staff/assignment'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Back" data-place="bottom"><i className='fa fa-arrow-left'> Back</i> </button>
                                    </Link>
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
                                                        <i className="fas fa-th" /> <a style={p}> Subjects:  {get_subject.add_subject} | Class: {get_class.assign_class}</a>
                                                        <small className="float-right">Btach ID: <a style={p}> {get_subject.assign_tid}</a></small>
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
                                                                    <th>TID</th>
                                                                    <th>Title</th>
                                                                    <th>Assignment Type</th>
                                                                    <th>Submission Date</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {show_subjects.map((item, i) => {
                                                                    if (item.assign_status == 'Active')// this mean product is active
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
                                                                    else if (item.assign_status == 'Deleted')// this mean product is active
                                                                    {
                                                                        pin_status = <span style={p}>Deleted</span>
                                                                        buttonCheck =
                                                                            <span className="badge bg-danger">Deleted</span>
                                                                        delete_button = ""

                                                                    }
                                                                    else if (item.assign_status == 'Pending') {
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
                                                                            <td>{item.assign_tid}</td>
                                                                            <td>{item.assign_title}</td>
                                                                            <td>{item.assign_type}</td>
                                                                            <td>{item.assign_submission_date}</td>

                                                                        </tr>
                                                                    )
                                                                })
                                                                }

                                                            </tbody>
                                                        </table>
                                                        <br />

                                                        <table className="table table-bordered table-sm">
                                                            <thead>
                                                                <tr>
                                                                    <th>Message Body</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {show_subjects.map((item, i) => {
                                                                    return (
                                                                        <tr key={i}>
                                                                            <td>{item.assign_body}</td>
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

                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label style={p}>Title</label>
                                    <input type="text" name="assign_title" value={subjectInputs.assign_title} onChange={handleEdit} className="form-control" placeholder="CA 1" />
                                    <small className='text-danger'>{list_error.assign_title}</small>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label style={p}>Assignment Type</label>
                                    <select name='assign_type' onChange={handleEdit} value={subjectInputs.assign_type} className='form-control'>
                                        <option>{subjectInputs.assign_type}</option>
                                        <option value="Home Work"> Home Work</option>
                                        <option value="Class Work"> Class Work</option>
                                    </select>
                                    <small className='text-danger'>{list_error.assign_type}</small>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label style={p}>Submission Date</label>
                                    <input type="date" name="assign_submission_date" onChange={handleEdit} value={subjectInputs.assign_submission_date} className="form-control" placeholder="Submission Date" />
                                    <small className='text-danger'>{list_error.assign_submission_date}</small>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label style={p}>Subject</label>
                                    <select name='add_subject' onChange={handleEdit} value={subjectInputs.add_subject} className='form-control'>
                                        <option>{subjectInputs.add_subject}</option>
                                        {
                                            all_subjects.map((item) => {
                                                return (
                                                    <option value={item.sub_subject_name} key={item.id}>{item.sub_subject_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <small className='text-danger'>{list_error.add_subject}</small>
                                </div>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-sm-9">
                                <div className="form-group">
                                    <label style={p}>File</label>
                                    <input type="file" name="image" onChange={handleImage} className="form-control" placeholder="File" />

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label style={p}>Message Body</label>
                                    <textarea name='assign_body' onChange={handleEdit}
                                        value={subjectInputs.assign_body} className="form-control" style={{ height: 100 }} placeholder="Type your assignment message here" />
                                    <small className='text-danger'>{list_error.assign_body}</small>
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

export default ViewAssignment;