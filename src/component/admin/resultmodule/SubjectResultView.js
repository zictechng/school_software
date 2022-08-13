import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../../../context/UserContext';
import { Modal, Button } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';


function SubjectResultView() {
    document.title = "View Subject Result Details | ";
    const { classResult } = useContext(UserContext);
    const [result_class] = classResult;

    const [result_info, setResultInfo] = useState([]);
    const [result_subject, setResultSubject] = useState({});
    const [loading, setLoading] = useState(true);
    const [list_error, setListError] = useState([]);
    const [submitloading, setSubmitloading] = useState(false);

    //decl all variable here
    const [editresultInput, setEditResultInput] = useState({
        first_ca: '',
        second_ca: '',
        tca_score: '',
        exam_scores: '',
        total_scores: '',
        grade: '',
        remark: '',
        id: '',

    });
    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setEditResultInput({ ...editresultInput, [e.target.name]: e.target.value })
    }
    const submitEditResult = (e) => {
        e.preventDefault();
        setSubmitloading(true);
        const data = {
            first_ca: editresultInput.first_ca,
            second_ca: editresultInput.second_ca,
            tca_score: editresultInput.tca_score,
            exam_scores: editresultInput.exam_scores,
            total_scores: editresultInput.total_scores,
            grade: editresultInput.grade,
            remark: editresultInput.remark,
            id: editresultInput.id,
        }
        try {
            // let create the api url here
            axios.post(`/api/update_result_view`, data).then(res => {
                if (res.data.status === 200) {
                    // successful message
                    toast.success(res.data.message, { theme: 'colored' });
                    setListError([]);
                    setShow(false);
                    getAllResult();
                }
                // record already exist
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                // result already exist
                else if (res.data.status === 403) {
                    toast.error(res.data.message, { theme: 'colored' });
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
                setSubmitloading(false);
            });

        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
        }

    }

    // create a function to fetch result view detail here
    const getAllResult = () => {
        var check_code = localStorage.getItem('classCode');
        try {
            axios.get(`/api/load_view_subject/${check_code}`).then(res => {
                if (res.data.status === 200) {
                    setResultInfo(res.data.all_details.result);
                }
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                setLoading(false);
            });
        } catch (error) {
            // Handle the error
        }
    }
    useEffect(() => {
        getAllResult()
    }, []);

    // delete operation using modal dialog comes here
    const [deleteID, setDeleteID] = useState("");
    const [show, setShow] = useState(false);
    const [isloading, setIsLoading] = useState(false);

    const [deleteshow, setDeleteShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    }
    const handleDeleteClose = () => {
        setDeleteShow(false)
    }
    const deleteDetails = (id) => {
        setDeleteID(id);
        setDeleteShow(true);
    }
    const getResult = (id) => {
        setDeleteID(id);
        setEditResultInput(editresultInput);
        setIsLoading(true)
        try {
            axios.get(`/api/get_resultview/${id}`).then(res => {
                if (res.data.status === 200) {
                    setEditResultInput(res.data.resultDetails)
                }
                else if (res.data.status === 402) {
                    toast.warning(res.data.message, { theme: 'colored' });
                }
            });
            setIsLoading(false);
        } catch (e) {
            // Handle the error
            toast.error("sorry, server error occurred! Try again. ".error, { theme: 'colored' });
        }
        setShow(true);
    }
    const handleDeleteItem = (e, deleteID) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML = "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to delete the record from the database here */
        try {
            axios.delete(`/api/delete_result_view/${deleteID}`).then(res => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: 'colored' });
                    //thisClicked.closest("tr").remove();
                    setDeleteShow(false);
                    getAllResult();
                }
                else if (res.data.status === 402) {
                    toast.warning(res.data.message, { theme: 'colored' });
                    thisClicked.innerHTML = "<i className='fa fa-trash-o text-white'></i>";
                }
            })
        } catch (e) {
            // Handle the error
            toast.error("sorry, server error occurred! Try again. ".error, { theme: 'colored' });
        }
    }
    if (loading) {
        return (
            <div className="card-body">
                <div className="text-center">
                    <div
                        className="spinner-border spinner-border-sm text-info"
                        role="status"
                    ></div>{" "}
                    Loading
                </div>
            </div>
        );
    }
    var table_record = "";
    if (result_info.length > 0) {
        table_record = <div>
            <table id="example1" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Admission No</th>
                        <th>Student Name</th>
                        <th>Academic Year</th>
                        <th>Academic Term</th>
                        <th>Subject</th>
                        <th>Class</th>
                        <th>Total CA</th>
                        <th>Exam Score</th>
                        <th>Total Score</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {result_info.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.admin_number}</td>
                                <td>{item.student_name}</td>
                                <td>{item.sch_year.academic_name}</td>
                                <td>{item.sch_term.term_name}</td>
                                <td>{item.term_subject.subject_name}</td>
                                <td>{item.class_name.class_name}</td>
                                <td>{item.tca_score}</td>
                                <td>{item.exam_scores}</td>
                                <td>{item.total_scores}</td>
                                {/* <td> <span className='badge bg-danger mr-2' type='button'><i onClick={(e) => deleteResult(e, item.id)} className='fa fa-trash-o text-white'></i></span> */}
                                <td> <span className="badge bg-info mr-2" type="button"><i onClick={() => getResult(item.id)} className="fa fa-eye text-white"></i></span>
                                    {" "} {" "}
                                    <span className='badge bg-danger' type='button' onClick={() => deleteDetails(item.id)}><i className='fa fa-trash-o text-white'></i></span>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    }
    else if (result_info.length < 1) {
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
                            <h4 className="m-0">Manage result viewing details</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="mr-3">
                                    <Link to="/admin/view-result">
                                        <button
                                            type="button"
                                            className="btn btn-block btn-info btn-sm" data-tip="Back" data-place="bottom"
                                        >
                                            <i className="fa fa-backward"></i>{" "}
                                        </button>
                                    </Link>
                                </li>
                                <li className="mr-3">
                                    <Link to="/admin/index">
                                        <button
                                            type="button"
                                            className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"
                                        >
                                            <i className="fa fa-home"></i>{" "}
                                        </button>
                                    </Link>
                                </li>

                            </ol>
                        </div>
                    </div>
                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title"><span className='text-danger'>You are view result details by <b>subject</b></span> </h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className='text-center'>
                            </div>
                            {table_record}
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Caution</Modal.Title>
                </Modal.Header>

                <form onSubmit={submitEditResult}>
                    <div className='text-center'>
                        {isloading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    </div>
                    <Modal.Body><h5>{editresultInput.student_name} : Previewing result Score details</h5>

                        <p className="text-muted text-center"></p>
                        <div className='row'>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>CA 1 Score</label>
                                    <input type="text" name='first_ca' onChange={handleInput} value={editresultInput.first_ca} className="form-control" placeholder="CA 1 Score" />
                                    <small className='text-danger'>{list_error.first_ca}</small>
                                </div>

                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>CA 2 Score</label>
                                    <input type="text" name='second_ca' onChange={handleInput} value={editresultInput.second_ca} className="form-control" placeholder="CA 2 Score" />
                                    <small className='text-danger'>{list_error.second_ca}</small>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Total CA Score</label>
                                    <input type="text" name='tca_score' onChange={handleInput} value={editresultInput.tca_score} className="form-control" placeholder="Total Score" />
                                </div>
                                <small className='text-danger'>{list_error.tca_score}</small>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Exam Score</label>
                                    <input type="text" name='exam_scores' onChange={handleInput} value={editresultInput.exam_scores} className="form-control" placeholder="Exam Score" />
                                </div>
                                <small className='text-danger'>{list_error.exam_scores}</small>
                            </div>
                        </div>

                        <div className='row'>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Total Score</label>
                                    <input type="text" name='total_scores' onChange={handleInput} value={editresultInput.total_scores} className="form-control" placeholder="Total Score" />
                                </div>
                                <small className='text-danger'>{list_error.total_scores}</small>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Grade</label>
                                    <input type="text" name='grade' onChange={handleInput} value={editresultInput.grade} className="form-control" placeholder="Grade" />
                                </div>
                                <small className='text-danger'>{list_error.grade}</small>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Remark</label>
                                    <input type="text" name='remark' onChange={handleInput} value={editresultInput.remark} className="form-control" placeholder="Remark" />
                                </div>
                                <small className='text-danger'>{list_error.remark}</small>
                            </div>
                        </div>
                        <input type='hidden' name='id' onChange={handleInput} value={editresultInput.id} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" size="sm" onClick={handleClose}>
                            Close
                        </Button>
                        <Button disabled={submitloading} variant="primary" type='submit' size="sm">
                            {submitloading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Update
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal show={deleteshow} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Caution</Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Are you sure you want to delete this?</h5>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleDeleteClose}>
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

export default SubjectResultView;