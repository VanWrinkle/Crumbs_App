import React, {SyntheticEvent, useState} from "react";
import {Button, Card, Container, Form, FormGroup} from "react-bootstrap"
import axios from "axios";

export function UserRegistration() {

    const [name, setName] = useState("");
    const [nameErr, setNameErr] = useState(false)
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState(false);
    const validName = new RegExp("^(?=[a-z_]{4,30}$)");
    const validPassword = new RegExp("^(?=.*[a-zA-Z])(?=.*\\d).{8,}");

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

    const submit = (event: React.MouseEvent) => {
        event.preventDefault();
        console.log("You are here");
        axios.post("https://localhost/api/register", {
            username: name,
            password: password

        })
            .then(function (response: any) {
                console.log(response)
            })
            .catch(function (error: any) {
                console.log(error)
            });
    }

    return (
        <Card className={"main-content"}>
            <Form>
                <Form.Group className={"m-3"}>
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

                <Form.Group className={"m-3"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type={"password"}
                        placeholder={"Password"}
                        onChange={e => validatePassword(e)}
                    />
                    {passwordErr &&
                        <Form.Text>
                            Your password is invalid; it must 8 characters or longer, and must contain at least one uppercase letter, one lowercase letter and one number
                        </Form.Text>
                    }
                </Form.Group>

                <Form.Group className={"m-3"}>
                    <Button
                        disabled={(name.length === 0 || password.length === 0)||
                        (nameErr || passwordErr)}
                        type={"submit"}
                        className={"btn-dark"}
                        onClick={(e) => submit(e)}>Submit</Button>
                </Form.Group>
            </Form>
        </Card>
    )
}