import {Container, Nav, Navbar} from "react-bootstrap";
import {TopNavbarUserDropdown} from "../../containers/TopNavbar/TopNavbarUserDropdown";
import UserLogin from "../../containers/UserLogin";
import {Link, Outlet} from "react-router-dom";
import {TopNavbarAlertArea} from "../../containers/TopNavbar/TopNavbarAlertArea";

export function TopNavbarContent({loggedIn}: {loggedIn: Boolean}) {
    return (
        <>
            <div className="sticky-top">
                <Navbar className="navbar" >
                    <Container className="main-content">
                        <Navbar.Brand as={Link} to={"/"}>Crumbs</Navbar.Brand>
                        <Navbar.Toggle aria-controls={"basic-navbar-nav"}/>
                        <Navbar.Collapse role={""} id={"basic-navbar-nav"}>
                            <Nav className='ms-auto'>
                                {loggedIn ? ( <TopNavbarUserDropdown /> ) : ( <UserLogin /> )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container className="main-content">
                    <TopNavbarAlertArea />
                </Container>
            </div>
            <Outlet />
        </>
    )
}