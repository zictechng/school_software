import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function ViewPin(props) {

    document.title = "View Scratch Card Details | ";
    const history = useHistory();
    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [show_pins, setShowPins] = useState([]);
    const [get_pins, setGetPins] = useState('');
    const [list_error, setListError] = useState([]);
    const [is_loading, setIsLoading] = useState(false);

    const [loading, setLoading] = useState(false);

    // create a function to fetch all data here
    const getAllPins = () => {
        const id = props.match.params.id;
        setIsLoading(true)
        try {
            // let create the api url here
            axios.get(`/api/get_pin/${id}`).then(res => {
                if (res.data.status === 200) {
                    setShowPins(res.data.attenDetails.proDetails);
                    setGetPins(res.data.attenDetails.pDetails);
                    setIsLoading(false);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
                }
                setIsFetchloading(false);
                setIsLoading(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
        }
    }
    useEffect(() => {
        // call the function here
        getAllPins();
        return () => {
        };
    }, [props.match.params.id, history]);

    // Activate single scratch card here...
    const activateCard = (e, a_id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML =
            "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to returned attendance here */
        try {
            axios.delete(`/api/activate_card/${a_id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    getAllPins();
                    thisClicked.innerHTML = ""
                } else if (res.data.status === 402) {
                    toast.warning(res.data.message, { theme: "colored" });
                }
            });
            setActivateDetails(false);
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error occurred! Try again. ".error, {
                theme: "colored",
            });
        }
    };
    // Activate single scratch card here...
    const activateALlCard = (e, activate_id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML =
            "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to returned attendance here */
        try {
            axios.delete(`/api/activate_all_card/${activate_id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    getAllPins();
                    thisClicked.innerHTML =
                        "Activate All";

                } else if (res.data.status === 402) {
                    toast.warning(res.data.message, { theme: "colored" });
                }
                else if (res.data.status === 404) {
                    toast.warning(res.data.message, { theme: "colored" });
                    thisClicked.innerHTML =
                        "Activate All";
                }
                setActivateAll(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error occurred! Try again. ".error, {
                theme: "colored",
            });
        }
    };

    // Activate single scratch card here...
    const deActivateALlCard = (e, d_activate_all) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML =
            "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to returned attendance here */
        try {
            axios.delete(`/api/de_activate_all_card/${d_activate_all}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    getAllPins();
                    thisClicked.innerHTML =
                        "Activate All";

                } else if (res.data.status === 402) {
                    toast.warning(res.data.message, { theme: "colored" });
                }
                else if (res.data.status === 404) {
                    toast.warning(res.data.message, { theme: "colored" });
                    thisClicked.innerHTML =
                        "Activate All";
                }
                setDeActivateAll(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error occurred! Try again. ".error, {
                theme: "colored",
            });
        }
    };

    // De-activate  single scratch card here...
    const deActivateCard = (e, da_id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML =
            "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to returned attendance here */
        try {
            axios.delete(`/api/de_activate_card/${da_id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    getAllPins();
                    thisClicked.innerHTML = ""
                } else if (res.data.status === 402) {
                    toast.warning(res.data.message, { theme: "colored" });
                }
            });
            setDeActivateDetails(false);
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error occurred! Try again. ".error, {
                theme: "colored",
            });
        }
    };

    // Delete single scratch card here...
    const deleteCard = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML =
            "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to returned attendance here */
        try {
            axios.delete(`/api/delete_card/${id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    getAllPins();
                    thisClicked.innerHTML = ""
                } else if (res.data.status === 402) {
                    toast.warning(res.data.message, { theme: "colored" });
                }
            });
            setDeleteDetails(false);
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error occurred! Try again. ".error, {
                theme: "colored",
            });
        }
    };

    // action activate all modal here...
    const [activate_id, setActivateID] = useState("");
    const [activateAll, setActivateAll] = useState(false);

    const handleAllClose = () => {
        setActivateAll(false)
    }
    const activate_all = (card_tid) => {
        setActivateID(card_tid);
        setActivateAll(true);
    }

    // action de-activate all modal here...
    const [d_activate_all, setDActivateAll] = useState("");
    const [deactivateAll, setDeActivateAll] = useState(false);

    const handleDeAllClose = () => {
        setDeActivateAll(false)
    }
    const deactivate_all = (card_tid) => {
        setDActivateAll(card_tid);
        setDeActivateAll(true);
    }


    // delete scratch card modal here
    const [id, setDeleteID] = useState("");
    const [deleteDetails, setDeleteDetails] = useState(false);
    // action modal here...
    const handleDeleteClose = () => {
        setDeleteDetails(false)
    }
    const delete_card = (id) => {
        setDeleteID(id);
        setDeleteDetails(true);
    }
    // de-activate scratch card modal here
    const [da_id, setDeActivate] = useState("");
    const [deActivate_Details, setDeActivateDetails] = useState(false);
    // action modal here...
    const handleDeactivateClose = () => {
        setDeActivateDetails(false)
    }
    const deActivate_card = (da_id) => {
        setDeActivate(da_id);
        setDeActivateDetails(true);
    }

    // Activate scratch card modal here
    const [a_id, setActivate] = useState("");
    const [Activate_Details, setActivateDetails] = useState(false);
    // action modal here...
    const handleActivateClose = () => {
        setActivateDetails(false)
    }
    const activate_card = (a_id) => {
        setActivate(a_id);
        setActivateDetails(true);
    }

    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    var buttonCheck = ""
    var pin_status = ""
    var delete_button = ""
    if (isfetchLoading) {
        return (
            <div className="card-body">
                <div className='text-center'>
                    <div className="spinner-border spinner-border-sm text-info" role="status">
                    </div> Loading
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
                            <h4 className="m-0">Pin Details:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <Link to='/admin/generate-pin'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Back" data-place="bottom"><i className='fa fa-arrow-left'> Back</i> </button>
                                    </Link>
                                </li>
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-info btn-sm" data-tip="Activate Pins" onClick={(e) => activate_all(get_pins.card_tid)} data-place="bottom">Activate All</button>
                                </li>
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-danger btn-sm" data-tip="De-activate Pins" onClick={(e) => deactivate_all(get_pins.card_tid)} data-place="bottom">De-activate All</button>
                                </li>
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>

                            </ol>
                        </div>
                    </div>
                    <p style={p}>
                        You can easily preview the state of each scratch card in the system here below and activate /
                        de-activate any scratch card.
                    </p>
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="callout callout-warning">
                                        <h5><i className="fas fa-info" /> Note:</h5>
                                        Preview of all the usage and status of scratch card generated in the port is show below
                                    </div>

                                    <div className="invoice p-3 mb-3">

                                        <div className="row">
                                            <div className="col-12">
                                                <h4>
                                                    <i className="fas fa-barcode" /> Batch ID: <a style={p}> {get_pins.card_tid}</a>
                                                    <small className="float-right">Date: <a style={p}> {get_pins.card_date}</a></small>
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
                                                                <th>Card No</th>
                                                                <th>Card Status</th>
                                                                <th>Usage Count</th>
                                                                <th>Usage Status</th>
                                                                <th>Used Date</th>
                                                                <th>User Details</th>
                                                                <th>Added By</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {show_pins.map((item, i) => {
                                                                if (item.card_status == 'Active')// this mean product is active
                                                                {
                                                                    pin_status = <span className="badge bg-success">Active</span>
                                                                    buttonCheck =
                                                                        <span className="badge bg-secondary mr-2" type="button" title='De-activate Pin'>
                                                                            <i
                                                                                onClick={(e) => deActivate_card(item.id)}
                                                                                className="fa fa-times text-white"
                                                                            ></i>
                                                                        </span>
                                                                    delete_button =
                                                                        <span className="badge bg-danger mr-2" type="button" title='Delete Pin'>
                                                                            <i
                                                                                onClick={(e) => delete_card(item.id)}
                                                                                className="fa fa-trash text-white"
                                                                            ></i>
                                                                        </span>
                                                                } else if (item.card_status == 'Deleted') {
                                                                    pin_status = <span className="badge bg-danger">Deleted</span>
                                                                    delete_button =
                                                                        <span className="text-danger">
                                                                            <b>Deleted</b>
                                                                        </span>
                                                                    buttonCheck = ""
                                                                }
                                                                else if (item.card_status == 'Pending') {
                                                                    pin_status = <span className="badge bg-secondary">Pending</span>
                                                                    buttonCheck =
                                                                        <span className="badge bg-info mr-2" type="button" title='Activate Pin'>
                                                                            <i
                                                                                onClick={(e) => activate_card(item.id)}
                                                                                className="fa fa-check text-white"
                                                                            ></i>
                                                                        </span>
                                                                    delete_button =
                                                                        <span className="badge bg-danger mr-2" type="button" title='Delete Pin'>
                                                                            <i
                                                                                onClick={(e) => delete_card(item.id)}
                                                                                className="fa fa-trash text-white"
                                                                            ></i>
                                                                        </span>
                                                                }
                                                                return (
                                                                    <tr key={i}>
                                                                        <td>{i + 1}</td>
                                                                        <td>{item.card_pin}</td>
                                                                        <td>{pin_status}</td>
                                                                        <td>{item.card_usage_count}</td>
                                                                        <td>{item.card_usage_status}</td>
                                                                        <td>{item.card_use_date}</td>
                                                                        <td>{item.card_use_username}</td>
                                                                        <td>{item.card_addedby}</td>
                                                                        <td>
                                                                            {buttonCheck}
                                                                            {" "}
                                                                            {delete_button}
                                                                        </td>
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
                                                <button type="button" className="btn btn-secondary float-right"><i className="fas fa-print" /> Print
                                                </button>
                                                <button type="button" className="btn btn-primary float-right" style={{ marginRight: 5 }}>
                                                    <i className="fas fa-download" /> Generate PDF
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            {/* this is to activate all card at once... */}
            <Modal show={activateAll} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Caution</Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Are you sure you want to activate all pins?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleAllClose}>
                        Close
                    </Button>
                    <Button variant="info" size="sm" onClick={(e) => activateALlCard(e, activate_id)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* this is to delete pin card one by one here.... */}

            <Modal show={deleteDetails} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Caution</Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Are you sure you want to delete this ?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleDeleteClose}>
                        Close
                    </Button>
                    <Button variant="info" size="sm" onClick={(e) => deleteCard(e, id)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={deActivate_Details} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Caution</Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Are you sure you want to De-activate this ?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleDeactivateClose}>
                        Close
                    </Button>
                    <Button variant="info" size="sm" onClick={(e) => deActivateCard(e, da_id)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={Activate_Details} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Caution</Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Are you sure you want to Activate this ?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleActivateClose}>
                        Close
                    </Button>
                    <Button variant="info" size="sm" onClick={(e) => activateCard(e, a_id)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={deactivateAll} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Caution</Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Are you sure you want to De-activate all cards ?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleDeAllClose}>
                        Close
                    </Button>
                    <Button variant="info" size="sm" onClick={(e) => deActivateALlCard(e, d_activate_all)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default ViewPin;