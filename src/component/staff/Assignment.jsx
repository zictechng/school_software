import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import Select from "react-select";
import axios from 'axios';
import Pagination from 'react-js-pagination';

function Assignment() {
    const history = useHistory();
    document.title = "Assignment Details | " + window.companyName;
    const [result_details, setResultDetails] = useState([]);

    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [is_loading, setIsLoading] = useState(false);

    // create a function to fetch all data here
    const getAllResult = (PageNumber = 1) => {
        try {
            setIsLoading(true)
            // let create the api url here
            axios.get(`/api/fetch_myassignment?page=${PageNumber}`).then(res => {
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
            axios.delete(`/api/delete_assign/${deleteID}`).then(res => {
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
                        <th>Title</th>
                        <th>Class</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>File</th>
                        <th>Reg. Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {result_details.data.map((item, i) => {

                        if (item.assign_file == '')// this mean product is active
                        {
                            pin_status = <span className="badge bg-success">Active</span>
                            file_link =
                                <span className="badge bg-secondary mr-2" title='No file'>
                                    No file
                                </span>

                        }
                        else if (item.assign_file !== '')// this mean product is active
                        {
                            pin_status = <span style={p}>Deleted</span>
                            file_link =
                                <Link to={`/` + item.assign_file} data-tip="View attachment" data-place="bottom" target="_blank"><i className='fas fa-paperclip'></i></Link>

                        }

                        return (
                            <tr key={i}>
                                <td>{i + from}</td>
                                <td>{item.assign_title}</td>
                                <td>{item.assign_class}</td>
                                <td>{item.add_subject}</td>
                                <td>{item.assign_status}</td>
                                <td>{file_link}</td>
                                <td>{item.assign_date}</td>
                                <td> <span className="badge bg-danger mr-2" type="button" data-tip="Delete Details" data-place="bottom"><i onClick={() => deleteDetails(item.id)} className="fa fa-trash-o text-white"></i></span>
                                    {" "} {" "}
                                    <Link to={`view-assignment/${item.assign_tid}`} data-tip="View Result Details" data-place="bottom"><span className='badge bg-info' type='button'><i className='fa fa-eye text-white'></i></span></Link>
                                </td>
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
                            <h4 className="m-0">Manage Assignment Details</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <Link to='/staff/add-assignment'><button type="button" className="btn btn-block btn-info btn-sm" data-tip="Add New Assignment" data-place="bottom">Post Assignment</button></Link>
                                </li>
                                <li className='mr-3'><Link to='/staff/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>
                    <p style={p}> View and manage your assignment details in the system.</p>
                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title"><p style={p}> Current posted assignment details </p> </h3>
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
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Caution</Modal.Title>
                </Modal.Header>
                <Modal.Body><h4>Are you sure you want to do this?</h4>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" size="sm" onClick={(e) => handleDeleteItem(e, deleteID)}>
                        Yes
                    </Button>

                </Modal.Footer>
            </Modal>
            <ReactTooltip />
        </>
    )
}

export default Assignment;