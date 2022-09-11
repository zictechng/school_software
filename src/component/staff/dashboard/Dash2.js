import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Pagination from 'react-js-pagination';

export default function Dash2() {

    const [log_activities, setLogActivities] = useState([]);
    const [student_birthday, setStudentBirthday] = useState([]);
    const [my_message, setMyMessage] = useState([]);

    const [assignment_class, setAssignmentClass] = useState([]);
    const [my_student, setMyStudent] = useState([]);
    const [assignment_home, setAssignmentHome] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [iloading, setILoading] = useState(false);

    const [loading, setLoading] = useState(false);


    // get student details assigned to teacher request api call
    const getStaffStudentDash1 = (e) => {
        setILoading(true);
        // let create the api url here
        axios.get(`/api/fetch_staff_dash1`).then(res => {
            if (res.data.status === 200) {
                setMyStudent(res.data.all_details.student_total);
                //console.log(res.data.history_record);
            }
            // login required
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
            }
            setILoading(false);
        });
    }
    useEffect(() => {
        // call the function here
        getStaffStudentDash1();
    }, []);

    // dash2 request api call
    const getAllDetails = () => {
        setLoading(true);
        // let create the api url here
        axios.get(`/api/fetch_dash_details`).then(res => {
            if (res.data.status === 200) {
                setMyMessage(res.data.all_details.myMessage);
                setStudentBirthday(res.data.all_details.mystudentBirth);
                setAssignmentClass(res.data.all_details.assignment);
                setAssignmentHome(res.data.all_details.assignment_home);
                //console.log(res.data.history_record);
            }
            // login required
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
            }
            setLoading(false);
        });
    }
    useEffect(() => {
        // call the function here
        getAllDetails();
    }, []);

    const getLogDetails = (PageNumber = 1) => {
        setLoading(true);
        // let create the api url here
        axios.get(`/api/fetch_dash_log?page=${PageNumber}`).then(res => {
            if (res.data.status === 200) {
                setLogActivities(res.data.myLog.data);
            }
            // login required
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
            }
            setLoading(false);
        });
    }
    useEffect(() => {
        // call the function here
        getLogDetails();
    }, []);
    // get page properties for pagination
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };

    var table_record = "";
    var pstatus = "";
    var bstatus = "";

    table_record = <div>
        <table className="table m-0">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Status</th>
                    <th>Activities</th>
                    <th>date</th>
                </tr>
            </thead>
            <tbody>
                {log_activities.map((item, i) => {
                    if (item.m_action == 'Logout')// this mean product is active
                    {
                        pstatus =
                            <span className="badge badge-danger mr-2">
                                Logout
                            </span>
                    } else if (item.m_action == 'Login') {
                        pstatus =
                            <span className="badge badge-success mr-2">
                                Login
                            </span>
                    }
                    else {
                        pstatus =
                            <span className="badge badge-secondary mr-2">
                                {item.m_action}
                            </span>
                    }
                    return (
                        <tr key={i}>
                            <td><Link to="#">{i + 1}</Link></td>
                            <td>{item.m_username}</td>
                            <td>{pstatus}</td>
                            <td>
                                <div className="sparkbar" data-color="#00a65a" data-height={20}>{item.m_details}</div>
                            </td>
                            <td>
                                <div className="sparkbar" data-color="#00a65a" data-height={20}>{item.m_date}</div>
                            </td>
                        </tr>
                    )
                })
                }
            </tbody>
        </table>
        {/* <nav aria-label="Page navigation example">
           
            <ul className="pagination justify-content align-items-center mr-3">
                <span className='mr-2'> </span>
                <span className='mr-3' style={p}>{current_page} - {to} / {total}</span>
                <Pagination
                    activePage={current_page}
                    totalItemsCount={total}
                    itemsCountPerPage={per_page}
                    onChange={(pageNumber) => getLogDetails(pageNumber)}
                    renderOnZeroPageCount={null}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                />
            </ul>
        </nav> */}
    </div>

    return (
        <>
            <br></br>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md-4 col-sm-6 col-12">
                                    <div className="info-box bg-info">
                                        <span className="info-box-icon"><i className="far fa-bookmark" /></span>
                                        <div className="info-box-content">
                                            <span className="info-box-text">Assignment</span>
                                            <span className="info-box-number">
                                                {loading
                                                    ? <div className='overlay text-center'>
                                                        <div className="spinner-border spinner-border text-info" role="status">
                                                        </div>
                                                    </div>
                                                    : assignment_class.all_assign > 0
                                                        ? <div>
                                                            {assignment_class.all_assign}
                                                        </div>
                                                        :
                                                        <div>
                                                            <span style={p}>No active class assignment</span>
                                                        </div>
                                                }</span>
                                            <div className="progress">
                                                <div className="progress-bar" style={{ width: '40%' }} />
                                            </div>
                                            <span className="progress-description">
                                                All posted assignment here
                                            </span>
                                        </div>

                                    </div>

                                </div>
                                {/* /.col */}
                                <div className="col-md-4 col-sm-6 col-12">
                                    <div className="info-box bg-secondary">
                                        <span className="info-box-icon"><i className="fa fa-home" /></span>
                                        <div className="info-box-content">
                                            <span className="info-box-text">Home work</span>
                                            <span className="info-box-number">
                                                {loading
                                                    ? <div className='overlay text-center'>
                                                        <div className="spinner-border spinner-border text-info" role="status">
                                                        </div>
                                                    </div>
                                                    : assignment_home.all_assign_home > 0
                                                        ? <div>
                                                            {assignment_home.all_assign_home}
                                                        </div>
                                                        :
                                                        <div>
                                                            <span style={p}>No active home assignment</span>
                                                        </div>
                                                }
                                            </span>
                                            <div className="progress">
                                                <div className="progress-bar" style={{ width: `${assignment_home.all_assign_home}` }} />
                                            </div>
                                            <span className="progress-description">
                                                Home work/class work posted here
                                            </span>
                                        </div>
                                        {/* /.info-box-content */}
                                    </div>
                                    {/* /.info-box */}
                                </div>
                                {/* /.col */}
                                <div className="col-md-4 col-sm-6 col-12">
                                    <div className="info-box bg-success">
                                        <span className="info-box-icon"><i className="far fa-user" /></span>
                                        <div className="info-box-content">
                                            <span className="info-box-text">My Student</span>
                                            <span className="info-box-number">
                                                {iloading
                                                    ? <div className='overlay text-center'>
                                                        <div className="spinner-border spinner-border text-info" role="status">
                                                        </div>
                                                    </div>
                                                    : my_student.all_student > 0
                                                        ? <div>
                                                            {my_student.all_student}
                                                        </div>
                                                        :
                                                        <div>
                                                            <span style={p}>No active student at the moment</span>
                                                        </div>
                                                }</span>
                                            <div className="progress">
                                                <div className="progress-bar" style={{ width: '25%' }} />
                                            </div>
                                            <span className="progress-description">
                                                Total student in my class here
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="card">
                                <div className="card-header border-success bg-dark">
                                    <h3 className="card-title">Latest Activities</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus" />
                                        </button>

                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body p-0">
                                    <div className="table-responsive table-sm">
                                        {iloading
                                            ? <div className='overlay text-center'>
                                                <div className="spinner-border spinner-border text-info" role="status">
                                                </div>
                                            </div>
                                            : log_activities.length > 0
                                                ? <div>
                                                    {table_record}
                                                </div>
                                                :
                                                <div>
                                                    <span style={p}> No recent activities at the moment</span>
                                                </div>
                                        }
                                    </div>
                                </div>
                                {log_activities.length > 0 ?
                                    <div className="card-footer clearfix">
                                        <Link to="#" className="btn btn-sm btn-secondary float-right">View All</Link>
                                    </div>
                                    : ""
                                }
                            </div>

                            {/* <div className="col-md-3 col-sm-6 col-12">
                                <div className="info-box bg-danger">
                                    <span className="info-box-icon"><i className="fas fa-comments" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Comments</span>
                                        <span className="info-box-number">41,410</span>
                                        <div className="progress">
                                            <div className="progress-bar" style={{ width: '70%' }} />
                                        </div>
                                        <span className="progress-description">
                                            70% Increase in 30 Days
                                        </span>
                                    </div>
                                  
                                </div>
                                
                            </div> */}
                        </div>
                        {/* /.col */}
                        <div className="col-md-3">
                            {/* Info Boxes Style 2 */}
                            <div className="info-box mb-2 bg-warning">
                                <span className="info-box-icon"><i className="far fa-envelope" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Messages</span>
                                    <span className="info-box-number">
                                        {loading
                                            ? <div className='overlay text-center'>
                                                <div className="spinner-border spinner-border text-info" role="status">
                                                </div>
                                            </div>
                                            : my_message.total_message > 0
                                                ? <div>
                                                    {my_message.total_message}
                                                </div>
                                                :
                                                <div>
                                                    <span style={p}>No active message at the moment</span>
                                                </div>
                                        }</span>
                                </div>
                                {/* /.info-box-content */}
                            </div>

                            <div className="info-box mb-2 bg-secondary">
                                <span className="info-box-icon"><i className="fa fa-gift"></i></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Birth Day bell</span>
                                    <span className="info-box-number">
                                        {loading
                                            ? <div className='overlay text-center'>
                                                <div className="spinner-border spinner-border text-info" role="status">
                                                </div>
                                            </div>
                                            : student_birthday.birth_total > 0
                                                ? <div>
                                                    {student_birthday.birth_total}
                                                </div>
                                                :
                                                <div>
                                                    <span style={p}>No active birthday at the moment</span>
                                                </div>
                                        }
                                    </span>
                                </div>
                                {/* /.info-box-content */}
                            </div>
                            {/* /.info-box */}
                            <div className="info-box mb-2 bg-danger">
                                <span className="info-box-icon"><i className="fas fa-cloud-download-alt" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Reports Submitted</span>
                                    <span className="info-box-number">0</span>
                                </div>
                                {/* /.info-box-content */}
                            </div>

                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                </div>{/*/. container-fluid */}
            </section>

        </>
    )
}
