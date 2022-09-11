import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function PsychomotorView(props) {
    document.title = "View Psychomotor Domain Details | " + window.companyName;
    const history = useHistory();
    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [show_psychomotor_details, setShowPsychomotorDetails] = useState([]);
    const [get_staff_details, setStaffDetails] = useState('');
    const [get_all_class, setAllClass] = useState([]);
    const [list_error, setListError] = useState([]);
    const [is_loading, setIsLoading] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [current_subject, setCurrentSubject] = useState(false);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        class_name: ''
    });
    const [classInput, setClassInput] = useState({
        id: '',
        effectiveness: '',
        neatness_score: '',
        craft_score: '',
        punctuality_score: '',
        sport_score: '',
    });
    const handleEdit = (e) => {
        e.persist();
        setClassInput({ ...classInput, [e.target.name]: e.target.value })
    }
    // update subject edit here..
    const submitUpdate = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const recordId = {
            id: classInput.id,
            effectiveness: classInput.effectiveness,
            neatness_score: classInput.neatness_score,
            craft_score: classInput.craft_score,
            punctuality_score: classInput.punctuality_score,
            sport_score: classInput.sport_score,
        }
        // let create the api url here
        axios.post(`/api/save_update`, recordId).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                setClassInput({
                    class_name: classInput.class_name,
                    id: classInput.id,
                });
                getPsychomotorView();
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
    const getPsychomotorView = () => {
        const id = props.match.params.id;
        setIsLoading(true)
        try {
            // let create the api url here
            axios.get(`/api/fetchPsychomotor_id/${id}`).then(res => {
                if (res.data.status === 200) {
                    setShowPsychomotorDetails(res.data.sub_assignDetails.proDetails);
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
        getPsychomotorView();
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
            axios.delete(`/api/delete_all/${delete_all_id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    getPsychomotorView();
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
        axios.get(`/api/fetch_staff_details`).then(res => {
            if (res.data.status === 200) {
                setAllClass(res.data.all_Details.class_details);
            }
            else {
                toast.error("sorry, data missing! Try again.", { theme: 'colored' });
            }
            setLoading(false);
        });
    }, []);
    // Delete single subject here...
    const psychomotorDelete = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML =
            "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to returned attendance here */
        try {
            axios.delete(`/api/delete_psychomotor/${id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    getPsychomotorView();
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
    const deactivate_all = (cls__tid) => {
        setDeleteAllID(cls__tid);
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
    const editPsychomotorDetails = (subjectId) => {
        // let create the api url here
        axios.get(`/api/fetch_edit/${subjectId}`).then(res => {
            if (res.data.status === 200) {
                setClassInput(res.data.result.fetch_info);
                setCurrentSubject(res.data.result.className)
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
                            <h4 className="m-0">Preview Psychomotor Domain Detail:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <Link to='/staff/my-psychomotor'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Back" data-place="bottom"><i className='fa fa-arrow-left'> Back</i> </button>
                                    </Link>
                                </li>
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-danger btn-sm" data-tip="Delete all" onClick={(e) => deactivate_all(get_staff_details.saff_tid)} data-place="bottom">Delete All</button>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <p style={p}>
                        You can easily preview and manage psychomotor domain details in the system here, delete /
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
                                                    <a style={p}> {get_staff_details.saff_class} Class</a>
                                                    <small className="float-right">Btach ID: <a style={p}> {get_staff_details.saff_tid}</a></small>
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
                                                                <th>Student Name</th>
                                                                <th>Effectiveness</th>
                                                                <th>Craft</th>
                                                                <th>Neatness</th>
                                                                <th>Punctuality</th>
                                                                <th>Sports</th>
                                                                <th>Status</th>
                                                                <th>Date</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {show_psychomotor_details.map((item, i) => {
                                                                if (item.aff_status == 'Active')// this mean product is active
                                                                {
                                                                    pin_status = <span className="badge bg-success">Active</span>
                                                                    buttonCheck =
                                                                        <span className="badge bg-secondary mr-2" type="button" title='Edit Subject'>
                                                                            <i
                                                                                onClick={(e) => editPsychomotorDetails(item.id)}
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
                                                                else if (item.aff_status == 'Deleted')// this mean product is active
                                                                {
                                                                    pin_status = <span style={p}>Deleted</span>
                                                                    buttonCheck =
                                                                        <span className="badge bg-danger">Deleted</span>
                                                                    delete_button = ""

                                                                }
                                                                else if (item.aff_status == 'Pending') {
                                                                    pin_status = <span className="badge bg-secondary">Pending</span>
                                                                    buttonCheck =
                                                                        <span className="badge bg-info mr-2" type="button" title='Activate Subject'>
                                                                            <i
                                                                                onClick={(e) => editPsychomotorDetails(item.id)}
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
                                                                        <td>{item.aff_student_name}</td>
                                                                        <td>{item.effectiveness}</td>
                                                                        <td>{item.craft_score}</td>
                                                                        <td>{item.neatness_score}</td>
                                                                        <td>{item.punctuality_score}</td>
                                                                        <td>{item.sport_score}</td>
                                                                        <td>{pin_status}</td>
                                                                        <td>{item.aff_date}</td>
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
                                        {/* <div className="row no-print">
                                            <div className="col-12">
                                                <button type="button" className="btn btn-secondary float-right"><i className="fas fa-print" /> Print
                                                </button>
                                            </div>
                                        </div> */}
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
                    <Button variant="info" size="sm" onClick={(e) => psychomotorDelete(e, id)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={editSubjectModal} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title><b>Caution:</b> Please be sure before you do this!</Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Body>
                        <div className='text-center'>
                            {loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}

                        </div>

                        <div className="row">
                            <div className="col-sm-6">
                                {/* text input */}
                                <div className="form-group">
                                    <label>Affective</label>
                                    <input name='effectiveness' onChange={handleEdit} value={classInput.effectiveness} className='form-control' />
                                    <small className='text-danger'>{list_error.effectiveness}</small>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                {/* text input */}
                                <div className="form-group">
                                    <label>Craft</label>
                                    <input name='craft_score' onChange={handleEdit} value={classInput.craft_score} className='form-control' />
                                    <small className='text-danger'>{list_error.craft_score}</small>
                                </div>
                            </div>
                            <input type="hidden" readOnly name='id_name' onChange={handleEdit} value={classInput.id} className="form-control" placeholder="ID" />
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                {/* text input */}
                                <div className="form-group">
                                    <label>Neatness</label>
                                    <input name='neatness_score' onChange={handleEdit} value={classInput.neatness_score} className='form-control' />
                                    <small className='text-danger'>{list_error.neatness_score}</small>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                {/* text input */}
                                <div className="form-group">
                                    <label>Punctuality</label>
                                    <input name='punctuality_score' onChange={handleEdit} value={classInput.punctuality_score} className='form-control' />
                                    <small className='text-danger'>{list_error.punctuality_score}</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            {/* text input */}
                            <div className="form-group">
                                <label>Sport</label>
                                <input name='sport_score' onChange={handleEdit} value={classInput.sport_score} className='form-control' />
                                <small className='text-danger'>{list_error.sport_score}</small>
                            </div>
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
                <Modal.Body><h5>Are you sure you want to delete all record ?</h5>
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

export default PsychomotorView;