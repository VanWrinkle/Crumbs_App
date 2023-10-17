import {Badge, Image, NavDropdown} from "react-bootstrap";
import React, {SyntheticEvent} from "react";
import {Link} from "react-router-dom";

export function TopNavbarUserDropdownItems(props: {username: String, onLogout: (e: SyntheticEvent) => void}) {

    return (
        <>
            <Image src='/profile.png' roundedCircle width='30' height='30'
                   className="d-inline-block align-self-center"/>
            <NavDropdown title={props.username} align='end'>
                <NavDropdown.Item>Notifications <Badge bg='secondary'>0</Badge></NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`/profile/${props.username}`}>Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={props.onLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}