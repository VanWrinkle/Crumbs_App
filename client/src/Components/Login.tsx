import React, { SyntheticEvent } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Form, Button} from "react-bootstrap";
import { useState } from 'react';

function Login() {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    function onClick(e: SyntheticEvent) {
        e.preventDefault();
        console.log(userName + ": " + userPassword);
    }

    return(
        <Card style={{ width: '18rem' }}>
            <Card.Body>
            <Form onSubmit={onClick}>
                <Form.Group className="mb-2" controlId="userNAme">
                   <Form.Label>User Name</Form.Label>
                   <Form.Control 
                   type="text" 
                   placeholder="User name"
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
            </Form>    
            </Card.Body>        
        </Card>
    )
}

export default Login