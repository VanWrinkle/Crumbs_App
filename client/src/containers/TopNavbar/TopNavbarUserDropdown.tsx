import 'bootstrap/dist/css/bootstrap.min.css';
import React, {SyntheticEvent} from "react";
import {useAuth, useAuthUpdate} from "../../context/AuthProvider";
import {Api} from "../../services/Api";
import {TopNavbarUserDropdownItems} from "../../components/TopNavbar/TopNavbarUserDropdownItems";
import {useAddNotification} from "../../context/AlertProvider";
import {toast} from "react-toastify";

export function TopNavbarUserDropdown() {
    const userData = useAuth()
    const updateUserData = useAuthUpdate()
    const addAlert = useAddNotification()


    function onLogout(e: SyntheticEvent) {
        e.preventDefault();

        const api = new Api().userLogout()
            toast.promise(
                api, {
                    pending: "Logging you out",
                    success: "You are now logged out",
                    error: "Something went wrong. We could not log off your session"
                }
            )
            .then(() => {
                    updateUserData(undefined)
            })
    }

    return (
        <TopNavbarUserDropdownItems username={userData?.username ?? ""} onLogout={onLogout} />
    )
}