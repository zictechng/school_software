import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import Select from "react-select";
import axios from 'axios';
function AddStudentResult() {
    const history = useHistory();
    document.title = "Manage Result Entry | " + window.companyName;

    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [isLoading, setIsloading] = useState(false);

    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);
    const [all_class, setAllClass] = useState([]);
    const [all_subjects, setAllSubjects] = useState([]);

    const [fetch_result, setFetchResult] = useState({});
    const [list_error, setListError] = useState([]);
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
            }
            setIsFetchloading(false);
        });


    }, []);
    if (isfetchLoading) {
        return (
            <div className="card-body">
                <div className='text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div> Loading
                </div>
            </div>
        )
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

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Manage Result Entry</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <Link to='/staff/result'><button type="button" className="btn btn-block btn-info btn-sm" data-tip="View Result" data-place="bottom">View Result</button></Link>
                                </li>
                                <li className='mr-3'><Link to='/staff/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>
                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title"><a style={p}>To add new result details, select below details to get started.</a> </h3>
                        </div>
                        {/* /.card-header */}
                        {/* {result_ID.r_tid} */}
                        <div className="card-body">
                            <div className='text-center'>
                                {isfetchLoading && <span className="spinner-border spinner-border-sm mr-1 text-info"></span>}
                            </div>
                            <div className="overlay-wrapper">

                                {isLoading && <div className="overlay"><i className="spinner-border text-info" style={{ width: "3rem", height: "3rem" }} />
                                    <div className="text-bold pt-2">Loading...</div>
                                </div>}
                                <form onSubmit={submitResult} className="form-horizontal">
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
                                    <div className="modal-footer">
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
                </div>
            </div>
            <ReactTooltip />
        </>
    )
}

export default AddStudentResult;