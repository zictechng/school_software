import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function RepairResult() {
    document.title = "Repair Result | ";
    const history = useHistory();

    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);
    const [all_class, setAllClass] = useState([]);
    const [all_subjects, setAllSubjects] = useState([]);
    const [sch_category, setSchCatgory] = useState([]);

    const [list_error, setListError] = useState([]);
    const [isLoading, setIsloading] = useState(false);

    const [loading, setLoading] = useState(true);

    //decl all variable here
    const [add_resultInput, setCAResultInput] = useState({
        school_year: '',
        school_term: '',
        class: '',
    });
    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setCAResultInput({ ...add_resultInput, [e.target.name]: e.target.value })
    }
    const submitRepair = (e) => {
        e.preventDefault();
        setIsloading(true);

        const data = {
            school_year: add_resultInput.school_year,
            school_term: add_resultInput.school_term,
            class: add_resultInput.class,
            // subject: add_resultInput.subject,
            // school_type: add_resultInput.school_type,
        }
        try {
            // let create the api url here
            axios.post(`/api/repair_result`, data).then(res => {

                if (res.data.status === 200) {
                    // successful message
                    localStorage.setItem("tID", res.data.resultDetails.tID.tid_code);
                    localStorage.setItem("sub", res.data.resultDetails.tID.class);
                    localStorage.setItem("ClassName", "true");
                    //setFetchResultID(res.data.resultDetails.tID);
                    //console.log(res.data.resultDetails.tID);
                    //setFetchResult(res.data.resultAll.fetchResult);
                    setCAResultInput({
                        ...add_resultInput,
                        school_year: '',
                        school_term: '',
                        class: '',
                    });
                    e.target.reset();

                    setListError([]);
                    history.push(`/admin/repair-view`);
                    setShowResult(false);
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

    //decl all variable here
    const [add_subjectInput, setSubjecttInput] = useState({
        school_year: '',
        school_term: '',
        class: '',
        subject: '',
    });
    // declare input handling function here
    const handleSubjectInput = (e) => {
        e.persist();
        setSubjecttInput({ ...add_subjectInput, [e.target.name]: e.target.value })
    }

    const submitSubject = (e) => {
        e.preventDefault();
        setIsloading(true);

        const data = {
            school_year: add_subjectInput.school_year,
            school_term: add_subjectInput.school_term,
            class: add_subjectInput.class,
            subject: add_subjectInput.subject,
            // school_type: add_resultInput.school_type,
        }
        try {
            // let create the api url here
            axios.post(`/api/repair_subject`, data).then(res => {

                if (res.data.status === 200) {
                    // successful message
                    localStorage.setItem("tID", res.data.resultDetails.tID.tid_code);
                    localStorage.setItem("sub", res.data.resultDetails.tID.subject);
                    localStorage.setItem("ClassName", "false");
                    setSubjecttInput({
                        ...add_subjectInput,
                        school_year: '',
                        school_term: '',
                        class: '',
                        subject: '',
                    });
                    e.target.reset();

                    setListError([]);
                    history.push(`/admin/repair-view`);
                    setShowResult(false);
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

    //decl all variable here
    const [add_caInput, setCAInput] = useState({
        school_year: '',
        school_term: '',
        class: '',
        class_category: '',
    });
    // declare input handling function here
    const handleCAInput = (e) => {
        e.persist();
        setCAInput({ ...add_caInput, [e.target.name]: e.target.value })
    }
    const submitCA = (e) => {
        e.preventDefault();
        setIsloading(true);

        const data = {
            school_year: add_caInput.school_year,
            school_term: add_caInput.school_term,
            class: add_caInput.class,
            class_category: add_caInput.class_category,
        }
        try {
            // let create the api url here
            axios.post(`/api/repair_ca`, data).then(res => {

                if (res.data.status === 200) {
                    // successful message
                    localStorage.setItem("tID", res.data.resultDetails.tID.rst_tid);
                    localStorage.setItem("sub", res.data.resultDetails.tID.rst_subject);
                    localStorage.setItem("ClassName", "false");
                    setCAInput({
                        ...add_caInput,
                        school_year: '',
                        school_term: '',
                        class: '',
                        class_category: '',
                    });
                    e.target.reset();

                    setListError([]);
                    history.push(`/admin/repair-ca`);
                    setShowResult(false);
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

    //decl all variable here
    const [add_positionInput, setPositionInput] = useState({
        school_year: '',
        school_term: '',
        class: '',
    });

    const handlePositionInput = (e) => {
        e.persist();
        setPositionInput({ ...add_positionInput, [e.target.name]: e.target.value })
    }

    const submitPosition = (e) => {
        e.preventDefault();
        setIsloading(true);

        const data = {
            school_year: add_positionInput.school_year,
            school_term: add_positionInput.school_term,
            class: add_positionInput.class,
            // subject: add_resultInput.subject,
            // school_type: add_resultInput.school_type,
        }
        try {
            // let create the api url here
            axios.post(`/api/repair_result_position`, data).then(res => {

                if (res.data.status === 200) {
                    // successful message
                    localStorage.setItem("tID", res.data.resultDetails.tID.user_code);
                    localStorage.setItem("ClassName", "true");
                    //console.log(res.data.resultAll.fetchResult);
                    setPositionInput({
                        ...add_positionInput,
                        school_year: '',
                        school_term: '',
                        class: '',
                    });
                    e.target.reset();

                    setListError([]);
                    history.push(`/admin/position-view`);

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
                setAllSubjects(res.data.allDetails.subject_details);
                setSchoolTerm(res.data.allDetails.term_details);
                setSchoolYear(res.data.allDetails.session_details);
                setSchCatgory(res.data.allDetails.sch_category_details)
            }
            else {
                toast.error("sorry, data missing! Try again.", { theme: 'colored' });
            }
            setLoading(false);
        });
    }, []);

    const [showResult, setShowResult] = useState(false);
    const handleRepairResult = () => {
        setShowResult(true);
    }
    const handleCloseRepair = () => {
        setShowResult(false);
    }
    const [showSubject, setShowSubject] = useState(false);
    const handleRepairSubject = () => {
        setShowSubject(true);
    }
    const handleCloseSubject = () => {
        setShowSubject(false);
    }

    const [showCA, setShowCA] = useState(false);
    const handleRepairCA = () => {
        setShowCA(true);
    }
    const handleCloseCA = () => {
        setShowCA(false);
    }
    const [showPosition, setShowPosition] = useState(false);
    const handleRepairPosition = () => {
        setShowPosition(true);
    }
    const handleClosePosition = () => {
        setShowPosition(false);
    }


    if (loading) {
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
                            <h4 className="m-0">Repair result management system:</h4>

                        </div>

                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className='row'>
                            <div className="card col-5">
                                <div className="card-header bg-danger">
                                    <h3 className="card-title">Select operational option from the menu side to proceed</h3>
                                </div>
                            </div>
                            <div className='col-7 float-sm-right'>
                                <div className='float-sm-right'>
                                    <a className="btn btn-app bg-secondary" onClick={handleRepairResult}>
                                        <i className="fas fa-trash" /> Repair Result
                                    </a>
                                    <a className="btn btn-app bg-success" onClick={handleRepairSubject}>
                                        <i className="fas fa-trash" /> Repair Subject
                                    </a>
                                    <a className="btn btn-app bg-danger" onClick={handleRepairPosition}>
                                        <i className="fas fa-trash" /> Repair Class Position
                                    </a>
                                    <a className="btn btn-app bg-info" onClick={handleRepairCA}>

                                        <i className="fas fa-trash" /> Repair CA Result
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showResult} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Repair Result Details</Modal.Title>
                </Modal.Header>
                {isLoading && <div className='overlay text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div>
                </div>}
                <Modal.Body>
                    <form onSubmit={submitRepair} className="form-horizontal">
                        <div className="row">
                            <div className="col-sm-4">
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
                            <div className="col-sm-4">
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
                            <div className="col-sm-4">
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
                        <div className="modal-footer">
                            <button disabled={isLoading} className="btn btn-success">
                                {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Proceed
                            </button>
                        </div>
                    </form>
                </Modal.Body>
                <button onClick={handleCloseRepair} className="btn btn-danger">Cancel</button>
            </Modal>

            <Modal show={showSubject} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Repair Subject Result Details</Modal.Title>
                </Modal.Header>
                {isLoading && <div className='overlay text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div>
                </div>}
                <Modal.Body>
                    <form onSubmit={submitSubject} className="form-horizontal">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>Academic Term</label>
                                    <select name='school_term' className='form-control' onChange={handleSubjectInput} value={add_subjectInput.school_term}>
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
                                    <select name='school_year' className='form-control' onChange={handleSubjectInput} value={add_subjectInput.school_year}>
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
                                    <select name='class' className='form-control' onChange={handleSubjectInput} value={add_subjectInput.class}>
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
                        <div className='row' >
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>Subject</label>
                                    <select name='subject' onChange={handleSubjectInput} value={add_subjectInput.subject} className="form-control">
                                        <option>Select Subject</option>
                                        {
                                            all_subjects.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.subject_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <span className='text-danger'>{list_error.subject}</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button disabled={isLoading} className="btn btn-success">
                                {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Proceed
                            </button>
                        </div>
                    </form>
                </Modal.Body>
                <button onClick={handleCloseSubject} className="btn btn-danger">Cancel</button>
            </Modal>

            <Modal show={showCA} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Repair CA Result Details</Modal.Title>
                </Modal.Header>
                {isLoading && <div className='overlay text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div>
                </div>}
                <Modal.Body>
                    <form onSubmit={submitCA} className="form-horizontal">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>Academic Term</label>
                                    <select name='school_term' className='form-control' onChange={handleCAInput} value={add_caInput.school_term}>
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
                                    <select name='school_year' className='form-control' onChange={handleCAInput} value={add_caInput.school_year}>
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
                                    <select name='class' className='form-control' onChange={handleCAInput} value={add_caInput.class}>
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
                        <div className='row' >
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>School Category</label>
                                    <select name='class_category' onChange={handleCAInput} value={add_caInput.class_category} className="form-control">
                                        <option>Select Category</option>
                                        {
                                            sch_category.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.sc_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <span className='text-danger'>{list_error.class_category}</span>
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
                <button onClick={handleCloseCA} className="btn btn-danger">Cancel</button>
            </Modal>

            <Modal show={showPosition} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Repair Class Position Result Details</Modal.Title>
                </Modal.Header>
                {isLoading && <div className='overlay text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div>
                </div>}
                <Modal.Body>
                    <form onSubmit={submitPosition} className="form-horizontal">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>Academic Term</label>
                                    <select name='school_term' className='form-control' onChange={handlePositionInput} value={add_positionInput.school_term}>
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
                                    <select name='school_year' className='form-control' onChange={handlePositionInput} value={add_positionInput.school_year}>
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
                                    <select name='class' className='form-control' onChange={handlePositionInput} value={add_positionInput.class}>
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
                <button onClick={handleClosePosition} className="btn btn-danger">Cancel</button>
            </Modal>
        </>
    )
}

export default RepairResult;