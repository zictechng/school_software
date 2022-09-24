import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function SupportTicket() {
    const history = useHistory();
    document.title = "Compose Message | " + window.companyName;

    const [active_message, setActiveMessage] = useState([]);
    const [delete_message, setDeleteMessage] = useState([]);
    const [failed_message, setFailedMessage] = useState([]);
    const [isfetchLoading, setIsFetchloading] = useState(true);

    const [isLoading, setIsloading] = useState(false);
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    //decl all variable here
    const [add_message, setAdminUserInput] = useState({
        message_to: '',
        message_subject: '',
        message_body: '',
        error_list: [],
    });
    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setAdminUserInput({ ...add_message, [e.target.name]: e.target.value })
    }
    const submitMessage = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            message_to: add_message.message_to,
            message_subject: add_message.message_subject,
            message_body: add_message.message_body,
        }
        console.log(add_message.class_apply);
        try {
            // let create the api url here
            axios.post(`/api/send_message`, data).then(res => {
                if (res.data.status === 200) {
                    // successful message
                    toast.success(res.data.message, { theme: 'colored' });
                    setAdminUserInput({
                        ...add_message,
                        message_to: '',
                        message_subject: '',
                        message_body: '',
                    });
                    history.push("/staff/message")
                    setIsloading(false);
                }
                // record already exist
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                // data input required
                else if (res.data.status === 422) {
                    toast.error('Missing Data Required', { theme: 'colored' });
                    setAdminUserInput({ ...add_message, error_list: res.data.errors });
                    setIsloading(false);
                }
                // error record not save
                else if (res.data.status === 500) {
                    toast.warning('Missing Data Required', { position: 'top-center', theme: 'colored' });
                    setAdminUserInput({ ...add_message, error_list: res.data.errors });
                    setIsloading(false);
                }
                // error record not save
                else if (res.data.status === 504) {
                    toast.warning(res.data.message, { position: 'top-center', theme: 'colored' });
                    setIsloading(false);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                    setIsloading(false);
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { theme: 'colored' });
                }

            });

        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setIsloading(false);
        }

    }

    useEffect(() => {
        //const id = props.match.params.id;
        axios.get(`/api/fetch_mynotification`).then(res => {
            if (res.data.status === 200) {
                setActiveMessage(res.data.myActiveMessage);
                setDeleteMessage(res.data.myDeleteMessage);
                setFailedMessage(res.data.myFialedMessage);
            }
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            else {
                toast.warning("Something went wrong! Try again", { position: 'top-center', theme: 'colored' });
            }
            setIsFetchloading(false);
        });
    }, [history]);
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };

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
    return (
        <>
            <div className="content-header">
                <div className="container" >
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-7">
                                <h1 className="m-0" style={p}>Submit/Create Support Ticket <small></small></h1>
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
                            <div className="alert alert-info alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h5><i className="icon fas fa-info" /> Info!</h5>
                                For any enquiry kindly submit/create a support and send to any directive in charge.
                                You can also send message to your fellow student/teacher and they will sure reply.
                            </div>

                        </div>
                    </div>
                    <br /><br></br>
                    <div className="overlay-wrapper">

                        <section className="content">
                            <div className="row">
                                {/* <div className="col-md-3">
                                    <a href="#" className="btn btn-dark btn-block mb-3">Back to message</a>
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Folders</h3>
                                            <div className="card-tools">
                                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                    <i className="fas fa-minus" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-body p-0">
                                            <ul className="nav nav-pills flex-column">
                                                <li className="nav-item active">
                                                    <a href="#" className="nav-link">
                                                        <i className="fas fa-inbox" /> Receive
                                                        {active_message > 0 ? <span className="badge bg-success float-right">{active_message}</span>
                                                            : ""}
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        <i className="far fa-envelope" /> Failed
                                                        {failed_message > 0 ?
                                                            <span className="badge bg-secondary float-right">{failed_message}</span>
                                                            : " "}
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        <i className="far fa-trash-alt" /> Trash
                                                        {delete_message > 0 ?
                                                            <span className="badge bg-danger float-right">{delete_message}</span>
                                                            : " "}
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div> */}

                                <div className="col-md-11">

                                    <div className="card card-secondary card-outline">
                                        {isLoading && <div className='overlay text-center'>
                                            <div className="spinner-border spinner-border text-info" role="status">
                                            </div>
                                        </div>}
                                        <div className="card-header">
                                            <h3 className="card-title">Compose New Message</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <input className="form-control" name='message_to' onChange={handleInput} value={add_message.message_to} placeholder="To: Enter User Email ID/Admission Number" />
                                                <span className='text-danger'>{add_message.error_list.message_to}</span>
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control" name='message_subject' onChange={handleInput} value={add_message.message_subject} placeholder="Subject:" />
                                                <span className='text-danger'>{add_message.error_list.message_subject}</span>
                                            </div>
                                            <div className="form-group">
                                                <textarea name='message_body' onChange={handleInput} value={add_message.message_body} className="form-control" style={{ height: 300 }} />
                                                <span className='text-danger'>{add_message.error_list.message_body}</span>
                                            </div>
                                            {/* <div className="form-group">
                                            <div className="btn btn-default btn-file">
                                                <i className="fas fa-paperclip" /> Attachment
                                                <input type="file" name="attachment" />
                                            </div>
                                            <p className="help-block">Max. 32MB</p>
                                        </div> */}
                                        </div>
                                        <div className="card-footer">
                                            <div className="float-right">
                                                <button onClick={(e) => submitMessage(e)} className="btn btn-success"><i className="far fa-envelope" /> Send</button>
                                            </div>
                                            <Link to="/staff/message"><button type="reset" className="btn btn-default"><i className="fas fa-times" /> Discard</button></Link>
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

export default SupportTicket;