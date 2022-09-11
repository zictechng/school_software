import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function GraduationView() {
    document.title = "Graduation List Details | ";
    const history = useHistory();
    const [fetch_grad, setFetchGrad] = useState([]);
    const [graduation_class, setGraduationClass] = useState('');
    const [isfetchLoading, setIsFetchloading] = useState(false);

    var r_code = localStorage.getItem("tID");
    const getGraduation = () => {
        var check_code = localStorage.getItem("tID");
        try {
            setIsFetchloading(true);
            // let create the api url here
            axios.get(`/api/fetch_graduation/${check_code}`).then(res => {
                if (res.data.status === 200) {
                    setFetchGrad(res.data.graduate_Details.proDetails);
                    setGraduationClass(res.data.graduate_Details.pDetails)
                    //console.log(res.data.history_record);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
                }
                setIsFetchloading(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setIsFetchloading(false);
        }
    }
    useEffect(() => {
        // call the function here
        getGraduation();
    }, []);

    if (graduation_class === 'undefine') {
        toast.error("No record found!", { theme: 'colored' });
        history.push(`/admin/manage-promotion`);
    }
    if (graduation_class == "null") {
        toast.error("No record found!", { theme: 'colored' });
        history.push(`/admin/graduation`);
    }



    // uncheck student promotion here...
    const returnPromote = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML =
            "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to delete the record from the database here */
        try {
            axios.delete(`/api/return_graduation/${id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    getGraduation();
                } else if (res.data.status === 402) {
                    toast.warning(res.data.message, { theme: "colored" });
                }
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error occurred! Try again. ".error, {
                theme: "colored",
            });
        }
    };

    // promote all student at once here..
    const graduateAll = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        /* send axios request to delete the record from the database here */
        try {
            axios.delete(`/api/graduate_all/${id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    history.push(`/admin/graduation`);
                    getGraduation();
                } else if (res.data.status === 402) {
                    toast.warning(res.data.message, { theme: "colored" });
                }
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error occurred! Try again. ".error, {
                theme: "colored",
            });
        }
    };

    var table_record = "";
    var buttonMark = '';
    var buttonCheck = "";
    if (fetch_grad.length > 0) {
        table_record = <div>
            <table id="example1" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Admin. No.</th>
                        <th>Current Class</th>
                        <th>Reg. Date</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {fetch_grad.map((item, i) => {
                        if (item.gs_status == 'Marked')// this mean product is active
                        {
                            buttonMark = ""
                            buttonCheck =
                                <span className="badge bg-success mr-2" type="button">
                                    Graduated
                                </span>
                        } else if (item.gs_status == 'Initiated') {
                            buttonMark = <span className="badge bg-primary mr-2" type="button" title='Graduate Student'>
                                <i
                                    onClick={(e) => returnPromote(e, item.id)}
                                    className="fa fa-graduation-cap text-white"
                                ></i>
                            </span>
                            buttonCheck = ""
                        }
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.gs_st_name}</td>
                                <td>{item.gs_st_admin}</td>
                                <td>{item.gs_class_name}</td>
                                <td>{item.gs_date}</td>
                                <td>
                                    {buttonCheck}
                                    {buttonMark}
                                </td>

                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    }
    else if (fetch_grad.length < 1) {
        table_record = <div className='text-center'>
            <p>No record at the moment</p>
        </div>
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
                            <h4 className="m-0">Student query details:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <Link to='/admin/graduation'><button type="button" className="btn btn-block btn-warning btn-sm" data-tip="Dashboard" data-place="bottom">
                                        <i className='fa fa-arrow-left'></i> Back
                                    </button>
                                    </Link>
                                </li>

                                <li className='mr-3'>
                                    <Link to='#'><button type="button" onClick={(e) => graduateAll(e, graduation_class.gs_tid)} className="btn btn-block btn-primary btn-sm" data-tip="Dashboard" data-place="bottom">
                                        <i className='fa fa-check'></i> Graduate All
                                    </button>
                                    </Link>
                                </li>
                                <li className='mr-3'>
                                    <Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom">
                                        <i className='fa fa-home'></i>
                                    </button>
                                    </Link>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <p style={p}>
                        Click on the graduate cap icon to graduate each student or
                        click on graduate all button top right corner to graduate all student at once.
                    </p>
                    <div className="card-body">
                        <div className="card table-responsive">
                            <div className="card-header">
                                <h3 className="card-title">
                                    <p style={p}> Graduate student  | From  <span className="badge bg-secondary mr-2" type="button">
                                        {graduation_class.gs_class_name}
                                    </span> {" "}
                                    </p>
                                </h3>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body">
                                <div className='text-center'>
                                    {isfetchLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                </div>
                                {table_record}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GraduationView;