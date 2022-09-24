import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import ReactToPrint from "react-to-print";

function ViewCommentDetails(props) {
    document.title = "View Comment Details | ";
    const componentRef = useRef(null);
    const history = useHistory();

    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [show_comment, setShowSubject] = useState([]);
    const [get_all_subject, setGetAllSubject] = useState([]);
    const [get_subject, setGetSubject] = useState([]);
    const [get_class, setGetClass] = useState([]);
    const [list_error, setListError] = useState([]);
    const [is_loading, setIsLoading] = useState(false);

    const [loading, setLoading] = useState(false);

    const [subjectInputs, setSubjectInputs] = useState({
        id: '',
        comm_comment: '',
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
            comm_comment: subjectInputs.comm_comment,
        }
        // let create the api url here
        axios.post(`/api/save_comment_update`, recordId).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                setSubjectInputs({
                    comm_comment: subjectInputs.comm_comment,
                    id: subjectInputs.id,
                });
                getCommentDetails();
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
    const getCommentDetails = () => {
        const id = props.match.params.id;
        //console.log(props.match.params.id);
        setIsLoading(true)
        try {
            // let create the api url here
            axios.get(`/api/get_comment_id/${id}`).then(res => {
                if (res.data.status === 200) {
                    setShowSubject(res.data.all_details.comment_result);
                    setGetSubject(res.data.all_details.start_item);
                    setIsLoading(false);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else if (res.data.status === 500) {
                    toast.error(res.data.message, { theme: 'colored' });
                    setIsFetchloading(false);
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
        getCommentDetails();
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
            axios.delete(`/api/delete_all_comment/${delete_all_id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    thisClicked.innerHTML =
                        "Delete All";
                    history.push(`/admin/comments`);
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
        axios.get(`/api/get_all_subject`).then(res => {
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
    const deleteCommentDetails = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML =
            "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to returned attendance here */
        try {
            axios.delete(`/api/delete_comment_id/${id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    getCommentDetails();
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
    const editComments = (subjectId) => {
        // let create the api url here
        axios.get(`/api/fetch_edit_comment/${subjectId}`).then(res => {
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
                            <h4 className="m-0">Comment Details Preview:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <Link to='/admin/comments'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Back" data-place="bottom"><i className='fa fa-arrow-left'> Back</i> </button>
                                    </Link>
                                </li>
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-danger btn-sm" data-tip="Delete all" onClick={(e) => deactivate_all(get_subject.comm_tid)} data-place="bottom">Delete All</button>
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
                                                        <i className="fas fa-th" /> <a style={p}> Class:  {get_subject.comm_class}</a>
                                                        <small className="float-right">Btach ID: <a style={p}> {get_subject.comm_tid}</a></small>
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
                                                                    <th>Comment Category</th>
                                                                    <th>Status</th>
                                                                    <th>Comment</th>
                                                                    <th>Added By</th>
                                                                    <th>Date</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {show_comment.map((item, i) => {
                                                                    if (item.comm_status == 'Active')// this mean product is active
                                                                    {
                                                                        pin_status = <span className="badge bg-success">Active</span>
                                                                        buttonCheck =
                                                                            <span className="badge bg-secondary mr-2" type="button" title='Edit Subject'>
                                                                                <i
                                                                                    onClick={(e) => editComments(item.id)}
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
                                                                    else if (item.comm_status == 'Deleted')// this mean product is active
                                                                    {
                                                                        pin_status = <span style={p}>Deleted</span>
                                                                        buttonCheck =
                                                                            <span className="badge bg-danger">Deleted</span>
                                                                        delete_button = ""

                                                                    }

                                                                    return (
                                                                        <tr key={i}>
                                                                            <td>{i + 1}</td>
                                                                            <td>{item.comm_stu_number}</td>
                                                                            <td>{item.comm_stu_name}</td>
                                                                            <td>{item.comm_prin_comment}</td>
                                                                            <td>{pin_status}</td>
                                                                            <td>{item.comm_comment}</td>
                                                                            <td>{item.comm_addby}</td>
                                                                            <td>{item.comm_date}</td>
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
                    <Modal.Title>Caution <a className='text-dark'> Operation can not be reversed </a></Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Are you sure you want to delete this ?</h5>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleDeleteClose}>
                        Close
                    </Button>
                    <Button variant="info" size="sm" onClick={(e) => deleteCommentDetails(e, id)}>
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
                        <h4>Student Name: {subjectInputs.comm_stu_name}</h4>
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="form-group">
                                    <label style={p}>Admin Number</label>
                                    <input type="text" name="comm_stu_number" readOnly value={subjectInputs.comm_stu_number} onChange={handleEdit} className="form-control" placeholder="Admin Number" />
                                    <small className='text-danger'>{list_error.comm_stu_number}</small>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label style={p}>Comment</label>
                                    <textarea
                                        name="comm_comment"
                                        value={subjectInputs.comm_comment}
                                        onChange={handleEdit}
                                        className="form-control" rows={2} placeholder="Enter Comment..." />
                                    <small className='text-danger'>{list_error.comm_comment}</small>
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
                    <Modal.Title>Caution: <a className='text-dark'> Operation can not be reversed </a></Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Are you sure you want to delete all comments ?</h5>
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

export default ViewCommentDetails;