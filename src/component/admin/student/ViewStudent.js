import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import Image from '../../../assets/dist/img/avatar_2.png';


function ViewStudent(props) {

    const history = useHistory();
    document.title = "View Student Details | ";

    const [btLoading, setBtLoading] = useState(false);

    const [view_details, setViewDetails] = useState([]);

    const [loading, setLoading] = useState(true);

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

    //update profile image
    const updateProfileImage = (e) => {
        e.preventDefault();
        setBtLoading(true);
        const record_id = props.match.params.id;
        const formData = new FormData();
        formData.append('image', picture.image);
        axios.post(`/api/update_user_image/${record_id}`, formData).then(res => {
            if (res.data.status === 200) {
                //success message
                toast.success(res.data.message, { theme: 'colored' });
                //history.push('/admin/view-product');
                setError([]);
                toggleShow(!show)
            }
            else if (res.data.status === 500) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // failed, not updated
            else if (res.data.status === 403) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // login to access error message
            else if (res.data.status === 401) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // validation error
            else if (res.data.status === 422) {
                toast.error(res.data.message, { theme: 'colored' });
                setError(res.data.errors);
            }

            else {
                toast.info("Something went wrong! Try again");

            }
            setBtLoading(false);
        });


    }
    // check if user have profile image and show it else, show default one.
    const myphoto = (display_image.st_image !== undefined && display_image.st_image !== null) ?
        (display_image.uploadedImage ? display_image.st_image : window.BASE_URL + display_image.st_image) : Image;
    // ends here

    // create a function to fetch class data here
    useEffect(() => {
        const id = props.match.params.id;
        axios.get(`/api/fetch_edit_details/${id}`).then(res => {
            if (res.data.status === 200) {
                setViewDetails(res.data.edit_Details);
                setDisplay_image(res.data.edit_Details);

            }
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
                history.push('/admin/student');
            }
            else {
                toast.warning("Something went wrong! Try again", { position: 'top-center', theme: 'colored' });
                history.push('/admin/student');
            }
            setLoading(false);

        });
    }, [props.match.params.id, history]);


    if (loading) {
        return (
            <div className="card-body">
                <div className='text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div> Loading
                </div>
            </div>
            // <div style={style}>
            //     <div className="spinner-border spinner-border text-info" role="status">
            //     </div> Loading
            // </div>
        )

    }
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h3 className="m-0">Student profile details</h3>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'><Link to='/admin/student'><button type="button" className="btn btn-block btn-info btn-sm">View Student</button></Link> </li>
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>

                            </ol>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-3">
                            {/* Profile Image */}
                            <div className="card card-primary card-outline">
                                <div className="card-body box-profile">
                                    <form onSubmit={updateProfileImage}>
                                        <div className="text-center">
                                            {/* <img className="img-account-profile rounded-circle mb-2" src={myphoto}
                                                alt="profile_image" width={80} height={70} /> */}

                                            <img className="img-account-profile rounded-circle mb-2" src={myphoto} alt="user_pc"
                                                width={150} height={150} />
                                        </div>
                                        <h3 className="profile-username text-center">{view_details.other_name}</h3>
                                        <p className="text-muted text-center">{view_details.class_name.class_name}</p>
                                        {show && <div>
                                            <input type='file' name='image' onChange={handleImage} className='form-control' />
                                            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 2 MB</div>
                                            <small className='text-danger'>{error_list.image}</small>
                                            <br />
                                            <div>
                                                <button type="submit" disabled={btLoading} className="btn btn-primary btn-block">
                                                    {btLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                    Update profile picture
                                                </button>
                                            </div>
                                        </div>}
                                    </form>
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                            {/* About Me Box */}

                            {/* /.card */}
                        </div>
                        {/* /.col */}
                        <div className="col-md-9">

                            <div className="card table-responsive">
                                <div className="card-header">
                                    <h3 className="card-title">{view_details.other_name} Profile details</h3>
                                    <div className="card-tools">
                                        <ul className="pagination pagination-sm float-right">
                                            <div className="custom-control custom-switch">
                                                <input type="checkbox" onClick={() => toggleShow(!show)} className="custom-control-input" id="customSwitches" />
                                                <label className="custom-control-label" htmlFor="customSwitches"></label>
                                            </div>
                                        </ul>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card">

                                            {/* /.card-header */}
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
                                {/* /.card-header */}
                                <div className="card-body">
                                    <div className='text-center'>
                                    </div>
                                </div>
                            </div>
                            {/* /.card */}
                        </div>
                        {/* /.col */}
                    </div>

                </div>
            </div>
        </>
    )
}

export default ViewStudent;