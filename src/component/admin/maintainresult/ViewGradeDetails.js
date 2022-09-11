import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import ReactToPrint from "react-to-print";

function ViewGradeDetails(props) {
    document.title = "View Grade Details | ";
    const componentRef = useRef(null);
    const history = useHistory();

    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [show_comment, setShowSubject] = useState([]);
    const [get_all_subject, setGetAllSubject] = useState([]);
    const [get_years, setGetYear] = useState('');
    const [get_term, setGetTerm] = useState([]);
    const [get_grade_id, setGetGradeID] = useState([]);
    const [get_class, setGetClass] = useState([]);
    const [list_error, setListError] = useState([]);
    const [is_loading, setIsLoading] = useState(false);

    const [loading, setLoading] = useState(false);

    // create a function to fetch all data here
    const getGradeDetails = () => {
        const id = props.match.params.id;
        //console.log(props.match.params.id);
        setIsLoading(true)
        try {
            // let create the api url here
            axios.get(`/api/get_grade_id/${id}`).then(res => {
                if (res.data.status === 200) {
                    setShowSubject(res.data.all_details.fetch_info);
                    setGetClass(res.data.all_details.class_info);
                    setGetGradeID(res.data.all_details.grade_id);
                    setGetTerm(res.data.all_details.term_info);
                    setGetYear(res.data.all_details.grades_year);
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
        getGradeDetails();
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
            axios.delete(`/api/delete_all_grade/${delete_all_id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    thisClicked.innerHTML =
                        "Delete All";
                    history.push(`/admin/grade-result`);
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
    const deleteCommentDetails = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML =
            "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to returned attendance here */
        try {
            axios.delete(`/api/delete_position_id/${id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    getGradeDetails();
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
                            <h4 className="m-0">Class Position Details Preview:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <Link to='/admin/grade-result'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Back" data-place="bottom"><i className='fa fa-arrow-left'> Back</i> </button>
                                    </Link>
                                </li>
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-danger btn-sm" data-tip="Delete all" onClick={(e) => deactivate_all(get_grade_id.user_code)} data-place="bottom">Delete All</button>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <p style={p}>
                        A preview of all students result class position details in the system! here you can delete
                        the information about the position.
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
                                                        <i className="fas fa-th" /> <a style={p}> Class:  {get_class.class_name} {" | "} Term: {get_term.term_name} {'| Year'} {get_grade_id.sch_year.academic_name}</a>
                                                        <small className="float-right">Btach ID: <a style={p}> {get_grade_id.user_code}</a></small>
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
                                                                    <th>Total CA</th>
                                                                    <th>Exam Total </th>
                                                                    <th>Ground Total </th>
                                                                    <th>Position</th>
                                                                    <th>Status</th>
                                                                    <th>Added By</th>
                                                                    <th>Date</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {show_comment.map((item, i) => {
                                                                    if (item.p_status == 'Active')// this mean product is active
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
                                                                    else if (item.p_status == 'Deleted')// this mean product is active
                                                                    {
                                                                        pin_status = <span style={p}>Deleted</span>
                                                                        buttonCheck =
                                                                            <span className="badge bg-danger">Deleted</span>
                                                                        delete_button = ""
                                                                    }

                                                                    return (
                                                                        <tr key={i}>
                                                                            <td>{i + 1}</td>
                                                                            <td>{item.stu_admin_number}</td>
                                                                            <td>{item.student_name}</td>
                                                                            <td>{item.tca_score}</td>
                                                                            <td>{item.exam_score}</td>
                                                                            <td>{item.total_score}</td>
                                                                            <td>{item.position}</td>
                                                                            <td>{pin_status}</td>
                                                                            <td>{item.add_by}</td>
                                                                            <td>{item.p_date}</td>
                                                                            <td>
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
                                                    documentTile="Student Result Position Score"
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

            <Modal show={deactivateAll} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Caution: <a className='text-dark'> Operation can not be reversed </a></Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Are you sure you want to delete all position ?</h5>
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

export default ViewGradeDetails;