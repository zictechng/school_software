import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Image from '../../assets/dist/img/avatar_2.png';
import Pagination from 'react-js-pagination';

function MyStudent() {

    const history = useHistory();
    document.title = "My Student Details | " + window.companyName;
    const [student_details, setStudentDetails] = useState([]);
    const [display_image, setDisplay_image] = useState([]);
    const [result_ID, setResultID] = useState('');

    const [is_loading, setIsLoading] = useState(false);

    const [isfetchLoading, setIsFetchloading] = useState(true);


    // create a function to fetch all data here
    const getMyStudent = (PageNumber = 1) => {
        try {
            setIsLoading(true)
            // let create the api url here
            axios.get(`/api/fetch_my_student?page=${PageNumber}`).then(res => {
                if (res.data.status === 200) {
                    setStudentDetails(res.data.myStudentLog);
                    setIsLoading(false);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
                }
                setIsFetchloading(false);
                //setLoading(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
        }
    }
    useEffect(() => {
        // call the function here
        getMyStudent();
        return () => {
        };
    }, []);

    const { data, current_page, per_page, total, from, to, last_page } = student_details

    // check if user have profile image and show it else, show default one.
    const myphoto = "";
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    if (isfetchLoading) {
        return (
            <div className='text-center'>
                <div className="spinner-border spinner-border text-info" role="status">
                </div>
            </div>
        )
    }
    var table_record = "";
    if (student_details.data.length > 0) {
        table_record = <div>
            <table id="example1" className="table table-bordered table-responsive-sm table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Admin. No</th>
                        <th>Student Name</th>
                        <th>Age</th>
                        <th>Sex</th>
                        <th>Phone</th>
                        <th>Photo</th>
                    </tr>
                </thead>
                <tbody>
                    {student_details.data.map((item, i) => {
                        {/* if (item.st_image !== undefined && item.st_image !== null) {
                            myphoto = "http://localhost:8000/" + item.st_image;
                        } */}
                        return (
                            <tr key={i}>
                                <td>{i + from}</td>
                                <td><Link to={`view-student/${item.id}`}>{item.st_admin_number}</Link></td>
                                <td>{item.surname} {" "} {item.other_name}</td>
                                <td>{item.st_age}</td>
                                <td>{item.sex}</td>
                                <td>{item.guardia_number}</td>
                                <td>
                                    {item.st_image ? <img className="img-account-profile rounded-circle mb-2" src={"http://localhost:8000/" + item.st_image} alt={item.st_admin_number} width='50px' height='50' />
                                        : <img className="img-account-profile rounded-circle mb-2" src={Image} alt={item.st_admin_number} width='50px' />}
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
                        onChange={(pageNumber) => getMyStudent(pageNumber)}
                        renderOnZeroPageCount={null}
                        itemClass="page-item"
                        linkClass="page-link"
                        firstPageText="First"
                        lastPageText="Last"
                    />
                </ul>
            </nav>
        </div>
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">

                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">My Student Details</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'><Link to='/staff/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>
                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title"><a style={p}> List view of the student in your class. | </a> Current student details </h3>
                        </div>
                        <div className="card-body">
                            <div className='text-center'>
                                {is_loading && <div className='overlay text-center'>
                                    <div className="spinner-border spinner-border text-info" role="status">
                                    </div>
                                </div>}
                            </div>
                            {student_details.data.length ? table_record :
                                <div className='text-center'>
                                    <p style={p}> No record at the moment</p>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyStudent;