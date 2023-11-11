import {Button, Card, Form} from "react-bootstrap";
import React, {ChangeEvent, SyntheticEvent} from "react";

/**
 * UserRegistrationForm is a React component responsible for rendering the user registration form.
 * It allows users to input their username and password for registration and provides validation feedback.
 * @param validateName - A function to validate the username input.
 * @param validatePassword - A function to validate the password input.
 * @param onSubmit - A callback function for form submission.
 * @param nameError - A boolean indicating if there is an error in the username input.
 * @param passwordError - A boolean indicating if there is an error in the password input.
 * @param submitDisabled - A boolean indicating if the form submission button should be disabled.
 * @returns A React element representing the user registration form.
 */
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