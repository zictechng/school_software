import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import Select from "react-select";
import axios from 'axios';

function MarkAttendance() {
    const history = useHistory();
    document.title = "Mark Attendance | " + window.companyName;
    const [isLoading, setIsloading] = useState(false);
    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);
    const [all_class, setAllClass] = useState([]);
    const [all_subjects, setAllSubjects] = useState([]);

    const [fetch_result, setFetchResult] = useState({});
    const [list_error, setListError] = useState([]);
    const [loading, setLoading] = useState(true);
    const [is_loading, setIs_Loading] = useState(false);
    //decl all variable here
    const [formData, setFormData] = useState({
        sch_class: '',
        school_year: '',
        sch_term: '',
    });
    const [add_attendInput, setAddAttenInput] = useState({
        mark_date: '',
    });
    const handleInput = (e) => {
        e.persist();
        setAddAttenInput({ ...add_attendInput, [e.target.name]: e.target.value })
    }
    const submitAttendance = (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            mark_date: add_attendInput.mark_date,
        }
        try {
            // let create the api url here
            axios.post(`/api/start_my_attendance`,
                {
                    data: formData,
                    ...{
                        mark_date: add_attendInput.mark_date,
                    },
                }).then(res => {
                    if (res.data.status === 200) {
                        // successful message
                        localStorage.setItem("tID", res.data.gDetails.tID);
                        setFormData({
                            ...formData,
                            sch_class: '',
                            school_year: '',
                            mark_date: '',
                            sch_term: '',
                        });
                        e.target.reset();
                        setListError([]);
                        history.push(`/staff/mark-attendance`);
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
                    // data input required
                    else if (res.data.status === 403) {
                        toast.error(res.data.message, { theme: 'colored' });
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
                setSchoolTerm(res.data.allDetails.term_details);
                setSchoolYear(res.data.allDetails.session_details);
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
            setLoading(false);
        });
    }, []);

    if (loading) {
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
        setCAResultInput({ ...add_resultInput, [stateName]: selectedItem.value });
    }
    function handleSelectInput(stateName, selectedItem) {
        setFormData({ ...formData, [stateName]: selectedItem.value });

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
                            <h4 className="m-0">Start Attendance</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <Link to='/staff/attendance'><button type="button" className="btn btn-block btn-info btn-sm" data-tip="Back" data-place="bottom"> Back</button></Link>
                                </li>
                                <li className='mr-3'><Link to='/staff/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>
                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title"><a style={p}>To add new student attendance details, select below details to get started.</a> </h3>
                        </div>
                        {/* /.card-header */}
                        {/* {result_ID.r_tid} */}
                        <div className="card-body">
                            <div className="overlay-wrapper">
                                {isLoading && <div className="overlay"><i className="spinner-border text-info" style={{ width: "3rem", height: "3rem" }} />
                                    <div className="text-bold pt-2">Loading...</div>
                                </div>}
                                <form onSubmit={submitAttendance} className="form-horizontal">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Class</label>
                                                <Select
                                                    name="sch_class"
                                                    options={classOptions}
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    isDisabled={false}
                                                    isLoading={false}
                                                    onChange={(e) => handleSelectInput("sch_class", e)}
                                                />
                                                <small className='text-danger'>{list_error.sch_class}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Year</label>
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

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Term</label>
                                                <Select
                                                    name="sch_term"
                                                    options={termOptions}
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    isDisabled={false}
                                                    isLoading={false}
                                                    onChange={(e) => handleSelectInput("sch_term", e)}
                                                />
                                                <small className='text-danger'>{list_error.sch_term}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Mark Date</label>
                                                <input type="date" name='mark_date' onChange={handleInput} value={add_attendInput.mark_date} className="form-control" placeholder="Surname" />
                                                <span className='text-danger'>{list_error.mark_date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button disabled={loading} className="btn btn-success">
                                            {loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
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

export default MarkAttendance;