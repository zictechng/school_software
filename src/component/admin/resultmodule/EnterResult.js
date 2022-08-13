import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import { toast } from "react-toastify";

function EnterResult() {
  document.title = "Enter Result | ";
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

  const submitStaff = (e) => {
    e.preventDefault();
    setIsloading(true);

    try {
      // let create the api url here
      axios
        .post(`/api/result_process_save`, {
          data: result_data,
          ...{
            subject: subject.current.value,
            term: term.current.value,
            year: year.current.value,
            class: class_input.current.value,
            t_code: record_id,
            school_category: school_category.current.value,
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
            history.push('/admin/result');
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
      axios.get(`/api/get_result_process/${id}`).then((res) => {
        if (res.data.status === 200) {
          setGetDetails(res.data.all_details.student_result);
          setGetStartDetails(res.data.all_details.start_item);


          // Populate data
          const resultData = [];
          res.data.all_details.student_result.map((item) => {
            resultData.push({
              st_admin_id: item.st_admin_id,
              other_name: item.st_name,
              ca1: item.ca1,
              ca2: item.ca2,
              exam_score: "",
              total: "",
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
    if (["ca1_score", "ca2_score"].includes(e.target.name)) {
      if (e.target.value > 20)
        return toast.error("CA score not more than 20", {
          theme: "colored",
        });
    }

    if (e.target.name === "exam_score") {
      if (e.target.value > 60)
        return toast.error("Exam score not more than to 60", {
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
          parseInt(result_data[index].ca1 || 0) +
          parseInt(result_data[index].ca2 || 0) +
          parseInt(result_data[index].exam_score || 0),
      };
    }

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
                      name="other_name" readOnly
                      value={item.other_name}
                      onChange={(e) => handleOnChange(e, i)}
                      className="form-control readOnly"
                    />
                    <div>
                      <input
                        type="hidden"
                        name="st_admin_id"
                        value={item.st_admin_id}
                        onChange={(e) => handleOnChange(e, i)}
                        className="form-control"
                      />
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="ca1"
                      min={0}
                      max={20}
                      value={item.ca1}
                      onChange={(e) => handleOnChange(e, i)}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="ca2"
                      min={0}
                      max={20}
                      value={item.ca2}
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

                    {validationErrors &&
                      validationErrors[`data.${i}.exam_score`] ? (
                      <span className="text-danger">
                        {validationErrors[`data.${i}.exam_score`][0]}
                      </span>
                    ) : (
                      ""
                    )}
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
                      className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"
                    >
                      <i className="fa fa-home"></i>{" "}
                    </button>
                  </Link>
                </li>
                <li className="mr-3">
                  <Link to="/admin/result"><button
                    type="button"
                    className="btn btn-block btn-info btn-sm" data-tip="View Result" data-place="bottom">
                    Result
                  </button></Link>
                </li>
              </ol>
            </div>
          </div>

          <div className="card table-responsive">
            <div className="card-header">
              <h3 className="card-title">Processing form A details</h3>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              <div className="text-center"></div>
              <form onSubmit={submitStaff}>
                <input
                  type="hidden"
                  name="t_code"
                  ref={t_code}
                  value={get_start_details.r_tid}
                  className="form-control"
                />
                <input
                  type="hidden"
                  name="class"
                  ref={class_input}
                  value={get_start_details.class}
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
                        value={get_start_details.school_year}
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
                        ref={subject}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <input
                        type="hidden"
                        name="school_category"
                        ref={school_category}
                        value={get_start_details.school_category}
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
  );
}

export default EnterResult;
