import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ReactTooltip from 'react-tooltip';
import Select from "react-select";
function PostAssignment() {

    document.title = "Post Assignment | " + window.companyName;
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsloading] = useState(false);
    const [all_class, setAllClass] = useState([]);
    const [sch_category, setSchCatgory] = useState([]);

    const [all_subjects, setAllSubjects] = useState([]);
    const [validationErrors, setValidationErrors] = useState(null);

    const [picture, setPicture] = useState([]);

    const [save_textInput, setSaveTextInput] = useState({
        message_body: "",
        title: "",
        submit_date: "",
        image: "",
        assignment_type: "",
    });
    /* this handle file/image fields */
    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    }

    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setSaveTextInput({ ...save_textInput, [e.target.name]: e.target.value });
    };

    const [selectData, setSelectData] = useState({
        subject: "",
        class: "",
    });

    const handleFormDataChange = (e) => {
        setSelectData({ ...selectData, [e.target.name]: e.target.value });
    };
    // send the request for post via api here..
    const onSubmit = (e) => {
        e.preventDefault();
        setIsloading(true);
        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('message_body', save_textInput.message_body);
        formData.append('title', save_textInput.title);
        formData.append('submit_date', save_textInput.submit_date);
        formData.append('assignment_type', save_textInput.assignment_type);
        formData.append('class', selectData.class);
        formData.append('subject', selectData.subject);

        try {
            // let create the api url here
            axios
                .post(`/api/post_assignment`, formData)
                .then((res) => {
                    if (res.data.status === 200) {
                        setValidationErrors(null);
                        toast.success(res.data.message, {
                            theme: "colored",
                        });
                        setIsloading(false);
                        history.push('/staff/index');
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

    const classOptions = [];
    all_class.map((term) => {
        classOptions.push({ value: term.cls__class_id, label: term.cls__class_name });
    });

    const subjectOptions = [];
    all_subjects.map((term) => {
        subjectOptions.push({ value: term.sub_subject_id, label: term.sub_subject_name });
    });

    function handleSelect2Input(stateName, selectedItem) {
        setSelectData({ ...selectData, [stateName]: selectedItem.value });
    }

    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    if (loading) {
        return (
            <div className='text-center'>
                <div className="spinner-border spinner-border text-info" role="status">
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
                            <h4 className="m-0">Assignment</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="mr-3">
                                    <Link to="/staff/assignment">
                                        <button
                                            type="button"
                                            className="btn btn-block btn-info btn-sm" data-tip="View Assignment Details" data-place="bottom"
                                        >
                                            View Assignment
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
                    <div><p style={p}> Post and manage assignment for your student</p></div>
                    <div className="overlay-wrapper">
                        {isLoading && <div className="overlay"><i className="spinner-border spinner-border text-info" />
                            <div className="text-bold pt-2">Loading...</div>
                        </div>}

                        <div className="card">
                            <div className="card-body">
                                <form>
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">
                                            <div className="row">
                                                <div className="col-5">
                                                    <div className="form-group">
                                                        <label>Assignment Title:</label>
                                                        <input name='title' className='form-control' onChange={handleInput}
                                                            value={save_textInput.title} placeholder='Assignment Title' />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label>Assignment Type:</label>
                                                        <select className="form-control" name='assignment_type' onChange={handleInput}
                                                            value={save_textInput.assignment_type}>
                                                            <option>Select Type</option>
                                                            <option value="Home Work">Home Work</option>
                                                            <option value="Class Work">Class Work</option>
                                                        </select>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5">
                                                    <div className="form-group">
                                                        <label>Attachment (Optional)</label>
                                                        <div className="input-group">
                                                            <input type="file" name='image' onChange={handleImage} className="form-control" placeholder="choose file" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label>Submission Date:</label>
                                                        <input name="submit_date" type="date" onChange={handleInput}
                                                            value={save_textInput.submit_date} className="form-control" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-5">
                                                    <div className="form-group">
                                                        <label>Class:</label>
                                                        <Select
                                                            name="class"
                                                            options={classOptions}
                                                            isClearable={true}
                                                            isSearchable={true}
                                                            isDisabled={false}
                                                            isLoading={false}
                                                            placeholder="Select class"
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
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label>Subject</label>

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
                                            </div>
                                            <div className="row">
                                                <div className="col-11">
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <textarea name='message_body' onChange={handleInput}
                                                                value={save_textInput.message_body} className="form-control" style={{ height: 300 }} placeholder="Type your assignment message here" />

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="modal-footer col-12">
                                                    <button
                                                        className="btn btn-success float-right"
                                                        disabled={isLoading}
                                                        onClick={(e) => onSubmit(e)}
                                                    >
                                                        Post Assignment
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostAssignment;