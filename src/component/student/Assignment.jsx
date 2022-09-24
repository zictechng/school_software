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

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    // create a function to fetch all data here
    const getAllResult = (PageNumber = 1) => {
        try {
            setIsLoading(true)
            // let create the api url here
            axios.get(`/api/my_assignment?page=${PageNumber}`).then(res => {
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
            <div style={style}>
                <div className='text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div>
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
                                <a href={item.assign_file} data-tip="View attachment" data-place="bottom" target="_blank"><i className='fas fa-paperclip'></i></a>

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
                                <td>
                                    {" "} {" "}
                                    <Link to={`view-assignment/${item.assign_tid}`} data-tip="View Assignment Details" data-place="bottom"><span className='badge bg-info' type='button'> View</span></Link>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>

        </div>
    }
    return (
        <>
            <div className="content-header">
                <div className="container" >
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-7">
                                <h1 className="m-0" style={p}>Assignment <small></small></h1>
                            </div>
                            <div className="col-sm-5">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to="/student/index"><li className="breadcrumb-item"> <button type="button" className="btn btn-block btn-secondary btn-sm"> Back</button></li></Link>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <br />
                    <br />
                    {/* <div className="row mt-5">
                        <div className='col-12'>
                            <div className="alert alert-info alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h5><i className="icon fas fa-info" /> Info!</h5>
                                We keep tracks of your notifications that you sent out and receive from other users.
                            </div>

                        </div>
                    </div> */}
                    <div className="overlay-wrapper">
                        <section className="content">
                            <div className="row">
                                <div className="col-md-11">
                                    <div className="card card-dark card-outline">
                                        <div className="card-header">
                                            <h3 className="card-title">Assignment Details</h3>
                                            <div className="card-tools">
                                                <div className="input-group input-group-sm">
                                                    <input type="text" className="form-control" placeholder="Search Mail" />
                                                    <div className="input-group-append">
                                                        <div className="btn btn-dark">
                                                            <i className="fas fa-search" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {result_details.data.length ? table_record :
                                            <div className='text-center'>
                                                <p style={p}> No record at the moment</p>
                                            </div>}

                                        <div className="card-footer p-0">
                                            <div className="mailbox-controls">
                                                <div className="btn-group">
                                                    <nav aria-label="Page navigation example">
                                                        <ul className="pagination justify-content align-items-center mr-3">
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Assignment;