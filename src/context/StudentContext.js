import React, { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
//import { useHistory } from "react-router-dom";
import axios from "axios";

export const StudentContext = createContext();
localStorage.getItem("auth_loggedID");
const userID = localStorage.getItem("auth_loggedID")

export const StudentProvider = props => {

    const [user_details, setUserDetails] = useState([]);
    const [logged_status, setLoggedStatus] = useState([]);
    const [logged_check, setLoggedCheck] = useState(false);
    const [count_message, setCount_message] = useState([]);
    const [my_photo, setMyPhoto] = useState([]);

    const [user_loggin_state, setUserLogginState] = useState([]);

    useEffect(() => {
        const getLoggedInUser = async () => {
            const userID = localStorage.getItem("auth_loggedID");
            try {
                if (!userID) return;
                const res = await axios.get(`/api/check_loggin_user/${userID}`);
                setUserDetails(res.data.loggStatus.logginUser);
                setLoggedStatus(res.data.loggStatus.checkUserLoggin);
                setCount_message(res.data.loggStatus.myMessage);
                setLoggedCheck(true);
                //setLoggedStatus(true);
            } catch (error) {
                // Handle the error
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
        };
        getLoggedInUser();
    }, []);

    return (
        <StudentContext.Provider value={{ user_image: [my_photo, setMyPhoto], message_count: [count_message, setCount_message], loggin_state: [user_loggin_state, setUserLogginState], loggin_check: [logged_status, setLoggedStatus], user: [user_details, setUserDetails], checkLoggin: [logged_check, setLoggedCheck] }}>
            {props.children}
        </StudentContext.Provider>

    );

}