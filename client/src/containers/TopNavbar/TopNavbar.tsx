import {useAuth} from "../../context/AuthProvider";
import {TopNavbarContent} from "../../components/TopNavbar/TopNavbarContent";

/**
 * TopNavbar is a React component responsible for rendering the top navigation bar.
 * It controls the rendering of the top navigation bar content based on the user's authentication status.
 * @returns A React element representing the top navigation bar.
 */
export function TopNavbar() {
    return(
        <>
            <TopNavbarContent loggedIn={useAuth() != null} />
        </>
    );
}