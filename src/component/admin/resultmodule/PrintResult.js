import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ReactToPrint from "react-to-print";
import Select from "react-select";

function PrintResult() {
    const componentRef = useRef(null)
    const history = useHistory();
    document.title = "Result Checker | " + window.companyName;

    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [student_details, setStudentDetails] = useState([]);
    const [class_info, setClassInfo] = useState('');
    const [list_error, setListError] = useState([]);
    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);
    const [all_class, setAllClass] = useState([]);
    const [result_year, setResultYear] = useState([]);
    const [result_term, setResultTerm] = useState([]);


    const [validationErrors, setValidationErrors] = useState(null);

    // get date here...
    const current = new Date();
    const today_date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        school_class: '',
        school_year: '',
        school_term: '',
    });
    const [classInput, setClassInput] = useState({
        class_name: '',
    });

    const handleEdit = (e) => {
        e.persist();
        setClassInput({ ...classInput, [e.target.name]: e.target.value })
    }
    const submitTemplate = (e) => {
        e.preventDefault();
        setLoading(true)
        const recordId = {
            school_term: formData.school_term,
            school_year: formData.school_year,
            school_class: formData.school_class,
        }
        try {
            // let create the api url here
            axios.post(`/api/fetch_student_result`, recordId)
                .then(res => {
                    if (res.data.status === 200) {
                        // successful message
                        setFormData({
                            ...recordId,
                            school_class: '',
                            school_year: '',
                            school_term: '',
                        });
                        setListError([]);
                        setStudentDetails(res.data.allDetails.student_resultDetails);
                        setClassInfo(res.data.allDetails.classDetails)
                        setResultTerm(res.data.allDetails.termDetails)
                        setResultYear(res.data.allDetails.yearDetails)
                        // history.push(`/admin/attendance-view`);
                        setLoading(false);
                    }
                    // record not exist
                    else if (res.data.status === 404) {
                        toast.error(res.data.message, { theme: 'colored' });
                        setListError(res.data.errors);
                        console.log(res.data.status)
                    }
                    // data input required
                    else if (res.data.status === 422) {
                        toast.error('Missing Data Required', { theme: 'colored' });
                        setListError(res.data.errors);
                        setLoading(false);
                    }
                    // // No result found
                    // else if (res.data.status === 404) {
                    //     toast.error(res.data.message, { theme: 'colored' });
                    //     setListError(res.data.errors);
                    //     setValidationErrors(error.response.data.errors);
                    //     setLoading(false);

                    // }
                    // No result found
                    else if (res.data.status === 500) {
                        toast.error('sorry, server error! Try again', { theme: 'colored' });
                        setValidationErrors(error.response.data.errors);
                        setLoading(false);
                    }
                    // data input required
                    else if (res.data.status === 403) {
                        toast.error(res.data.message, { theme: 'colored' });
                        setValidationErrors(error.response.data.errors);
                        setLoading(false);
                    }
                    // login required
                    else if (res.data.status === 401) {
                        toast.error(res.data.message, { theme: 'colored' });
                        setValidationErrors(error.response.data.errors);
                    }
                    setLoading(false);

                }).catch((error) => {
                    setValidationErrors(error.response.data.errors);
                    setLoading(false);
                    console.log(error.response.data.errors);
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
                setSchoolYear(res.data.allDetails.session_details);
                setSchoolTerm(res.data.allDetails.term_details);
            }
            else {
                toast.error("sorry, data missing! Try again.", { theme: 'colored' });
            }
        });
    }, []);

    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_all_details`).then(res => {
            if (res.data.status === 200) {
                setAllClass(res.data.allDetails.class_details);
                setIsFetchloading(false);
            }
            else {
                toast.error("sorry, data missing! Try again.", { theme: 'colored' });
            }
        });
    }, []);

    // CODE FOR SELECT 2
    const classOptions = [];
    all_class.map((term) => {
        classOptions.push({ value: term.id, label: term.class_name });
    });

    const yearOptions = [];
    schoolYears.map((term) => {
        yearOptions.push({ value: term.id, label: term.academic_name });
    });
    const termOptions = [];
    schoolTerm.map((term) => {
        termOptions.push({ value: term.id, label: term.term_name });
    });
    function handleSelectInput(stateName, selectedItem) {
        setFormData({ ...formData, [stateName]: selectedItem.value });

    }
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    const p2 = {
        color: "#97a3b9",
        marginTop: "3px",
        marginBottom: "2px",
    };

    var table_record = "";
    if (student_details.length > 0) {
        table_record =
            <div className='' ref={componentRef}>
                <section className="content" >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="invoice p-3 mb-3">
                                    <div className="row">
                                        <div className="col-12">
                                            <h4>
                                                <i className="" />Class Name: <a style={p}>  {class_info.class_name} </a>
                                                <i className="" />Year: <a style={p}>  {result_year.academic_name} </a>
                                                <i className="" />Term: <a style={p}>  {result_term.term_name} </a>
                                                <small className="float-right">Date: <a style={p}> {today_date}</a></small>
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 table-responsive">
                                            <div className="card-body">
                                                <table className="table table-bordered table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: 10 }}>#</th>
                                                            <th>Admission Number</th>
                                                            <th>Student Name</th>
                                                            <th>Total CA</th>
                                                            <th>Grand Total</th>
                                                            <th>View</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {student_details.map((item, i) => {

                                                            return (
                                                                <tr key={i}>
                                                                    <td>{i + 1}</td>
                                                                    <td>{item.admin_number}</td>
                                                                    <td>{item.student_name}</td>
                                                                    <td>{item.ca_total}</td>
                                                                    <td>{item.exam_total}</td>
                                                                    <td><Link to={`show-result/${item.id}`} target='_blank'><span className='badge bg-info mr-2' type='button'> View</span></Link></td>

                                                                </tr>
                                                            )
                                                        })
                                                        }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        {/* /.col */}
                                    </div>

                                    <div className="row no-print">
                                        <div className="col-12">
                                            <ReactToPrint
                                                trigger={() => <button className="btn btn-secondary float-right"><i className="fas fa-print" />Print</button>}
                                                content={() => componentRef.current}
                                                documentTile="Student Result Score Sheet Template"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
    }

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

    return (
        <>

            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">View Student Result:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                </li>
                                <li className='mr-3'><Link to='/staff/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>

                    <p style={p}>
                        Generating student result template to view. select class, year and term details to generate the result template for viewing.
                    </p>

                    <div className="overlay-wrapper">

                        {loading && <div className="overlay"><i className="spinner-border text-info" style={{ width: "2rem", height: "2rem" }} />
                            <div className="text-bold ml-2"> Processing...</div>
                        </div>}

                        <form onSubmit={submitTemplate}>
                            <div className="row">
                                <div className="col-md-12 offset-md-1">
                                    <div className="responsive">
                                        <div className='row'>
                                            <div className="form-group col-2">
                                                <label> Class Name</label>
                                                <Select
                                                    name="school_class"
                                                    options={classOptions}
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    isDisabled={false}
                                                    isLoading={false}
                                                    onChange={(e) => handleSelectInput("school_class", e)}
                                                />
                                                {validationErrors &&
                                                    validationErrors[`school_class`] ? (
                                                    <span className="text-danger">
                                                        {validationErrors[`school_class`]}
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="form-group col-2">
                                                <label> Academic Year</label>
                                                <Select
                                                    name="school_year"
                                                    options={yearOptions}
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    isDisabled={false}
                                                    isLoading={false}
                                                    onChange={(e) => handleSelectInput("school_year", e)}
                                                />
                                                {validationErrors &&
                                                    validationErrors[`school_year`] ? (
                                                    <span className="text-danger">
                                                        {validationErrors[`school_year`]}
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>

                                            <div className="form-group col-2">
                                                <label> Academic Term</label>
                                                <Select
                                                    name="school_term"
                                                    options={termOptions}
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    isDisabled={false}
                                                    isLoading={false}
                                                    onChange={(e) => handleSelectInput("school_term", e)}
                                                />
                                                {validationErrors &&
                                                    validationErrors[`school_term`] ? (
                                                    <span className="text-danger">
                                                        {validationErrors[`school_term`]}
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="form-group col-2">
                                                <label style={p2}> Query</label>
                                                <ol className="breadcrumb mr-3">
                                                    <button type="submit" className="btn btn-info">
                                                        <i className="fa fa-search" />
                                                    </button>
                                                </ol>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {table_record}

                    {/* <div className='text-center'>
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                    </div> */}
                </div>
            </div>



        </>
    )
}

export default PrintResult;