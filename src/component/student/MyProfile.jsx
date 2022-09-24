import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import Image from '../../assets/dist/img/avatar_2.png';
import axios from 'axios';

function MyProfile() {
    const history = useHistory();
    document.title = "Profile Details | " + window.companyName;

    const [btLoading, setBtLoading] = useState(false);

    const [view_details, setViewDetails] = useState([]);

    const [loading, setLoading] = useState(true);
    const [assignment_count, setAssignmentCount] = useState([]);
    const [my_class_name, setMyClassName] = useState([]);

    const [error_list, setError] = useState([]);

    const [show, toggleShow] = React.useState(false);

    const [picture, setPicture] = useState([]);
    const [display_image, setDisplay_image] = useState([]);

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    /* this handle image fields */
    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
        setDisplay_image({ uploadedImage: true, st_image: URL.createObjectURL(e.target.files[0]) })
        //setPhtotStatus({ uploadedImage: true, st_image: URL.createObjectURL(e.target.files[0]) })
    }

    // check if user have profile image and show it else, show default one.
    const myphoto = (display_image.st_image !== undefined && display_image.st_image !== null) ?
        (display_image.uploadedImage ? display_image.st_image : `http://localhost:8000/` + display_image.st_image) : Image;
    // ends here

    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_student_profile`).then(res => {
            if (res.data.status === 200) {
                setViewDetails(res.data.student_profileDetails);
                setDisplay_image(res.data.student_profileDetails);
                setMyClassName(res.data.get_className);
            }
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
                history.push('/student/index');
            }
            else {
                toast.warning("Something went wrong! Try again", { position: 'top-center', theme: 'colored' });
                history.push('/student/index');
            }
            setLoading(false);

        });
    }, []);

    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };

    if (loading) {
        return (
            <div style={style}>
                <div className="spinner-border spinner-border text-info" role="status">
                </div> Loading
            </div>
        )
    }
    return (
        <>
            <div className="content-header">
                <div className="container" >
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-7">
                                <h1 className="m-0" style={p}>Student Profile <small></small></h1>
                            </div>
                            <div className="col-sm-5">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to="/student/index"><li className="breadcrumb-item"> <button type="button" className="btn btn-block btn-secondary btn-sm"> Back</button></li></Link>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className='col-12'>
                            <div className="alert alert-info alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                Student profile preview details
                            </div>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            {/* Profile Image */}
                            <div className="card card-secondary card-outline">
                                <div className="card-body box-profile">
                                    <form>
                                        <div className="text-center">
                                            <img className="img-account-profile rounded-circle mb-2" src={myphoto} alt="user_pc"
                                                width={150} height={150} />
                                        </div>
                                        <h3 className="profile-username text-center">{view_details.other_name}</h3>
                                        <p className="text-muted text-center">{view_details.class_name.class_name}</p>

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">

                            <div className="card table-responsive">
                                <div className="card-header">
                                    <h3 className="card-title">{view_details.other_name} Profile details</h3>

                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <table className="table table-bordered table-sm">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: '25%' }}><strong>SurName</strong></td>
                                                            <td>{view_details.surname}</td>
                                                            <td style={{ width: '25%' }}><strong>Other Name</strong></td>
                                                            <td>{view_details.other_name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ width: '25%' }}><strong>Sex</strong></td>
                                                            <td>
                                                                {view_details.sex}
                                                            </td>
                                                            <td style={{ width: '25%' }}><strong>Date of Birth</strong></td>
                                                            <td>{view_details.dob}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ width: '25%' }}><strong>State</strong></td>
                                                            <td>
                                                                {view_details.state}
                                                            </td>
                                                            <td style={{ width: '25%' }}><strong>Country</strong></td>
                                                            <td>{view_details.country}</td>

                                                        </tr>
                                                        <tr>
                                                            <td style={{ width: '25%' }}><strong>Age</strong></td>
                                                            <td>
                                                                {view_details.st_age}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="card-body">
                                                <span><h5 className='text-primary'>Academic Details</h5></span>
                                                <table className="table table-bordered table-sm">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: '25%' }}><strong>Last School Attended</strong></td>
                                                            <td>
                                                                {view_details.last_sch_attend}
                                                            </td>
                                                            <td style={{ width: '25%' }}><strong>Last Class Attended</strong></td>
                                                            <td>{view_details.last_class_attend}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ width: '25%' }}><strong>Class Applied</strong></td>
                                                            <td>
                                                                {view_details.class_name.class_name}
                                                            </td>
                                                            <td style={{ width: '25%' }}><strong>School Category</strong></td>
                                                            <td> {view_details.sch_category.sc_name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ width: '25%' }}><strong>Academic Year</strong></td>
                                                            <td>
                                                                {view_details.session_year.academic_name}
                                                            </td>
                                                            <td style={{ width: '25%' }}><strong>Admission Number</strong></td>
                                                            <td>{view_details.st_admin_number}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ width: '25%' }}><strong>Schooling Type</strong></td>
                                                            <td>
                                                                {view_details.schooling_type}
                                                            </td>

                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="card-body">
                                                <span><h5 className='text-primary'>Contact Information</h5></span>
                                                <table className="table table-bordered table-sm">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: '25%' }}><strong>Guardian's Name</strong></td>
                                                            <td>
                                                                {view_details.guardia_name}
                                                            </td>
                                                            <td style={{ width: '25%' }}><strong>Guardian's Email</strong></td>
                                                            <td>{view_details.guardia_email}</td>
                                                        </tr>


                                                    </tbody>
                                                </table>
                                                <table className="table table-bordered table-sm">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: '25%' }}><strong>Guardian's Phone Number</strong></td>
                                                            <td>
                                                                {view_details.guardia_number}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table className="table table-bordered table-sm">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: '25%' }}><strong>Guardian's Address</strong></td>
                                                            <td>
                                                                {view_details.guardia_address}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="card-body">
                                                <span><h5 className='text-primary'>Medical Information</h5></span>
                                                <table className="table table-bordered table-sm">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: '25%' }}><strong>Health Condition</strong></td>
                                                            <td>
                                                                {view_details.health_issue}
                                                            </td>

                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="card-body">
                                                <span><h5 className='text-primary'>School Staff Information </h5></span>
                                                <table className="table table-bordered table-sm">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: '25%' }}><strong>Office Location</strong></td>
                                                            <td>
                                                                {view_details.staff_zone}
                                                            </td>
                                                            <td style={{ width: '25%' }}><strong>Department</strong></td>
                                                            <td>{view_details.staff_depart}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ width: '25%' }}><strong>File No.</strong></td>
                                                            <td>
                                                                {view_details.staff_file_no}
                                                            </td>
                                                            <td style={{ width: '25%' }}><strong>Rank/Level</strong></td>
                                                            <td>{view_details.staff_rank}</td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default MyProfile;