import React, { SyntheticEvent } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, NavDropdown, InputGroup, Alert} from "react-bootstrap";
import { useState } from 'react';
import {useAuthUpdate} from "../AuthProvider";
import {Api} from "../Api";
import {LoadingButton} from "./CommonUI";

function UserLogin() {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState("")
    const setToken = useAuthUpdate();

    async function onClick(e: SyntheticEvent) {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await new Api().userLogin(userName, userPassword)
            setToken(response)
        } catch(error) {
            if (error instanceof Error) {
                setShowAlert(true)
                setAlert(error.message)
            }
        } finally {
            setIsLoading(false)
        }

    }

    return(
        <NavDropdown title={"Login"} align={{ lg: 'end' }}>
            <div style={{width: '230px', padding: '20px'}}>
            <Form>
                <Form.Group className="mb-2" controlId="userName">
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            onChange={(e) => {setUserName(e.target.value)}}
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
                    value={userPassword}
                    onChange={(e) => {setUserPassword(e.target.value)}}
                    required></Form.Control>
                </Form.Group>

                {showAlert && (
                    <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                        {alert}
                    </Alert>
                )}

                <LoadingButton
                    isLoading={isLoading}
                    onClick={onClick}
                    buttonText={'Log in'}
                    disabled={false}
                    variant={'primary'}
                />

                <p style={{paddingTop: '20px'}}>
                No account? Sign up <> </>
                <a href={"/signup"}>here</a>
                !
                </p>

            </Form>

            </div>
        </NavDropdown>
    )
}






export default UserLogin