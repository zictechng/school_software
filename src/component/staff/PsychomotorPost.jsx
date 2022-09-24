import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import Select from "react-select";

function PsychomotorPost() {
    const history = useHistory();
    document.title = "Psychomotor Domain | " + window.companyName;
    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [get_psychomotorDomain, setGetPsychomotor] = useState([]);
    const [list_error, setListError] = useState([]);
    const [loading, setLoading] = useState(false);
    const [is_loading, setIsLoading] = useState(true);
    const [iLoading, setIloading] = useState(false);
    const [psychomotor, setPsychomotor] = useState([]);

    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);
    const [all_class, setAllClass] = useState([]);

    // create a function to fetch all data here
    const getPsychomotor = (PageNumber = 1) => {
        setIloading(true)
        try {
            // let create the api url here
            axios.get(`/api/get_my_psychomotor?page=${PageNumber}`).then(res => {
                if (res.data.status === 200) {
                    setGetPsychomotor(res.data.resultAll);
                    setIloading(false);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
                }
                setIloading(false);
                setIsLoading(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
        }
    }
    useEffect(() => {
        // call the function here
        getPsychomotor();
        return () => {
        };
    }, []);

    //decl all variable here
    const [add_resultInput, setAddResultInput] = useState({
        school_year: '',
        school_term: '',
        class: '',
    });
    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setAddResultInput({ ...add_resultInput, [e.target.name]: e.target.value })
    }
    const submitStaff = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            school_year: add_resultInput.school_year,
            school_term: add_resultInput.school_term,
            class: add_resultInput.class,
        }
        try {
            // let create the api url here
            axios.post(`/api/start_psychomotor`, data).then(res => {

                if (res.data.status === 200) {
                    // successful message
                    toast.success(res.data.allDetails.message, { theme: 'colored' });
                    setPsychomotor(res.data.allDetails.result_details);
                    setAddResultInput({
                        ...add_resultInput,
                        school_year: '',
                        school_term: '',
                        class: '',
                    });
                    e.target.reset();
                    localStorage.setItem("Tid", res.data.allDetails.result_details.saff_tid);
                    setListError([]);
                    history.push(`/staff/start-psychomotor`);
                    setLoading(false);
                }
                // record already exist
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: 'colored' });

                }
                // result already exist
                else if (res.data.status === 403) {
                    toast.error(res.data.message, { theme: 'colored' });

                    history.push(`/staff/my-psychomotor`);
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
                setLoading(false);
            });

        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setLoading(false);
        }

    }
    const [showModal, setShowModal] = useState(false);
    const handleModal = () => {
        setShowModal(true);
    }
    const handleClosegrade = () => {
        setShowModal(false);
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
            }
        });
    }, []);

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

    function handleSelect2Input(stateName, selectedItem) {
        setAddResultInput({ ...add_resultInput, [stateName]: selectedItem.value });
    }
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    if (is_loading) {
        return (
            <div className="card-body">
                <div className='text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
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
                            <h4 className="m-0">Start Psychomotor Domain</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <Link to='/staff/my-psychomotor'><button type="button" className="btn btn-block btn-info btn-sm" data-tip="View Psychomotor" data-place="bottom">Psychomotor</button></Link>
                                </li>
                                <li className='mr-3'><Link to='/staff/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>
                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title"><a style={p}>To add new psychomotor details, select below details to get started.</a> </h3>
                        </div>
                        {/* /.card-header */}
                        {/* {result_ID.r_tid} */}
                        <div className="card-body">
                            <div className="overlay-wrapper">
                                {loading && <div className="overlay"><i className="spinner-border text-info" style={{ width: "3rem", height: "3rem" }} />
                                    <div className="text-bold pt-2">Loading...</div>
                                </div>}
                                <form onSubmit={submitStaff} className="form-horizontal">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-6">
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
                                    </div>

                                    <div className="modal-footer">
                                        <button disabled={loading} className="btn btn-success">
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

export default PsychomotorPost;