import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { UserContext } from '../../context/UserContext';

function NotificationInbox() {
    const history = useHistory();
    document.title = "Message Box Details | " + window.companyName;
    const [message_details, setMessageDetails] = useState([]);
    const [active_message, setActiveMessage] = useState([]);
    const [delete_message, setDeleteMessage] = useState([]);
    const [failed_message, setFailedMessage] = useState([]);
    const { message_count } = useContext(UserContext);
    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [is_loading, setIsLoading] = useState(false);
    const [count_message, setCount_message] = message_count;
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    // create a function to fetch all data here
    const getAllNotification = (PageNumber = 1) => {
        try {
            setIsLoading(true)
            // let create the api url here
            axios.get(`/api/my_notification?page=${PageNumber}`).then(res => {
                if (res.data.status === 200) {
                    setMessageDetails(res.data.myMessageLog);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
                }
                setIsFetchloading(false);
                setIsLoading(false)

                //setLoading(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
        }
    }
    useEffect(() => {
        // call the function here
        getAllNotification();
        return () => {
        };
    }, []);

    // delete operation using modal dialog comes here
    const [deleteID, setDeleteID] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    }

    const deleteDetails = (id) => {
        setDeleteID(id);
        setShow(true);
    }
    const handleDeleteItem = (e, deleteID) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML = "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to delete the record from the database here */
        try {
            axios.delete(`/api/delete_assign/${deleteID}`).then(res => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: 'colored' });
                    //thisClicked.closest("tr").remove();
                    setShow(false);
                    getAllNotification();
                }
                else if (res.data.status === 402) {
                    toast.warning(res.data.message, { theme: 'colored' });
                    thisClicked.innerHTML = "<i className='fa fa-trash-o'></i>";
                }

            })
        } catch (e) {
            // Handle the error
            toast.error("sorry, server error occurred! Try again. ".error, { theme: 'colored' });
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
        });
    }, [history]);
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    const { data, current_page, per_page, total, from, to, last_page } = message_details
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

    var table_record = "";
    if (message_details.data.length > 0) {
        table_record = <div>
            <div className="card-body p-0">
                <div className="mailbox-controls">
                    <button type="button" className="btn btn-default btn-sm checkbox-toggle"><i className="far fa-square" />
                    </button>
                    <div className="btn-group">
                        <button type="button" className="btn btn-default btn-sm">
                            <i className="far fa-trash-alt" />
                        </button>
                    </div>
                    <button type="button" className="btn btn-default btn-sm">
                        <i className="fas fa-sync-alt" />
                    </button>
                    <div className="float-right" style={{ color: "#97a3b9" }}>
                        {current_page} - {to} / {total}
                        {/* <div className="btn-group">
                            <button type="button" className="btn btn-default btn-sm">
                                <i className="fas fa-chevron-left" />
                            </button>
                            <button type="button" className="btn btn-default btn-sm">
                                <i className="fas fa-chevron-right" />
                            </button>
                        </div> */}
                    </div>
                </div>
                <div className="table-responsive mailbox-messages">
                    <table className="table table-hover table-striped table-sm">
                        <tbody>
                            {message_details.data.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            <div className="icheck-primary">
                                                <input type="checkbox" id="check2" />
                                                <label htmlFor="check2" />
                                            </div>
                                        </td>
                                        <Link to={`read-notification/${item.mes_tid}`}>
                                            <td className="mailbox-name">{item.mes_sender_name}</td>
                                            <td className="mailbox-subject"><b style={{ color: 'black' }}>{item.mes_title}</b> - {item.mes_body ? item.mes_body.substring(0, 40) + ' ...' : ""}
                                            </td>
                                            {item.mes_file ?
                                                <td className="mailbox-attachment"><i className="fas fa-paperclip" /></td>
                                                : ""}
                                            <td className="mailbox-date float-right" style={{ color: "#97a3b9" }}>{item.mes_send_date}</td>
                                        </Link>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
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
                                <h1 className="m-0" style={p}>Notifications <small></small></h1>
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
                                We keep tracks of your notifications that you sent out and receive from other users.
                            </div>

                        </div>
                    </div>
                    <div className="overlay-wrapper">

                        <section className="content">
                            <div className="row">
                                <div className="col-md-3">
                                    {/* <Link to="/staff/send-message" className="btn btn-dark btn-block mb-3">Compose New</Link> */}
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
                                    <div className="card card-dark card-outline">
                                        <div className="card-header">
                                            <h3 className="card-title">Receive notifications</h3>
                                            <div className="card-tools">
                                                <div className="input-group input-group-sm">
                                                    <input type="text" className="form-control" placeholder="Search Mail" />
                                                    <div className="input-group-append">
                                                        <div className="btn btn-dark">
                                                            <i className="fas fa-search" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {message_details.data.length > 0 ? table_record
                                            : <div className='text-center'>
                                                <p style={p}> No recent notifications at the moment</p>
                                            </div>}

                                        <div className="card-footer p-0">
                                            <div className="mailbox-controls">
                                                {/* Check all button */}

                                                <div className="btn-group">
                                                    <nav aria-label="Page navigation example">
                                                        <ul className="pagination justify-content align-items-center mr-3">
                                                            <Pagination
                                                                activePage={current_page}
                                                                totalItemsCount={total}
                                                                itemsCountPerPage={per_page}
                                                                onChange={(pageNumber) => getAllNotification(pageNumber)}
                                                                renderOnZeroPageCount={null}
                                                                itemClass="page-item"
                                                                linkClass="page-link"
                                                                firstPageText="First"
                                                                lastPageText="Last"
                                                            />
                                                        </ul>
                                                    </nav>
                                                </div>
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

export default NotificationInbox;