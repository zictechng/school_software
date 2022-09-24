
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Pagination from 'react-js-pagination';

function GradeClassResult() {
    const history = useHistory();
    document.title = "Student Grading Details | " + window.companyName;
    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [is_loading, setIsLoading] = useState(false);
    const [grade_score, setGradeScore] = useState([]);
    const [list_error, setListError] = useState([]);
    const [isLoading, setIsloading] = useState(false);

    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);
    const [all_class, setAllClass] = useState([]);

    const [isloading, setIs_Loading] = useState(false);

    var PageNumber = 1;
    // create a function to fetch all data here
    const getAllResult = (PageNumber) => {
        setIs_Loading(true)
        try {
            // let create the api url here
            axios.get(`/api/fetch_all_grades?page=${PageNumber}`).then(res => {
                if (res.data.status === 200) {
                    setGradeScore(res.data.grade_record);
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
        getAllResult();
        return () => {
        };
    }, []);

    //decl all variable here
    const [add_gradeInput, setGradeInput] = useState({
        school_year: '',
        school_term: '',
        class: '',
    });
    // declare input handling function here
    const handleGrade = (e) => {
        e.persist();
        setGradeInput({ ...add_gradeInput, [e.target.name]: e.target.value })
    }
    const submitGrade = (e) => {
        e.preventDefault();
        setIsloading(true);

        const data = {
            school_year: add_gradeInput.school_year,
            school_term: add_gradeInput.school_term,
            class: add_gradeInput.class,
        }
        try {
            // let create the api url here
            axios.post(`/api/start_grade`, data).then(res => {
                if (res.data.status === 200) {
                    // successful message
                    localStorage.setItem("tID", res.data.resultDetails.tID);
                    localStorage.setItem("ClassName", "true");
                    setGradeInput({
                        ...add_gradeInput,
                        school_year: '',
                        school_term: '',
                        class: '',
                    });
                    e.target.reset();
                    setListError([]);
                    history.push(`/admin/grade_view`);
                    setShowGrade(false);
                }
                // result already exist
                else if (res.data.status === 404) {
                    toast.error(res.data.message, { theme: 'colored' });
                    setIsloading(false);
                }
                // data input required
                else if (res.data.status === 422) {
                    toast.error('Missing Data Required', { theme: 'colored' });
                    setListError(res.data.errors);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                setIsloading(false);

            });

        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setIsloading(false);
        }
    }
    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_all_details`).then(res => {
            if (res.data.status === 200) {
                setAllClass(res.data.allDetails.class_details);
                setSchoolTerm(res.data.allDetails.term_details);
                setSchoolYear(res.data.allDetails.session_details);
            }
            else {
                toast.error("sorry, data missing! Try again.", { theme: 'colored' });
            }
            setIsFetchloading(false);
        });
    }, []);
    const [showGrade, setShowGrade] = useState(false);
    const handleGrading = () => {
        setShowGrade(true);
    }
    const handleClosegrade = () => {
        setShowGrade(false);
    }
    // get page properties for pagination
    const { data, current_page, per_page, total, from, to, last_page } = grade_score
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
    // if (grade_score.length > 0) {
    table_record = <div>
        <table id="example1" className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Year</th>
                    <th>Term</th>
                    <th>Class</th>
                    <th>Added By</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {grade_score.data.map((item, i) => {
                    return (
                        <tr key={i}>
                            <td>{i + from}</td>
                            <td>{item.sch_year.academic_name}</td>
                            <td>{item.sch_term.term_name}</td>
                            <td>{item.class_name.class_name}</td>
                            <td>{item.add_by}</td>
                            <td>{item.p_date}</td>
                            <td>
                                <Link to={`view-grade/${item.id}`} data-tip="View Grade Details" data-place="bottom"><span className='badge bg-info' type='button'><i className='fa fa-eye text-white'></i></span></Link>
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
    // }
    // else {
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
                            <h4 className="m-0">Class result grading system:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-info btn-sm" data-tip="Grade Student Result" data-place="bottom" onClick={handleGrading}>Start Grading</button>
                                </li>
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>
                    <div className="card table-responsive">
                        <div className="card-header bg-dark">
                            <h3 className="card-title"> Current class position grading details </h3>
                            <div className="d-flex justify-content-between">
                                <p></p>
                                <span className="badge mr-2" type="button">
                                    <input name='title' className='form-control form-control-sm' placeholder='Search...' />
                                </span>
                            </div>
                        </div>

                        <div className="card-body">
                            {is_loading && <div className='overlay text-center'>
                                <div className="spinner-border spinner-border text-info" role="status">
                                </div>
                            </div>}
                            <div className="card table-responsive">
                                {grade_score.data.length ? table_record :
                                    <div className='text-center'>
                                        <p>No record at the moment</p>
                                    </div>}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showGrade} >
                <Modal.Header style={{ background: '#333234', color: 'white' }}>
                    <Modal.Title>Student Class Position Grading</Modal.Title>
                </Modal.Header>
                {isLoading && <div className='overlay text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div>
                </div>}
                <Modal.Body>
                    <form onSubmit={submitGrade} className="form-horizontal">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>Academic Term</label>
                                    <select name='school_term' className='form-control' onChange={handleGrade} value={add_gradeInput.school_term}>
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
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>Academic Session</label>
                                    <select name='school_year' className='form-control' onChange={handleGrade} value={add_gradeInput.school_year}>
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
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>Class</label>
                                    <select name='class' className='form-control' onChange={handleGrade} value={add_gradeInput.class}>
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

                        <div className="modal-footer">
                            <button disabled={isLoading} className="btn btn-success">
                                {/* {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>} */}
                                Proceed
                            </button>
                        </div>
                    </form>
                </Modal.Body>
                <button onClick={handleClosegrade} className="btn btn-danger">Cancel</button>
            </Modal>
        </>
    )
}

export default GradeClassResult;