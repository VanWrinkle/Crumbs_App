import {Button, Card, Form} from "react-bootstrap";
import React, {ChangeEvent, SyntheticEvent} from "react";

export function UserRegistrationForm(props: {
    validateName: (e: ChangeEvent<HTMLInputElement>) => void,
    validatePassword: (e: ChangeEvent<HTMLInputElement>) => void,
    onSubmit: (e: SyntheticEvent) => void,
    nameError: boolean,
    passwordError: boolean,
    submitDisabled: boolean
}) {

    return(
        <Card className={"main-content"}>
            <Card.Title className={"m-2"}>User Registration</Card.Title>
            <Form>
                <Form.Group className={"m-2"}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type={"text"}
                        placeholder={"Username"}
                        onChange={props.validateName}
                    />
                    {props.nameError &&
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
                        onChange={props.validatePassword}
                    />
                    {props.passwordError &&
                        <Form.Text>
                            Your password is invalid; it must be at least 8 characters long, and must contain at least one letter and one digit
                        </Form.Text>
                    }
                </Form.Group>

                <Form.Group className={"m-2"}>
                    <Button
                        disabled={props.submitDisabled}
                        type={"submit"}
                        variant={"primary"}
                        onClick={props.onSubmit}>Submit</Button>
                </Form.Group>
            </Form>
        </Card>
    )
}