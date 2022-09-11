
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Papa from "papaparse";
import "../../style.css";

function ManageUpload2() {
    document.title = "Manage Upload | ";

    const [btLoading, setBtLoading] = useState(false);
    const [pin_file, setPinFile] = useState([]);

    const [error_list, setErrorList] = useState([]);

    // Allowed extensions for input file
    const allowedExtensions = ["csv"];

    // This state will store the parsed data
    const [data, setData] = useState([]);

    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");

    // It will store the file uploaded by the user
    const [file, setFile] = useState("");

    // This function will be called when
    // the file input changes
    const handleFileChange = (e) => {
        setError("");

        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];

            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            }

            // If input type is correct set the state
            setFile(inputFile);
        }
    };
    const handleParse = () => {

        // If user clicks the parse button without
        // a file we show a error
        if (!file) return setError("Enter a valid file");

        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();

        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true, value: true });
            const parsedData = csv?.data;
            const columns = Object.keys(parsedData[0]);
            setData(columns);
        };

        reader.readAsText(file);
    };



    /* this handle image fields */
    const handlePin = (e) => {
        setPinFile({ file_pin: e.target.files[0] });
    }

    //update profile image
    const uploadPinFileSubmit = (e) => {
        e.preventDefault();
        setBtLoading(true);
        const formData = new FormData();
        formData.append('file_pin', pin_file.file_pin);
        //console.log(formData);
        axios.post(`/api/upload_pin`, formData).then(res => {
            //console.log(res);
            if (res.data.status === 200) {
                //success message
                toast.success(res.data.message, { theme: 'colored' });
                //history.push('/admin/view-product');
                setErrorList([]);
            }
            // validation error
            else if (res.data.status === 422) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
            }
            else if (res.data.status === 500) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
            }
            else if (res.data.status === 501) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
            }
            // failed, not updated
            else if (res.data.status === 403) {
                toast.error(res.data.message, { theme: 'colored' });
                setErrorList(res.data.message);
            }
            // login to access error message
            else if (res.data.status === 401) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            else {
                toast.info("Something went wrong! Try again");

            }
            //console.log(res.data.status);
            setBtLoading(false);
        });


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
                            <h1 className="m-0">Manage Upload</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>
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
                    <div>
                        <label htmlFor="csvInput" style={{ display: "block" }}>
                            Call API (Enter Number)
                        </label>
                        <input className='form-control'
                            id="number"
                            name="admin_number"
                            type="text"
                            placeholder='Enter 10 digit number to call api'
                        />
                        <br />

                        <label htmlFor="csvInput" style={{ display: "block" }}>
                            Number
                        </label>
                        <input className='form-control'
                            id="number"
                            name="admin_number"
                            type="text"
                            placeholder='Enter 10 digit number'
                        />
                        <br />

                    </div>
                    <div>
                        <label htmlFor="csvInput" style={{ display: "block" }}>
                            Enter CSV File
                        </label>
                        <input className='form-control'
                            onChange={handleFileChange}
                            id="csvInput"
                            name="file"
                            type="File"
                        />
                        <div>
                            <button onClick={handleParse} className="btn btn-info">Parse</button>
                        </div>
                        <div style={{ marginTop: "3rem" }}>
                            {error ? error : data.map((col,
                                idx) => <div key={idx}>{col}</div>)}
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

export default ManageUpload2;