import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import { toast } from "react-toastify";
import axios from "axios";

function StartComment() {
    document.title = "Enter Student Comment | " + window.companyName;
    const history = useHistory();
    const record_id = localStorage.getItem("Tid");
    const [isLoading, setIsloading] = useState(false);
    const [fetchLoading, setFetchloading] = useState(true);

    const [get_details, setGetDetails] = useState([]);
    const [get_start_details, setGetStartDetails] = useState([]);
    const [result_data, setResultData] = useState([]);
    const [validationErrors, setValidationErrors] = useState(null);

    const term = useRef("");
    const class_input = useRef("");
    const year = useRef("");
    const subject = useRef("");
    const t_code = useRef("");
    const school_category = useRef("");

    const submitComment = (e) => {
        e.preventDefault();
        setIsloading(true);

        try {
            // let create the api url here
            axios
                .post(`/api/save_comment`, {
                    data: result_data,
                    ...{
                        term: term.current.value,
                        year: year.current.value,
                        class: class_input.current.value,
                        t_code: record_id,
                    },
                })
                .then((res) => {
                    if (res.data.status === 200) {
                        setIsloading(false);
                        setValidationErrors(null);
                        toast.success(res.data.message, {
                            theme: "colored",
                        });

                        e.target.reset();
                        history.push('/staff/comment');
                    }
                    else if (res.data.status === 403) {
                        toast.error(res.data.message, {
                            theme: "colored",
                        });
                        setIsloading(false);
                    }

                })
                .catch((error) => {
                    setValidationErrors(error.response.data.errors);
                    setIsloading(false);
                });
        } catch (error) {
            setIsloading(false);
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, {
                theme: "colored",
            });
        }
    };

    // create a function to fetch class data here
    const getResultProcess = (e) => {
        const id = localStorage.getItem("Tid");
        //console.log(id);
        try {
            // let create the api url here
            axios.get(`/api/get_student_comment/${id}`).then((res) => {
                if (res.data.status === 200) {
                    setGetDetails(res.data.all_details.student_result);
                    setGetStartDetails(res.data.all_details.start_item);
                    // Populate data
                    const resultData = [];
                    res.data.all_details.student_result.map((item) => {
                        resultData.push({
                            st_admin_id: item.st_admin_number,
                            other_name: item.other_name,
                            comment: "",

                        });
                    });
                    setResultData(resultData);
                }

                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: "colored" });
                }
                // login required
                else if (res.data.status === 500) {
                    toast.error(res.data.message, { theme: "colored" });
                } else {
                    toast.error("sorry, something went wrong! Try again.", {
                        position: "top-center",
                        theme: "colored",
                    });
                }
                // setLoading(false);
            });
            setFetchloading(false);
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, {
                theme: "colored",
            });
        }
    };

    useEffect(() => {
        // call the function here
        getResultProcess();
        return () => { };
    }, []);

    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };

    const handleOnChange = (e, index) => {

        result_data[index] = {
            ...result_data[index],
            [e.target.name]: e.target.value,
        };
        setResultData([...result_data]);
    };
    var table_record = "";
    if (get_details.length > 0) {
        table_record = (
            <div>
                <table
                    id="example1"
                    className="table table-bordered table-striped"
                >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result_data.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="st_admin_id" readOnly
                                            value={item.st_admin_id}
                                            onChange={(e) => handleOnChange(e, i)}
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="other_name" readOnly
                                            value={item.other_name}
                                            onChange={(e) => handleOnChange(e, i)}
                                            className="form-control readOnly"
                                        />
                                    </td>

                                    <td>
                                        <div className="form-group">
                                            <textarea
                                                name="comment"
                                                value={item.comment}
                                                onChange={(e) => handleOnChange(e, i)}
                                                className="form-control" rows={2} placeholder="Enter Comment..." />
                                        </div>
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    } else {
        table_record = (
            <div className="text-center">
                <p>No record at the moment</p>
            </div>
        );
    }

    if (fetchLoading) {
        return (
            <div className="card-body">
                <div className="text-center">
                    <div
                        className="spinner-border spinner-border-sm text-info"
                        role="status"
                    ></div>{" "}
                    Loading
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Enter Comment Details</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="mr-3">
                                    <Link to="/staff/comment"><button
                                        type="button"
                                        className="btn btn-block btn-info btn-sm" data-tip="View Comment" data-place="bottom">
                                        Comment
                                    </button></Link>
                                </li>
                                <li className="mr-3">
                                    <Link to="/staff/index">
                                        <button
                                            type="button"
                                            className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"
                                        >
                                            <i className="fa fa-home"></i>{" "}
                                        </button>
                                    </Link>
                                </li>

                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title"><a style={p}>Enter student comments accordingly and save</a></h3>
                        </div>
                        {/* /.card-header */}
                        {isLoading && <div className='overlay text-center'>
                            <div className="spinner-border spinner-border text-info" role="status">
                            </div>
                        </div>}
                        <div className="card-body">
                            <div className="text-center"></div>
                            <form onSubmit={submitComment}>
                                <input
                                    type="hidden"
                                    name="t_code"
                                    ref={t_code}
                                    value={get_start_details.comm_tid}
                                    className="form-control"
                                />
                                <input
                                    type="hidden"
                                    name="class"
                                    ref={class_input}
                                    value={get_start_details.comm_class}
                                    className="form-control"
                                />
                                <div className="row">
                                    <div className="col-sm-4">
                                        {/* text input */}
                                        <div className="form-group">
                                            <input
                                                type="hidden"
                                                name="year"
                                                ref={year}
                                                value={get_start_details.comm_year}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <input
                                                type="hidden"
                                                name="term"
                                                ref={term}
                                                value={get_start_details.comm_term}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {table_record}
                                {
                                    get_details.length < 1
                                        ? null
                                        : (
                                            <div className="modal-footer">
                                                <button disabled={isLoading} className="btn btn-success">
                                                    {/* {isLoading && (
                              <span className="spinner-border spinner-border-sm mr-1"></span>
                            )} */}
                                                    Post Comment
                                                </button>
                                            </div>
                                        )
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ReactTooltip />
        </>
    )
}

export default StartComment;