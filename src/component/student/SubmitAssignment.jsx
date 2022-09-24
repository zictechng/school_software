import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function SubmitAssignment(props) {
    const history = useHistory();
    document.title = "Submit Assignment | " + window.companyName;

    const recordID = props.match.params.id;

    const [read_message, setReadMessage] = useState([]);
    const [fetch_message, setFetchMessage] = useState([]);
    const [all_class, setAllClass] = useState([]);
    const [sch_category, setSchCatgory] = useState([]);

    const [all_subjects, setAllSubjects] = useState([]);
    const [validationErrors, setValidationErrors] = useState(null);


    const [picture, setPicture] = useState([]);

    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [isLoading, setIsloading] = useState(false);

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    const getReadMessage = () => {
        const id = props.match.params.id;
        //console.log(props.match.params.id);
        setIsloading(true)
        try {
            // let create the api url here
            axios.get(`/api/get_messages_id/${id}`).then(res => {
                if (res.data.status === 200) {
                    setReadMessage(res.data.readMessage);
                    setFetchMessage(res.data.fetchMessage);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                // Message not found
                else if (res.data.status === 404) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
                }
                setIsFetchloading(false);
                setIsloading(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
        }
    }
    useEffect(() => {
        // call the function here
        getReadMessage();
        return () => {
        };
    }, [props.match.params.id, history]);


    const [save_textInput, setSaveTextInput] = useState({
        message_body: "",
        uid: "",
        image: "",
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
    // send the request for post via api here..
    const onSubmit = (e) => {
        e.preventDefault();
        setIsloading(true);
        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('message_body', save_textInput.message_body);
        formData.append('record_id', recordID);
        try {
            // let create the api url here
            axios
                .post(`/api/submit_assignment`, formData)
                .then((res) => {
                    if (res.data.status === 200) {
                        setValidationErrors(null);
                        toast.success(res.data.message, {
                            theme: "colored",
                        });
                        setIsloading(false);
                        history.push('/student/assignment');
                    }
                    else if (res.data.status === 405) {
                        toast.error(res.data.message, {
                            theme: "colored",
                        });
                        setIsloading(false);
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

    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };

    if (isfetchLoading) {
        return (
            <div style={style}>
                <div className='text-center'>
                    <div className="spinner-border spinner-border" role="status">
                    </div> Loading
                </div>
            </div>
        )
        // <div className='text-center'>
        //     <div className="spinner-border spinner-border text-info" role="status">
        //     </div>
        // </div>

    }
    return (
        <>
            <div className="content-header">
                <div className="container" >
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-7">
                                <h1 className="m-0" style={p}>Submit Assignment <small></small></h1>
                            </div>
                            <div className="col-sm-5">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to="/student/assignment"><li className="breadcrumb-item"> <button type="button" className="btn btn-block btn-secondary btn-sm"> Back</button></li></Link>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className='col-12'>
                            <div className="alert alert-info alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h5><i className="icon fas fa-info" /> Info!</h5>
                                It is very important to solve/answer every assignment given to you to increase your academic performance .
                            </div>

                        </div>
                    </div>
                    <br /><br></br>
                    <div className="overlay-wrapper">
                        <section className="content">
                            <div className="row">
                                <div className="col-md-11">
                                    <div className="card card-secondary card-outline">
                                        {isLoading && <div className='overlay text-center'>
                                            <div className="spinner-border spinner-border text-info" role="status">
                                            </div>
                                        </div>}
                                        <div className="card-header">
                                            <h3 className="card-title">Submit Assignment  </h3>
                                            <div className="card-tools">
                                                <div className="input-group input-group-sm">
                                                    Subject | {fetch_message.assign_type}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label>Assignment Title</label>
                                                <input className="form-control" name='title' onChange={handleInput} value={fetch_message.assign_title} placeholder="Assignment Title" />

                                            </div>
                                            <div className="form-group">
                                                <label>Assignment Type</label>
                                                <input className="form-control" name='assignment_type' onChange={handleInput}
                                                    value={fetch_message.assign_type} placeholder="Assignment Type:" />

                                            </div>
                                            <div className="form-group">
                                                <textarea name='message_body' onChange={handleInput} value={save_textInput.message_body} className="form-control" style={{ height: 300 }} placeholder=" Type your answer here..." />
                                                {validationErrors &&
                                                    validationErrors[`message_body`] ? (
                                                    <span className="text-danger">
                                                        {validationErrors[`message_body`]}
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>

                                            <div className="form-group">
                                                <div className="btn btn-default btn-file">
                                                    <i className="fas fa-paperclip" /> Attachment
                                                    <input type="file" name='image' onChange={handleImage} />
                                                </div>
                                                <p className="help-block">Max. 2MB</p>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="float-right">
                                                <button onClick={(e) => onSubmit(e)} className="btn btn-success"><i className="far fa-envelope" /> Submit Assignment</button>
                                            </div>
                                            <Link to="/staff/assignment"><button type="reset" className="btn btn-default"><i className="fas fa-times" /> Discard</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>

                    </div>
                </div>
            </div>
        </>
    )
}

export default SubmitAssignment;