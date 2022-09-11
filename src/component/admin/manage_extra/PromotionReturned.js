import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function PromotionReturned() {
    document.title = "Returned Promotion Details | ";
    const history = useHistory();
    const [fetch_promotion, setFetchPromotion] = useState([]);
    const [promotion_class, setPromotionClass] = useState('');
    const [isfetchLoading, setIsFetchloading] = useState(false);

    var r_code = localStorage.getItem("tID");

    const getPromotion = () => {
        var check_code = localStorage.getItem("tID");
        try {
            setIsFetchloading(true);
            // let create the api url here
            axios.get(`/api/fetch_promotion/${check_code}`).then(res => {
                if (res.data.status === 200) {
                    setFetchPromotion(res.data.promotionDetails.proDetails);
                    setPromotionClass(res.data.promotionDetails.pDetails)
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
        getPromotion();
    }, []);

    if (promotion_class === 'undefine') {
        toast.error("No record found!", { theme: 'colored' });
        history.push(`/admin/manage-promotion`);
    }
    if (promotion_class == "null") {
        toast.error("No record found!", { theme: 'colored' });
        history.push(`/admin/manage-promotion`);
    }

    // tick student for promotion here
    const markPromote = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML =
            "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to delete the record from the database here */
        try {
            axios.delete(`/api/return_promote_all/${id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    getPromotion();
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

    // uncheck student promotion here...
    const returnPromote = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML =
            "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request */
        try {
            axios.delete(`/api/promote_reserved/${id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    thisClicked.closest("tr").remove();
                    getPromotion();

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
    const promoteAll = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

        /* send axios request */
        try {
            axios.delete(`/api/return_promote_all/${id}`).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: "colored" });
                    history.push(`/admin/manage-promotion`);

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
    if (fetch_promotion.length > 0) {
        table_record = <div>
            <table id="example1" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Admin. No.</th>
                        <th>Current Class</th>
                        <th>Promote To</th>
                        <th>Reg. Date</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {fetch_promotion.map((item, i) => {
                        if (item.stu_status == 'Active')// this mean product is active
                        {
                            buttonMark = ""
                        } else if (item.stu_status == 'Marked') {
                            buttonMark = <span className="badge bg-danger mr-2" type="button" title='Returned Promotion'>
                                <i
                                    onClick={(e) => returnPromote(e, item.id)}
                                    className="fa fa-reply text-white"
                                ></i>
                            </span>
                        }
                        if (item.stu_status == 'Active') {
                            buttonCheck =
                                <div className="form-check">
                                    <input type="checkbox" onClick={(e) => markPromote(e, item.id)} className="form-check-input" title='Promote Student' />
                                    <label className="form-check-label" htmlFor="exampleCheck2"></label>
                                </div>
                        }
                        else if (item.stu_status == 'Marked') {
                            buttonCheck =
                                <span className="badge bg-success mr-2" type="button">
                                    Promoted
                                </span>
                        }
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.stu_name}</td>
                                <td>{item.stu_adm_number}</td>
                                <td>{item.stu_now_classname}</td>
                                <td>{item.stu_next_classname}</td>
                                <td>{item.stu_date}</td>
                                <td>
                                    {buttonCheck}
                                </td>
                                <td>
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
    else if (fetch_promotion.length < 1) {
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
                                    <Link to='/admin/manage-promotion'><button type="button" className="btn btn-block btn-warning btn-sm" data-tip="Dashboard" data-place="bottom">
                                        <i className='fa fa-arrow-left'></i> Back
                                    </button>
                                    </Link>
                                </li>
                                <li className='mr-3'>
                                    <Link to='#'><button type="button" onClick={(e) => promoteAll(e, promotion_class.stu_tid)} className="btn btn-block btn-danger btn-sm" data-tip="Dashboard" data-place="bottom">
                                        <i className='fa fa-check'></i> Return All
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
                        Run and manage student promotion with easy! Here you can easily returned the promoted
                        student back to the origination class.
                    </p>
                    <div className="card-body">
                        <div className="card table-responsive">
                            <div className="card-header">
                                <h3 className="card-title"><p style={p}>Returning student to their origination class | From  <span className="badge bg-secondary mr-2" type="button">
                                    {promotion_class.stu_now_classname}
                                </span> {"| "} To {" "}
                                    <span className="badge bg-danger mr-2" type="button">
                                        {promotion_class.stu_next_classname}
                                    </span></p>
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

export default PromotionReturned;