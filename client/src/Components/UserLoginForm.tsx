import {Alert, Form, InputGroup, NavDropdown} from "react-bootstrap";
import React, {SyntheticEvent} from "react";
import {LoadingButton} from "./LoadingButton";

export function UserLoginForm(props: {
    setUserName: (name: string) => void,
    setUserPassword: (password: string) => void,
    userPassword: string,
    isLoading: boolean,
    showAlert: boolean
    alert: string,
    setShowAlert: (show: boolean) => void,
    onClick: (e: SyntheticEvent) => void
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

                    {props.showAlert && (
                        <Alert variant="warning" onClose={() => props.setShowAlert(false)} dismissible>
                            {props.alert}
                        </Alert>
                    )}

                    <LoadingButton
                        isLoading={props.isLoading}
                        onClick={props.onClick}
                        buttonText={'Log in'}
                        disabled={false}
                        variant={'primary'}
                    />

                    <p style={{paddingTop: '20px'}}>
                        No account? Sign up <> </>
                        <a href={"/register"}>here</a>
                        !
                    </p>

                </Form>

            </div>
        </NavDropdown>
    )
}