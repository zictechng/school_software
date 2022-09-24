import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Pagination from 'react-js-pagination';

function GeneratePin() {
    const history = useHistory();
    document.title = "Generate PIN | " + window.companyName;

    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [get_pins, setGetPins] = useState([]);
    const [list_error, setListError] = useState([]);
    const [is_loading, setIsLoading] = useState(false);

    const [loading, setLoading] = useState(false);

    const [isloading, setIs_Loading] = useState(false);

    const [add_attendInput, setAddAttenInput] = useState({
        pin_number: '',
    });
    const handleInput = (e) => {
        e.persist();
        setAddAttenInput({ ...add_attendInput, [e.target.name]: e.target.value })
    }
    var PageNumber = 1;
    // create a function to fetch all data here
    const getAllPins = (PageNumber) => {
        setIs_Loading(true);
        try {
            // let create the api url here
            axios.get(`/api/fetch_pin?page=${PageNumber}`).then(res => {
                if (res.data.status === 200) {
                    setGetPins(res.data.resultAll);
                    setIs_Loading(false);
                }
                //data not found
                else if (res.data.status === 404) {
                    toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
                    setIs_Loading(false);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
                }
                setIsFetchloading(false);
                setIs_Loading(false);
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
    }, []);

    const submitPIN = (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            pin_number: add_attendInput.pin_number,
        }
        try {
            // let create the api url here
            axios.post(`/api/start_pin`, data).then(res => {
                if (res.data.status === 200) {
                    // successful message
                    localStorage.setItem("tID", res.data.message);
                    setAddAttenInput({
                        ...add_attendInput,
                        pin_number: '',
                    });
                    e.target.reset();
                    setListError([]);
                    //history.push(`/admin/view-pin`);
                    toast.success(res.data.message, { theme: 'colored' });
                    setLoading(false);
                    getAllPins();
                }

                // data input required
                else if (res.data.status === 422) {
                    toast.error('Missing Data Required', { theme: 'colored' });
                    setListError(res.data.errors);
                }

                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                setLoading(false);

            });

        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setLoading(false);
        }
    }

    const [showModal, setShowModal] = useState(false);
    const handleModal = () => {
        setShowModal(true);
    }
    const handleClosegrade = () => {
        setShowModal(false);
    }

    // get page properties for pagination
    const { data, current_page, per_page, total, from, to, last_page } = get_pins
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
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
    var table_record = "";
    // if (get_pins.length > 0) {
    table_record = <div>
        <table id="example1" className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Batch ID</th>
                    <th>Status</th>
                    <th>Total Pins</th>
                    <th>Added By</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {get_pins.data.map((item, i) => {
                    return (
                        <tr key={i}>
                            <td>{i + from}</td>
                            <td>{item.card_tid}</td>
                            <td>{item.card_status}</td>
                            <td>{item.total_pin}</td>
                            <td>{item.card_addedby}</td>
                            <td>{item.card_date}</td>
                            <td>
                                <Link to={`view-pins/${item.id}`}><span className='badge bg-info mr-2' type='button'><i className='fa fa-eye text-white'></i></span></Link>
                            </td>
                        </tr>
                    )
                })
                }
            </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content align-items-center mr-3">
                <span className='mr-2'> </span>
                <span className='mr-3' style={p}>{current_page} - {to} / {total}</span>
                <Pagination
                    activePage={current_page}
                    totalItemsCount={total}
                    itemsCountPerPage={per_page}
                    onChange={(pageNumber) => getAllPins(pageNumber)}
                    renderOnZeroPageCount={null}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                />
            </ul>
        </nav>
    </div>
    // }
    // else {
    //     table_record = <div className='text-center'>
    //         <p>No record at the moment</p>
    //     </div>
    // }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Generate Pin:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-info btn-sm" data-tip="Graduate Student" data-place="bottom" onClick={handleModal}>Generate PIN</button>
                                </li>
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>
                    <p style={p}>
                        Generate and manage student scratch card pin with easy! Click on the generate pin to generate any time
                    </p>
                    <div className="card table-responsive">
                        <div className="card-header bg-dark">
                            <h3 className="card-title"> Student scratch card details </h3>
                            <div className="d-flex justify-content-between">
                                <p></p>
                                <span className="badge mr-2" type="button">
                                    <input name='title' className='form-control form-control-sm' placeholder='Search...' />
                                </span>
                            </div>
                        </div>

                        <div className="card-body">
                            {isloading && <div className='overlay text-center'>
                                <div className="spinner-border spinner-border text-info" role="status">
                                </div>
                            </div>}
                            <div className="card table-responsive">
                                {get_pins.data.length ? table_record :
                                    <div className='text-center'>
                                        <p>No record at the moment</p>
                                    </div>}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} >
                <Modal.Header style={{ background: '#333234', color: 'white' }}>
                    <Modal.Title>Enter number of pin to generate</Modal.Title>
                </Modal.Header>
                {loading && <div className='overlay text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div>
                </div>}
                <Modal.Body>
                    <form onSubmit={submitPIN} className="form-horizontal">
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="form-group">
                                    <label>Pin No.</label>
                                    <input type='text' name='pin_number' onChange={handleInput} value={add_attendInput.pin_number} className='form-control' placeholder='Number of Pins to generate' />
                                    <small className='text-danger'>{list_error.pin_number}</small>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button disabled={loading} className="btn btn-success">
                                {loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Proceed
                            </button>
                        </div>
                    </form>
                </Modal.Body>
                <button onClick={handleClosegrade} className="btn btn-danger">Cancel</button>
            </Modal>
        </>
    )
}

export default GeneratePin;