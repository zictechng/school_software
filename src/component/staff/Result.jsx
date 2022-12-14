import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import Select from "react-select";
import axios from 'axios';
import Pagination from 'react-js-pagination';

function Result() {
    const history = useHistory();
    document.title = "Manage Result | " + window.companyName;
    const [result_details, setResultDetails] = useState([]);
    const [result_ID, setResultID] = useState('');

    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [isLoading, setIsloading] = useState(false);

    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);
    const [all_class, setAllClass] = useState([]);
    const [all_subjects, setAllSubjects] = useState([]);
    const [all_category, setCatogory] = useState([]);

    const [fetch_result, setFetchResult] = useState({});
    const [list_error, setListError] = useState([]);
    const [is_loading, setIsLoading] = useState(false);
    //const [loading, setLoading] = useState(true);
    //decl all variable here
    const [add_resultInput, setAddResultInput] = useState({
        school_year: '',
        school_term: '',
        class: '',
        subject: '',
    });
    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setAddResultInput({ ...add_resultInput, [e.target.name]: e.target.value })
    }
    const submitResult = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            school_year: add_resultInput.school_year,
            school_term: add_resultInput.school_term,
            class: add_resultInput.class,
            subject: add_resultInput.subject,
        }
        try {
            // let create the api url here
            axios.post(`/api/start_result_process`, data).then(res => {

                if (res.data.status === 200) {
                    // successful message
                    //toast.success(res.data.allResultDetails.message, { theme: 'colored' });
                    setFetchResult(res.data.allResultDetails.result_record_details);
                    setAddResultInput({
                        ...add_resultInput,
                        school_year: '',
                        school_term: '',
                        class: '',
                        subject: '',
                    });
                    e.target.reset();
                    localStorage.setItem("Tid", res.data.allResultDetails.result_record_details.r_tid);
                    setListError([]);
                    history.push(`/staff/enter-result`);
                }
                // record already exist
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                // result already exist
                else if (res.data.status === 403) {
                    toast.error(res.data.message, { theme: 'colored' });

                    history.push(`/staff/result`);
                }
                // data input required
                else if (res.data.status === 422) {
                    toast.error('Missing Data Required', { theme: 'colored' });
                    setListError(res.data.errors);
                }
                // error record not save
                else if (res.data.status === 500) {
                    toast.warning('Missing Data Required', { position: 'top-center', theme: 'colored' });
                    setListError(res.data.errors);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { theme: 'colored' });
                }
                setIsloading(false);
            });

        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setIsloading(false);
        }

    }
    // create a function to fetch all data here
    const getAllResult = (PageNumber = 1) => {
        try {
            setIsLoading(true)
            // let create the api url here
            axios.get(`/api/fetch_result_staff?page=${PageNumber}`).then(res => {
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

    // create a function to fetch school session  data here
    useEffect(() => {
        axios.get(`/api/fetch_school_session`).then(res => {
            if (res.data.status === 200) {
                setSchoolYear(res.data.session_Details);
            }
        });
    }, []);

    // create a function to fetch school term  data here
    useEffect(() => {
        axios.get(`/api/fetch_allterm`).then(res => {
            if (res.data.status === 200) {
                setSchoolTerm(res.data.termrecord);
            }
        });
    }, []);

    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_myclass`).then(res => {
            if (res.data.status === 200) {
                setAllClass(res.data.allDetails.class_details);
                setAllSubjects(res.data.allDetails.subject_details);
                setCatogory(res.data.allDetails.sch_category_details);
            }
        });
    }, []);
    // if (loading) {
    //     return (
    //         <div className="card-body">
    //             <div className='text-center'>
    //                 <div className="spinner-border spinner-border-sm text-info" role="status">
    //                 </div> Loading
    //             </div>
    //         </div>
    //     )
    // }

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
            axios.delete(`/api/delete_result/${deleteID}`).then(res => {
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

    // CODE FOR SELECT 2
    const termOptions = [];
    schoolTerm.map((term) => {
        termOptions.push({ value: term.id, label: term.term_name });
    });

    const yearOptions = [];
    schoolYears.map((term) => {
        yearOptions.push({ value: term.id, label: term.academic_name });
    });

    const categoryOptions = [];
    all_category.map((term) => {
        categoryOptions.push({ value: term.id, label: term.sc_name });
    });

    const classOptions = [];
    all_class.map((term) => {
        classOptions.push({ value: term.cls__class_id, label: term.cls__class_name });
    });

    const subjectOptions = [];
    all_subjects.map((term) => {
        subjectOptions.push({ value: term.sub_subject_id, label: term.sub_subject_name });
    });

    function handleSelect2Input(stateName, selectedItem) {
        setAddResultInput({ ...add_resultInput, [stateName]: selectedItem.value });
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
    var table_record = "";
    if (result_details.data.length > 0) {
        table_record = <div>
            <table id="example1" className="table table-bordered table-striped table-sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>TID</th>
                        <th>Academic Year</th>
                        <th>Academic Term</th>
                        <th>Class</th>
                        <th>Subject</th>
                        <th>Added By</th>
                        <th>Reg. Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {result_details.data.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + from}</td>
                                <td>{item.r_tid}</td>
                                <td>{item.school_year}</td>
                                <td>{item.school_term}</td>
                                <td>{item.class}</td>
                                <td>{item.subject}</td>
                                <td>{item.addby}</td>
                                <td>{item.r_date}</td>
                                {/* <td> <span className='badge bg-danger mr-2' type='button'><i onClick={(e) => deleteResult(e, item.id)} className='fa fa-trash-o text-white'></i></span> */}
                                <td> <span className="badge bg-danger mr-2" type="button" data-tip="Delete Details" data-place="bottom"><i onClick={() => deleteDetails(item.id)} className="fa fa-trash-o text-white"></i></span>
                                    {" "} {" "}
                                    <Link to={`view-result/${item.r_tid}`} data-tip="View Result Details" data-place="bottom"><span className='badge bg-info' type='button'><i className='fa fa-eye text-white'></i></span></Link>
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
                            <h4 className="m-0">Manage Result Details</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-info btn-sm" data-toggle="modal" data-target="#Addschool_resumption" data-tip="Add New Result" data-place="bottom">Add Result</button>
                                </li>
                                <li className='mr-3'><Link to='/staff/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>
                    <p style={p}>View and manage your computed result details in the system.</p>
                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title"><p style={p}> Current result details </p> </h3>
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

            <div className="modal fade" data-backdrop="false" role="dialog" id="Addschool_resumption" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={submitResult} className="form-horizontal">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title" id="modal-title">
                                    Select Items to Proceed
                                </h4>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>Academic Term</label>
                                                <Select
                                                    name="school_term"
                                                    options={termOptions}
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    isDisabled={false}
                                                    isLoading={false}
                                                    onChange={(e) => handleSelect2Input("school_term", e)}
                                                />
                                                <span className="text-danger">
                                                    {list_error.school_term}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Academic Session</label>
                                                <Select
                                                    name="school_year"
                                                    options={yearOptions}
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    isDisabled={false}
                                                    isLoading={false}
                                                    onChange={(e) => handleSelect2Input("school_year", e)}
                                                />
                                                <span className="text-danger">
                                                    {list_error.school_year}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>Subject</label>
                                                <Select
                                                    name="subject"
                                                    options={subjectOptions}
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    isDisabled={false}
                                                    isLoading={false}
                                                    onChange={(e) => handleSelect2Input("subject", e)}
                                                />
                                                <span className="text-danger">
                                                    {list_error.subject}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Class</label>
                                                <Select
                                                    name="class"
                                                    options={classOptions}
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    isDisabled={false}
                                                    isLoading={false}
                                                    onChange={(e) => handleSelect2Input("class", e)}
                                                />
                                                <span className="text-danger">
                                                    {list_error.class}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-danger" data-dismiss="modal">
                                    Cancel
                                </button>
                                <button disabled={isLoading} className="btn btn-success">
                                    {isLoading && (
                                        <span className="spinner-border spinner-border-sm mr-1"></span>
                                    )}
                                    Proceed
                                </button>
                            </div>
                        </form>

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

export default Result;