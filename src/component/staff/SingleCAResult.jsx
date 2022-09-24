import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ReactTooltip from 'react-tooltip';
import Select from "react-select";

function SingleCAResult() {
    document.title = "Manage Single CA Entry | " + window.companyName;
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsloading] = useState(false);
    const [all_studentDetails, setAllStudentDetails] = useState([]);
    const [allstudentDetails, setStudentDetails] = useState([]);
    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);
    const [all_class, setAllClass] = useState([]);
    const [sch_category, setSchCatgory] = useState([]);

    const [class_id, setClassId] = useState([]);

    const [all_subjects, setAllSubjects] = useState([]);
    const [validationErrors, setValidationErrors] = useState(null);
    const [rows, setRows] = useState([
        {
            admin_number: "",
            ca1_score: "",
            ca2_score: "",
            total: "",
        },
    ]);

    const [formData, setFormData] = useState({
        year: "",
        term: "",
        subject: "",
        class: "",
    });

    const handleFormDataChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_all_student_result`).then((res) => {
            if (res.data.status === 200) {
                setStudentDetails(res.data.student_record);
            }
            setLoading(false);
        });
    }, []);

    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_all_details`).then((res) => {
            if (res.data.status === 200) {
                setSchoolTerm(res.data.allDetails.term_details);
                setSchoolYear(res.data.allDetails.session_details);
                setSchCatgory(res.data.allDetails.sch_category_details)
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
        });
    }, []);

    const handleOnChange = (e, index) => {
        if (["ca1_score", "ca2_score"].includes(e.target.name)) {
            if (e.target.value > 20)
                return toast.error("CA score not more than 20", {
                    theme: "colored",
                });
        }
        rows[index] = {
            ...rows[index],
            [e.target.name]: e.target.value,
        };

        if (!["admin_number", "total"].includes(e.target.name)) {
            rows[index] = {
                ...rows[index],
                total:
                    parseInt(rows[index].ca1_score || 0) +
                    parseInt(rows[index].ca2_score || 0)
            };
        }

        setRows([...rows]);
    };

    const handleSelectChange = (e, i) => {
        rows[i] = { ...rows[i], admin_number: e.target.value };

        setRows([...rows]);
    };

    const addRow = () => {
        const newRow = {
            admin_number: "",
            ca1_score: "",
            ca2_score: "",
            total: "",
        };

        setRows([...rows, newRow]);
    };

    const removeRow = (e, i) => {
        rows.splice(i, 1);

        setRows([...rows]);
    };

    const onSubmit = (e) => {
        setIsloading(true);
        try {
            // let create the api url here
            axios
                .post(`/api/my_single_ca_save`, {
                    data: rows,
                    year: formData.year,
                    term: formData.term,
                    subject: formData.subject,
                    class: class_id,
                })
                .then((res) => {
                    if (res.data.status === 200) {
                        setIsloading(false);
                        setValidationErrors(null);
                        toast.success(res.data.message, {
                            theme: "colored",
                        });
                        history.push('/staff/ca-result');
                    }
                    else if (res.data.status === 403) {
                        toast.error(res.data.message, {
                            theme: "colored",
                        });
                        setIsloading(false);
                    }
                })
                .catch((error) => {
                    setIsloading(false);
                    setValidationErrors(error.response.data.errors);
                });
        } catch (error) {
            setIsloading(false);
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, {
                theme: "colored",
            });
        }
    };

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
        setFormData({ ...formData, [stateName]: selectedItem.value });
    }
    // this will be called when class select dropdown is change and use it to fetch student base on
    // the class id selected.
    function handleSelectClassnput(stateName, selectedItem) {
        //alert(selectedItem.value);
        setClassId(selectedItem.value);
        var class_data = selectedItem.value;
        // let create the api url here
        axios.post(`/api/fetch_all_student_name/`, { id: class_data }).then(res => {
            if (res.data.status === 200) {
                setAllStudentDetails(res.data.allstudent_list);
            }
        });
    }
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    if (loading) {
        return (
            <div className="card-body">
                <div className="text-center">
                    <div
                        className="spinner-border spinner-border text-info"
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
                            <h4 className="m-0">Single CA Result Entry</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="mr-3">
                                    <Link to="/staff/ca-result">
                                        <button
                                            type="button"
                                            className="btn btn-block btn-info btn-sm" data-tip="View CA Result" data-place="bottom"
                                        >
                                            View Result
                                        </button>
                                    </Link>{" "}
                                </li>
                                <li className="mr-3">
                                    <Link to="/staff/index">
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

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title">
                                <p style={p}>
                                    Single CA Result Entry!
                                    {" "}<Link to="#" className="text-danger"> Use this module to enter CA result for selected student</Link>
                                </p>

                            </h3>
                        </div>
                        {/* /.card-header */}
                        {isLoading && <div className='overlay text-center'>
                            <div className="spinner-border spinner-border text-info" role="status">
                            </div>
                        </div>}
                        <div className="card-body">
                            <div className="text-center"></div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <Select
                                                name="subject"
                                                options={subjectOptions}
                                                isClearable={true}
                                                isSearchable={true}
                                                isDisabled={false}
                                                isLoading={false}
                                                placeholder="Select Subject"
                                                onChange={(e) => handleSelect2Input("subject", e)}
                                            />
                                            {validationErrors &&
                                                validationErrors[`subject`] ? (
                                                <span className="text-danger">
                                                    {validationErrors[`subject`]}
                                                </span>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <Select
                                                name="term"
                                                options={termOptions}
                                                isClearable={true}
                                                isSearchable={true}
                                                isDisabled={false}
                                                isLoading={false}
                                                placeholder="Select Term"
                                                onChange={(e) => handleSelect2Input("term", e)}
                                            />
                                            {validationErrors &&
                                                validationErrors[`term`] ? (
                                                <span className="text-danger">
                                                    {validationErrors[`term`]}
                                                </span>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <Select
                                                name="year"
                                                options={yearOptions}
                                                isClearable={true}
                                                isSearchable={true}
                                                isDisabled={false}
                                                isLoading={false}
                                                placeholder="Select Year"
                                                onChange={(e) => handleSelect2Input("year", e)}
                                            />
                                            {validationErrors &&
                                                validationErrors[`year`] ? (
                                                <span className="text-danger">
                                                    {validationErrors[`year`]}
                                                </span>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <Select
                                                name="class"
                                                options={classOptions}
                                                isClearable={true}
                                                isSearchable={true}
                                                isDisabled={false}
                                                isLoading={false}
                                                placeholder="Select Class"
                                                onChange={(e) => handleSelectClassnput("class", e)}
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
                            <table
                                id="example1"
                                className="table table-bordered table-striped"
                            >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>TID</th>
                                        <th>CA 1</th>
                                        <th>CA 2</th>
                                        <th>Total</th>
                                        <th>
                                            <span
                                                className="badge bg-primary mr-2"
                                                type="button"
                                                onClick={addRow}
                                            >
                                                <i className="fa fa-plus text-white"></i>
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>
                                                <select
                                                    name="admin_number"
                                                    className="form-control"
                                                    onChange={(e) => handleSelectChange(e, i)}
                                                >
                                                    <option>Select Student</option>
                                                    {all_studentDetails.map((item) => {
                                                        return (
                                                            <option value={item.st_admin_number} key={item.id}>{item.other_name} {item.surname}</option>
                                                        );
                                                    })}
                                                </select>
                                            </td>

                                            <td>
                                                <input
                                                    type="text"
                                                    name="ca1_score"
                                                    className="form-control"
                                                    placeholder="CA 1"
                                                    onChange={(e) => handleOnChange(e, i)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="ca2_score"
                                                    className="form-control"
                                                    onChange={(e) => handleOnChange(e, i)}
                                                    placeholder="CA 2"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="total"
                                                    className="form-control"
                                                    onChange={(e) => handleOnChange(e, i)}
                                                    placeholder="total"
                                                    value={row.total}
                                                />
                                            </td>
                                            <td>{
                                                i ? <span className='badge bg-danger mr-2' onClick={(e) => removeRow(e, i)} style={{ cursor: "pointer" }}><i className='fa fa-times text-white'></i></span>
                                                    : null
                                            }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-success"
                                    disabled={isLoading}
                                    onClick={(e) => onSubmit(e)}
                                >
                                    Proceed
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ReactTooltip />
        </>
    );
}

export default SingleCAResult;