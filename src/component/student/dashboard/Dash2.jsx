import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Image from '../../../assets/dist/img/avatar_2.png';

export default function Dash2() {

    const [log_activities, setLogActivities] = useState([]);
    const [student_birthday, setStudentBirthday] = useState([]);
    const [my_message, setMyMessage] = useState([]);

    const [assignment_count, setAssignmentCount] = useState([]);
    const [my_class_name, setMyClassName] = useState([]);
    const [view_details, setViewDetails] = useState([]);
    const [assignment_home, setAssignmentHome] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [iloading, setILoading] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const { loggin_check, user, loggin_state, message_count, user_image, student_user } = useContext(UserContext);

    const [logged_status] = loggin_check;
    const [user_loggin_state] = loggin_state;
    const [user_details] = user;
    const [student_user_details] = student_user;
    const [my_photo, setMyPhoto] = user_image;

    const [loading, setLoading] = useState(false);
    // dash2 request api call
    const getAllDetails = () => {
        setLoading(true);
        // let create the api url here
        axios.get(`/api/fetch_student_profile`).then(res => {
            if (res.data.status === 200) {
                setViewDetails(res.data.student_profileDetails);
                setMyPhoto(res.data.student_profileDetails);
                setMyMessage(res.data.get_mymessage);
                setStudentBirthday(res.data.get_myclassBirthday);
                setAssignmentCount(res.data.get_myAssignment);
                setAssignmentHome(res.data.get_assignmentDetails);
                setMyClassName(res.data.get_className);
                //console.log(res.data.history_record);
            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            // no record found
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

    // useEffect(() => {
    //     setILoading(true)
    //     //const id = props.match.params.id;
    //     axios.get(`/api/fetch_student_profile`).then(res => {
    //         if (res.data.status === 200) {
    //             setViewDetails(res.data.student_profileDetails);
    //             setMyPhoto(res.data.student_profileDetails);
    //             setMyMessage(res.data.get_mymessage);
    //             setStudentBirthday(res.data.get_myclassBirthday);
    //             setAssignmentCount(res.data.get_myAssignment);
    //             setAssignmentHome(res.data.get_assignmentDetails);
    //             setMyClassName(res.data.get_className);
    //         }
    //         setILoading(false);

    //     });
    // }, []);
    // check if user have profile image and show it else, show default one.
    const myphoto = (student_user_details.st_image !== undefined && student_user_details.st_image !== null) ?
        (student_user_details.uploadedImage ? student_user_details.st_image : `http://localhost:8000/` + student_user_details.st_image) : Image;
    return (
        <>
            <div className="row mt-5">
                <div className="col-md-5">

                    <div className="card card-widget widget-user shadow-lg">
                        {loading &&
                            <div className="overlay"><i className="spinner-border text-info" style={{ width: "3rem", height: "3rem" }} />
                            </div>
                        }
                        <div className="widget-user-header bg-info">
                            <h3 className="widget-user-username"><strong>{user_details.name}</strong></h3>

                        </div>
                        <div className="widget-user-image">
                            {/* {loading && } */}

                            <img className="img-circle elevation-2" src={myphoto} alt="User_Avatar" style={{ width: '115px', height: '115px' }} />
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-sm-8">
                                    <div className="description-block">
                                        <h5 className="description-header">Class</h5>
                                        <span className="description-text">{my_class_name.class_name}</span>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="description-block">
                                        <h5 className="description-header">Admin. No.</h5>
                                        <span className="description-text">{view_details.st_admin_number}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="info-box mb-2 bg-warning">
                        <span className="info-box-icon"><i className="far fa-envelope" /></span>
                        <div className="info-box-content">
                            <span className="info-box-text">Messages</span>
                            <span className="info-box-number">{my_message.total_message}
                            </span>
                        </div>
                    </div>

                    <div className="info-box mb-2 bg-secondary">
                        <span className="info-box-icon"><i className="fa fa-gift"></i></span>
                        <div className="info-box-content">
                            <span className="info-box-text">Birth Day bell</span>
                            <span className="info-box-number">{student_birthday.birth_total}
                            </span>
                        </div>
                    </div>
                    <div className="info-box mb-2 bg-info">
                        <span className="info-box-icon"><i className="fas fa-cloud-download-alt" /></span>
                        <div className="info-box-content">
                            <span className="info-box-text">Assignment</span>
                            <span className="info-box-number">{assignment_count.all_assign_home}</span>
                        </div>
                        {/* /.info-box-content */}
                    </div>
                </div>

            </div>
        </>
    )
}