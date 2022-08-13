import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

function SingleResult() {
    document.title = "Single Result Entry | ";
    const [loading, setLoading] = useState(true);
    const [all_studentDetails, setAllStudentDetails] = useState([]);
    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);
    const [all_class, setAllClass] = useState([]);
    const [all_subjects, setAllSubjects] = useState([]);
    const [sch_category, setSchCatgory] = useState([]);

    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_all_student`).then(res => {
            if (res.data.status === 200) {
                setAllStudentDetails(res.data.student_record);
            }
            setLoading(false);
        });
    }, []);

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
    /* this handle inputs fields */
    const [top_field, setTopField] = useState([{
        subject: "",
        term: "",
        year: "",
        class: "",
        sch_category: "",
    }]);


    const [formValues, setFormValues] = useState([
        {
            admin_number: "",
            ca1_score: "",
            ca2_score: "",
            exam_score: "",
            total: "",
        }
    ])

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, {
            admin_number: "",
            ca1_score: "",
            ca2_score: "",
            exam_score: "",
            total: ""
        }])
    }
    const handleInput = (e) => {
        e.persist();
        setTopField({ ...top_field, [e.target.name]: e.target.value });

    }
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    let handleSubmit = (event) => {
        event.preventDefault();

        const data = [{
            subject: top_field.subject,
            term: "",
            year: "",
            class: top_field.class,
            sch_category: "",
        }]

        console.log(data);
        console.log(formValues);
        alert(JSON.stringify(formValues));
    }

    if (loading) {
        return (
            <div className="card-body">
                <div className="text-center">
                    <div
                        className="spinner-border spinner-border-sm text-info"
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
                            <h4 className="m-0">Single Result Entry</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">

                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>
                                <li className='mr-3'><Link to='/admin/result'><button type="button" className="btn btn-block btn-info btn-sm">View Result</button></Link> </li>
                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title">Single Entry Result Data</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className='text-center'>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <select name='subject' onChange={handleInput} value={top_field.subject} className='form-control'>
                                                    <option>Select Subject</option>
                                                    {
                                                        all_subjects.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.subject_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <select name='school_term' className='form-control'>
                                                    <option>Select Term</option>
                                                    {
                                                        schoolTerm.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.term_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <select name='school_year' className='form-control'>
                                                    <option>Select Year</option>
                                                    {
                                                        schoolYears.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.academic_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <select name='class' onChange={handleInput} value={top_field.class} className='form-control'>
                                                    <option>Select Class</option>
                                                    {
                                                        all_class.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.class_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <table id="example1" className="table table-bordered table-striped table-responsive">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>CA 1</th>
                                            <th>CA 2</th>
                                            <th>Exam </th>
                                            <th>Total</th>
                                            <th><span className='badge bg-primary mr-2' type='button' onClick={() => addFormFields()}><i className='fa fa-plus text-white'></i></span> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formValues.map((element, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <select name='admin_number' value={element.admin_number || ""} onChange={e => handleChange(index, e)} className="form-control">
                                                            <option>Select</option>
                                                            {
                                                                all_studentDetails.map((item) => {
                                                                    return (
                                                                        <option value={item.st_admin_number} key={item.id}>{item.other_name} {item.surname}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </td>
                                                    <td><input type="text" name='ca1_score' value={element.ca1_score || ""} onChange={e => handleChange(index, e)} className="form-control" placeholder="CA 1" /></td>
                                                    <td><input type="text" name='ca2_score' value={element.ca2_score || ""} onChange={e => handleChange(index, e)} className="form-control" placeholder="CA 2" /></td>
                                                    <td><input type="text" name='exam_score' value={element.exam_score || ""} onChange={e => handleChange(index, e)} className="form-control" placeholder="Exam" /></td>
                                                    <td><input type="text" name='total' value={element.total || ""} onChange={e => handleChange(index, e)} className="form-control" placeholder="total" /></td>

                                                    <td>{
                                                        index ? <span className='badge bg-danger mr-2' onClick={() => removeFormFields(index)} style={{ cursor: "pointer" }}><i className='fa fa-times text-white'></i></span>
                                                            : null
                                                    }</td>

                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>

                                <div className="modal-footer">
                                    <button className="btn btn-success">

                                        Proceed
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleResult