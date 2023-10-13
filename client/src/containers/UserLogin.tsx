import React, { SyntheticEvent } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {useAuthUpdate} from "../context/AuthProvider";
import {Api} from "../services/Api";
import {UserLoginForm} from "../components/UserLoginForm";
import {useAddNotification} from "../context/AlertProvider";
import {toast} from "react-toastify";

export default function UserLogin() {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState("")
    const setToken = useAuthUpdate()
    const addNotification = useAddNotification()

    async function onClick(e: SyntheticEvent) {
        e.preventDefault();
        const api = new Api().userLogin(userName, userPassword)
        await toast.promise(
            api, {
                pending: "Logging in",
                success: "You are now logged in",
                error: {
                    render: ({data}) => {
                        return (data instanceof Error) ? data.message : ""
                    }
                }
            })
            .then((token) => {
                    setToken(token)
            })
    }

    return(
        <UserLoginForm
            setUserName={setUserName}
            setUserPassword={setUserPassword}
            userPassword={userPassword}
            isLoading={isLoading}
            showAlert={showAlert}
            alert={alert}
            setShowAlert={setShowAlert}
            onClick={onClick}
            />
    )
}
