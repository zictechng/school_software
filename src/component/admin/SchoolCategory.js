import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Pagination from 'react-js-pagination';

function SchoolCategory() {

    document.title = "School Category | " + window.companyName;
    const [school_category, setSchoolCategory] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [isclassLoading, setIsClassloading] = useState(true);
    const [isfetchLoading, setIsFetchloading] = useState(true);

    const [isloading, setIs_Loading] = useState(false);

    const [school_categoryInput, setSchoolCategoryInput] = useState({
        category_name: '',
        error_list: [],
    });

    const [editschool_categoryInput, setEditSchoolCategoryInput] = useState({
        sc_name: '',
        id: '',
        id_name: '',
        errors_list: [],
    });

    const handleEdit = (e) => {
        e.persist();
        setEditSchoolCategoryInput({ ...editschool_categoryInput, [e.target.name]: e.target.value })
    }

    // declear input handling function here
    const handleInput = (e) => {
        e.persist();
        setSchoolCategoryInput({ ...school_categoryInput, [e.target.name]: e.target.value })
    }
    // send request to api to save details
    const submitCategory = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            category_name: school_categoryInput.category_name,
        }
        // let create the api url here
        axios.post(`/api/save_category`, data).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                setSchoolCategoryInput({
                    ...school_categoryInput,
                    category_name: '',
                });
                e.target.reset();
                getSchoolCategory();
            }
            // record already exist
            else if (res.data.status === 402) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // data input required
            else if (res.data.status === 422) {
                toast.error('Missing Data Required', { theme: 'colored' });
                setSchoolCategoryInput({ ...school_categoryInput, error_list: res.data.errors });
            }
            // error record not save
            else if (res.data.status === 500) {
                toast.warning('Error occurred, try again', { position: 'top-center', theme: 'colored' });
                setSchoolCategoryInput({ ...school_categoryInput, error_list: res.data.errors });
            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { theme: 'colored' });
            }
            setIsloading(false);
        });
    }

    //update academic term record here....

    const submitSchoolCategoryUpdate = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            sc_name: editschool_categoryInput.sc_name,
            id: editschool_categoryInput.id,
        }

        // let create the api url here
        axios.post(`/api/update_category`, data).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                e.target.reset();
                getSchoolCategory();
            }

            // data input required
            else if (res.data.status === 422) {
                toast.error('Value can not be empty', { theme: 'colored' });
                //setEditsessionInput({ ...editschool_categoryInput, errors_list: res.data.errors });
            }
            // error record not save
            else if (res.data.status === 500) {
                toast.warning('Error occurred! Try again', { theme: 'colored' });
                // setEditsessionInput({ ...editschool_categoryInput, errors_list: res.data.errors });
            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { theme: 'colored' });
            }
            setIsloading(false);
        });
    }


    // get academic term on button click here 
    const editSchoolCategory = (id) => {
        setIsClassloading(true);
        // let create the api url here
        axios.get(`/api/get_category/${id}`).then(res => {
            if (res.data.status === 200) {
                setEditSchoolCategoryInput(res.data.category_Details);

            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { theme: 'colored' });
            }
            setIsClassloading(false);
        });
    }
    var PageNumber = 1;
    // create a function to fetch all data here
    const getSchoolCategory = (PageNumber) => {
        setIs_Loading(true);
        // let create the api url here
        axios.get(`/api/fetch_category?page=${PageNumber}`).then(res => {
            if (res.data.status === 200) {
                setSchoolCategory(res.data.category_record);
                setIs_Loading(false);
            }
            //data not found
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
                setIs_Loading(false);
            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
            }
            setIsFetchloading(false);
            setIs_Loading(false);
        });
    }
    useEffect(() => {
        // call the function here
        getSchoolCategory();
    }, []);

    // delete operation here
    const deleteSchoolCategory = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML = "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to delete the record from the database here */
        axios.delete(`/api/delete_category/${id}`).then(res => {
            if (res.data.status === 200) {
                toast.success(res.data.message, { theme: 'colored' });
                thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 402) {
                toast.warning(res.data.message, { theme: 'colored' });
                thisClicked.innerHTML = "<i className='fa fa-trash-o'></i>";
            }
        })
    }
    // get page properties for pagination
    const { data, current_page, per_page, total, from, to, last_page } = school_category
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    if (isfetchLoading) {
        return (
            <div className="card-body">
                <div className='text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div>
                </div>
            </div>
        )
    }
    var table_record = "";
    // if (school_category.length > 0) {
    table_record = <div>
        <table id="example1" className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Academic Session</th>
                    <th>Added By</th>
                    <th>Data</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {school_category.data.map((item, i) => {
                    return (
                        <tr key={i}>
                            <td>{i + from}</td>
                            <td>{item.sc_name}</td>
                            <td>{item.sc_add_by}</td>
                            <td>{item.sc_date}</td>
                            <td> <span onClick={(e) => deleteSchoolCategory(e, item.id)} className='badge bg-danger mr-2' type='button'><i className='fa fa-trash-o text-white'></i></span>
                                {" "} {" "}
                                <span onClick={() => editSchoolCategory(item.id)} className='badge bg-primary' type='button'><i className='fa fa-pencil text-white' data-toggle="modal" data-target="#editSchoolCategory_modal"></i></span>
                            </td>
                        </tr>
                    )
                })
                }
            </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content align-items-center mr-3">
                <span className='mr-2'> </span>
                <span className='mr-3' style={p}>{current_page} - {to} / {total}</span>
                <Pagination
                    activePage={current_page}
                    totalItemsCount={total}
                    itemsCountPerPage={per_page}
                    onChange={(pageNumber) => getSchoolCategory(pageNumber)}
                    renderOnZeroPageCount={null}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                />
            </ul>
        </nav>
    </div>
    // }
    // else if (school_category.length < 1) {
    //     table_record = <div className='text-center'>
    //         <p>No record at the moment</p>
    //     </div>
    // }
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">

                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Manage School Category</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'><button type="button" className="btn btn-block btn-info btn-sm" data-toggle="modal" data-target="#AddSchool_category">Create New Category</button></li>
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>
                    <div className="card table-responsive">
                        <div className="card-header bg-dark">
                            <h3 className="card-title">Current academic school category details</h3>
                            <div className="d-flex justify-content-between">
                                <p></p>
                                <span className="badge mr-2" type="button">
                                    <input name='title' className='form-control form-control-sm' placeholder='Search...' />
                                </span>
                            </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            {isloading && <div className='overlay text-center'>
                                <div className="spinner-border spinner-border text-info" role="status">
                                </div>
                            </div>}
                            <div className="card table-responsive">
                                {school_category.data.length ? table_record :
                                    <div className='text-center'>
                                        <p>No record at the moment</p>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" data-backdrop="false" role="dialog" id="AddSchool_category" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">
                    {isLoading && <div className='overlay text-center'>
                        <div className="spinner-border spinner-border text-info" role="status">
                        </div>
                    </div>}
                    <div className="modal-content">
                        <form onSubmit={submitCategory} className="form-horizontal">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title" id="modal-title">Create new school category</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">

                                <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-5 col-form-label">Name</label>
                                        <div className="col-sm-12">
                                            <input type="text" name='category_name' onChange={handleInput} value={school_categoryInput.category_name} className="form-control" placeholder="School Category Name" />
                                            <span className='text-danger'>{school_categoryInput.error_list.category_name}</span>
                                        </div>
                                    </div>
                                    {/* <div className="form-group row">
                                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                                        <div className="col-sm-10">
                                            <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
                                        </div>
                                    </div> */}

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" data-dismiss="modal">Cancel</button>
                                <button disabled={isLoading} className="btn btn-success">
                                    {/* {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>} */}
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Edit modal goes here... */}


            <div className="modal fade" data-backdrop="false" role="dialog" id="editSchoolCategory_modal" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">
                    {isLoading && <div className='overlay text-center'>
                        <div className="spinner-border spinner-border text-info" role="status">
                        </div>
                    </div>}
                    <div className="modal-content">
                        <form onSubmit={submitSchoolCategoryUpdate} className="form-horizontal">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title" id="modal-title">Edit school category</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">

                                <div className="card-body">
                                    <div className='text-center'>
                                        {isclassLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-5 col-form-label">Name</label>
                                        <div className="col-sm-12">
                                            <input type="text" name='sc_name' onChange={handleEdit} value={editschool_categoryInput.sc_name} className="form-control" placeholder="School Category Name" />
                                        </div>
                                    </div>

                                    <input type="hidden" name='id_name' onChange={handleEdit} value={editschool_categoryInput.id} className="form-control" placeholder="ID" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" data-dismiss="modal">Cancel</button>
                                <button disabled={isLoading} className="btn btn-success">
                                    {/* {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>} */}
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SchoolCategory;