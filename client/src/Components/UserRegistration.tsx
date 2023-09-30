import React from "react";
import {SyntheticEvent, useState} from "react";
import {Button, Card, Form} from "react-bootstrap"
import {Api} from "../Api";
import {useAuthUpdate} from "../AuthProvider";
import {useNavigate} from 'react-router-dom';

export function UserRegistration() {

    const [name, setName] = useState("");
    const [nameErr, setNameErr] = useState(false)
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState(false);
    const validName = new RegExp("^(?=[a-z_]{4,30}$)");
    const validPassword = new RegExp("^(?=.*[a-zA-Z])(?=.*\\d).{8,}");
    const setToken = useAuthUpdate()
    const navigate = useNavigate();

    const validateName = (event: any) => {

        if (!validName.test(event.target.value)) {
            setNameErr(true);
        }
        else {
            setNameErr(false);
            setName(event.target.value);
        }
    }

    const validatePassword = (event: any) => {
        //event.preventDefault();
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
        <Card className={"main-content"}>
            <Card.Title className={"m-2"}>User Registration</Card.Title>
            <Form>
                <Form.Group className={"m-2"}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type={"text"}
                        placeholder={"Username"}
                        onChange={e => validateName(e)}
                    />
                    {nameErr &&
                        <Form.Text>
                            Your username is invalid; it must be between 4 and 30 characters long and can only contain lowercase letters
                        </Form.Text>
                        }
                </Form.Group>

                <Form.Group className={"m-2"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type={"password"}
                        placeholder={"Password"}
                        onChange={e => validatePassword(e)}
                    />
                    {passwordErr &&
                        <Form.Text>
                            Your password is invalid; it must be at least 8 characters long, and must contain at least one letter and one digit
                        </Form.Text>
                    }
                </Form.Group>

                <Form.Group className={"m-2"}>
                    <Button
                        disabled={(name.length === 0 || password.length === 0)||
                        (nameErr || passwordErr)}
                        type={"submit"}
                        variant={"primary"}
                        onClick={onSubmit}>Submit</Button>
                </Form.Group>
            </Form>
        </Card>
    )
}