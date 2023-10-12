import {Badge, Image, NavDropdown} from "react-bootstrap";
import React, {SyntheticEvent} from "react";

export function TopNavbarUserDropdownItems(props: {username: String, onLogout: (e: SyntheticEvent) => void}) {

    return (
        <>
            <Image src='/profile.png' roundedCircle width='30' height='30'
                   className="d-inline-block align-self-center"/>
            <NavDropdown title={props.username} align={{lg: 'end'}}>
                <NavDropdown.Item>Notifications <Badge bg='secondary'>0</Badge></NavDropdown.Item>
                <NavDropdown.Item href={`/profile/${props.username}`}>Profile</NavDropdown.Item>
                <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={props.onLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}