import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Select from "react-select";

function ManagePromotion() {
    document.title = "Manage Promotion | ";
    const history = useHistory();

    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);
    const [all_class, setAllClass] = useState([]);
    const [all_subjects, setAllSubjects] = useState([]);
    const [sch_category, setSchCatgory] = useState([]);

    const [fetch_promotion, setFetchPromotion] = useState([]);
    const [promotion_id, setPromotionID] = useState('');

    const [list_error, setListError] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [iLoading, setIloading] = useState(false);

    const [isfetchLoading, setIsFetchloading] = useState(false);

    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        from_class: "",
        to_class: "",
    });
    const [formDataReturn, setFormDataReturn] = useState({
        from_class: "",
        to_class: "",
    });
    const handleFormDataChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setCAResultInput({ ...add_resultInput, [e.target.name]: e.target.value })
    }
    const submitRepair = (e) => {
        e.preventDefault();
        setIsloading(true);
        console.log(formData);
        try {
            // let create the api url here
            axios.post(`/api/start_promotion`, formData).then(res => {

                if (res.data.status === 200) {
                    // successful message
                    localStorage.setItem("tID", res.data.promoDetails.tID);
                    setPromotionID(res.data.promoDetails.tID);
                    setFormData({
                        ...formData,
                        from_class: '',
                        to_class: '',
                    });
                    e.target.reset();
                    setListError([]);
                    history.push(`/admin/promotion-view`);
                    setPromotion(false);
                }
                // record not exist
                else if (res.data.status === 404) {
                    toast.error(res.data.message, { theme: 'colored' });
                    setIsloading(false);
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
                setIsloading(false);

            });

        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setIsloading(false);
        }
    }
    const submitReturn = (e) => {
        e.preventDefault();
        setIloading(true);

        try {
            // let create the api url here
            axios.post(`/api/start_promotion_return`, formDataReturn).then(res => {
                if (res.data.status === 200) {
                    // successful message
                    localStorage.setItem("tID", res.data.promoDetails.tID);
                    setPromotionID(res.data.promoDetails.tID);
                    setFormData({
                        ...formDataReturn,
                        from_class: '',
                        to_class: '',
                    });
                    e.target.reset();
                    setListError([]);
                    history.push(`/admin/returned-promotion`);
                    setPromotion(false);
                }
                // record not exist
                else if (res.data.status === 404) {
                    toast.error(res.data.message, { theme: 'colored' });
                    setIloading(false);
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
                setIloading(false);

            });

        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setIloading(false);
        }
    }

    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_all_details`).then(res => {
            if (res.data.status === 200) {
                setAllClass(res.data.allDetails.class_details);
                setAllSubjects(res.data.allDetails.subject_details);
                setSchoolTerm(res.data.allDetails.term_details);
                setSchoolYear(res.data.allDetails.session_details);
                setSchCatgory(res.data.allDetails.sch_category_details)
            }
            else {
                toast.error("sorry, data missing! Try again.", { theme: 'colored' });
            }
            setLoading(false);
        });
    }, []);

    const [showPromotion, setPromotion] = useState(false);
    const handlePromotion = () => {
        setPromotion(true);
    }
    const handleCloseRepair = () => {
        setPromotion(false);
    }
    const [showReturnPromotion, setReturnPromotion] = useState(false);
    const handleReturnPromotion = () => {
        setReturnPromotion(true);
    }
    const handleCloseReturn = () => {
        setReturnPromotion(false);
    }
    // CODE FOR SELECT 2
    const classOptions = [];
    all_class.map((term) => {
        classOptions.push({ value: term.id, label: term.class_name });
    });

    function handleSelect2Input(stateName, selectedItem) {
        setFormData({ ...formData, [stateName]: selectedItem.value });
    }
    function handleSelectReturn(stateName, selectedItem) {
        setFormDataReturn({ ...formDataReturn, [stateName]: selectedItem.value });
    }
    if (loading) {
        return (
            <div className="card-body">
                <div className='text-center'>
                    <div className="spinner-border spinner-border-sm text-info" role="status">
                    </div> Loading
                </div>
            </div>
        )
    }
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Student promotion management system:</h4>

                        </div>

                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className='row'>
                            <div className="card col-5">
                                <div className="card-header bg-danger">
                                    <h3 className="card-title">Select operational option from the menu side to proceed</h3>
                                </div>
                            </div>
                            <div className='col-7 float-sm-right'>
                                <div className='float-sm-right'>
                                    <a className="btn btn-app bg-info" onClick={handlePromotion}>
                                        <i className="fas fa-file" /> New Promotion
                                    </a>
                                    <a className="btn btn-app bg-warning" onClick={handleReturnPromotion}>
                                        <i className="fas fa-refresh" /> Return Promotion
                                    </a>

                                </div>
                            </div>
                        </div>
                        <p style={p}>
                            Run and manage student promotion with easy! Click on the new promotion to start student
                            promotion.
                        </p>
                        <div className="card table-responsive">

                            {/* /.card-header */}

                        </div>


                    </div>
                </div>
            </div>

            <Modal show={showPromotion} >
                <Modal.Header style={{ background: '#333234', color: 'white' }}>
                    <Modal.Title>Run New Promotion For Student</Modal.Title>
                </Modal.Header>
                {isLoading && <div className='overlay text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div>
                </div>}
                <Modal.Body>
                    <form onSubmit={submitRepair} className="form-horizontal">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>From Class</label>
                                    <Select
                                        name="from_class"
                                        options={classOptions}
                                        isClearable={true}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        onChange={(e) => handleSelect2Input("from_class", e)}
                                    />
                                    <small className='text-danger'>{list_error.from_class}</small>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>To Class</label>
                                    <Select
                                        name="to_class"
                                        options={classOptions}
                                        isClearable={true}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        onChange={(e) => handleSelect2Input("to_class", e)}
                                    />
                                    <small className='text-danger'>{list_error.to_class}</small>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button disabled={isLoading} className="btn btn-success">
                                {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Proceed
                            </button>
                        </div>
                    </form>
                </Modal.Body>
                <button onClick={handleCloseRepair} className="btn btn-danger">Cancel</button>
            </Modal>

            <Modal show={showReturnPromotion} >
                <Modal.Header style={{ background: '#333234', color: 'white' }}>
                    <Modal.Title>Return Student Promotion</Modal.Title>
                </Modal.Header>
                {iLoading && <div className='overlay text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div>
                </div>}
                <Modal.Body>
                    <form onSubmit={submitReturn} className="form-horizontal">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>From Class</label>
                                    <Select
                                        name="from_class"
                                        options={classOptions}
                                        isClearable={true}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        onChange={(e) => handleSelectReturn("from_class", e)}
                                    />
                                    <small className='text-danger'>{list_error.from_class}</small>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>To Class</label>
                                    <Select
                                        name="to_class"
                                        options={classOptions}
                                        isClearable={true}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        onChange={(e) => handleSelectReturn("to_class", e)}
                                    />
                                    <small className='text-danger'>{list_error.to_class}</small>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button disabled={iLoading} className="btn btn-success">
                                {iLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Proceed
                            </button>
                        </div>
                    </form>
                </Modal.Body>
                <button onClick={handleCloseReturn} className="btn btn-danger">Cancel</button>
            </Modal>
        </>
    )
}

export default ManagePromotion;