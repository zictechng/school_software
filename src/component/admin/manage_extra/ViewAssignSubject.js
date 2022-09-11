import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Select from "react-select";

function ViewAssignSubject(props) {

    document.title = "View Assigned Subject Details | ";
    const history = useHistory();
    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [show_subjects, setShowSubject] = useState([]);
    const [get_staff_details, setStaffDetails] = useState('');
    const [get_all_subject, setGetAllSubject] = useState([]);
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
        }
        // let create the api url here
        axios.post(`/api/save_subject_update`, { data: recordId, ...formData }).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                setSubjectInputs({
                    sub_subject_name: subjectInputs.sub_subject_name,
                    id: subjectInputs.id,
                });
                getAssignSubject();
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
    const getAssignSubject = () => {
        const id = props.match.params.id;
        setIsLoading(true)
        try {
            // let create the api url here
            axios.get(`/api/get_assign_subject_id/${id}`).then(res => {
                if (res.data.status === 200) {
                    setShowSubject(res.data.sub_assignDetails.proDetails);
                    setStaffDetails(res.data.sub_assignDetails.pDetails);
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
        getAssignSubject();
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
            axios.delete(`/api/delete_all_subject/${delete_all_id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    getAssignSubject();
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
            axios.delete(`/api/delete_subject/${id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    getAssignSubject();
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
    const deactivate_all = (sub_tid) => {
        setDeleteAllID(sub_tid);
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
        axios.get(`/api/fetch_subject/${subjectId}`).then(res => {
            if (res.data.status === 200) {
                setSubjectInputs(res.data.fetch_info);
                setCurrentSubject(res.data.fetch_info.sub_subject_name)
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
                            <h4 className="m-0">Assigned Subject Details:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <Link to='/admin/assign-subject'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Back" data-place="bottom"><i className='fa fa-arrow-left'> Back</i> </button>
                                    </Link>
                                </li>
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-danger btn-sm" data-tip="Delete all" onClick={(e) => deactivate_all(get_staff_details.sub_tid)} data-place="bottom">Delete All</button>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <p style={p}>
                        You can easily preview the subjects assigned to each teacher in the system here delete /
                        edit any time.
                    </p>
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="invoice p-3 mb-3">
                                        <div className="row">
                                            <div className="col-12">
                                                <h4>
                                                    <i className="fas fa-user" /><a style={p}> {get_staff_details.sub_teacher_name} Subjects assigned details</a>
                                                    <small className="float-right">Btach ID: <a style={p}> {get_staff_details.sub_tid}</a></small>
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
                                                                <th>Subject Name</th>
                                                                <th>Status</th>
                                                                <th>Added By</th>
                                                                <th>Date</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {show_subjects.map((item, i) => {
                                                                if (item.sub_status == 'Active')// this mean product is active
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
                                                                else if (item.sub_status == 'Deleted')// this mean product is active
                                                                {
                                                                    pin_status = <span style={p}>Deleted</span>
                                                                    buttonCheck =
                                                                        <span className="badge bg-danger">Deleted</span>
                                                                    delete_button = ""

                                                                }
                                                                else if (item.sub_status == 'Pending') {
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
                                                                        <td>{item.sub_subject_name}</td>
                                                                        <td>{pin_status}</td>
                                                                        <td>{item.sub_addby}</td>
                                                                        <td>{item.sub_date}</td>
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
                                        <div className="row no-print">
                                            <div className="col-12">
                                                <button type="button" className="btn btn-secondary float-right"><i className="fas fa-print" /> Print
                                                </button>
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
                            <div className="col-sm-9">
                                <div className="form-group">
                                    <label style={p}>Current Subject Name</label>
                                    <input type="text" defaultValue={current_subject} className="form-control" placeholder="Next Resumption Date" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-9">
                                {/* text input */}
                                <div className="form-group">
                                    <label>Choose New Subject for update</label>
                                    <Select
                                        name="sub_subject_name"
                                        options={subjectOption}
                                        placeholder="Chose new subject for update"
                                        isClearable={true}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        onChange={(e) => handleSelectInput("sub_subject_name", e)}
                                    />
                                    <small className='text-danger'>{list_error.sub_subject_name}</small>
                                </div>
                            </div>
                            <input type="hidden" readOnly name='id_name' onChange={handleEdit} value={subjectInputs.id} className="form-control" placeholder="ID" />
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
                <Modal.Body><h5>Are you sure you want to delete all subjects ?</h5>
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

export default ViewAssignSubject;