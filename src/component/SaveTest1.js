import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";

function SaveText1() {
    const [all_class, setAllClass] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [state_detail, setStateDetails] = useState([]);
    const [allstate_detail, setAllStateDetails] = useState("");

    const style = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    };
    //decl all variable here
    const [all_content, setAllContent] = useState({
        state: "",
        class: "",
    });
    const handleMultipleSelected = (e) => {
        setAllContent({ ...all_content, [e.target.name]: e.target.value });
    };

    const [save_textInput, setSaveTextInput] = useState({
        message: "",
        email_address: "",
        attach_file: "",
        error_list: [],
    });

    // useEffect()
    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setSaveTextInput({ ...save_textInput, [e.target.name]: e.target.value });
    };

    const submitMessage = (e) => {
        e.preventDefault();
        setIsloading(true);
        console.log(all_content);

        const data = {
            message: save_textInput.message,
            class:
                all_content.class !== ""
                    ? all_content.class.join(", ")
                    : all_content.class,
            state:
                all_content.state !== ""
                    ? all_content.state.join(", ")
                    : all_content.state,
            email_address: save_textInput.email_address,
            attach_file: save_textInput.attach_file,
        };
        // console.log(save_textInput.class);

        try {
            // let create the api url here
            axios.post(`/api/textSave`, data).then((res) => {
                if (res.data.status === 200) {
                    // successful message
                    toast.success(res.data.message, { theme: "colored" });
                    setSaveTextInput({
                        ...save_textInput,
                        message: "",
                        email_address: "",
                        class: "",
                        attach_file: "",
                    });
                    e.target.reset();
                }
                // record already exist
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: "colored" });
                }
                // data input required
                else if (res.data.status === 422) {
                    toast.error("Missing Data Required", { theme: "colored" });
                    setSaveTextInput({
                        ...save_textInput,
                        error_list: res.data.errors,
                    });
                }
                // error record not save
                else if (res.data.status === 500) {
                    toast.warning("Missing Data Required", {
                        position: "top-center",
                        theme: "colored",
                    });
                    setSaveTextInput({
                        ...save_textInput,
                        error_list: res.data.errors,
                    });
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: "colored" });
                } else {
                    toast.error("sorry, something went wrong! Try again.", {
                        theme: "colored",
                    });
                }
                setIsloading(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, {
                theme: "colored",
            });
            setIsloading(false);
        }
    };
    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_all_details`).then((res) => {
            if (res.data.status === 200) {
                setAllClass(res.data.allDetails.class_details);
            }
            setLoading(false);
        });
    }, []);

    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_state`).then((res) => {
            if (res.data.status === 200) {
                //setClassDetails(res.data.allsDetails.all_class);
                setStateDetails(res.data.allsDetails.all_state);
                setAllStateDetails(res.data.allsDetails.all_state);
                //console.log(res.data.allsDetails.all_state);
            }
        });
    }, []);

    //console.log(allstate_detail);

    const options = [
        { value: "Abia", label: "Abia" },
        { value: "Adamawa", label: "Adamawa" },
        { value: "AkwaIbom", label: "AkwaIbom" },
        { value: "Anambra", label: "Anambra" },
        { value: "Bauchi", label: "Bauchi" },
        { value: "Bayelsa", label: "Bayelsa" },
        { value: "Benue", label: "Benue" },
        { value: "Borno", label: "Borno" },
        { value: "CrossRivers", label: "CrossRivers" },
        { value: "Delta", label: "Delta" },
        { value: "Ebonyi", label: "Ebonyi" },
        { value: "Edo", label: "Edo" },
        { value: "Ekiti", label: "Ekiti" },
        { value: "Enugu", label: "Enugu" },
        { value: "Gombe", label: "Gombe" },
        { value: "Imo", label: "Imo" },
        { value: "Jigawa", label: "Jigawa" },
        { value: "Kaduna", label: "Kaduna" },
        { value: "Kano", label: "Kano" },
        { value: "Katsina", label: "Katsina" },
        { value: "Kebbi", label: "Kebbi" },
        { value: "Kogi", label: "Kogi" },
        { value: "Kwara", label: "Kwara" },
        { value: "Lagos", label: "Lagos" },
        { value: "Nasarawa", label: "Nasarawa" },
        { value: "Niger", label: "Niger" },
        { value: "Ogun", label: "Ogun" },
        { value: "Ondo", label: "Ondo" },
        { value: "Osun", label: "Osun" },
        { value: "Oyo", label: "Oyo" },
        { value: "Plateau", label: "Plateau" },
        { value: "Rivers", label: "Rivers" },
        { value: "Sokoto", label: "Sokoto" },
        { value: "Taraba", label: "Taraba" },
        { value: "Yobe", label: "Yobe" },
        { value: "Zamfara", label: "Zamfara" },
        { value: "Other", label: "Other" },
    ];
    const classOptions = [];
    all_class.map((term) => {
        classOptions.push({ value: term.id, label: term.class_name });
    });
    const stateOption = [];

    state_detail.map((term) => {
        stateOption.push({ value: term.id, label: term.state_details });
    });
    function handleSelect2Input(stateName, e) {
        // console.log(stateName, e);
        let a = [];
        e.forEach((v, i) => a.push(v.value));
        setAllContent({ ...all_content, [stateName]: a });
    }
    // an array with multiple objects

    if (loading) {
        return (
            <div style={style}>
                <div
                    className="spinner-border spinner-border-sm text-info"
                    role="status"
                ></div>{" "}
                Loading
            </div>
        );
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Manage Message Texting</h1>
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
                                    <Link to="/admin/add-student">
                                        <button
                                            type="button"
                                            className="btn btn-block btn-info btn-sm"
                                        >
                                            Text Message
                                        </button>
                                    </Link>{" "}
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title">Send text message</h3>
                        </div>
                        {/* /.card-header */}
                        {/* <div className='overlay text-center'>
                            <div className="spinner-border spinner-border text-info" role="status">
                            </div>
                        </div> */}
                        {isLoading && (
                            <div className="overlay text-center">
                                <div
                                    className="spinner-border spinner-border text-info"
                                    role="status"
                                ></div>
                            </div>
                        )}

                        <div className="card-body">
                            <div className="text-center"></div>
                            <form onSubmit={submitMessage}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input
                                            type="email"
                                            name="email_address"
                                            onChange={handleInput}
                                            value={save_textInput.email_address}
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            placeholder="Enter email"
                                        />
                                        <span className="text-danger">
                                            {save_textInput.error_list.email_address}
                                        </span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">State</label>
                                        <Select
                                            name="state"
                                            options={options}
                                            isMulti
                                            isClearable={true}
                                            isSearchable={true}
                                            isDisabled={false}
                                            isLoading={false}
                                            onChange={(e) => handleSelect2Input("state", e)}
                                        />
                                        <span className="text-danger">
                                            {save_textInput.error_list.state}
                                        </span>
                                    </div>

                                    <div className="form-group">
                                        <label>Class</label>
                                        <Select
                                            name="class"
                                            options={classOptions}
                                            isMulti
                                            isClearable={true}
                                            isSearchable={true}
                                            isDisabled={false}
                                            isLoading={false}
                                            onChange={(e) => handleSelect2Input("class", e)}
                                        />
                                        <span className="text-danger">
                                            {save_textInput.error_list.class}
                                        </span>
                                    </div>

                                    <div>
                                        <label>Write Message</label>
                                        <textarea
                                            name="message"
                                            onChange={handleInput}
                                            value={save_textInput.message}
                                            className="form-control"
                                            placeholder="Message Here..."
                                        ></textarea>
                                        <span className="text-danger">
                                            {save_textInput.error_list.message}
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <label>Inserted State</label>
                                        <Select
                                            name="state_name"
                                            options={stateOption}
                                            isClearable={true}
                                            isSearchable={true}
                                            isDisabled={false}
                                            onChange={(e) => handleSelect2Input("state_name", e)}
                                        />
                                        {/* <select name='class_apply' onChange={handleInput} value={save_textInput.class_apply} className="form-control select2">
                                            <option>Select</option>
                                            {
                                                all_class.map((item) => {
                                                    return (
                                                        <option value={item.id} key={item.id}>{item.class_name}</option>
                                                    )
                                                })
                                            }
                                        </select> */}
                                        <span className="text-danger">
                                            {save_textInput.error_list.state_name}
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <label>Inserted State</label>
                                        <select name="class_apply" className="form-control">
                                            <option>Select State</option>
                                            {state_detail.map(
                                                (item) =>
                                                    item &&
                                                    item.state_details
                                                        .split(",")
                                                        .map((splittedItem) => {
                                                            return (
                                                                <option value={splittedItem} key={splittedItem}>
                                                                    {splittedItem}
                                                                </option>
                                                            );
                                                        })
                                            )}
                                        </select>
                                    </div>

                                    {/* <div className="form-group">
                                        <label htmlFor="exampleInputFile">Attached File</label>
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="exampleInputFile" />
                                                <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                            </div>
                                            <div className="input-group-append">
                                                <span className="input-group-text">Upload</span>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="btn btn-primary"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>

                            {/* <table id="example1" className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Full Name</th>
                                        <th>Class</th>
                                        <th>Phone No.</th>
                                        <th>DOB</th>
                                        <th>Admin. No.</th>
                                        <th>Reg. Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Internet
                                            Explorer 4.0
                                        </td>
                                        <td>Win 95+</td>
                                        <td> 4</td>
                                        <td>X</td>
                                        <td>X</td>
                                        <td>X</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Internet
                                            Explorer 5.0
                                        </td>
                                        <td>Win 95+</td>
                                        <td>5</td>
                                        <td>C</td>
                                        <td>X</td>
                                        <td>X</td>
                                        <td></td>
                                    </tr>

                                </tbody>

                            </table> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SaveText1;
