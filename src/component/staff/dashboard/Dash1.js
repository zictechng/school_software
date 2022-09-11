import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


function Dash1() {

    const [all_student, setAllStudent] = useState([]);
    const [active_student, setActiveStudent] = useState([]);
    const [all_staff, setAllStaff] = useState([]);
    const [active_staff, setActiveStaff] = useState([]);

    const [graduate_student, setGraduate] = useState([]);
    const [my_student, setMyStudent] = useState([]);
    const [reg_online, setRegOnline] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [iloading, setILoading] = useState(false);

    const [loading, setLoading] = useState(false);

    // dash1 request api call
    const getAllDash1 = (e) => {
        setIsLoading(true);
        // let create the api url here
        axios.get(`/api/fetch_dash1`).then(res => {
            if (res.data.status === 200) {
                setAllStudent(res.data.all_details.all_student);
                setActiveStudent(res.data.all_details.active_student);
                setAllStaff(res.data.all_details.all_staff);
                setActiveStaff(res.data.all_details.active_staff);
                //console.log(res.data.history_record);
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
        // call the function here
        getAllDash1();
    }, []);

    // get student details assigned to teacher request api call
    const getStaffStudentDash1 = (e) => {
        setILoading(true);
        // let create the api url here
        axios.get(`/api/fetch_staff_dash1`).then(res => {
            if (res.data.status === 200) {
                setGraduate(res.data.all_details.graduate_student);
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
    const getAllDash2 = () => {
        setLoading(true);
        // let create the api url here
        axios.get(`/api/fetch_dash2`).then(res => {
            if (res.data.status === 200) {
                setRegOnline(res.data.allDetails.all_regOnline);
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
        getAllDash2();
    }, []);

    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };

    return (
        <>

            <div className="row">
                <div className="col-md-3">
                    <div className="card card-secondary shadow-lg">
                        <div className="card-header">
                            <h3 className="card-title">Total Student</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                            </div>
                            {/* /.card-tools */}
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            {isloading
                                ? <div className='overlay text-center'>
                                    <div className="spinner-border spinner-border text-info" role="status">
                                    </div>
                                </div>
                                : all_student.all_user > 0
                                    ? <div>

                                        {all_student.all_user}
                                    </div>
                                    :
                                    <div>
                                        <span style={p}>No registered student at the moment</span>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card card-success shadow-lg">
                        <div className="card-header">
                            <h3 className="card-title">Active Student</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                            </div>
                            {/* /.card-tools */}
                        </div>
                        <div className="card-body">
                            {isloading
                                ? <div className='overlay text-center'>
                                    <div className="spinner-border spinner-border text-info" role="status">
                                    </div>
                                </div>
                                : active_student.active_user > 0
                                    ? <div>
                                        {active_student.active_user}
                                    </div>
                                    :
                                    <div>
                                        <span style={p}>No active student at the moment</span>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card card-secondary shadow-lg">
                        <div className="card-header">
                            <h3 className="card-title">Total In Class</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
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
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card card-danger shadow-lg">
                        <div className="card-header">
                            <h3 className="card-title">Graduated Student</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="maximize"><i className="fas fa-expand" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            {iloading
                                ? <div className='overlay text-center'>
                                    <div className="spinner-border spinner-border text-info" role="status">
                                    </div>
                                </div>
                                : graduate_student.graduated_total > 0
                                    ? <div>
                                        {graduate_student.graduated_total}
                                    </div>
                                    :
                                    <div>
                                        <span style={p}>No graduated student at the moment</span>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <br />

            <div className="col-sm-12 col-sm-12 col-sm-12" >
                <div className="card bg-info custom-card card-box">
                    <div className="card-body p-2" >
                        <div className="row align-items-center"  >
                            <div className="offset-xl-3 offset-sm-6 col-xl-8 col-sm-6 col-12 img-bg" >
                                <h4 className="d-flex  mb-1"> <span className="font-weight-bold text-white "> Hello Administrator!</span> </h4>
                                <p className="tx-white-7 mb-1">We encourage to make use of this portal very well! If you have <b className="text-warning">Any chanllage</b> using the system, kindly contant the school IT depatment for support. </p>
                            </div>
                            <img src="/../../../dist/img/work3.png" alt="user-img" />


                        </div>
                    </div>
                </div>
            </div>

            <br></br>

        </>
    )
}
export default Dash1;
