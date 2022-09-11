import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ReactToPrint from "react-to-print";


function ResultTemplate() {
    const componentRef = useRef(null)
    const history = useHistory();
    document.title = "Print Result Template | ";

    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [student_details, setStudentDetails] = useState([]);
    const [class_info, setClassInfo] = useState('');
    const [list_error, setListError] = useState([]);
    const [all_class, setAllClass] = useState([]);

    // get date here...
    const current = new Date();
    const today_date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        class_class: '',
    });
    const [classInput, setClassInput] = useState({
        class_name: '',
    });

    const handleEdit = (e) => {
        e.persist();
        setClassInput({ ...classInput, [e.target.name]: e.target.value })
    }
    const submitTemplate = (e) => {
        e.preventDefault();
        setLoading(true)
        const recordId = {
            class_name: classInput.class_name,
        }
        try {
            // let create the api url here
            axios.post(`/api/get_template`, recordId)
                .then(res => {
                    if (res.data.status === 200) {
                        // successful message
                        setClassInput({
                            ...recordId,
                            class_class: '',
                        });
                        setListError([]);
                        setStudentDetails(res.data.allDetails.studentDetails);
                        setClassInfo(res.data.allDetails.classDetails)
                        // history.push(`/admin/attendance-view`);
                        setLoading(false);
                    }
                    // record not exist
                    else if (res.data.allDetails.studentDetails === []) {
                        toast.error('Missing Data Required', { theme: 'colored' });
                        setListError(res.data.errors);
                        console.log(res.data.status)
                    }
                    // data input required
                    else if (res.data.status === 422) {
                        toast.error('Missing Data Required', { theme: 'colored' });
                        setListError(res.data.errors);
                    }
                    // data input required
                    else if (res.data.status === 403) {
                        toast.error(res.data.message, { theme: 'colored' });
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
    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_class`).then(res => {
            if (res.data.status === 200) {
                setAllClass(res.data.all_classes);
                setIsFetchloading(false);
            }
            else {
                toast.error("sorry, data missing! Try again.", { theme: 'colored' });
            }
        });
    }, []);

    // CODE FOR SELECT 2
    const classOptions = [];
    all_class.map((term) => {
        classOptions.push({ value: term.id, label: term.class_name });
    });
    function handleSelectInput(stateName, selectedItem) {
        setFormData({ ...formData, [stateName]: selectedItem.value });

    }
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };

    var table_record = "";
    if (student_details.length > 0) {
        table_record =
            <div className='' ref={componentRef}>
                <section className="content" >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="invoice p-3 mb-3">
                                    <div className="row">
                                        <div className="col-12">
                                            <h4>
                                                <i className="" />Class Name: <a style={p}>  {class_info.class_name} </a>
                                                <small className="float-right">Date: <a style={p}> {today_date}</a></small>
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
                                                            <th>Admission Number</th>
                                                            <th>Student Name</th>
                                                            <th>CA 1</th>
                                                            <th>CA 2</th>
                                                            <th>Exam</th>
                                                            <th>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {student_details.map((item, i) => {

                                                            return (
                                                                <tr key={i}>
                                                                    <td>{i + 1}</td>
                                                                    <td>{item.st_admin_number}</td>
                                                                    <td>{item.surname} {''} {item.other_name}</td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
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
                                            <ReactToPrint
                                                trigger={() => <button className="btn btn-secondary float-right"><i className="fas fa-print" />Print</button>}
                                                content={() => componentRef.current}
                                                documentTile="Student Result Score Sheet Template"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
    }

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
                            <h4 className="m-0">Print Result Template:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                </li>
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>

                    <p style={p}>
                        Generating student result template. Kindly select class details to generate the template for result recording for student.
                    </p>

                    <div className="overlay-wrapper">

                        {loading && <div className="overlay"><i className="spinner-border text-info" style={{ width: "3rem", height: "3rem" }} />
                            <div className="text-bold pt-2">Loading...</div>
                        </div>}

                        <form onSubmit={submitTemplate}>
                            <div className="row">
                                <div className="col-md-10 offset-md-1">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <select className="form-control" name='class_name' onChange={handleEdit} value={classInput.class_name}>
                                                    <option></option>
                                                    {all_class.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.class_name}</option>
                                                        );
                                                    })}
                                                </select>
                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-info">
                                                        <i className="fa fa-search" />
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                        <span className="text-danger">
                                            {list_error.class_name}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>

                    {table_record}

                    {/* <div className='text-center'>
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                    </div> */}
                </div>
            </div>



        </>
    )
}

export default ResultTemplate;