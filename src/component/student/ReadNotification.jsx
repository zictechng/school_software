import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function ReadNotification(props) {
    const history = useHistory();
    document.title = "Read Notifications | " + window.companyName;

    const [read_message, setReadMessage] = useState([]);
    const [fetch_message, setFetchMessage] = useState([]);
    const [active_message, setActiveMessage] = useState([]);
    const [delete_message, setDeleteMessage] = useState([]);
    const [failed_message, setFailedMessage] = useState([]);

    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [isLoading, setIsloading] = useState(false);

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    const getReadMessage = () => {
        const id = props.match.params.id;
        //console.log(props.match.params.id);
        setIsloading(true)
        try {
            // let create the api url here
            axios.get(`/api/get_readmessage_id/${id}`).then(res => {
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
                                <h1 className="m-0" style={p}>Read notifications <small></small></h1>
                            </div>
                            <div className="col-sm-5">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to="/student/index"><li className="breadcrumb-item"> <button type="button" className="btn btn-block btn-secondary btn-sm"> Back</button></li></Link>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    {/* <div className="row mt-5">
                        <div className='col-12'>
                            <div className="alert alert-info alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h5><i className="icon fas fa-info" /> Info!</h5>
                                We keep tracks of your notifications that you sent out and receive from other users.
                            </div>

                        </div>
                    </div> */}
                    <div className="overlay-wrapper">

                        <section className="content">
                            <div className="row">
                                <div className="col-md-3">
                                    <Link to="/student/notifications" className="btn btn-secondary btn-block mb-3">Back to notification</Link>
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
                                                    <Link to="#" className="nav-link">
                                                        <i className="fas fa-inbox" /> Receive
                                                        {active_message > 0 ? <span className="badge bg-success float-right">{active_message}</span>
                                                            : ""}
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="#" className="nav-link">
                                                        <i className="far fa-envelope" /> Failed
                                                        {failed_message > 0 ?
                                                            <span className="badge bg-secondary float-right">{failed_message}</span>
                                                            : " "}
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="#" href="#" className="nav-link">
                                                        <i className="far fa-trash-alt" /> Trash
                                                        {delete_message > 0 ?
                                                            <span className="badge bg-danger float-right">{delete_message}</span>
                                                            : " "}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-9">
                                    <div className="card card-secondary card-outline">
                                        <div className="card-header">
                                            <h3 className="card-title">Read Notifications</h3>
                                        </div>
                                        <div className="card-body p-0">
                                            <div className="mailbox-read-info">
                                                <h5>Message Subject: {fetch_message.mes_title}</h5>
                                                <h6>From: {fetch_message.mes_sender_name}
                                                    <span className="mailbox-read-time float-right"> {fetch_message.mes_send_date}</span></h6>
                                            </div>

                                            <div className="mailbox-read-message">
                                                <p>Hello {fetch_message.mes_sender_name},</p>
                                                <p>{fetch_message.mes_body}</p>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="float-right">
                                            </div>
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

export default ReadNotification;