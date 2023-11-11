import React, { SyntheticEvent } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {useAuthUpdate} from "../context/AuthProvider";
import {Api} from "../services/Api";
import {UserLoginForm} from "../components/UserLoginForm";
import {toast} from "react-toastify";

/**
 * UserLogin is a React component responsible for user login and authentication.
 * It renders a login form where users can input their username and password and handles the login process.
 * @returns A React element for user login.
 */
export default function UserLogin() {
    // State variables for user input and button disable state
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const setToken = useAuthUpdate()
    const [disableButton, setDisableButton] = useState(false)

    // Function to handle user login
    async function onClick(e: SyntheticEvent) {
        e.preventDefault();
        setDisableButton(true)
        const api = new Api().userLogin(userName, userPassword)

        // Login process with toast notifications
        await toast.promise(
            api, {
                pending: "Signing in",
                success: "You are now signed in",
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
