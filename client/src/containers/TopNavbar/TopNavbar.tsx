import {useAuth} from "../../context/AuthProvider";
import {TopNavbarContent} from "../../components/TopNavbar/TopNavbarContent";
import {TopNavbarAlertArea} from "./TopNavbarAlertArea";

export function TopNavbar() {
    return(
        <>
            <TopNavbarContent loggedIn={useAuth() != null} />


        </>
    );
}