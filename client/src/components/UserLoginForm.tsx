import {Button, Form, InputGroup, NavDropdown} from "react-bootstrap";
import React, {SyntheticEvent} from "react";
import {Link} from "react-router-dom";

/**
 * UserLoginForm is a React component responsible for rendering the user login form.
 * It allows users to input their username and password for login and provides validation feedback.
 * @param setUserName - A function to set the entered username.
 * @param setUserPassword - A function to set the entered password.
 * @param userPassword - The user's password.
 * @param onClick - A callback function for the login button click.
 * @param disabled - A boolean indicating if the login button should be disabled.
 * @returns A React element representing the user login form.
 */
export function UserLoginForm(props: {
    setUserName: (name: string) => void,
    setUserPassword: (password: string) => void,
    userPassword: string,
    onClick: (e: SyntheticEvent) => void,
    disabled: boolean
}) {

    return(
        <NavDropdown title={"Login"} align='end'>
            <div style={{width: '230px', padding: '20px'}}>
                <Form>
                    <Form.Group className="mb-2" controlId="userName">
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                onChange={(e) => {props.setUserName(e.target.value)}}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="userPass">
                        <Form.Control
                            className="md-3"
                            type="password"
                            placeholder="Password"
                            value={props.userPassword}
                            onChange={(e) => {props.setUserPassword(e.target.value)}}
                            required></Form.Control>
                    </Form.Group>

                    <Button
                        type={"submit"}
                        onClick={props.onClick}
                        disabled={props.disabled}
                    >
                        Log In
                    </Button>
                    <p style={{paddingTop: '20px'}}>
                        <>No account? </>
                        <Link to={"/register"}>Sign up</Link>
                        !
                    </p>

                </Form>

            </div>
        </NavDropdown>
    )
}