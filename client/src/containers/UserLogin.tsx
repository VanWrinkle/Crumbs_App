import React, { SyntheticEvent } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {useAuthUpdate} from "../context/AuthProvider";
import {Api} from "../services/Api";
import {UserLoginForm} from "../components/UserLoginForm";
import {toast} from "react-toastify";

export default function UserLogin() {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const setToken = useAuthUpdate()
    const [disableButton, setDisableButton] = useState(false)

    async function onClick(e: SyntheticEvent) {
        e.preventDefault();
        setDisableButton(true)
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
            .finally(() => {
                setDisableButton(false)
            })
    }

    return(
        <UserLoginForm
            setUserName={setUserName}
            setUserPassword={setUserPassword}
            userPassword={userPassword}
            onClick={onClick}
            disabled={userPassword.length === 0 || disableButton}
            />
    )
}
