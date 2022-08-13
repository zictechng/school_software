
import React, { useState, createContext } from "react";
//import { toast } from "react-toastify";
//import { useHistory } from "react-router-dom";
export const UserContext = createContext();

export const UserProvider = props => {
    // const history = useHistory();
    //const user_email = localStorage.getItem('auth_email');
    //const [users, setUsers] = useState([""]);
    const [user_details, setUserDetails] = useState({});
    const [logged_status, setLoggedStatus] = useState(false);
    const [photo_status, setPhtotStatus] = useState([]);

    const [result_class, setResultClass] = useState([]);
    const [result_subject, setResultsubject] = useState([]);

    //const [loading, setloading] = useState(true);

    // useEffect(() => {
    //     const getLoggedInUser = async () => {
    //         try {
    //             const email = localStorage.getItem("auth_email");
    //             if (!email) return;

    //             const res = await axios.get(`/api/load_user/${email}`);
    //             setUserDetails(res.data.userDetails);
    //             setLoggedStatus(true);
    //         } catch (error) {
    //             // Handle the error
    //         }
    //     };
    //     getLoggedInUser();
    // }, [])


    return (
        <UserContext.Provider value={{ classResult: [result_class, setResultClass], subjectResult: [result_subject, setResultsubject] }}>
            {props.children}
        </UserContext.Provider>

    );
}