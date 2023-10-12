import {Container, Nav, Navbar} from "react-bootstrap";
import {TopNavbarUserDropdown} from "../../containers/TopNavbar/TopNavbarUserDropdown";
import UserLogin from "../../containers/UserLogin";
import {Outlet} from "react-router-dom";

export function TopNavbarContent({loggedIn}: {loggedIn: Boolean}) {
    return (
        <>
            <Navbar className={"navbar sticky-top"} bg="white">
                <Container className={"main-content"}>
                    <Navbar.Brand href={"/"}>Crumbs</Navbar.Brand>
                    <Navbar.Toggle aria-controls={"basic-navbar-nav"}/>
                    <Navbar.Collapse role={""} id={"basic-navbar-nav"}>
                        <Nav className='ms-auto'>
                            {loggedIn ? ( <TopNavbarUserDropdown /> ) : ( <UserLogin /> )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}