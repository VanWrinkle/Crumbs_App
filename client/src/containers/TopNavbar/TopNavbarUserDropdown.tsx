import 'bootstrap/dist/css/bootstrap.min.css';
import React, {SyntheticEvent} from "react";
import {useAuth, useAuthUpdate} from "../../context/AuthProvider";
import {Api} from "../../services/Api";
import {TopNavbarUserDropdownItems} from "../../components/TopNavbar/TopNavbarUserDropdownItems";
import {useAddNotification} from "../../context/AlertProvider";

export function TopNavbarUserDropdown() {
    const userData = useAuth()
    const updateUserData = useAuthUpdate()
    const addAlert = useAddNotification()


    function onLogout(e: SyntheticEvent) {
        e.preventDefault();
        new Api().userLogout()
            .then(() => {
                updateUserData(undefined)
                addAlert({message: "You have been successfully logged out", link: ""})
            })
            .catch(function (error: Promise<void>) {
                addAlert({message: "Something went wrong: You may not have been completely logged out", link: ""})
            });

    }

    return (
        <TopNavbarUserDropdownItems username={userData?.username ?? ""} onLogout={onLogout} />
    )
}