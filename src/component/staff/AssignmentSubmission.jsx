import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import Select from "react-select";
import axios from 'axios';
import Pagination from 'react-js-pagination';

function AssignmentSubmission() {
    const history = useHistory();
    document.title = "Assignment Details | " + window.companyName;
    const [result_details, setResultDetails] = useState([]);

    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [is_loading, setIsLoading] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    // create a function to fetch all data here
    const getAllResult = (PageNumber = 1) => {
        try {
            setIsLoading(true)
            // let create the api url here
            axios.get(`/api/fetch_submission_assignment?page=${PageNumber}`).then(res => {
                if (res.data.status === 200) {
                    setResultDetails(res.data.allPostResult);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
                }
                setIsFetchloading(false);
                setIsLoading(false)

                //setLoading(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
        }
    }
    useEffect(() => {
        // call the function here
        getAllResult();
        return () => {
        };
    }, []);

    // delete operation using modal dialog comes here
    const [deleteID, setDeleteID] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    }

    const deleteDetails = (id) => {
        setDeleteID(id);
        setShow(true);
    }
    const handleDeleteItem = (e, deleteID) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML = "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to delete the record from the database here */
        try {
            axios.post(`/api/delete_assign/${deleteID}`).then(res => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: 'colored' });
                    //thisClicked.closest("tr").remove();
                    setShow(false);
                    getAllResult();
                }
                else if (res.data.status === 402) {
                    toast.warning(res.data.message, { theme: 'colored' });
                    thisClicked.innerHTML = "<i className='fa fa-trash-o'></i>";
                }

            })
        } catch (e) {
            // Handle the error
            toast.error("sorry, server error occurred! Try again. ".error, { theme: 'colored' });
        }
    }
    const [add_message, setAdminUserInput] = useState({
        score: '',
        submission_status: '',
        message_body: '',
        record_id: '',
        error_list: [],
    });
    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setAdminUserInput({ ...add_message, [e.target.name]: e.target.value })
    }
    const submitMessage = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            score: add_message.score,
            submission_status: add_message.submission_status,
            message_body: add_message.message_body,
            record_id: deleteID,
        }
        console.log(deleteID);
        //console.log(record_id);
        try {
            // let create the api url here
            axios.post(`/api/send_assignment_remark`, data, deleteID).then(res => {
                if (res.data.status === 200) {
                    // successful message
                    toast.success(res.data.message, { theme: 'colored' });
                    setAdminUserInput({
                        ...add_message,
                        message_to: '',
                        message_subject: '',
                        message_body: '',
                    });
                    setIsloading(false);
                    setShow(false);
                    getAllResult();
                }
                // record already exist
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: 'colored' });

                }
                // data input required
                else if (res.data.status === 422) {
                    toast.error('Missing Data Required', { theme: 'colored' });
                    setAdminUserInput({ ...add_message, error_list: res.data.errors });
                    setIsloading(false);
                }
                // error record not save
                else if (res.data.status === 500) {
                    toast.warning('Missing Data Required', { position: 'top-center', theme: 'colored' });
                    setAdminUserInput({ ...add_message, error_list: res.data.errors });
                    setIsloading(false);
                    setShow(false)
                }
                // error record not save
                else if (res.data.status === 504) {
                    toast.warning(res.data.message, { position: 'top-center', theme: 'colored' });
                    setIsloading(false);
                    setShow(false)
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                    setIsloading(false);
                    setShow(false)
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { theme: 'colored' });
                }

            });

        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setIsloading(false);
        }

    }
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    const { data, current_page, per_page, total, from, to, last_page } = result_details
    if (isfetchLoading) {
        return (
            <div className='text-center'>
                <div className="spinner-border spinner-border text-info" role="status">
                </div>
            </div>
        )
    }
    var file_link = ""
    var pin_status = ""
    var delete_button = ""

    var table_record = "";
    if (result_details.data.length > 0) {
        table_record = <div>
            <table id="example1" className="table table-bordered table-striped table-sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Student Name</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>File</th>
                        <th>Remark</th>
                        <th>Date</th>
                        <th>Scores</th>
                    </tr>
                </thead>
                <tbody>
                    {result_details.data.map((item, i) => {

                        if (item.assign_file_name === null)// this mean product is active
                        {
                            pin_status = <span className="badge bg-success">Active</span>
                            file_link =
                                <span className="badge bg-secondary mr-2" title='No file'>
                                    No attachment
                                </span>

                        }
                        else if (item.assign_file_name !== '')// this mean product is active
                        {
                            pin_status = <span style={p}>Deleted</span>
                            file_link =
                                <a href={item.assign_file_path} data-tip="View attachment" data-place="bottom" target="_blank"><i className='fas fa-paperclip'></i></a>
                        }
                        return (
                            <tr key={i}>
                                <td>{i + from}</td>
                                <td>{item.student_name.surname + " " + item.student_name.other_name}</td>
                                <td>{item.assign_message}</td>
                                <td>{item.assign_status}</td>
                                <td>{file_link}</td>
                                <td>{item.assign_remark}</td>
                                <td>{item.assign_submit_date}</td>
                                <td> <span onClick={() => deleteDetails(item.id)} className="badge bg-info mr-2" type="button" data-tip="Score student" data-place="bottom"><i className="fa fa-edit text-white"></i> Scores</span></td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content align-items-center mr-3">
                    <span className='mr-2'> </span>
                    <span className='mr-3' style={p}>{current_page} - {to} / {total}</span>
                    <Pagination
                        activePage={current_page}
                        totalItemsCount={total}
                        itemsCountPerPage={per_page}
                        onChange={(pageNumber) => getAllResult(pageNumber)}
                        renderOnZeroPageCount={null}
                        itemClass="page-item"
                        linkClass="page-link"
                        firstPageText="First"
                        lastPageText="Last"
                    />
                </ul>
            </nav>
        </div>
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">

                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Manage Assignment Submission</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <Link to='/staff/assignment'><button type="button" className="btn btn-block btn-info btn-sm" data-tip="Add New Assignment" data-place="bottom">Back to Assignment</button></Link>
                                </li>
                                <li className='mr-3'><Link to='/staff/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>
                    <p style={p}> View and manage your assignment submission details in the system.</p>
                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title"><p style={p}> Current student submitted assignment details </p> </h3>
                            <div className="d-flex justify-content-between">
                                <p></p>
                                <span className="badge mr-2" type="button">
                                    <input name='title' className='form-control form-control-sm' placeholder='Search...' />
                                </span>
                            </div>
                        </div>
                        {/* /.card-header */}
                        {/* {result_ID.r_tid} */}
                        <div className="card-body">
                            <div className='text-center'>
                                {is_loading && <div className='overlay text-center'>
                                    <div className="spinner-border spinner-border text-info" role="status">
                                    </div>
                                </div>
                                }
                            </div>
                            {result_details.data.length ? table_record :
                                <div className='text-center'>
                                    <p style={p}> No record at the moment</p>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>


            <Modal show={show} >
                <Modal.Header style={{ background: '#333234', color: 'white' }}>
                    <Modal.Title>Post remark about this assignment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {deleteID} */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Score</label>
                                <input type="text" name='score' onChange={handleInput} value={add_message.score} className="form-control" placeholder="Enter Score" />
                                <span className='text-danger'>{add_message.error_list.score}</span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Status</label>
                                <select className="form-control" name='submission_status' onChange={handleInput} value={add_message.submission_status}>
                                    <option>Select Status</option>
                                    <option value="Successful">Completed</option>
                                    <option value="Reject">Repeat</option>
                                </select>
                                <span className='text-danger'>{add_message.error_list.submission_status}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-11">
                            <div className="form-group">
                                <div className="input-group">
                                    <textarea name='message_body' onChange={handleInput} value={add_message.message_body}
                                        className="form-control" style={{ height: 150 }} placeholder="Type comment here" />

                                </div>
                                <span className='text-danger'>{add_message.error_list.message_body}</span>
                            </div>
                        </div>
                        {/* <input name='record_id' defaultValue={deleteID} className='form-control' /> */}
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <Button disabled={isLoading} variant="info" onClick={(e) => submitMessage(e)}>
                        {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Post Remark
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
            <ReactTooltip />
        </>
    )
}

export default AssignmentSubmission;