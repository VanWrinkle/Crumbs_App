import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap"
import { Outlet } from "react-router-dom";
import UserLogin from "./UserLogin";

export function CrumbNavbar() {
    return(
        <>
            <Navbar expand={"lg"} className={"navbar sticky-top"}>
                <Container className={"main-content"}>
                    <Navbar.Brand href={"/"}>Crumbs</Navbar.Brand>
                    <Navbar.Toggle aria-controls={"basic-navbar-nav"}/>
                    <Navbar.Collapse role={""} id={"basic-navbar-nav"}>
                        <Nav>
                            <NavDropdown title={"Log in"}>
                                <UserLogin/>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
}