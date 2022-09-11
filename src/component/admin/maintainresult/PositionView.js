import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function PositionView() {
    document.title = "View Position Details | ";
    const history = useHistory();

    const [isfetchLoading, setIsFetchloading] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    const [loading, setLoading] = useState(true);
    const [subject_view, setSubjectView] = useState(false);

    const [fetch_res, setFetchResult] = useState([]);
    const [fetch_res_id, setFetchResultID] = useState('');

    var view_subject = localStorage.getItem("sub");
    const is_class = localStorage.getItem('ClassName');


    var classShow = "";
    // if (is_class === true) {
    //     alert("Is true")
    //     classShow = <span> {"Viewing " + fetch_res_id.class_name.class_name + " Details"}</span>;
    // } else if (is_class == false) {
    //     classShow = <span> {"Viewing " + fetch_res_id.term_subject.subject_name + " Details"}</span>;
    // }

    const handleDeleteItem = (e, deleteID) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML = "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to delete the record from the database here */
        try {
            axios.delete(`/api/trash_position_result/${deleteID}`).then(res => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: 'colored' });
                    //thisClicked.closest("tr").remove();
                    getDetails();
                    //history.push(`/admin/repair-result`);
                    setDeleteShow(false);
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
    // create a function to fetch all term here
    const getDetails = () => {
        setIsFetchloading(true);
        var check_code = localStorage.getItem("tID");

        //console.log(check_code);
        // let create the api url here
        axios.get(`/api/fetch_position_view/${check_code}`).then(res => {
            if (res.data.status === 200) {
                setFetchResult(res.data.resultAll.fetchPosition);
                setFetchResultID(res.data.resultAll.pID);
            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
            }
            setIsFetchloading(false);

        });
    }
    useEffect(() => {
        getDetails()
    }, []);

    //console.log(fetch_res_id);
    // delete operation goes here...
    const [deleteID, setDeleteID] = useState("");

    const [showResult, setShowResult] = useState(false);

    const [deleteshow, setDeleteShow] = useState(false);

    const handleDeleteClose = () => {
        setDeleteShow(false)
    }
    const deleteDetails = (user_code) => {
        setDeleteID(user_code);
        setDeleteShow(true);
    }

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
    var table_record = "";
    if (fetch_res.length > 0) {
        table_record = <div>
            <div className="card-header">
                <h3 className="card-title"><span className='text-danger'>Please note: This operation can not be undo.</span>

                </h3>
                <div className="d-flex justify-content-between">
                    <p></p>
                    <span className="badge bg-danger mr-2" type="button"><i onClick={() => deleteDetails(fetch_res_id.user_code)} className="fa fa-trash-o text-white"></i></span>
                </div>
                <input type="hidden" name='tid' value={fetch_res_id.user_code} />
            </div>
            <table id="example1" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Academic Year</th>
                        <th>Academic Term</th>
                        <th>Class</th>
                        <th>Position</th>
                        <th>Total CA</th>
                        <th>Exam Score</th>
                        <th>Total Score</th>
                        <th>Added By</th>
                        <th>Reg. Date</th>
                    </tr>
                </thead>
                <tbody>
                    {fetch_res.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.student_name}</td>
                                <td>{item.sch_year.academic_name}</td>
                                <td>{item.sch_term.term_name}</td>
                                <td>{item.class_name.class_name}</td>
                                <td>{item.position}</td>
                                <td>{item.tca_score}</td>
                                <td>{item.exam_score}</td>
                                <td>{item.total_score}</td>
                                <td>{item.add_by}</td>
                                <td>{item.p_date}</td>

                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    }
    else {
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
                            <h4 className="m-0">Repair result management system:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'><Link to='/admin/repair-result'><button type="button" className="btn btn-block btn-info btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-backward'></i> </button></Link></li>
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className='row'>
                            <div className="card col-7">
                                <div className="card-header bg-danger">
                                    <h3 className="card-title">Be sure before you carry out this operation.</h3>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='text-center'>
                        {isfetchLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    </div>
                    <div className="card table-responsive">
                        {table_record}
                    </div>
                </div>
            </div>

            <Modal show={deleteshow} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Caution</Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Are you sure you want to delete this?</h5>
                    {deleteID}
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

        </>
    )
}

export default PositionView;