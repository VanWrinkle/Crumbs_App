import 'bootstrap/dist/css/bootstrap.min.css';
import React, {SyntheticEvent} from "react";
import {useAuth, useAuthUpdate} from "../../context/AuthProvider";
import {Api} from "../../services/Api";
import {TopNavbarUserDropdownItems} from "../../components/TopNavbar/TopNavbarUserDropdownItems";
import {toast} from "react-toastify";

/**
 * TopNavbarUserDropdown is a React component responsible for displaying the user dropdown menu in the top navbar.
 * It provides options for the user to interact with their account, such as logging out.
 * @returns A React element representing the user dropdown menu.
 */
export function TopNavbarUserDropdown() {
    // Retrieve user authentication data and a function to update user data
    const userData = useAuth()
    const updateUserData = useAuthUpdate()

    // Function to handle user logout
    function onLogout(e: SyntheticEvent) {
        e.preventDefault();

        // Make a request to log the user out
        const api = new Api().userLogout()

            // Handle the logout process with toast notifications
            toast.promise(
                api, {
                    pending: "Signing out",
                    success: "You are now signed out",
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