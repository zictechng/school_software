import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useRef } from "react";
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

export default function GradeView() {
    const history = useHistory();
    const [isfetchLoading, setIsFetchloading] = useState(false);
    //console.log(localStorage.getItem('tID'))
    //console.log(localStorage.getItem('ClassName'));
    const [isLoading, setIsloading] = useState(false);

    const [result_data, setResultData] = useState([]);
    //alert(is_class);

    const [fetch_res, setFetchResult] = useState([]);
    const [fetch_res_id, setFetchResultID] = useState('');
    const [fetch_class, setFetchClass] = useState([]);

    const g_term = useRef("");
    const g_class = useRef("");
    const g_year = useRef("");
    const tid = useRef("");

    // create a function to fetch all term here
    const getGradeDetails = () => {
        setIsFetchloading(true);
        var check_code = localStorage.getItem("tID");
        //console.log(check_code);
        // let create the api url here
        axios.get(`/api/fetch_grade_result/${check_code}`).then(res => {
            if (res.data.status === 200) {
                setFetchResult(res.data.resultAll.fetchResult);
                setFetchResultID(res.data.resultAll.tID);
                setFetchClass(res.data.resultAll.className);
                //console.log(res.data.resultAll.className)
                //console.log(res.data.resultAll.fetchResult);
                // Populate data
                const resultData = [];
                res.data.resultAll.fetchResult.map((item) => {
                    resultData.push({
                        st_admin_number: item.stu_admin_no,
                        stud_name: item.stu_name,
                        class: item.g_class,
                        term: item.g_term,
                        year: item.g_year,
                        sch_category: item.g_category,
                        tca: item.total_ca,
                        exam_total: item.g_exam,
                        tid_code: item.g_code,
                        total_score: item.total_score,
                        position: item.rank,
                    });
                });
                setResultData(resultData);
            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
            }
            setIsFetchloading(false);

        });
    }
    useEffect(() => {
        getGradeDetails()
    }, []);

    // function to save the position grading result
    const submitGrade = (e) => {
        e.preventDefault();
        setIsloading(true);
        try {
            // let create the api url here
            axios
                .post(`/api/result_save_grade`, {
                    data: result_data,
                    ...{
                        g_term: g_term.current.value,
                        g_year: g_year.current.value,
                        g_class: g_class.current.value,
                        tid: tid.current.value,
                    },
                })
                .then((res) => {
                    if (res.data.status === 200) {
                        toast.success(res.data.message, {
                            theme: "colored",
                        });
                        setIsloading(false);
                        history.push('/admin/grade-result');
                    }
                    else if (res.data.status === 403) {
                        toast.error(res.data.message, {
                            theme: "colored",
                        });
                        setIsloading(false);
                    }
                    else if (res.data.status === 401) {
                        toast.error(res.data.message, {
                            theme: "colored",
                        });
                        setIsloading(false);
                    }
                })
        } catch (error) {
            setIsloading(false);
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, {
                theme: "colored",
            });
        }
    };

    // if (is_class === 'true') {
    //     //alert("This is working");
    // }
    var table_record = "";
    if (fetch_res.length > 0) {
        table_record = <div>
            <div className="card-header">
                <h3 className="card-title"><span className='text-danger'>Please note: This operation can not be undo. </span>
                    | {fetch_class.class_name} {" "} Class position grading.
                </h3>
                <div className="d-flex justify-content-between">
                    <p></p>
                    <span className="badge bg-success mr-2" disabled={isLoading} type="submit">

                    </span>
                </div>

            </div>
            <table id="example1" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Admin No.</th>
                        <th>Academic Year</th>
                        <th>Academic Term</th>
                        <th>Total CA</th>
                        <th>Exam Score</th>
                        <th>Total Score</th>
                        <th className='bg-dark'>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {fetch_res.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td width="170px">
                                    {item.stu_name}
                                </td>
                                <td width="150px">
                                    {item.stu_admin_no}
                                </td>
                                <td width="130px">
                                    {item.sch_year.academic_name}
                                </td>
                                <td width="120px">
                                    {item.sch_term.term_name}
                                </td>
                                <td>
                                    {item.total_ca}
                                </td>
                                <td>
                                    {item.g_exam}
                                </td>
                                <td>
                                    {item.total_score}
                                </td>
                                <td>
                                    {item.rank}
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    }
    else {
        table_record = <div className='text-center'>
            <p>No record at the moment</p>
        </div>
    }
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <form onSubmit={submitGrade}>
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h4 className="m-0">Student Grading System:</h4>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className='mr-3'><Link to='/admin/grade-result'><button type="button" className="btn btn-block btn-info btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-backward'></i> </button></Link></li>
                                    <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                                </ol>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='row'>
                                <div className="card col-7">
                                    <div className="card-header bg-danger">
                                        <h3 className="card-title">Be sure before you carry out this operation.</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" name='g_year' ref={g_year} value={fetch_res_id.g_year} />
                        <input type="hidden" name='g_class' ref={g_class} value={fetch_res_id.g_class} />
                        <input type="hidden" name='g_term' ref={g_term} value={fetch_res_id.g_term} />
                        <input type="hidden" name='tid' ref={tid} value={fetch_res_id.g_code} />
                        <div className='text-center'>
                            {isfetchLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        </div>
                        <div className="card table-responsive">
                            {table_record}
                        </div>
                        <div className="modal-footer">
                            <button disabled={isLoading} className="btn btn-success">
                                {isLoading && (
                                    <span className="spinner-border spinner-border-sm mr-1"></span>
                                )}
                                Save Grade
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Modal >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Caution</Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Are you sure you want to delete this?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm">
                        Close
                    </Button>
                    <Button variant="danger" size="sm">
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
