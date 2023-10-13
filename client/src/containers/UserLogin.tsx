import React, { SyntheticEvent } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {useAuthUpdate} from "../context/AuthProvider";
import {Api} from "../services/Api";
import {UserLoginForm} from "../components/UserLoginForm";
import {useAddNotification} from "../context/AlertProvider";

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
        setIsLoading(true)
        try {
            const response = await new Api().userLogin(userName, userPassword)
            setToken(response)
            addNotification({message: "You successfully logged in", link: ""})

        } catch(error) {
            if (error instanceof Error) {
                setShowAlert(true)
                setAlert(error.message)
            }
        } finally {
            setIsLoading(false)
        }

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
