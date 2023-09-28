import React, { SyntheticEvent } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Form, Button} from "react-bootstrap";
import { useState } from 'react';
import axios from "axios";
import {useAuthUpdate} from "../AuthProvider";

function UserLogin() {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const setToken = useAuthUpdate();

    function onClick(e: SyntheticEvent) {
        e.preventDefault();

        axios.post('/api/login', {
            username: userName,
            password: userPassword
        })
            .then(response => {
                setToken(response.data.token);
            })
            .catch(function (error: Promise<void>) {
                console.log(error);
            });

    }

    return(
        <Card className="main-content">
            <Card.Body>
            <Form onSubmit={onClick}>
                <Form.Group className="mb-2" controlId="userName">
                   <Form.Label>Username</Form.Label>
                   <Form.Control 
                   type="text" 
                   placeholder="Username"
                   value={userName}
                   onChange={(e) => {setUserName(e.target.value)}}
                   required></Form.Control>
                </Form.Group>

                <Form.Group className="mb-2" controlId="userPass">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    className="md-3" 
                    type="password" 
                    placeholder="Password"
                    value={userPassword}
                    onChange={(e) => {setUserPassword(e.target.value)}}
                    required></Form.Control>
                </Form.Group>
            
                <Button
                    type="submit" 
                    variant="primary">Log in</Button>

                <Form.Group>
                    No account? Sign up <> </>
                    <a href={"/signup"}>here</a>
                    !
                </Form.Group>

            </Form>    
            </Card.Body>        
        </Card>
    )
}

export default UserLogin