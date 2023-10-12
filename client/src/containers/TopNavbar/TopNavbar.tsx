import {useAuth} from "../../context/AuthProvider";
import {TopNavbarContent} from "../../components/TopNavbar/TopNavbarContent";

export function TopNavbar() {
    return(
        <TopNavbarContent loggedIn={useAuth() != null} />
    );
}