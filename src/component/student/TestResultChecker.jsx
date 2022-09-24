import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import ReactToPrint from "react-to-print";
import Select from "react-select";
import axios from 'axios';
import Image from '../../assets/dist/img/avatar_2.png';
import { UserContext } from '../../context/UserContext';

function TestResultChecker() {
    const history = useHistory();
    document.title = "Result Checker | " + window.companyName;
    const componentRef = useRef(null);
    const date = new Date();
    const { schLogo } = useContext(UserContext);
    // get date here...
    // const currentDate_time = today_date + ' ' + time.toLocaleString();
    const dateTime = date.toLocaleTimeString();
    const todayDate = date.toDateString()

    const [result_details, setResultDetails] = useState([]);
    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);
    const [all_class, setAllClass] = useState([]);
    const [my_result_details, setMyResultDetails] = useState([]);
    const [student_profile, setStudentProfile] = useState([]);
    const [termName, setTermName] = useState([]);
    const [yearName, setYearName] = useState({});
    const [className, setClassName] = useState([]);
    const [ca_result, setCAResult] = useState([]);
    const [my_class, setMyClass] = useState([]);
    const [ca_total, setCATotal] = useState([]);

    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [is_loading, setIsLoading] = useState(false);
    const [list_error, setListError] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [validationErrors, setValidationErrors] = useState(null);

    const [result_form, setResultForm] = useState(true);
    const [logo_school, setLogoSchool] = schLogo;
    // action modal here...
    const handleActivateClose = () => {
        setResultForm(false)
    }
    const [save_textInput, setSaveTextInput] = useState({
        card_pin: "",
    });
    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setSaveTextInput({ ...save_textInput, [e.target.name]: e.target.value });
    };
    const [formData, setFormData] = useState({
        school_year: "",
        school_term: "",
        class: "",
    });

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    // send the request for post via api here..
    const onSubmit = (e) => {
        e.preventDefault();
        setIsloading(true);
        const formDataSubmit = new FormData();
        formDataSubmit.append('school_year', formData.school_year);
        formDataSubmit.append('school_term', formData.school_term);
        formDataSubmit.append('class', formData.class);
        try {
            // let create the api url here
            axios
                .post(`/api/check_ca_result`, formDataSubmit)
                .then((res) => {
                    if (res.data.status === 200) {
                        setValidationErrors(null);
                        toast.success(res.data.message, {
                            theme: "colored",
                        });
                        setMyResultDetails(res.data.result_info.resultDetails);
                        setStudentProfile(res.data.result_info.studentDetail);
                        setMyClass(res.data.result_info.name_class);
                        setTermName(res.data.result_info.term_name);
                        setYearName(res.data.result_info.year_name);
                        setCATotal(res.data.result_info.allTotal);
                        setIsloading(false);
                        setResultForm(false);

                    }
                    // scratch card not active
                    else if (res.data.status === 402) {
                        toast.error(res.data.message, {
                            theme: "colored",
                        });
                        setIsloading(false);
                    }
                    // scratch card usage exceeded
                    else if (res.data.status === 403) {
                        toast.error(res.data.message, {
                            theme: "colored",
                        });
                        setIsloading(false);
                    }
                    // scratch card have been usage by another person
                    else if (res.data.status === 405) {
                        toast.error(res.data.message, {
                            theme: "colored",
                        });
                        setIsloading(false);
                    }
                    // No result found at the moment
                    else if (res.data.status === 404) {
                        toast.error(res.data.message, {
                            theme: "colored",
                        });
                        setIsloading(false);
                    }
                    // file too large here
                    else if (res.data.status === 405) {
                        toast.error(res.data.message, {
                            theme: "colored",
                        });
                        setIsloading(false);
                    }
                })
                .catch((error) => {
                    setValidationErrors(error.response.data.errors);
                    setIsloading(false);
                    //console.log(error.response);
                });
        } catch (error) {
            setIsloading(false);
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, {
                theme: "colored",
            });
        }
    };
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
                //setResultForm(false);
            }
            setIsFetchloading(false);
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
        setFormData({ ...formData, [stateName]: selectedItem.value });
    }
    // check if user have profile image and show it else, show default one.
    const myphoto = "";
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    const p2 = {
        color: "#97a3b9",
        marginTop: "2px",
        marginBottom: "2px",
    };

    // check if user have profile image and show it else, show default one.
    const school_logo = (logo_school.sch_banner !== undefined && logo_school.sch_banner !== null) ?
        (logo_school.uploadedImageLogo ? logo_school.sch_banner : `http://localhost:8000/` + logo_school.sch_banner) : "Banner";


    if (isfetchLoading) {
        return (
            <div style={style}>
                <div className='text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div>
                </div>
            </div>
        )
    }
    var position = "";

    var table_record = "";
    if (my_result_details.length > 0) {
        table_record = <div>
            <div className="invoice mb-3 shadow-sm" ref={componentRef} >
                <img className="" src={school_logo} alt="logo" width={1123} height={170} style={{ opacity: '.8' }} />

                <div className="row">
                    <div className="col-12 table-responsive">
                        <div className="card-body">
                            <table className="table table-bordered table-sm">
                                <thead>
                                    <tr>
                                        <th>Student Name</th>
                                        <td>{student_profile.surname} {student_profile.other_name}</td>
                                        <th>Admin Number</th>
                                        <td>{student_profile.st_admin_number}</td>
                                        <th>Sex</th>
                                        <td>{student_profile.sex}</td>

                                        <th>Class</th>
                                        <td>{my_class.class_name}</td>
                                        <th rowSpan="3" align="top">
                                            {student_profile.st_image ? <img className="img-account-profile rounded-circle mb-2" src={"http://localhost:8000/" + student_profile.st_image} alt={student_profile.st_admin_number} width='90px' height='90' />
                                                : <img className="img-account-profile rounded-circle mb-2" src={Image} alt={student_profile.st_admin_number} width='90px' height='90px' />}
                                        </th>

                                    </tr>
                                    <tr>
                                        <th>Academic Year</th>
                                        <td>{yearName.academic_name}</td>
                                        <th>Term</th>
                                        <td>{termName.term_name}</td>
                                        <th>Age</th>
                                        <td>{student_profile.st_age}</td>
                                        <th>Total</th>
                                        <td>{ca_total.myca_total}</td>

                                    </tr>
                                    <tr>
                                        <div className="text-center">&nbsp;
                                        </div>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 table-responsive">
                        <div className="card-body">
                            <table className="table table-bordered table-sm">
                                <thead>
                                    <tr className='bg-dark'>
                                        <th>#</th>
                                        <th>Subject</th>
                                        <th>CA1</th>
                                        <th>CA2</th>
                                        <th>CA Total</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {my_result_details.map((item, i) => {


                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{item.term_subject.subject_name}</td>
                                                <td>{item.ca1}</td>
                                                <td>{item.ca2}</td>
                                                <td>{item.ca_total}</td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 table-responsive">
                        <div className="card-body">
                            <p style={p2}><b>Comments</b></p>
                            <table className="table table-bordered table-sm">
                                <thead>


                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* accepted payments column */}
                    <div className="col-4">
                        <div className="card-body">
                            <p className="lead" style={p2}><b>GRADING SYSTEM</b></p>
                            <div className="table-responsive">
                                <table className="table table-bordered table-sm">
                                    <tbody>
                                        <tr>
                                            <th>A</th>
                                            <td>70 to 100</td>
                                            <td>Excellent</td>
                                        </tr>
                                        <tr>
                                            <th>B</th>
                                            <td>60 to 69</td>
                                            <td>Good</td>
                                        </tr>
                                        <tr>
                                            <th>C</th>
                                            <td>50 to 59</td>
                                            <td>Credit</td>
                                        </tr>
                                        <tr>
                                            <th>D</th>
                                            <td>45 to 49</td>
                                            <td>Pass</td>
                                        </tr>
                                        <tr>
                                            <th>E</th>
                                            <td>40 to 44</td>
                                            <td>Fair Pass</td>
                                        </tr>
                                        <tr>
                                            <th>F</th>
                                            <td>0 to 39</td>
                                            <td>Failed</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-muted well well-sm shadow-none" style={{ marginTop: 10 }}>
                                Do have a wonderful holiday celebration.
                            </p>
                            <small className=""><strong>Date:</strong> {todayDate} {dateTime}</small>
                        </div>
                    </div>

                    {/* <div className="col-6">
                        <p className="lead" style={p2}><b>Psychomotor</b></p>
                        <div className="table-responsive">

                        </div>
                    </div> */}
                </div>


                <div className="row no-print">
                    <div className="col-12">
                        <div className="card-body">
                            <ReactToPrint
                                trigger={() =>
                                    <button type="button" className="btn btn-secondary float-right" style={{ marginRight: 5 }}>
                                        <i className="fas fa-download" /> Generate PDF / Print
                                    </button>
                                }
                                content={() => componentRef.current}
                                documentTile="Student Result Sheet"
                            />
                            {/* <a href="#" rel="noopener" target="_blank" className="btn btn-default"><i className="fas fa-print" /> Print</a> */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    return (
        <>
            <div className="content-header">
                <div className="container" >
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-7">
                                <h1 className="m-0" style={p}>Test/CA Assessment Checker <small></small></h1>
                            </div>
                            <div className="col-sm-5">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to="/student/index"><li className="breadcrumb-item"> <button type="button" className="btn btn-block btn-secondary btn-sm"> Back</button></li></Link>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className='col-12'>
                            <div className="alert alert-danger alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h5><i className="icon fas fa-info" /> Info!</h5>
                                We keep in mind user friendly system for every users. You can now easily check your test assessment result on the go.
                            </div>

                        </div>
                    </div>
                    <div className="overlay-wrapper">
                        {result_form ? <div>
                            <section className="content">
                                <div className="row">
                                    <div className="col-md-11">
                                        <div className="card card-dark card-outline">
                                            <div className="card-header">
                                                <h3 className="card-title" style={p}>Select option to get started</h3>
                                                <div className="card-tools">

                                                </div>
                                            </div>
                                            {isLoading && <div className="overlay"><i className="spinner-border spinner-border text-info" />
                                                <div className="text-bold ml-2"> checking...
                                                </div>
                                            </div>
                                            }
                                            <form onSubmit={onSubmit} className="form-horizontal">
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
                                                                    {validationErrors &&
                                                                        validationErrors[`school_term`] ? (
                                                                        <span className="text-danger">
                                                                            {validationErrors[`school_term`]}
                                                                        </span>
                                                                    ) : (
                                                                        ""
                                                                    )}
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
                                                                    {validationErrors &&
                                                                        validationErrors[`school_year`] ? (
                                                                        <span className="text-danger">
                                                                            {validationErrors[`school_year`]}
                                                                        </span>
                                                                    ) : (
                                                                        ""
                                                                    )}
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
                                                                    {validationErrors &&
                                                                        validationErrors[`class`] ? (
                                                                        <span className="text-danger">
                                                                            {validationErrors[`class`]}
                                                                        </span>
                                                                    ) : (
                                                                        ""
                                                                    )}
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
                            </section>
                        </div> : ""}
                        {my_result_details.length ? table_record :
                            ""}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TestResultChecker;