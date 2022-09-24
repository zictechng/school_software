import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import Select from "react-select";
import ReactToPrint from "react-to-print";
import axios from 'axios';
import Image from '../../assets/dist/img/avatar_2.png';
import { UserContext } from '../../context/UserContext';

function ResultChecker() {
    const history = useHistory();
    const date = new Date();
    // get date here...
    // const currentDate_time = today_date + ' ' + time.toLocaleString();
    const dateTime = date.toLocaleTimeString();
    const todayDate = date.toDateString();
    const { schLogo } = useContext(UserContext);

    document.title = "Result Checker | " + window.companyName;
    const componentRef = useRef(null);
    const [result_details, setResultDetails] = useState([]);
    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);
    const [all_class, setAllClass] = useState([]);
    const [my_result_details, setMyResultDetails] = useState([]);
    const [student_profile, setStudentProfile] = useState([]);
    const [termName, setTermName] = useState([]);
    const [yearName, setYearName] = useState([]);
    const [className, setClassName] = useState([]);
    const [total_subject_offer, setTotalSubjectOffer] = useState([]);
    const [grand_score, setGrandScore] = useState([]);
    const [student_position, setStudentPosition] = useState([]);
    const [teacher_comment, setTeacherComment] = useState([]);
    const [principle_comment, setPrincipleComment] = useState([]);
    const [student_psychomotor, setStudentPsychomotor] = useState([]);
    const [school_opening, setSchoolOpening] = useState([]);
    const [school_start_date, setStartDate] = useState([]);
    const [student_attendance, setStudentAttendance] = useState([]);
    const [student_class_average, setStudentClassAverage] = useState([]);
    const [subject_total, setSubjectTotal] = useState([]);

    const [display_image, setDisplay_image] = useState([]);

    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [is_loading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState(null);
    const [isLoading, setIsloading] = useState(false);

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
        formDataSubmit.append('card_pin', save_textInput.card_pin);
        try {
            // let create the api url here
            axios.post(`/api/check_result`, formDataSubmit).then((res) => {
                if (res.data.status === 200) {
                    setValidationErrors(null);
                    toast.success(res.data.message, {
                        theme: "colored",
                    });
                    setMyResultDetails(res.data.result_info.resultDetails);


                    // console.log(res.data.result_info.resultDetails);
                    // console.log(res.data.result_info.classDetails);
                    setIsloading(false);
                    setResultForm(false);
                    setSchoolOpening(res.data.result_info.sch_open);
                    setStartDate(res.data.result_info.sch_start);
                    setStudentAttendance(res.data.result_info.attendance_count);
                    //console.log(res.data.result_info.attendance_count);
                    //console.log(res.data.result_info.classAverage);
                    setStudentClassAverage(res.data.result_info.classAverage);
                    setSubjectTotal(res.data.result_info.subject_total);
                    //console.log(res.data.result_info.subject_total);

                    setStudentProfile(res.data.result_info.studentDetail);
                    setDisplay_image(res.data.result_info.studentDetail);
                    setYearName(res.data.result_info.year);
                    setTermName(res.data.result_info.term);
                    setClassName(res.data.result_info.class);
                    setTotalSubjectOffer(res.data.result_info.subject_offer);
                    setGrandScore(res.data.result_info.grand_score);
                    setStudentPosition(res.data.result_info.class_position);
                    setPrincipleComment(res.data.result_info.comment_prin);
                    setTeacherComment(res.data.result_info.comment_teacher);
                    setStudentPsychomotor(res.data.result_info.psychomotor);

                }
                // scratch card not active
                else if (res.data.status === 422) {
                    setValidationErrors(res.data.errors);
                    setIsloading(false);
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
                    //console.log(error.response.data.errors);
                });
        }
        catch (error) {
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
    var file_link = "";
    var pin_status = "";
    var delete_button = "";
    var position = "";
    var absent_days = school_opening.days_open - student_attendance;
    var classAverage = (grand_score.user_total / student_class_average).toFixed(2);
    var personal_average = (grand_score.user_total / subject_total).toFixed(2);


    var table_record = "";
    if (my_result_details.length > 0) {
        table_record = <div>
            <div className="invoice mb-3 shadow-lg" ref={componentRef} >
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
                                        <th>Position </th>
                                        <td>{student_position ? student_position : ""}</td>
                                        <th>Class</th>
                                        <td>{className.class_name}</td>
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
                                        <th>Grade Total</th>
                                        <td>{grand_score.user_total}</td>
                                        <th>Out of</th>
                                        <td>{my_result_details.length * 100}</td>
                                    </tr>
                                    <tr>
                                        <th>Days School Opened </th>
                                        <td>{school_opening.days_open}</td>
                                        <th>Average: </th>
                                        <td>{personal_average}</td>
                                        <th>Day(s) Absent</th>
                                        <td>{absent_days.toString()}</td>
                                        <th>Class Average</th>
                                        <td>{classAverage}</td>
                                        <th>Final Grade</th>
                                        <td>F</td>
                                    </tr>

                                    <tr>
                                        <th>Semester Start  </th>
                                        <td>{school_start_date.start_date}</td>
                                        <th>Semester Ends  </th>
                                        <td>{school_start_date.close_date}</td>
                                        <th></th>
                                        <td></td>
                                        <th></th>
                                        <td></td>
                                        <th></th>
                                        <td></td>
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
                                        <th>Exam</th>
                                        <th>Total</th>
                                        <th>Grade</th>
                                        <th>Remark</th>
                                        <th>Position</th>
                                        <th>Highest</th>
                                        <th>Lowest</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {my_result_details.map((item, i) => {

                                        if (item.position == 1 || item.position == 21 || item.position == 31 || item.position == 41 || item.position == 51 || item.position == 61) {
                                            position = item.position + "st";
                                        }
                                        else if (item.position == 2 || item.position == 22 || item.position == 32 || item.position == 42 || item.position == 52 || item.position == 62) {
                                            position = item.position + 'nd';
                                        }
                                        else if (item.position == 23 || item.position == 3 || item.position == 33 || item.position == 43 || item.position == 53 || item.position == 63) {
                                            position = item.position + "rd";
                                        }
                                        else {
                                            position = item.position + 'th';
                                        }
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{item.term_subject.subject_name}</td>
                                                <td>{item.first_ca}</td>
                                                <td>{item.second_ca}</td>
                                                <td>{item.tca_score}</td>
                                                <td>{item.exam_scores}</td>
                                                <td>{item.total_scores}</td>
                                                <td>{item.grade}</td>
                                                <td>{item.remark}</td>
                                                <td>{position}</td>
                                                <td>{item.result_highest}</td>
                                                <td>{item.result_lowest}</td>

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
                                    {teacher_comment ? <tr>
                                        <th style={{ width: 200 }}>Teacher Comments</th>
                                        <td>{teacher_comment.comm_comment}</td>
                                    </tr> : ""}
                                    {principle_comment ? <tr>
                                        <th>Principle Comments</th>
                                        <td>{principle_comment.comm_comment}</td>
                                    </tr> : ""}

                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* accepted payments column */}
                    <div className="col-6">
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

                    <div className="col-6">
                        <div className="card-body">
                            <p className="lead" style={p2}><b>Psychomotor</b></p>
                            <div className="table-responsive">
                                {student_psychomotor ?

                                    <table className="table table-bordered table-sm">
                                        <tbody>
                                            <tr>
                                                <th style={{ width: '50%' }}>Effectiveness</th>
                                                <td>{student_psychomotor.effectiveness}</td>
                                            </tr>
                                            <tr>
                                                <th>Neatness</th>
                                                <td>{student_psychomotor.neatness_score}</td>
                                            </tr>
                                            <tr>
                                                <th>Craft</th>
                                                <td>{student_psychomotor.craft_score}</td>
                                            </tr>
                                            <tr>
                                                <th>Punctuality</th>
                                                <td>{student_psychomotor.punctuality_score}</td>
                                            </tr>
                                            <tr>
                                                <th>Sport</th>
                                                <td>{student_psychomotor.sport_score}</td>
                                            </tr>
                                        </tbody>
                                    </table> : <div className='text-center'>
                                        <p style={p}> No Psychomotor at the moment</p>
                                    </div>}

                            </div>
                        </div>
                    </div>
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
                                <h1 className="m-0" style={p}>Result Checker <small></small></h1>
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
                                We keep in mind user friendly system for every users. You can now easily check your result on the go.
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
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label>Scratch Pin</label>
                                                                    <input type="password" name='card_pin' onChange={handleInput}
                                                                        value={save_textInput.message_body} className="form-control" placeholder="Enter Scratch PIN" />
                                                                    {validationErrors &&
                                                                        validationErrors[`card_pin`] ? (
                                                                        <span className="text-danger">
                                                                            {validationErrors[`card_pin`]}
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

export default ResultChecker;