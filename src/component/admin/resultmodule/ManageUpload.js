
import React, { useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Papa from "papaparse";
// import "../../style.css";

function ManageUpload() {
    document.title = "Manage Upload | ";
    const history = useHistory();
    const ref = React.useRef();
    const ca_fileInputRef = useRef();
    const result_fileInputRef = useRef();
    const [btLoading, setBtLoading] = useState(false);
    const [error_list, setErrorList] = useState([]);

    // Allowed extensions for input file
    const allowedExtensions = ["csv"];

    // This state will store the parsed data
    const [data, setData] = useState([]);
    const [data_finace, setDataFinance] = useState([]);
    const [data_result, setDataResult] = useState([]);
    const [data_ca, setDataCa] = useState([]);

    //State to store table Column name
    const [tableRows, setTableRows] = useState([]);
    //State to store the values
    const [values, setValues] = useState([]);

    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");
    const [error_finance, setErrorFinance] = useState("");
    const [error_ca, setErrorCa] = useState("");
    const [error_result, setErrorResult] = useState("");

    const [success, setSuccess] = useState("");
    const [success_finance, setSuccessFinance] = useState("");
    const [success_ca, setSuccessCa] = useState("");
    const [success_result, setSuccessResult] = useState("");
    const [btn_notice, setBtnNotice] = useState(false);

    // It will store the file uploaded by the user
    const [file, setFile] = useState("");

    // This function will be called when
    // the file input changes
    const handleFileChange = (e) => {
        setError("");
        setSuccess("");

        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];
            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please. select a valid csv file");
                return;
            }
            // If input type is correct set the state
            setFile(inputFile);
        }
    };

    // finance file input changes
    const handleFinanceChange = (e) => {
        setErrorFinance("");
        setSuccessFinance("");
        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];
            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setErrorFinance("Please. select a valid csv file");
                return;
            }
            // If input type is correct set the state
            setFile(inputFile);
        }
    };

    // CA Result file input changes
    const handleCAChange = (e) => {
        setErrorCa("");
        setSuccessCa("");
        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];
            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setErrorCa("Please. select a valid csv file");
                return;
            }
            // If input type is correct set the state
            setFile(inputFile);
        }
    };
    // Result file input changes
    const handleResultChange = (e) => {
        setErrorResult("");
        setSuccessResult("");
        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];

            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setErrorResult("Please. select a valid csv file");
                return;
            }
            // If input type is correct set the state
            setFile(inputFile);
        }
    };

    const handleParseFinance = () => {
        // If user clicks the parse button without
        // a file we show a error
        if (!file) return setError("Please, select file to upload");

        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();

        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result,
                {
                    header: true,
                    contents: true,
                    complete: function (results) {
                        const rowsArray = [];
                        const valuesArray = [];

                        // Iterating data to get column name and their values
                        results.data.map((d) => {
                            rowsArray.push(Object.keys(d));
                            valuesArray.push(Object.values(d));
                        });

                        // Parsed Data Response in array format
                        setDataFinance(results.data);
                        // Filtered Column Names
                        setTableRows(rowsArray[0]);

                        // Filtered Values
                        setValues(valuesArray);
                        setSuccessFinance("File Validated, You can now upload the file");
                    },
                });
        };

        reader.readAsText(file);

    };

    const handleParseCa = () => {
        // If user clicks the parse button without
        // a file we show a error
        if (!file) return setErrorCa("Please, select file to upload");

        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();

        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result,
                {
                    header: true,
                    contents: true,
                    complete: function (results) {
                        const rowsArray = [];
                        const valuesArray = [];

                        // Iterating data to get column name and their values
                        results.data.map((d) => {
                            rowsArray.push(Object.keys(d));
                            valuesArray.push(Object.values(d));
                        });

                        // Parsed Data Response in array format
                        setDataCa(results.data);
                        // Filtered Column Names
                        setTableRows(rowsArray[0]);

                        // Filtered Values
                        setValues(valuesArray);
                        setSuccessCa("File Validated, You can now upload the file");
                    },
                });
        };
        reader.readAsText(file);
    };
    const handleParseResult = () => {
        // If user clicks the parse button without
        // a file we show a error
        if (!file) return setErrorResult("Please, select file to upload");

        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();

        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result,
                {
                    header: true,
                    contents: true,
                    complete: function (results) {
                        const rowsArray = [];
                        const valuesArray = [];

                        // Iterating data to get column name and their values
                        results.data.map((d) => {
                            rowsArray.push(Object.keys(d));
                            valuesArray.push(Object.values(d));
                        });

                        // Parsed Data Response in array format
                        setDataResult(results.data);
                        // Filtered Column Names
                        setTableRows(rowsArray[0]);

                        // Filtered Values
                        setValues(valuesArray);
                        setSuccessResult("File Validated, You can now upload the file");
                    },
                });
        };
        reader.readAsText(file);
    };

    const handleParse = () => {
        // If user clicks the parse button without
        // a file we show a error
        if (!file) return setError("Please, select file to upload");

        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();

        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result,
                {
                    header: true,
                    contents: true,
                    complete: function (results) {
                        const rowsArray = [];
                        const valuesArray = [];

                        // Iterating data to get column name and their values
                        results.data.map((d) => {
                            rowsArray.push(Object.keys(d));
                            valuesArray.push(Object.values(d));
                        });

                        // Parsed Data Response in array format
                        setData(results.data);
                        // Filtered Column Names
                        setTableRows(rowsArray[0]);

                        // Filtered Values
                        setValues(valuesArray);
                        setSuccess("File Validated, You can now upload the file");
                        setBtnNotice(true);
                    },
                });
        };

        reader.readAsText(file);

    };
    // upload the pin parsed file data
    const uploadParsedFile = (event) => {
        event.preventDefault();
        if (!file) return setError("Please, select file to upload");
        setBtLoading(true);
        axios.post("/api/upload_pin", { data: data }).then(res => {
            if (res.data.status === 200) {
                //success message
                toast.success(res.data.message, { theme: 'colored' });
                //history.push('/admin/view-product');
                setErrorList([]);
                setBtLoading(false);
                setSuccess("File uploaded successfully.");
                setFile('');
                ref.current.value = "";
            }
            // validation error
            else if (res.data.status === 422) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
            }
            else if (res.data.status === 500) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
                setSuccess("Error occurred! Try again");
            }
            else if (res.data.status === 501) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
                setSuccess("Error occurred! Try again");
            }
            // failed, not updated
            else if (res.data.status === 403) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
                setSuccess("Error occurred! Try again");
            }
            // login to access error message
            else if (res.data.status === 401) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // console.log("APi Response:");
            // console.log(res);
            setBtLoading(false);

        });

    };

    // upload finance the parsed file data
    const uploadParsedFinance = (event) => {
        event.preventDefault();
        if (!file) return setErrorFinance("Please, select file to upload");
        setBtLoading(true);
        axios.post("/api/upload_finance", { data: data_finace }).then(res => {
            if (res.data.status === 200) {
                //success message
                toast.success(res.data.message, { theme: 'colored' });
                //history.push('/admin/view-product');

                setBtLoading(false);
                setSuccessFinance("File uploaded successfully.");
                setFile('');
                ref.current.value = "";
            }
            // validation error
            else if (res.data.status === 422) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
            }
            else if (res.data.status === 500) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
                setSuccess("Error occurred! Try again");
            }
            else if (res.data.status === 501) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
                setSuccess("Error occurred! Try again");
            }
            // failed, not updated
            else if (res.data.status === 403) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
                setSuccess("Error occurred! Try again");
            }
            // login to access error message
            else if (res.data.status === 401) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // console.log("APi Response:");
            // console.log(res);
            setBtLoading(false);

        });

    };

    // upload CA parsed file data
    const uploadParsedCa = (event) => {
        event.preventDefault();
        if (!file) return setErrorCa("Please, select file to upload");
        setBtLoading(true);
        axios.post("/api/upload_ca", { data: data_ca }).then(res => {
            if (res.data.status === 200) {
                //success message
                toast.success(res.data.message, { theme: 'colored' });
                setBtLoading(false);
                setSuccessCa("File uploaded successfully.");

                ca_fileInputRef.current.value = null
                setFile("");
                //history.push('/admin/index');
            }
            // validation error
            else if (res.data.status === 422) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
            }
            else if (res.data.status === 500) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
                setSuccessCa("Error occurred! Try again");
            }
            else if (res.data.status === 501) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
                setSuccessCa("Error occurred! Try again");
            }
            // failed, not updated
            else if (res.data.status === 403) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
                setSuccessCa("Error occurred! Try again");
            }
            // login to access error message
            else if (res.data.status === 401) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // console.log("APi Response:");
            // console.log(res);
            setBtLoading(false);

        });

    };
    // upload CA parsed file data
    const uploadParsedResult = (event) => {
        event.preventDefault();
        if (!file) return setErrorResult("Please, select file to upload");
        setBtLoading(true);
        axios.post("/api/upload_result", { data: data_result }).then(res => {
            if (res.data.status === 200) {
                //success message
                toast.success(res.data.message, { theme: 'colored' });
                setBtLoading(false);
                setSuccessResult("File uploaded successfully.");

                result_fileInputRef.current.value = null
                setFile("");
                //history.push('/admin/index');
            }
            // validation error
            else if (res.data.status === 422) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
            }
            else if (res.data.status === 500) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
                setSuccessResult("Error occurred! Try again");
            }
            else if (res.data.status === 501) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
                setSuccessResult("Error occurred! Try again");
            }
            // failed, not updated
            else if (res.data.status === 403) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
                setSuccessResult("Error occurred! Try again");
            }
            // login to access error message
            else if (res.data.status === 401) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // console.log("APi Response:");
            // console.log(res);
            setBtLoading(false);
        });

    };

    var btn_validate = <button onClick={handleParse} className="btn btn-info"> Validate File</button>

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
                            <h1 className="m-0">Manage Upload</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                {/* <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li> */}
                            </ol>
                        </div>
                    </div>
                    <p style={p}>
                        You can easily preview the state of each scratch card in the system here below and activate /
                        de-activate any scratch card.
                    </p>
                    <div className="callout callout-warning">
                        <h5><i className="fas fa-info" /> Note:</h5>
                        You can manage all uploading system here! Please, ensure you only upload the required file format only.
                    </div>


                    <div className="row">
                        <div className="col-12 col-sm-12">
                            <div className="card card-dark card-tabs">
                                <div className="card-header p-0 pt-1">
                                    <ul className="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link" id="custom-tabs-one-result-tab" data-toggle="pill" href="#custom-tabs-one-result" role="tab" aria-controls="custom-tabs-one-result" aria-selected="true">Upload result</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="custom-tabs-one-ca-tab" data-toggle="pill" href="#custom-tabs-one-ca" role="tab" aria-controls="custom-tabs-one-ca" aria-selected="false">Upload CA</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="custom-tabs-one-pin-tab" data-toggle="pill" href="#custom-tabs-one-pin" role="tab" aria-controls="custom-tabs-one-pin" aria-selected="false">Upload PIN</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="custom-tabs-one-finance-tab" data-toggle="pill" href="#custom-tabs-one-finance" role="tab" aria-controls="custom-tabs-one-finance" aria-selected="false">Upload Financial Report</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <div className="tab-content" id="custom-tabs-one-tabContent">
                                        <div className="tab-pane fade show" id="custom-tabs-one-result" role="tabpanel" aria-labelledby="custom-tabs-one-result-tab">
                                            {btLoading && <div className="overlay">
                                                <i className="spinner-border text-info" style={{ width: "3rem", height: "3rem" }}></i>
                                                <div className="text-bold mr-4">{" "} Processing...</div>
                                            </div>}

                                            <div style={p}>
                                                <h4 className="title" id="title">Select result file to upload (CSV Only)</h4>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-9">
                                                    <div className="form-group">
                                                        <label>Select File</label>
                                                        <input onChange={handleResultChange}
                                                            id="csvInput"
                                                            name="file"
                                                            ref={result_fileInputRef}
                                                            type="File" className="form-control" placeholder="Select File" />
                                                        {error_result ? <span className='text-danger'>{error_result}</span> :
                                                            <span className='text-success'>{success_result}</span>
                                                        }
                                                        <br />
                                                        {success_result ? "" : <button onClick={handleParseResult} className="btn btn-info"> Validate File</button>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                {success_result ? <button disabled={btLoading} className="btn btn-success" onClick={event => uploadParsedResult(event)}>
                                                    Upload Result
                                                </button> : ""}
                                            </div>
                                        </div>

                                        <div className="tab-pane fade" id="custom-tabs-one-ca" role="tabpanel" aria-labelledby="custom-tabs-one-ca-tab">
                                            {btLoading && <div className="overlay">
                                                <i className="spinner-border text-info" style={{ width: "3rem", height: "3rem" }}></i>
                                                <div className="text-bold mr-4">{" "} Processing...</div>
                                            </div>}

                                            <div style={p}>
                                                <h4 className="title" id="title">Select CA result file to upload (CSV Only)</h4>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-9">
                                                    <div className="form-group">
                                                        <label>Select File</label>
                                                        <input onChange={handleCAChange}
                                                            id="csvInput"
                                                            name="file"
                                                            ref={ca_fileInputRef}
                                                            type="File" className="form-control" placeholder="Select File" />
                                                        {error_ca ? <span className='text-danger'>{error_ca}</span> :
                                                            <span className='text-success'>{success_ca}</span>
                                                        }
                                                        <br />
                                                        {success_ca ? "" : <button onClick={handleParseCa} className="btn btn-info"> Validate File</button>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="modal-footer">
                                                {success_ca ? <button disabled={btLoading} className="btn btn-success" onClick={event => uploadParsedCa(event)}>
                                                    Upload CA
                                                </button> : ""}

                                            </div>
                                        </div>

                                        <div className="tab-pane fade" id="custom-tabs-one-pin" role="tabpanel" aria-labelledby="custom-tabs-one-pin-tab">
                                            {btLoading && <div className="overlay">
                                                <i className="spinner-border text-info" style={{ width: "3rem", height: "3rem" }}></i>
                                                <div className="text-bold mr-4">{" "} Processing...</div>
                                            </div>}

                                            <div style={p}>
                                                <h4 className="title" id="title">Select PIN file to upload (CSV Only)</h4>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-9">
                                                    <div className="form-group">
                                                        <label>Select File</label>
                                                        <input onChange={handleFileChange}
                                                            id="csvInput"
                                                            name="file"
                                                            ref={ref}
                                                            type="File" className="form-control" placeholder="Select File" />
                                                        {error ? <span className='text-danger'>{error}</span> :
                                                            <span className='text-success'>{success}</span>
                                                        }
                                                        <br />
                                                        {btn_notice ? "" : btn_validate}
                                                    </div>
                                                </div>

                                                <div>

                                                </div>
                                            </div>

                                            <div className="modal-footer">
                                                {btn_notice ? <button disabled={btLoading} className="btn btn-success" onClick={event => uploadParsedFile(event)}>
                                                    Upload Pin
                                                </button> : ""}
                                                {/* <button type='submit' disabled={btLoading} className="btn btn-success">
                                                        Upload PIN
                                                    </button> */}
                                            </div>
                                        </div>

                                        <div className="tab-pane fade" id="custom-tabs-one-finance" role="tabpanel" aria-labelledby="custom-tabs-one-finance-tab">
                                            {btLoading && <div className="overlay">
                                                <i className="spinner-border text-info" style={{ width: "3rem", height: "3rem" }}></i>
                                                <div className="text-bold mr-4">{" "} Processing...</div>
                                            </div>}
                                            <div style={p}>
                                                <h4 className="title" id="title">Select finance report file to upload (CSV Only)</h4>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-9">
                                                    <div className="form-group">
                                                        <label>Select File</label>
                                                        <input onChange={handleFinanceChange}
                                                            id="csvInput"
                                                            name="file"
                                                            ref={ref}
                                                            type="File" className="form-control" placeholder="Select File" />
                                                        {error_finance ? <span className='text-danger'>{error_finance}</span> :
                                                            <span className='text-success'>{success_finance}</span>
                                                        }
                                                        <br />
                                                        {success_finance ? "" : <button onClick={handleParseFinance} className="btn btn-info"> Validate File</button>}

                                                    </div>
                                                </div>
                                            </div>
                                            <input type="hidden" name='id_name' className="form-control" placeholder="ID" />

                                            <div className="modal-footer">
                                                {success_finance ? <button disabled={btLoading} className="btn btn-success" onClick={event => uploadParsedFinance(event)}>
                                                    Upload Report
                                                </button> : ""}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /.card */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* Edit modal goes here... */}
            <Modal>
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Caution</Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Are you sure you want to delete this ?</h5>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm">
                        Close
                    </Button>
                    <Button variant="info" size="sm">
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ManageUpload;