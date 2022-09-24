import React, { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
//import { useHistory } from "react-router-dom";
import axios from "axios";
export const UserContext = createContext();

sessionStorage.getItem("auth_loggedID");
const userID = sessionStorage.getItem("auth_loggedID")
export const UserProvider = props => {

    const [user_details, setUserDetails] = useState([]);
    const [student_user_details, setStudentUserDetails] = useState([]);
    const [logged_status, setLoggedStatus] = useState([]);
    const [logged_check, setLoggedCheck] = useState(false);
    const [count_message, setCount_message] = useState([]);
    const [my_photo, setMyPhoto] = useState([]);
    const [banner_school, setBannerSchool] = useState([]);
    const [logo_school, setLogoSchool] = useState([]);
    const [user_ip, setUserIP] = useState([]);

    const [user_loggin_state, setUserLogginState] = useState([]);

    useEffect(() => {
        const getLoggedInUser = async () => {
            const userID = sessionStorage.getItem("auth_loggedID");
            try {
                if (!userID) return;
                const res = await axios.get(`/api/check_loggin_user/${userID}`);
                setStudentUserDetails(res.data.loggStatus.studentDetails);
                setUserDetails(res.data.loggStatus.logginUser);
                setLoggedStatus(res.data.loggStatus.checkUserLoggin);
                setCount_message(res.data.loggStatus.myMessage);
                setLogoSchool(res.data.loggStatus.setting_record);
                setBannerSchool(res.data.loggStatus.setting_record);
                setUserIP(res.data.loggStatus.user_ip);
                //console.log(res.data.loggStatus.user_ip);
                setLoggedCheck(true);
                //setLoggedStatus(true);
            } catch (error) {
                // Handle the error
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
        };
        getLoggedInUser();
    }, []);
    // useEffect(() => {
    //     //get message status here;
    //     axios.get(`/api/fetch_my_profile`).then(res => {
    //         if (res.data.status === 200) {
    //             setCount_message(res.data.get_mymessage);
    //         }
    //     });
    // }, []);

    return (
        <UserContext.Provider value={{
            user_image: [my_photo, setMyPhoto],
            message_count: [count_message, setCount_message],
            loggin_state: [user_loggin_state, setUserLogginState],
            loggin_check: [logged_status, setLoggedStatus],
            student_user: [student_user_details, setStudentUserDetails],
            user: [user_details, setUserDetails],
            checkLoggin: [logged_check, setLoggedCheck],
            schBanner: [banner_school, setBannerSchool],
            schLogo: [logo_school, setLogoSchool],
            userip: [user_ip, setUserIP]
        }}>
            {props.children}
        </UserContext.Provider>

    );
}