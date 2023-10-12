import React, {ChangeEvent} from "react";
import {SyntheticEvent, useState} from "react";
import {Api} from "../services/Api";
import {useAuthUpdate} from "../context/AuthProvider";
import {useNavigate} from 'react-router-dom';
import {UserRegistrationForm} from "../components/UserRegistrationForm";

export function UserRegistration() {

    const [name, setName] = useState("");
    const [nameErr, setNameErr] = useState(false)
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState(false);
    const validName = new RegExp("^(?=[a-z_]{4,30}$)");
    const validPassword = new RegExp("^(?=.*[a-zA-Z])(?=.*\\d).{8,}");
    const setToken = useAuthUpdate()
    const navigate = useNavigate();

    const validateName = (event: ChangeEvent<HTMLInputElement>) => {
        if (!validName.test(event.target.value)) {
            setNameErr(true);
        }
        else {
            setNameErr(false);
            setName(event.target.value);
        }
    }

    const validatePassword = (event: ChangeEvent<HTMLInputElement>) => {
        if (!validPassword.test(event.target.value)) {
            setPasswordErr(true);
        }
        else {
            setPasswordErr(false);
            setPassword(event.target.value);
        }
    }

    async function onSubmit(e: SyntheticEvent) {
        e.preventDefault();
        try {
            const api = new Api()
            await api.userRegistration(name, password);
            const response = await api.userLogin(name, password)
            setToken(response)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <UserRegistrationForm
            validateName={validateName}
            validatePassword={validatePassword}
            onSubmit={onSubmit}
            nameError={nameErr}
            passwordError={passwordErr}
            submitDisabled={name.length === 0 || password.length === 0 || nameErr || passwordErr}
            />
    )
}