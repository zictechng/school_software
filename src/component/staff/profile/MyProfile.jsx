import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Image from '../../../assets/dist/img/avatar_2.png';
import { UserContext } from '../../../context/UserContext';

function MyProfile() {
    document.title = "My Profile | " + window.companyName;

    const history = useHistory();

    const [view_details, setViewDetails] = useState([]);
    const [assign_class, setAssignClass] = useState([]);
    const [assign_subject, setAssignSubject] = useState([]);

    const { user_image, user } = useContext(UserContext);
    const [my_photo, setMyPhoto] = user_image;

    // this handle the loading stage
    const [btLoading, setBtLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    // this handle the error
    const [error_list, setError] = useState([]);

    // this toggle the profile picture upload form if the check box it tick
    const [show, toggleShow] = React.useState(false);

    const [picture, setPicture] = useState([]);
    const [display_image, setDisplay_image] = useState([]);

    /* this handle image fields */
    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });

        setDisplay_image({ uploadedImage: true, staff_image: URL.createObjectURL(e.target.files[0]) })
        setMyPhoto({ uploadedImage: true, staff_image: URL.createObjectURL(e.target.files[0]) })
    }

    //update profile image
    const updateProfileImage = (e) => {
        e.preventDefault();
        setBtLoading(true);
        const record_id = view_details.id;
        const formData = new FormData();
        formData.append('image', picture.image);
        axios.post(`/api/update_staff_image/${record_id}`, formData).then(res => {
            if (res.data.status === 200) {
                //success message
                toast.success(res.data.message, { theme: 'colored' });
                //history.push('/staff/view-product');
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
    const myphoto = (display_image.staff_image !== undefined && display_image.staff_image !== null) ?
        (display_image.uploadedImage ? display_image.staff_image : `http://localhost:8000/` + display_image.staff_image) : Image;
    setMyPhoto(display_image);
    // ends here

    // create a function to fetch profile data here

    useEffect(() => {
        //const id = props.match.params.id;
        axios.get(`/api/fetch_my_profile`).then(res => {
            if (res.data.status === 200) {
                setViewDetails(res.data.staff_editDetails);
                setDisplay_image(res.data.staff_editDetails);
                setAssignSubject(res.data.get_mysubject)
                setAssignClass(res.data.get_myclass)

            }
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
                history.push('/staff/index');
            }
            else {
                toast.warning("Something went wrong! Try again", { position: 'top-center', theme: 'colored' });
                history.push('/staff/index');
            }
            setLoading(false);
        });
    }, [history]);

    if (loading) {
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
                            <h3 className="m-0">Staff profile details </h3>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'><Link to='/staff/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            {/* Profile Image */}
                            <div className="card card-dark card-outline">
                                <div className="card-body box-profile">
                                    <form onSubmit={updateProfileImage}>
                                        <div className="text-center">
                                            {/* <img className="img-account-profile rounded-circle mb-2" src={myphoto}
                                                alt="profile_image" width={80} height={70} /> */}

                                            <img className="img-account-profile rounded-circle mb-2" src={myphoto} alt="user_pc"
                                                width={150} height={150} />
                                        </div>
                                        <h3 className="profile-username text-center">{view_details.other_name}</h3>
                                        <p className="text-muted text-center">{view_details.staff_level}</p>
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
                            </div>
                            <div className="card card-dark card-outline">
                                <div className="card-body box-profile">
                                    <h3 className="card-title">Assigned Class</h3>
                                </div>
                                <table className="table table-bordered table-sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Class Name</th>
                                            <th>Added Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assign_class.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{item.cls__class_name}</td>
                                                    <td>{item.cls__date}</td>
                                                </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="card card-dark card-outline">
                                <div className="card-body box-profile">
                                    <h3 className="card-title">Assigned Subject</h3>
                                </div>
                                <table className="table table-bordered table-sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Subject Name</th>
                                            <th>Added Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assign_subject.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{item.sub_subject_name}</td>
                                                    <td>{item.sub_date}</td>
                                                </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>


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
                                                            <td style={{ width: '25%' }}><strong>Phone</strong></td>
                                                            <td>
                                                                {view_details.phone}
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
                                                            <td style={{ width: '25%' }}><strong>Qualification</strong></td>
                                                            <td>
                                                                {view_details.qualification}
                                                            </td>

                                                        </tr>
                                                        <tr>
                                                            <td style={{ width: '25%' }}><strong>Assigned Class</strong></td>
                                                            <td>
                                                                {view_details.class_name.class_name}
                                                            </td>
                                                            <td style={{ width: '25%' }}><strong>School Category</strong></td>
                                                            <td> {view_details.sch_category.sc_name}</td>
                                                        </tr>
                                                        <tr>

                                                            <td style={{ width: '25%' }}><strong>Staff ID</strong></td>
                                                            <td>{view_details.staff_id}</td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="card-body">
                                                <span><h5 className='text-primary'>Other Information</h5></span>
                                                <table className="table table-bordered table-sm">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: '25%' }}><strong>Home Address</strong></td>
                                                            <td>
                                                                {view_details.home_address}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table className="table table-bordered table-sm">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: '25%' }}><strong>Username</strong></td>
                                                            <td>
                                                                {view_details.acct_username}
                                                            </td>
                                                            <td style={{ width: '25%' }}><strong>Account Status</strong></td>
                                                            <td>
                                                                {view_details.acct_status}
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td style={{ width: '25%' }}><strong>Staff ID</strong></td>
                                                            <td>{view_details.staff_id}</td>
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