import {Container, Nav, Navbar} from "react-bootstrap";
import {ProfileDropdown} from "../Components_old/ProfileDropdown";
import UserLogin from "../Components_old/UserLogin";
import {Outlet} from "react-router-dom";

export function TopNavBarContent({loggedIn}: {loggedIn: Boolean}) {
    return (
        <>
            <Navbar className={"navbar sticky-top"} bg="white">
                <Container className={"main-content"}>
                    <Navbar.Brand href={"/"}>Crumbs</Navbar.Brand>
                    <Navbar.Toggle aria-controls={"basic-navbar-nav"}/>
                    <Navbar.Collapse role={""} id={"basic-navbar-nav"}>
                        <Nav className='ms-auto'>
                            {loggedIn ? ( <ProfileDropdown /> ) : ( <UserLogin /> )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}