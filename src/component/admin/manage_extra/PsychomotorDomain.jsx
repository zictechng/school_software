import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Select from "react-select";
import Pagination from 'react-js-pagination';

function PsychomotorDomain() {
    const history = useHistory();
    document.title = "Affective/Psychomotor Domain | " + window.companyName;
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

    const [isloading, setIs_Loading] = useState(false);

    var PageNumber = 1;
    // create a function to fetch all data here
    const getPsychomotor = (PageNumber) => {
        setIs_Loading(true);
        try {
            // let create the api url here
            axios.get(`/api/get_psychomotor?page=${PageNumber}`).then(res => {
                if (res.data.status === 200) {
                    setGetPsychomotor(res.data.resultAll);
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
                    history.push(`/admin/enter-psychomotor`);
                    setLoading(false);
                }
                // record already exist
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: 'colored' });

                }
                // result already exist
                else if (res.data.status === 403) {
                    toast.error(res.data.message, { theme: 'colored' });

                    history.push(`/admin/psychomotor`);
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
    const submitSubject = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(rows)
        try {
            // let create the api url here
            axios
                .post(`/api/save_assign_subject`, { data: rows, ...formData })
                .then((res) => {
                    if (res.data.status === 200) {
                        setLoading(false);
                        toast.success(res.data.message, {
                            theme: "colored",
                        });
                        setListError([]);
                        //history.push('/admin/ca-result');
                        setShowModal(false);
                        getPsychomotor()
                    }
                    else if (res.data.status === 403) {
                        toast.error(res.data.message, {
                            theme: "colored",
                        });
                        setLoading(false);
                    }
                    else if (res.data.status === 422) {
                        toast.error('Missing Data Required', { theme: 'colored' });
                        setListError(res.data.errors);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setIsloading(false);
                    setValidationErrors(error.response.data.errors);
                });
        } catch (error) {
            setLoading(false);
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, {
                theme: "colored",
            });
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
        axios.get(`/api/fetch_all_details`).then(res => {
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
        classOptions.push({ value: term.id, label: term.class_name });
    });

    function handleSelect2Input(stateName, selectedItem) {
        setAddResultInput({ ...add_resultInput, [stateName]: selectedItem.value });
    }
    // get page properties for pagination
    const { data, current_page, per_page, total, from, to, last_page } = get_psychomotorDomain
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
    // if (get_psychomotorDomain.length > 0) {
    table_record = <div>
        <table id="example1" className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Class Name</th>
                    <th>Term</th>
                    <th>Year</th>
                    <th>Added By</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {get_psychomotorDomain.data.map((item, i) => {
                    return (
                        <tr key={i}>
                            <td>{i + from}</td>
                            <td>{item.saff_class}</td>
                            <td>{item.saff_term}</td>
                            <td>{item.saff_year}</td>
                            <td>{item.saff_addby}</td>
                            <td>{item.saff_date}</td>
                            <td>
                                <Link to={`view-psychomotor/${item.saff_tid}`}><span className='badge bg-info mr-2' type='button'><i className='fa fa-eye text-white'></i></span></Link>
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
                    onChange={(pageNumber) => getPsychomotor(pageNumber)}
                    renderOnZeroPageCount={null}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                />
            </ul>
        </nav>
    </div>
    //     </div>
    // }
    // else {
    //     table_record = <div className='text-center'>
    //         <p style={p}> No record at the moment</p>
    //     </div>
    // }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Manage Psychomotor Domain:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-info btn-sm" data-toggle="modal" data-target="#Addschool_resumption" data-tip="Add Psychomotor" data-place="bottom">Add Psychomotor</button>
                                </li>
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>
                    <p style={p}>
                        Manage all student psychomotor in one place! Click add psychomotor to add new psychomotor domain for student
                    </p>
                    <div className="card table-responsive">
                        <div className="card-header bg-dark">
                            <h3 className="card-title"> Psychomotor details </h3>
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
                                {get_psychomotorDomain.data.length ? table_record :
                                    <div className='text-center'>
                                        <p>No record at the moment</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" data-backdrop="false" role="dialog" id="Addschool_resumption" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        {loading && <div className='overlay text-center'>
                            <div className="spinner-border spinner-border text-info" role="status">
                            </div>
                        </div>}
                        <form onSubmit={submitStaff} className="form-horizontal">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title" id="modal-title">
                                    Select Items to Proceed
                                </h4>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

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
                                        <div className="col-sm-10">
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
                                <button className="btn btn-danger" data-dismiss="modal">
                                    Cancel
                                </button>
                                <button disabled={loading} className="btn btn-success">
                                    {/* {loading && (
                                        <span className="spinner-border spinner-border-sm mr-1"></span>
                                    )} */}
                                    Proceed
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PsychomotorDomain;