import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Select from "react-select";
import Pagination from 'react-js-pagination';

function Graduation() {
    const history = useHistory();
    document.title = "Graduation | ";

    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [grade_score, setGradeScore] = useState([]);
    const [list_error, setListError] = useState([]);
    const [all_class, setAllClass] = useState([]);
    const [schoolYears, setSchoolYear] = useState([]);
    const [is_loading, setIsLoading] = useState(false);

    const [loading, setLoading] = useState(false);
    const [isloading, setIs_Loading] = useState(false);
    const [formData, setFormData] = useState({
        from_class: '',
        school_year: '',
    });

    var PageNumber = 1;
    // create a function to fetch all data here
    const getGraduatedStudent = (PageNumber) => {
        setIs_Loading(true);
        try {
            // let create the api url here
            axios.get(`/api/fetch_result_grade`).then(res => {
                if (res.data.status === 200) {
                    setGradeScore(res.data.graduate_Details.proDetails);
                    setIs_Loading(false);
                }
                //data not found
                else if (res.data.status === 404) {
                    toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
                    setIs_Loading(false);
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
        }
    }
    useEffect(() => {
        // call the function here
        getGraduatedStudent();
        return () => {
        };
    }, []);

    const submitGraduation = (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            // let create the api url here
            axios.post(`/api/start_promotion`, formData).then(res => {
                if (res.data.status === 200) {
                    // successful message
                    localStorage.setItem("tID", res.data.gDetails.tID);
                    setFormData({
                        ...formData,
                        from_class: '',
                        school_year: '',
                    });
                    e.target.reset();
                    setListError([]);
                    history.push(`/admin/graduation-view`);
                    setLoading(false);
                }
                // record not exist
                else if (res.data.status === 404) {
                    toast.error(res.data.message, { theme: 'colored' });
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
                setLoading(false);

            });

        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setLoading(false);
        }
    }
    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_all_details`).then(res => {
            if (res.data.status === 200) {
                setAllClass(res.data.allDetails.class_details);
                setSchoolYear(res.data.allDetails.session_details);
            }
            else {
                toast.error("sorry, data missing! Try again.", { theme: 'colored' });
            }
        });
    }, []);
    const [showModal, setShowModal] = useState(false);
    const handleModal = () => {
        setShowModal(true);
    }
    const handleClosegrade = () => {
        setShowModal(false);
    }
    // CODE FOR SELECT 2
    const classOptions = [];
    all_class.map((term) => {
        classOptions.push({ value: term.id, label: term.class_name });
    });

    const yearOptions = [];
    schoolYears.map((term) => {
        yearOptions.push({ value: term.id, label: term.academic_name });
    });
    function handleSelectInput(stateName, selectedItem) {
        setFormData({ ...formData, [stateName]: selectedItem.value });
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
                    <th>Name</th>
                    <th>Admin. No.</th>
                    <th>Last Class</th>
                    <th>Year</th>
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
                            <td>{item.g_st_name}</td>
                            <td>{item.g_st_admin}</td>
                            <td>{item.g_class}</td>
                            <td>{item.g_year}</td>
                            <td>{item.g_added}</td>
                            <td>{item.g_date}</td>
                            <td><span onClick={() => getResult(item.id)} className="badge bg-info mr-2" type="button"><i className="fa fa-eye text-white"></i></span>
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
                    onChange={(pageNumber) => getGraduatedStudent(pageNumber)}
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
                            <h4 className="m-0">Graduation:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-info btn-sm" data-tip="Graduate Student" data-place="bottom" onClick={handleModal}>Run Graduation</button>
                                </li>
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>
                    <p style={p}>
                        Run and manage student graduation with easy! Click on the run graduation to start
                    </p>
                    <div className="card table-responsive">
                        <div className="card-header bg-dark">
                            <h3 className="card-title"> Graduated student details </h3>
                            <div className="d-flex justify-content-between">
                                <p></p>
                                <span className="badge mr-2" type="button">
                                    <input name='title' className='form-control form-control-sm' placeholder='Search...' />
                                </span>
                            </div>
                        </div>

                        <div className="card-body">
                            {isloading && <div className='overlay text-center'>
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

            <Modal show={showModal} >
                <Modal.Header style={{ background: '#333234', color: 'white' }}>
                    <Modal.Title>Select Class</Modal.Title>
                </Modal.Header>
                {loading && <div className='overlay text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div>
                </div>}
                <Modal.Body>
                    <form onSubmit={submitGraduation} className="form-horizontal">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Class</label>
                                    <Select
                                        name="from_class"
                                        options={classOptions}
                                        isClearable={true}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        onChange={(e) => handleSelectInput("from_class", e)}
                                    />
                                    <small className='text-danger'>{list_error.from_class}</small>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Graduate Year</label>
                                    <Select
                                        name="school_year"
                                        options={yearOptions}
                                        isClearable={true}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        onChange={(e) => handleSelectInput("school_year", e)}
                                    />
                                    <span className="text-danger">
                                        {list_error.school_year}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button disabled={loading} className="btn btn-success">
                                {/* {loading && <span className="spinner-border spinner-border-sm mr-1"></span>} */}
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

export default Graduation;