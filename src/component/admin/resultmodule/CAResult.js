import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import Select from "react-select";
import axios from 'axios';
import Pagination from 'react-js-pagination';

function CAResult() {
    const history = useHistory();
    document.title = "Manage CA Result | " + window.companyName;
    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [result_details, setResultDetails] = useState([]);

    const [is_loading, setIs_Loading] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);
    const [all_class, setAllClass] = useState([]);
    const [all_subjects, setAllSubjects] = useState([]);

    const [sch_category, setSchCatgory] = useState([]);
    const [all_category, setCatogory] = useState([]);

    const [fetch_result, setFetchResult] = useState({});
    const [list_error, setListError] = useState([]);
    var PageNumber = 1;
    //decl all variable here
    const [add_resultInput, setCAResultInput] = useState({
        school_year: '',
        school_term: '',
        class: '',
        subject: '',
        school_type: '',

    });
    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setCAResultInput({ ...add_resultInput, [e.target.name]: e.target.value })
    }
    const submitStaff = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            school_year: add_resultInput.school_year,
            school_term: add_resultInput.school_term,
            class: add_resultInput.class,
            subject: add_resultInput.subject,
            school_type: add_resultInput.school_type,
        }
        try {
            // let create the api url here
            axios.post(`/api/result_process_ca`, data).then(res => {

                if (res.data.status === 200) {
                    // successful message
                    toast.success(res.data.allResultDetails.message, { theme: 'colored' });
                    setFetchResult(res.data.allResultDetails.result_record_details);
                    setCAResultInput({
                        ...add_resultInput,
                        school_year: '',
                        school_term: '',
                        class: '',
                        subject: '',
                        school_type: '',

                    });
                    e.target.reset();
                    localStorage.setItem("Tid", res.data.allResultDetails.result_record_details.tid_code);
                    setListError([]);
                    history.push(`/admin/enter-ca`);
                }
                // record already exist
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: 'colored' });

                }
                // result already exist
                else if (res.data.status === 403) {
                    toast.error(res.data.message, { theme: 'colored' });

                    history.push(`/admin/ca-result`);
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
    const getAllCA = (PageNumber) => {
        setIs_Loading(true)
        try {

            // let create the api url here
            axios.get(`/api/fetch_ca_result?page=${PageNumber}`).then(res => {
                if (res.data.status === 200) {
                    setResultDetails(res.data.ca_record);
                    //console.log(res.data.history_record);
                    setIs_Loading(false);
                }
                // No record found at the moment
                else if (res.data.status === 404) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
                }
                setIsFetchloading(false);
                setIs_Loading(false);
                //setLoading(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setIsFetchloading(false);
            setIs_Loading(false);
        }
    }
    useEffect(() => {
        // call the function here
        getAllCA();
        return () => {
        };
    }, []);

    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_all_details`).then(res => {
            if (res.data.status === 200) {
                setAllClass(res.data.allDetails.class_details);
                setAllSubjects(res.data.allDetails.subject_details);
                setSchoolTerm(res.data.allDetails.term_details);
                setSchoolYear(res.data.allDetails.session_details);
                setSchCatgory(res.data.allDetails.sch_category_details);
                setCatogory(res.data.allDetails.sch_category_details)
            }
        });
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
            axios.delete(`/api/delete_ca_result/${deleteID}`).then(res => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: 'colored' });
                    //thisClicked.closest("tr").remove();
                    setShow(false);
                    getAllCA();
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
        classOptions.push({ value: term.id, label: term.class_name });
    });

    const subjectOptions = [];
    all_subjects.map((term) => {
        subjectOptions.push({ value: term.id, label: term.subject_name });
    });

    function handleSelect2Input(stateName, selectedItem) {
        setCAResultInput({ ...add_resultInput, [stateName]: selectedItem.value });
    }
    // get page properties for pagination
    const { data, current_page, per_page, total, from, to, last_page } = result_details
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    if (isfetchLoading) {
        return (
            <div className="card-body">
                <div className='text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div>
                </div>
            </div>
        )
    }
    var table_record = "";
    // if (result_details.length > 0) {
    table_record = <div>
        <table id="example1" className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>TID</th>
                    <th>Academic Year</th>
                    <th>Academic Term</th>
                    <th>Class</th>
                    <th>Subject</th>
                    <th>Sch. Category</th>
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
                            <td>{item.tid_code}</td>
                            <td>{item.year}</td>
                            <td>{item.term}</td>
                            <td>{item.class}</td>
                            <td>{item.subject}</td>
                            <td>{item.sch_category}</td>
                            <td>{item.add_by}</td>
                            <td>{item.record_date}</td>
                            {/* <td> <span className='badge bg-danger mr-2' type='button'><i onClick={(e) => deleteResult(e, item.id)} className='fa fa-trash-o text-white'></i></span> */}
                            <td> <span onClick={() => deleteDetails(item.id)} className="badge bg-danger mr-2" type="button"><i className="fa fa-trash-o text-white"></i></span>
                                {" "} {" "}

                                <Link to={`view-ca/${item.tid_code}`} data-tip="View CA Result Details " data-place="bottom"><span className='badge bg-info' type='button'><i className='fa fa-eye text-white'></i></span></Link>
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
                    onChange={(pageNumber) => getAllCA(pageNumber)}
                    renderOnZeroPageCount={null}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                />
            </ul>
        </nav>
    </div>
    // }
    // else if (result_details.length < 1) {
    //     table_record = <div className='text-center'>
    //         <p>No record at the moment</p>
    //     </div>
    // }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">

                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Manage CA Result Details</h4>
                        </div>

                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-info btn-sm" data-toggle="modal" data-target="#Addschool_resumption" data-tip="Add New CA Result" data-place="bottom">Add CA Result</button>
                                </li>
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header bg-dark">
                            <h3 className="card-title">Current CA result details </h3>
                            <div className="d-flex justify-content-between">
                                <p></p>
                                <span className="badge mr-2" type="button">
                                    <input name='title' className='form-control form-control-sm' placeholder='Search...' />
                                </span>
                            </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            {is_loading && <div className='overlay text-center'>
                                <div className="spinner-border spinner-border text-info" role="status">
                                </div>
                            </div>}
                            <div className="card table-responsive">
                                {result_details.data.length ? table_record :
                                    <div className='text-center'>
                                        <p>No record at the moment</p>
                                    </div>}
                            </div>

                            {/* {table_record} */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" data-backdrop="false" role="dialog" id="Addschool_resumption" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">

                    <div className="modal-content">

                        <form onSubmit={submitStaff} className="form-horizontal">
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
                                                <label>School Category</label>
                                                <Select
                                                    name="school_type"
                                                    options={categoryOptions}
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    isDisabled={false}
                                                    isLoading={false}
                                                    onChange={(e) =>
                                                        handleSelect2Input("school_type", e)
                                                    }
                                                />
                                                <span className="text-danger">
                                                    {list_error.school_type}
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
                <Modal.Body><h4>Are you sure you want to delete this?</h4>
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

export default CAResult;