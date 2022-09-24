import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

function SystemSetup() {
    document.title = "System Setup | " + window.companyName;
    const ref = React.useRef();
    const { schLogo } = useContext(UserContext);
    const [validationErrors, setValidationErrors] = useState(null);
    const [fetch_loading, setIsFetchloading] = useState(true);
    const [setting_details, setSettingDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [loading_logo, setLoadingLogo] = useState(false);
    const [loading_banner, setLoadingBanner] = useState(false);

    const [banner_school, setBannerSchool] = useState([]);
    const [logo_school, setLogoSchool] = schLogo;

    const [termInput, setTermInput] = useState({
        sch_name: '',
        sch_name_short: '',
        sch_phone: '',
        sch_email: '',
        error_list: [],
    });

    // declear input handling function here
    const handleInput = (e) => {
        e.persist();
        setTermInput({ ...termInput, [e.target.name]: e.target.value })
    }

    // send request to api to save details
    const submitSetting = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            sch_name: termInput.sch_name,
            sch_name_short: termInput.sch_name_short,
            sch_phone: termInput.sch_phone,
            sch_email: termInput.sch_email,
        }
        try {
            // let create the api url here
            axios.post(`/api/save_setting_details`, data).then(res => {
                if (res.data.status === 200) {
                    // successful message
                    toast.success(res.data.message, { theme: 'colored' });
                    setTermInput({
                        ...termInput,
                        sch_name: '',
                        sch_name_short: '',
                        sch_phone: '',
                        sch_email: '',
                    });
                }
                // record already exist
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                // data input required
                else if (res.data.status === 422) {
                    toast.error('Missing Data Required', { theme: 'colored' });
                    setTermInput({ ...termInput, error_list: res.data.errors });
                    setValidationErrors(error.response.data.errors);
                }
                // error record not save
                else if (res.data.status === 500) {
                    toast.warning('Error occurred, try again', { position: 'top-center', theme: 'colored' });
                    setTermInput({ ...termInput, error_list: res.data.errors });
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { theme: 'colored' });
                }
                setLoading(false);
                // this will show the error alert if user didn't fill the form
            }).catch((error) => {
                setValidationErrors(error.response.data.errors);
                setLoading(false);
            });

        }
        catch (error) {
            // Handle the error
            setValidationErrors(error.response.data.errors);
            setLoading(false);
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setLoading(false);
        }

    }

    const [display_banner, setDisplayBanner] = useState([]);
    const [display_logo, setDisplayLogo] = useState([]);
    const [display_favicon, setDisplayFavicon] = useState([]);
    // fetch system setup details here...
    // create a function to fetch all term here
    const getSettingDetails = () => {
        // let create the api url here
        axios.get(`/api/fetch_setting_details`).then(res => {
            if (res.data.status === 200) {
                setSettingDetails(res.data.setting_record);
                setDisplayBanner(res.data.setting_record);
                setDisplayLogo(res.data.setting_record);
                setLogoSchool(res.data.setting_record);
            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            setIsFetchloading(false);
        });
    }
    useEffect(() => {
        // call the function here
        getSettingDetails();
        return () => {
        };
    }, []);


    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    // Allowed extensions for input file
    const [banner, setBanner] = useState([]);
    const [logo, setLogo] = useState([]);

    /* this handle image fields */
    const handleImage = (e) => {
        setBanner({ image: e.target.files[0] });

        setDisplayBanner({ uploadedImage: true, sch_banner: URL.createObjectURL(e.target.files[0]) })
        //setPhtotStatus({ uploadedImage: true, st_image: URL.createObjectURL(e.target.files[0]) })
    }
    /* this handle image fields */
    const handleImageLogo = (e) => {
        setError("");
        setSuccess("");
        const imageFile = e.target.files[0];
        if (!imageFile) {
            setError("Please. select a valid image file");
            //console.log('image is required');
            return false;
        }
        if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            // console.log('select valid image.');
            setError("Please. select a valid file type");
            return false;
        }
        setLogo({ image: e.target.files[0] });

        setDisplayLogo({ uploadedImageLogo: true, sch_logo: URL.createObjectURL(e.target.files[0]) })
        setLogoSchool({ uploadedImageLogo: true, sch_logo: URL.createObjectURL(e.target.files[0]) })
        setSuccess(true);
    }

    /* this handle image fields */
    const handleImageBanner = (e) => {
        setError("");
        setSuccess("");
        const imageFile = e.target.files[0];
        if (!imageFile) {
            setError("Please. select a valid image file");
            //console.log('image is required');
            return false;
        }
        if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            // console.log('select valid image.');
            setError("Please. select a valid file type");
            return false;
        }
        setBanner({ image: e.target.files[0] });
        setDisplayBanner({ uploadedImage: true, sch_banner: URL.createObjectURL(e.target.files[0]) })
        setSuccess(true);
    }

    // check if user have profile image and show it else, show default one.
    const school_banner = (display_banner.sch_banner !== undefined && display_banner.sch_banner !== null) ?
        (display_banner.uploadedImage ? display_banner.sch_banner : `http://localhost:8000/` + display_banner.sch_banner) : "No Image";

    const school_logo = (display_logo.sch_logo !== undefined && display_logo.sch_logo !== null) ?
        (display_logo.uploadedImageLogo ? display_logo.sch_logo : `http://localhost:8000/` + display_logo.sch_logo) : "No Image";

    //update logo image here...
    const uploadImageLogo = (e) => {
        e.preventDefault();
        setLoadingLogo(true);
        const formData = new FormData();
        formData.append('image', logo.image);
        axios.post(`/api/upload_sch_logo`, formData).then(res => {
            if (res.data.status === 200) {
                //success message
                toast.success(res.data.message, { theme: 'colored' });
                //history.push('/admin/view-product');
                setError([]);
                getSettingDetails();
            }
            else if (res.data.status === 500) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // failed, too large
            else if (res.data.status === 405) {
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
            setLoadingLogo(false);
            getSettingDetails();
        });
    }

    //update banner image here...
    const uploadImageBanner = (e) => {
        e.preventDefault();
        setLoadingBanner(true);
        const formData = new FormData();
        formData.append('image', banner.image);
        axios.post(`/api/upload_sch_banner`, formData).then(res => {
            if (res.data.status === 200) {
                //success message
                toast.success(res.data.message, { theme: 'colored' });
                //history.push('/admin/view-product');
                setError([]);
                getSettingDetails();
            }
            else if (res.data.status === 500) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // failed, too large
            else if (res.data.status === 405) {
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
            setLoadingBanner(false);
            getSettingDetails();
        });
    }



    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    const p2 = {
        color: "#97a3b9",
        marginTop: "2px",
        marginBottom: "2px",
    };
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    // if (fetch_loading) {
    //     return (
    //         <div className="card-body">
    //             <div className="text-center">
    //                 <div
    //                     className="spinner-border spinner-border text-info"
    //                     role="status"
    //                 ></div>{" "}
    //                 Loading
    //             </div>
    //         </div>
    //     );
    // }
    if (fetch_loading) {
        return (
            <div style={style}>
                <div className='text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div>
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
                            <h1 className="m-0">System Info Setup</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">

                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>

                            </ol>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className='col-12'>
                            <div className="alert alert-info alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h5><i className="icon fas fa-info" /> Info!</h5>
                                We keep everything simple and dynamic as we can to make your system customizable. You can easily setup your system as you want below.
                            </div>

                        </div>
                    </div>

                    <div className="overlay-wrapper">
                        {loading && <div className="overlay"><i className="spinner-border text-info" style={{ width: "2rem", height: "2rem" }} />
                            <div className="text-bold ml-2"> Processing...</div>
                        </div>}
                        <form onSubmit={submitSetting}>
                            <div className="card card-default collapsed-card">
                                <div className="card-header">

                                    <h3 className="card-title" style={p}>Enter your school/company name and save</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-plus" />
                                        </button>
                                        {/* <button type="button" className="btn btn-tool" data-card-widget="remove">
                                        <i className="fas fa-times" />
                                    </button> */}
                                    </div>
                                </div>
                                <div className="card-body" style={{ display: 'none' }}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>School Name: <span className='text-primary'><strong>{setting_details.sch_name}</strong></span></label>
                                                <input type="text" name='sch_name' onChange={handleInput} value={termInput.sch_name} className="form-control" placeholder="School Name (Full Name)" />
                                                {validationErrors &&
                                                    validationErrors[`sch_name`] ? (
                                                    <span className="text-danger">
                                                        {validationErrors[`sch_name`]}
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label>School Name (Short): <span className='text-primary'><strong>{setting_details.sch_name_short}</strong></span></label>
                                                <input type="text" name='sch_name_short' onChange={handleInput} value={termInput.sch_name_short} className="form-control" placeholder="School Name (Short Name)" />
                                                <i>This will show on the logo section, Make it short as possible</i>
                                                {validationErrors &&
                                                    validationErrors[`sch_name_short`] ? (
                                                    <span className="text-danger">
                                                        {validationErrors[`sch_name_short`]}
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Phone Contact: <span className='text-primary'><strong>{setting_details.sch_phone}</strong></span></label>
                                                <input type="text" name='sch_phone' onChange={handleInput} value={termInput.sch_phone} className="form-control" placeholder="School Phone Number" />
                                                {validationErrors &&
                                                    validationErrors[`sch_phone`] ? (
                                                    <span className="text-danger">
                                                        {validationErrors[`sch_phone`]}
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label>Additional Email: <span className='text-primary'><strong>{setting_details.sch_email}</strong></span></label>
                                                <input type="text" name='sch_email' onChange={handleInput} value={termInput.sch_email} className="form-control" placeholder="School Email" />
                                                {validationErrors &&
                                                    validationErrors[`sch_email`] ? (
                                                    <span className="text-danger">
                                                        {validationErrors[`sch_email`]}
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button disabled={loading} className="btn btn-success">
                                            {/* {isLoading && (
                                    <span className="spinner-border spinner-border-sm mr-1"></span>
                                )} */}
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="overlay-wrapper">
                        {loading_logo && <div className="overlay"><i className="spinner-border text-info" style={{ width: "2rem", height: "2rem" }} />
                            <div className="text-bold ml-2"> Processing...</div>
                        </div>}

                        <form onSubmit={uploadImageLogo}>
                            <div className="card card-default collapsed-card">
                                <div className="card-header">

                                    <h3 className="card-title" style={p}>Upload School logo </h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-plus" />
                                        </button>
                                        {/* <button type="button" className="btn btn-tool" data-card-widget="remove">
                                        <i className="fas fa-times" />
                                    </button> */}
                                    </div>
                                </div>
                                <div className="card-body" style={{ display: 'none' }}>
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="form-group">
                                                <label>School Logo (Short) <i>This will show on the logo section</i> </label>
                                                <input type="file" ref={ref} name='image' onChange={handleImageLogo} className="form-control"
                                                    placeholder="School Name (Short Name)" accept="image" />
                                                <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 2 MB | <strong> Fit Size: 80px By 80px</strong></div>
                                                {error ? <span className='text-danger'>{error}</span> :
                                                    <span className='text-success'>{success}</span>
                                                }
                                            </div>
                                        </div>
                                        <img className="img-account-profile mb-2" src={school_logo} alt="logo"
                                            width={80} height={80} />
                                    </div>
                                    {success ?
                                        <div className="modal-footer">
                                            <button disabled={loading_logo} className="btn btn-success">
                                                {/* {isLoading && (
                                    <span className="spinner-border spinner-border-sm mr-1"></span>
                                )} */}
                                                Upload
                                            </button>
                                        </div>
                                        : ""}
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="overlay-wrapper">
                        {loading_banner && <div className="overlay"><i className="spinner-border text-info" style={{ width: "2rem", height: "2rem" }} />
                            <div className="text-bold ml-2"> Processing...</div>
                        </div>}
                        <form onSubmit={uploadImageBanner}>
                            <div className="card card-default collapsed-card">
                                <div className="card-header">

                                    <h3 className="card-title" style={p}>Upload School Banner for Result Sheet</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-plus" />
                                        </button>
                                        {/* <button type="button" className="btn btn-tool" data-card-widget="remove">
                                        <i className="fas fa-times" />
                                    </button> */}
                                    </div>
                                </div>

                                <div className="card-body" style={{ display: 'none' }}>
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="form-group">
                                                <label>School Banner <i>This will show on the student print result page</i>
                                                </label>
                                                <input type="file" name='image' onChange={handleImageBanner} className="form-control" placeholder="School Name (Short Name)" />
                                                <div className="small font-italic text-muted mb-4 text-danger"> JPG or PNG no larger than 2 MB |  <strong> Fit Size: 1400px By 200px</strong></div>
                                                {error ? <span className='text-danger'>{error}</span> :
                                                    <span className='text-success'>{success}</span>
                                                }
                                            </div>
                                        </div>
                                        <img className="img-account-profile mb-2" src={school_banner} alt="Banner"
                                            width={300} height={80} />
                                    </div>
                                    {success ?
                                        <div className="modal-footer">
                                            <button disabled={loading_banner} className="btn btn-success">
                                                {/* {isLoading && (
                                    <span className="spinner-border spinner-border-sm mr-1"></span>
                                )} */}
                                                Upload
                                            </button>
                                        </div>
                                        : " "}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SystemSetup;