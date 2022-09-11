import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import { toast } from "react-toastify";
import axios from "axios";

function EnterPsychomotorDomain() {
    document.title = "Enter Psychomotor Details | ";
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
    const t_code = useRef("");

    const submitStaff = (e) => {
        e.preventDefault();
        setIsloading(true);

        try {
            // let create the api url here
            axios
                .post(`/api/save_psychomotor`, {
                    data: result_data,
                    ...{
                        term: term.current.value,
                        year: year.current.value,
                        class_input: class_input.current.value,
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
                        history.push('/admin/psychomotor');
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
        try {
            // let create the api url here
            axios.get(`/api/fetch_psy_start/${id}`).then((res) => {
                if (res.data.status === 200) {
                    setGetDetails(res.data.all_details.student_result);
                    setGetStartDetails(res.data.all_details.start_item);

                    // Populate data
                    const resultData = [];
                    res.data.all_details.student_result.map((item) => {
                        resultData.push({
                            st_admin_number: item.st_admin_number,
                            other_name: item.other_name,
                        });
                    });
                    setResultData(resultData);
                }
                // login required
                else if (res.data.status === 401) {
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
                    className="table table-bordered table-striped table-responsive"
                >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Admin No.</th>
                            <th>Student Name</th>
                            <th>Effectiveness</th>
                            <th>Craft</th>
                            <th>Neatness </th>
                            <th>Punctuality </th>
                            <th>Sports </th>
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
                                            value={item.st_admin_number}
                                            onChange={(e) => handleOnChange(e, i)}
                                            className="form-control"
                                            placeholder="Admission Number"
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
                                        <div>
                                            <input
                                                type="hidden"
                                                name="st_admin_id"
                                                value={item.st_admin_number}
                                                onChange={(e) => handleOnChange(e, i)}
                                                className="form-control"
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="effectiveness"
                                            onChange={(e) => handleOnChange(e, i)}
                                            className="form-control"
                                            placeholder="Score"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="craft"
                                            onChange={(e) => handleOnChange(e, i)}
                                            className="form-control"
                                            placeholder="Score"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="neatness"
                                            onChange={(e) => handleOnChange(e, i)}
                                            className="form-control"
                                            placeholder="Score"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="punctuality"
                                            onChange={(e) => handleOnChange(e, i)}
                                            className="form-control"
                                            placeholder="Score"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="sport"
                                            onChange={(e) => handleOnChange(e, i)}
                                            className="form-control"
                                            placeholder="Score"
                                        />
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
                            <h4 className="m-0">Enter Record Details</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="mr-3">
                                    <Link to="/admin/psychomotor"><button
                                        type="button"
                                        className="btn btn-block btn-dark btn-sm" data-tip="Back" data-place="bottom">
                                        <i className='fa fa-arrow-left'> Back</i>
                                    </button></Link>
                                </li>
                                <li className="mr-3">
                                    <Link to="/admin/index">
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
                            <h3 className="card-title">Enter student result details and save</h3>
                        </div>
                        {isLoading && <div className='overlay text-center'>
                            <div className="spinner-border spinner-border text-info" role="status">
                            </div>
                        </div>}
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className="text-center"></div>
                            <form onSubmit={submitStaff}>
                                <input
                                    type="hidden"
                                    name="t_code"
                                    ref={t_code}
                                    value={get_start_details.saff_tid}
                                    className="form-control"
                                />
                                <input
                                    type="hidden"
                                    name="class_input"
                                    ref={class_input}
                                    value={get_start_details.saff_class}
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
                                                value={get_start_details.saff_year}
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
                                                value={get_start_details.saff_term}
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
                                                    {isLoading && (
                                                        <span className="spinner-border spinner-border-sm mr-1"></span>
                                                    )}
                                                    Proceed
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

export default EnterPsychomotorDomain;