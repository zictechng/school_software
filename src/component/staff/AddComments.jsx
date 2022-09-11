import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Select from "react-select";
import { toast } from "react-toastify";
import axios from "axios";

function AddComments() {
    const history = useHistory();
    document.title = "Manage Student Comment | " + window.companyName;
    const [result_details, setResultDetails] = useState([]);

    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [isLoading, setIsloading] = useState(false);
    const [is_loading, setIsLoading] = useState(false);

    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);
    const [all_class, setAllClass] = useState([]);
    const [fetch_result, setFetchResult] = useState({});
    const [list_error, setListError] = useState([]);
    //const [loading, setLoading] = useState(true);
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
    const submitResult = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            school_year: add_resultInput.school_year,
            school_term: add_resultInput.school_term,
            class: add_resultInput.class,
        }
        try {
            // let create the api url here
            axios.post(`/api/comment_process`, data).then(res => {

                if (res.data.status === 200) {
                    // successful message
                    //toast.success(res.data.allResultDetails.message, { theme: 'colored' });
                    setFetchResult(res.data.allDetails.result_record_details);
                    setAddResultInput({
                        ...add_resultInput,
                        school_year: '',
                        school_term: '',
                        class: '',
                    });
                    e.target.reset();
                    localStorage.setItem("Tid", res.data.allDetails.result_record_details.comm_tid);
                    setListError([]);
                    // console.log(res.data.allDetails.result_record_details.comm_tid);
                    history.push(`/staff/enter-comment`);
                }
                // record already exist
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: 'colored' });

                }
                // result already exist
                else if (res.data.status === 403) {
                    toast.error(res.data.message, { theme: 'colored' });

                    history.push(`/staff/comment`);
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
                setIsFetchloading(false);
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

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">

                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Process Student Comment</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-info btn-sm" data-tip="View Comment" data-place="bottom"> Comment</button>
                                </li>
                                <li className='mr-3'><Link to='/staff/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title"> <a style={p}>Post student comment! Select option below to get started</a> </h3>
                        </div>
                        <div className="overlay-wrapper">
                            {isLoading && <div className="overlay"><i className="spinner-border spinner-border text-info" />
                                <div className="text-bold pt-2">Loading...</div>
                            </div>}
                            <div className="card-body">
                                <form onSubmit={submitResult} className="form-horizontal">
                                    <div className="modal-body">
                                        <div className="card-body">
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

export default AddComments;