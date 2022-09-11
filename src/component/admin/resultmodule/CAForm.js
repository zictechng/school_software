import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function CAForm() {
    const history = useHistory();

    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);
    const [all_class, setAllClass] = useState([]);
    const [all_subjects, setAllSubjects] = useState([]);

    const [sch_category, setSchCatgory] = useState([]);

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
        });
    }, []);
    return (
        <>
            <form onSubmit={submitStaff} className="form-horizontal">
                <div className="modal-header bg-dark">
                    <h4 className="modal-title" id="modal-title">Select Items to Proceed</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div className="modal-body">

                    <div className="card-body">
                        <br />
                        <div className="row">
                            <div className="col-sm-6">
                                {/* text input */}
                                <div className="form-group">
                                    <label>Academic Term</label>
                                    <select name='school_term' className='form-control' onChange={handleInput} value={add_resultInput.school_term}>
                                        <option>Select Term</option>
                                        {
                                            schoolTerm.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.term_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <small className='text-danger'>{list_error.school_term}</small>

                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Academic Session</label>
                                    <select name='school_year' className='form-control' onChange={handleInput} value={add_resultInput.school_year}>
                                        <option>Select Session</option>
                                        {
                                            schoolYears.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.academic_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <small className='text-danger'>{list_error.school_year}</small>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-6">
                                {/* text input */}
                                <div className="form-group">
                                    <label>School Category</label>
                                    <select name='school_type' className='form-control' onChange={handleInput} value={add_resultInput.school_type}>
                                        <option>Select Category</option>
                                        {
                                            sch_category.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.sc_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <small className='text-danger'>{list_error.school_type}</small>

                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Class</label>
                                    <select name='class' className='form-control' onChange={handleInput} value={add_resultInput.class}>
                                        <option>Select Class</option>
                                        {
                                            all_class.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.class_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <small className='text-danger'>{list_error.class}</small>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-9">
                                {/* text input */}
                                <div className="form-group">
                                    <label>Subject</label>
                                    <select name='subject' className='form-control' onChange={handleInput} value={add_resultInput.subject}>
                                        <option>Select Subject</option>
                                        {
                                            all_subjects.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.subject_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <small className='text-danger'>{list_error.subject}</small>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-danger" data-dismiss="modal">Cancel</button>
                    <button disabled={isLoading} className="btn btn-success">
                        {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Proceed
                    </button>
                </div>
            </form>
        </>
    )
}

export default CAForm;