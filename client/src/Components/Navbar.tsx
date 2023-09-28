import {Container, Navbar} from "react-bootstrap"
import { Outlet } from "react-router-dom";

export function CrumbNavbar() {
    return(
        <>
            <Navbar className={"navbar sticky-top"}>
                <Container className={"bg-body-secondary border-1 main-content"}>
                    <Navbar.Brand href={"/"}>Personal feed</Navbar.Brand>
                    <Navbar.Brand href={"signup"}>Signup</Navbar.Brand>
                    <Navbar.Brand href={"login"}>Log in</Navbar.Brand>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
}