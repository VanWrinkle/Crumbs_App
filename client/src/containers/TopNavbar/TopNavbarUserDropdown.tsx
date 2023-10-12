import 'bootstrap/dist/css/bootstrap.min.css';
import React, {SyntheticEvent} from "react";
import {useAuth, useAuthUpdate} from "../../context/AuthProvider";
import {Api} from "../../services/Api";
import {TopNavbarUserDropdownItems} from "../../components/TopNavbar/TopNavbarUserDropdownItems";

export function TopNavbarUserDropdown() {
    const userData = useAuth()
    const updateUserData = useAuthUpdate()


    function onLogout(e: SyntheticEvent) {
        e.preventDefault();
        new Api().userLogout()
            .then(() => {
                updateUserData(undefined)
            })
            .catch(function (error: Promise<void>) {
                console.log(error);
            });

    }

    return (
        <TopNavbarUserDropdownItems username={userData?.username ?? ""} onLogout={onLogout} />
    )
}