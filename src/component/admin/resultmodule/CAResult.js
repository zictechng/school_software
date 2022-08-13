import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';

function CAResult() {
    const history = useHistory();
    document.title = "Manage CA Result | ";
    const [result_details, setResultDetails] = useState([]);

    const [isfetchLoading, setIsFetchloading] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);
    const [all_class, setAllClass] = useState([]);
    const [all_subjects, setAllSubjects] = useState([]);

    const [sch_category, setSchCatgory] = useState([]);

    const [fetch_result, setFetchResult] = useState({});
    const [list_error, setListError] = useState([]);
    //const [loading, setLoading] = useState(true);
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
    const getAllCA = () => {
        try {
            setIsFetchloading(true);
            // let create the api url here
            axios.get(`/api/fetch_ca_result`).then(res => {
                if (res.data.status === 200) {
                    setResultDetails(res.data.ca_record);
                    //console.log(res.data.history_record);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
                }
                setIsFetchloading(false);
                //setLoading(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
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
                setSchCatgory(res.data.allDetails.sch_category_details)
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
    var table_record = "";
    if (result_details.length > 0) {
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
                    {result_details.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.tid_code}</td>
                                <td>{item.year}</td>
                                <td>{item.term}</td>
                                <td>{item.class}</td>
                                <td>{item.subject}</td>
                                <td>{item.sch_category}</td>
                                <td>{item.add_by}</td>
                                <td>{item.record_date}</td>
                                {/* <td> <span className='badge bg-danger mr-2' type='button'><i onClick={(e) => deleteResult(e, item.id)} className='fa fa-trash-o text-white'></i></span> */}
                                <td> <span className="badge bg-danger mr-2" type="button"><i onClick={() => deleteDetails(item.id)} className="fa fa-trash-o text-white"></i></span>
                                    {" "} {" "}

                                    <Link to="#" data-tip="Add New Result" data-place="bottom"><span className='badge bg-info' type='button'><i className='fa fa-eye text-white'></i></span></Link>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    }
    else if (result_details.length < 1) {
        table_record = <div className='text-center'>
            <p>No record at the moment</p>
        </div>
    }

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
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-info btn-sm" data-toggle="modal" data-target="#Addschool_resumption" data-tip="Add New CA Result" data-place="bottom">Add CA Result</button>
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title">Current CA result details </h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className='text-center'>
                                {isfetchLoading && <span className="spinner-border spinner-border-sm mr-1 text-info"></span>}
                            </div>
                            {table_record}
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" data-backdrop="false" role="dialog" id="Addschool_resumption" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">

                    <div className="modal-content">

                        <form onSubmit={submitStaff} className="form-horizontal">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title" id="modal-title">Select Items to Proceed</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">

                                <div className="card-body">
                                    <br />
                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>Academic Term</label>
                                                <select name='school_term' className='form-control' onChange={handleInput} value={add_resultInput.school_term}>
                                                    <option>Select Term</option>
                                                    {
                                                        schoolTerm.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.term_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <small className='text-danger'>{list_error.school_term}</small>

                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Academic Session</label>
                                                <select name='school_year' className='form-control' onChange={handleInput} value={add_resultInput.school_year}>
                                                    <option>Select Session</option>
                                                    {
                                                        schoolYears.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.academic_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <small className='text-danger'>{list_error.school_year}</small>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>School Category</label>
                                                <select name='school_type' className='form-control' onChange={handleInput} value={add_resultInput.school_type}>
                                                    <option>Select Category</option>
                                                    {
                                                        sch_category.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.sc_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <small className='text-danger'>{list_error.school_type}</small>

                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Class</label>
                                                <select name='class' className='form-control' onChange={handleInput} value={add_resultInput.class}>
                                                    <option>Select Class</option>
                                                    {
                                                        all_class.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.class_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <small className='text-danger'>{list_error.class}</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-9">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>Subject</label>
                                                <select name='subject' className='form-control' onChange={handleInput} value={add_resultInput.subject}>
                                                    <option>Select Subject</option>
                                                    {
                                                        all_subjects.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.subject_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <small className='text-danger'>{list_error.subject}</small>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-danger" data-dismiss="modal">Cancel</button>
                                <button disabled={isLoading} className="btn btn-success">
                                    {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
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

export default CAResult;