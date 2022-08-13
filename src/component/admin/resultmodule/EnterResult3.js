import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function EnterResult() {
    const history = useHistory();
    const [isLoading, setIsloading] = useState(false);
    const [fetchLoading, setFetchloading] = useState(true);

    const [get_details, setGetDetails] = useState([]);
    const [get_start_details, setGetStartDetails] = useState([]);
    const [result_data, setResultData] = useState([]);

    const submitStaff = (e) => {
        e.preventDefault();
        setIsloading(true);
        try {
            // let create the api url here
            axios
                .post(`/api/result_process_save`, result_data)
                .then((res) => {
                    setIsloading(false);
                    toast.success("Result saved successfully !", {
                        theme: "colored",
                    });
                    history.push('/admin/result');
                })
                .catch((error) => {
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
    const getAllStaff = (e) => {
        const id = localStorage.getItem("Tid");
        try {
            // let create the api url here
            axios.get(`/api/get_result_process/${id}`).then((res) => {
                if (res.data.status === 200) {
                    setGetDetails(res.data.all_details.student_result);
                    setGetStartDetails(res.data.all_details.start_item);

                    // Populate data
                    const resultData = [];
                    res.data.all_details.student_result.map((item) => {
                        resultData.push({
                            admin_number: item.st_admin_number,
                            other_name: item.other_name,
                            ca1_score: "",
                            ca2_score: "",
                            exam_score: "",
                            t_code: id,
                            term: res.data.all_details.start_item.school_term,
                            class: res.data.all_details.start_item.class,
                            year: res.data.all_details.start_item.school_year,
                            subject: res.data.all_details.start_item.subject,
                            school_category: res.data.all_details.start_item.school_category,
                            total: "",
                        });
                    });
                    setResultData(resultData);

                    //console.log(res.data.all_details);
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
        getAllStaff();
        return () => { };
    }, []);

    const handleOnChange = (e, index) => {
        if (["ca1_score", "ca2_score"].includes(e.target.name)) {
            if (e.target.value > 20)
                return toast.error("CA score should not greater than 20", {
                    theme: "colored",
                });
        }

        if (e.target.name === "exam_score") {
            if (e.target.value > 60)
                return toast.error("Exam score should not greater than 60", {
                    theme: "colored",
                });
        }

        result_data[index] = {
            ...result_data[index],
            [e.target.name]: e.target.value,
        };

        if (!["admin_number", "total"].includes(e.target.name)) {
            result_data[index] = {
                ...result_data[index],
                total:
                    parseInt(result_data[index].ca1_score || 0) +
                    parseInt(result_data[index].ca2_score || 0) +
                    parseInt(result_data[index].exam_score || 0),
            };
        }

        setResultData([...result_data], get_start_details);

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
                            <th>Name</th>
                            <th>CA 1 Score</th>
                            <th>CA 2 Score</th>
                            <th>Exam Score</th>
                            <th>Total </th>
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
                                            name="other_name"
                                            value={item.other_name}
                                            onChange={(e) => handleOnChange(e, i)}
                                            className="form-control"
                                        />
                                        <div>
                                            <input
                                                type="hidden"
                                                name="admin_number"
                                                value={item.admin_number}
                                                onChange={(e) => handleOnChange(e, i)}
                                                className="form-control"
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="ca1_score"
                                            min={0}
                                            max={20}
                                            value={item.ca1_score}
                                            onChange={(e) => handleOnChange(e, i)}
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="ca2_score"
                                            min={0}
                                            max={20}
                                            value={item.ca2_score}
                                            onChange={(e) => handleOnChange(e, i)}
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="exam_score"
                                            min={0}
                                            max={60}
                                            value={item.exam_score}
                                            onChange={(e) => handleOnChange(e, i)}
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="total"
                                            value={item.total}
                                            onChange={(e) => handleOnChange(e, i)}
                                            className="form-control"
                                            placeholder="Total"
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
                                    <Link to="/admin/index">
                                        <button
                                            type="button"
                                            className="btn btn-block btn-dark btn-sm"
                                        >
                                            <i className="fa fa-home"></i>{" "}
                                        </button>
                                    </Link>
                                </li>
                                <li className="mr-3">
                                    <Link to="/admin/result"><button
                                        type="button"
                                        className="btn btn-block btn-info btn-sm"
                                    >
                                        Add Result
                                    </button></Link>
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title">Processing student result</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className="text-center"></div>
                            <form onSubmit={submitStaff}>
                                <input
                                    type="hidden"
                                    name="t_code"
                                    value={get_start_details.r_tid}

                                    className="form-control"
                                />
                                <input
                                    type="hidden"
                                    name="class"
                                    value={get_start_details.class}
                                    className="form-control"
                                />
                                <div className="row">
                                    <div className="col-sm-4">
                                        {/* text input */}
                                        <div className="form-group">
                                            <input
                                                type="hidden"
                                                name="academic_year"
                                                value={get_start_details.school_year}

                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <input
                                                type="hidden"
                                                name="academic_term"
                                                value={get_start_details.school_term}

                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <input
                                                type="hidden"
                                                value={get_start_details.subject}
                                                name="subject"

                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <input
                                                type="hidden"
                                                value={get_start_details.school_category}
                                                name="school_category"

                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {table_record}
                                <div className="modal-footer">
                                    <Link to="/admin/result"><button className="btn btn-danger" data-dismiss="modal">
                                        Cancel
                                    </button></Link>
                                    <button disabled={isLoading} className="btn btn-success">
                                        {isLoading && (
                                            <span className="spinner-border spinner-border-sm mr-1"></span>
                                        )}
                                        Proceed
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EnterResult;
