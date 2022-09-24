import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Dash2() {
    const [all_log, setAllLog] = useState([]);
    const [active_student, setActiveStudent] = useState([]);
    const [all_staff, setAllStaff] = useState([]);
    const [birthday, setBirthday] = useState([]);

    const [activities_log, setActivitiesLog] = useState([]);

    const [isloading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isfetchLoading, setIsFetchloading] = useState(true);

    // dash1 request api call
    const getBirthday = () => {
        setIsLoading(true);
        // let create the api url here
        axios.get(`/api/fetch_birthday`).then(res => {
            if (res.data.status === 200) {
                setBirthday(res.data.birthday);
            }
            // login required
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
            }
            setIsLoading(false);
        });
    }
    useEffect(() => {
        getBirthday();
    }, []);

    const getSystemLog = (PageNumber = 1) => {
        setIsLoading(true)
        try {
            // let create the api url here
            axios.get(`/api/fetch_activity_log?page=${PageNumber}`).then(res => {
                if (res.data.status === 200) {
                    setActivitiesLog(res.data.all_detail);
                    //setActivitiesLog(res.data);
                    // console.log(res.data.all_detail)
                    // console.log(activities_log.data);
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
        getSystemLog();
        return () => {
        };
    }, []);

    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    if (isfetchLoading) {
        return (
            <div className="card-body">
                <div className='text-center'>
                    <div className="spinner-border text-info" role="status">
                    </div>
                    <span className="sr-only"> Loading...</span>
                </div>

            </div>

        )
    }
    var table_record = "";

    var table_record = <table className="table m-0">
        <thead>
            <tr>
                <th>#</th>
                <th>Username</th>
                <th>Status</th>
                <th>Action</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {activities_log.data.map((item, i) => {
                return (
                    <tr key={i}>
                        <td><Link to="#">{i + 1}</Link></td>
                        <td>{item.m_username}</td>
                        <td><span className="badge badge-secondary">{item.m_status}</span></td>
                        <td>
                            <div className="sparkbar" data-color="#00a65a" data-height={20}>{item.m_action}</div>
                        </td>
                        <td>{item.m_date}</td>
                    </tr>
                )
            })
            }

        </tbody>
    </table>
    return (
        <>
            <br></br>
            <section className="content">
                <div className="container-fluid">
                    {/* Info boxes */}

                    {/* /.row */}

                    {/* /.row */}
                    {/* Main row */}
                    <div className="row">
                        {/* Left col */}
                        <div className="col-md-8">
                            {/* MAP & BOX PANE */}
                            <div className="card">
                                {/* <div className='overlay text-center'>
                                    <div className="spinner-border spinner-border text-info" role="status">
                                    </div>
                                </div> */}
                                <div className="card-header border-transparent">
                                    <h3 className="card-title">Latest Activities</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus" />
                                        </button>

                                    </div>
                                </div>
                                {/* /.card-header */}

                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        {isloading
                                            ? <div className='overlay text-center'>
                                                <div className="spinner-border spinner-border text-info" role="status">
                                                </div>
                                            </div>
                                            : activities_log.data.length > 0
                                                ? <div>
                                                    {table_record}
                                                </div>
                                                :
                                                <div>
                                                    <span className="info-box-text text-center"></span>
                                                    <span style={p}>No record the moment</span>
                                                </div>

                                        }

                                    </div>
                                </div>
                                <div className="card-footer clearfix">
                                    <Link to="/admin/system-logs" className="btn btn-sm btn-secondary float-right">View All</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="info-box mb-3 bg-info">
                                <span className="info-box-icon"><i className="far fa-envelope" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Messages</span>
                                    <span className="info-box-number">0</span>
                                </div>
                            </div>

                            <div className="info-box mb-3 bg-warning">
                                <span className="info-box-icon"><i className="fas fa-tag" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Inventory</span>
                                    <span className="info-box-number">0</span>
                                </div>
                            </div>
                            <Link to="/admin/birthday-list"><div className="info-box mb-3 bg-success">
                                <span className="info-box-icon"><i className="fa fa-gift"></i></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Birth Day bell</span>
                                    <span className="info-box-number">{birthday.birthday_number}</span>
                                </div>
                            </div>
                            </Link>
                            <div className="info-box mb-3 bg-danger">
                                <span className="info-box-icon"><i className="fas fa-cloud-download-alt" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Reports</span>
                                    <span className="info-box-number">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
