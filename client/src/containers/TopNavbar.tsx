import {useAuth} from "../context/AuthProvider";
import {TopNavBarContent} from "../components/TopNavBarContent";

export function TopNavbar() {
    return(
        <TopNavBarContent loggedIn={useAuth() != null} />
    );
}