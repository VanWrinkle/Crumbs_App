import {Container, Navbar, Nav} from "react-bootstrap"
import { Outlet } from "react-router-dom";
import UserLogin from "./UserLogin";
import {useAuth} from "../AuthProvider";
import {ProfileDropdown} from "./ProfileDropdown";

export function CrumbNavbar() {
    const authData = useAuth()


    return(
        <>
            <Navbar expand={"lg"} className={"navbar sticky-top"} bg="white">
                <Container className={"main-content"}>
                    <Navbar.Brand href={"/"}>Crumbs</Navbar.Brand>
                    <Navbar.Toggle aria-controls={"basic-navbar-nav"}/>
                    <Navbar.Collapse role={""} id={"basic-navbar-nav"}>
                        <Nav className='ms-auto'>
                            {authData ? ( <ProfileDropdown /> ) : ( <UserLogin /> )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
}