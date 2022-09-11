import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import { UserContext } from '../../../context/UserContext';

function ViewResult() {

    document.title = "View Result | ";
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsloading] = useState(false);
    const [bnt_isLoading, setIBntsloading] = useState(false);
    const [bnt_subjectLoading, setBntSubjectloading] = useState(false);

    var view_code = "";
    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);
    const [all_class, setAllClass] = useState([]);
    const [all_subjects, setAllSubjects] = useState([]);
    const [sch_category, setSchCatgory] = useState([]);

    const { classResult, subjectResult } = useContext(UserContext);


    //decl all variable here
    const [view_class, setViewClass] = useState({
        class_year: '',
        class_term: '',
        class_apply: '',
        class_category: '',
        error_list: [],
    });

    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setViewClass({ ...view_class, [e.target.name]: e.target.value })
    }

    const submitClass = (e) => {
        e.preventDefault();
        setIBntsloading(true);

        const data = {
            class_year: view_class.class_year,
            class_term: view_class.class_term,
            class_apply: view_class.class_apply,
            class_category: view_class.class_category,
        }
        try {
            // let create the api url here
            axios.post(`/api/view_result_process`, data).then(res => {
                if (res.data.status === 200) {
                    // successful message
                    //toast.success(res.data.message, { theme: 'colored' });
                    setViewClass({
                        ...view_class,
                        class_year: '',
                        class_term: '',
                        class_apply: '',
                        class_category: '',
                    });
                    //setResultClass(data);
                    view_code = localStorage.setItem('classCode', res.data.view_code);
                    console.log(view_code);
                    //setResultClass(res.data.view_code);

                    e.target.reset();
                    history.push('/admin/result-view');
                }
                // record already exist
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                // data input required
                else if (res.data.status === 422) {
                    toast.error('Missing Data Required', { theme: 'colored' });
                    setViewClass({ ...view_class, error_list: res.data.errors });
                }
                // No result found
                else if (res.data.status === 404) {
                    toast.error(res.data.message, { theme: 'colored' });

                }
                // error record not save
                else if (res.data.status === 500) {
                    toast.warning('Missing Data Required', { theme: 'colored' });
                    setViewClass({ ...view_class, error_list: res.data.errors });
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { theme: 'colored' });
                }
                setIBntsloading(false);
            });

        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setIBntsloading(false);
        }
    }


    //decl all variable here
    const [view_subject, setViewSubject] = useState({
        year: '',
        term: '',
        class: '',
        subject: '',
        error_list: [],
    });

    // declare input handling function here
    const handleInputSubject = (e) => {
        e.persist();
        setViewSubject({ ...view_subject, [e.target.name]: e.target.value })
    }

    const submitSubject = (e) => {
        e.preventDefault();
        setBntSubjectloading(true);

        const data = {
            year: view_subject.year,
            term: view_subject.term,
            class: view_subject.class,
            subject: view_subject.subject,
        }
        try {
            // let create the api url here
            axios.post(`/api/view_result_subject`, data).then(res => {
                if (res.data.status === 200) {
                    setViewSubject({
                        ...view_subject,
                        year: '',
                        term: '',
                        class: '',
                        subject: '',
                    });
                    view_code = localStorage.setItem('classCode', res.data.view_code);
                    console.log(view_code);
                    setResultClass(res.data.view_code);

                    e.target.reset();
                    history.push('/admin/result-subject');
                }
                // record already exist
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                // data input required
                else if (res.data.status === 422) {
                    toast.error('Missing Data Required', { theme: 'colored' });
                    setViewClass({ ...view_subject, error_list: res.data.errors });
                }
                // No result found
                else if (res.data.status === 404) {
                    toast.error(res.data.message, { theme: 'colored' });

                }
                // error record not save
                else if (res.data.status === 500) {
                    toast.warning('Missing Data Required', { theme: 'colored' });
                    setBntSubjectloading(false);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                    setBntSubjectloading(false);
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { theme: 'colored' });
                }
                setBntSubjectloading(false);
            });

        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setBntSubjectloading(false);
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
            setLoading(false);
        });
    }, []);

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
                    <div className="card card-default">
                        <div className="card-header card-outline card-info">
                            <h3 className="card-title"><span className='text-danger'> View result details by class here</span></h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>

                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <form onSubmit={submitClass}>
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className="form-group">
                                                <select name='class_year' onChange={handleInput} value={view_class.class_year} className="form-control">
                                                    <option>Select Year</option>
                                                    {
                                                        schoolYears.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.academic_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className='text-danger'>{view_class.error_list.class_year}</span>
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className="form-group">
                                                <select name='class_term' onChange={handleInput} value={view_class.class_term} className="form-control">
                                                    <option>Select Term</option>
                                                    {
                                                        schoolTerm.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.term_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className='text-danger'>{view_class.error_list.class_term}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className="form-group">
                                                <select name='class_apply' onChange={handleInput} value={view_class.class_apply} className="form-control">
                                                    <option>Select Class</option>
                                                    {
                                                        all_class.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.class_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className='text-danger'>{view_class.error_list.class_apply}</span>
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className="form-group">
                                                <select name='class_category' onChange={handleInput} value={view_class.class_category} className="form-control">
                                                    <option>Select Category</option>
                                                    {
                                                        sch_category.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.sc_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className='text-danger'>{view_class.error_list.class_category}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type='submit' disabled={bnt_isLoading} className="btn btn-success">
                                        {bnt_isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                        View Result
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>


                    <div className="card card-default">
                        <div className="card-header card-outline card-info">
                            <h3 className="card-title"><span className='text-danger'> View result details by subject here</span></h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>

                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <form onSubmit={submitSubject}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <select name='year' onChange={handleInputSubject} value={view_subject.subject_year} className="form-control">
                                                    <option>Select Year</option>
                                                    {
                                                        schoolYears.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.academic_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className='text-danger'>{view_subject.error_list.year}</span>
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className="form-group">
                                                <select name='term' onChange={handleInputSubject} value={view_subject.subject_term} className="form-control">
                                                    <option>Select Term</option>
                                                    {
                                                        schoolTerm.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.term_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className='text-danger'>{view_subject.error_list.term}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className="form-group">
                                                <select name='class' onChange={handleInputSubject} value={view_subject.subject_class} className="form-control">
                                                    <option>Select Class</option>
                                                    {
                                                        all_class.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.class_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className='text-danger'>{view_subject.error_list.class}</span>
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className="form-group">
                                                <select name='subject' onChange={handleInputSubject} value={view_subject.subject} className="form-control">
                                                    <option>Select Subject</option>
                                                    {
                                                        all_subjects.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.subject_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className='text-danger'>{view_subject.error_list.subject}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type='submit' disabled={bnt_subjectLoading} className="btn btn-success">
                                            {bnt_subjectLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                            View Result
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ReactTooltip />
        </>
    )
}

export default ViewResult;