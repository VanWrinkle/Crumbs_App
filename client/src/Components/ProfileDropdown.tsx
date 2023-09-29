import 'bootstrap/dist/css/bootstrap.min.css';
import {Badge, Image, NavDropdown} from "react-bootstrap";
import React, {SyntheticEvent} from "react";
import {useAuth, useAuthUpdate} from "../AuthProvider";
import axios from "axios";

export function ProfileDropdown() {
    const userData = useAuth()
    const updateUserData = useAuthUpdate()


    function onLogout(e: SyntheticEvent) {
        e.preventDefault();
        axios.post('/api/logout', {
        })
            .then(response => {
                updateUserData(undefined)
            })
            .catch(function (error: Promise<void>) {
                console.log(error);
            });

    }

    return (
        <>
        <Image src='./profile.png' roundedCircle width='30' height='30' className="d-inline-block align-self-center" />
        <NavDropdown title={userData?.username} align={{ lg: 'end' }}>
            <NavDropdown.Item>Notifications <Badge bg='secondary'>0</Badge></NavDropdown.Item>
            <NavDropdown.Item>Profile</NavDropdown.Item>
            <NavDropdown.Item>Settings</NavDropdown.Item>
            <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
        </>
    )
}