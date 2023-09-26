import React, {useState} from "react";
import {Button, Card, Container, Form} from "react-bootstrap"

export function UserRegistration() {

    const [name, setName] = useState("");
    const [nameErr, setNameErr] = useState(false)
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState(false);
    const validName = new RegExp("^(?=[a-z_]{4,30}$)");
    const validPassword = new RegExp("^(?=.*[a-zA-Z])(?=.*\\d).{8,}");

    const validateName = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (!validName.test(event.target.value)) {
            setNameErr(true);
        }
        else {
            setNameErr(false);
            setName(event.target.value);
        }
    }

    const validatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        //event.preventDefault();
        if (!validPassword.test(event.target.value)) {
            setPasswordErr(true);
        }
        else {
            setPasswordErr(false);
            setPassword(event.target.value);
        }
    }

    const submit = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

    }

    return (
        <Card className={"main-content"}>
            <Form className={"form-group"}>
                <input
                className={"form-control"}
                type={"name"}
                placeholder={"User name"}
                //value={name}
                onChange={e => validateName(e)}/>
                {nameErr && <p>Your username is invalid; it must be between 4 and 30 characters long and can only contain lowercase letters</p>}
                <input
                className={"form-control"}
                type={"password"}
                placeholder={"Password"}
                //value={password}
                onChange={e => validatePassword(e)}/>
                {passwordErr && <p>Your password is invalid; it must 8 characters or longer, and must contain at least one uppercase letter, one lowercase letter and one number</p>}
                <Button
                    disabled={(name.length === 0 || password.length === 0)||
                    (nameErr || passwordErr)}
                    type={"submit"}
                    className={"btn"}
                    onClick={e => submit}>Submit</Button>
            </Form>
        </Card>
    )
}