import {Card} from "react-bootstrap";
import {SettingsDeleteUser} from "./SettingsDeleteUser";
import React, {SyntheticEvent, useState} from "react";
import {Api} from "../../services/Api";
import {useAuth, useAuthUpdate} from "../../context/AuthProvider";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

/**
 * SettingsTabAccount is a React container responsible for managing the "Account" tab in user settings.
 * It allows users to perform actions related to their account, such as account deletion.
 * @returns A React element for the "Account" tab in settings.
 */
export function SettingsTabAccount() {
    // Retrieve user data, an update function for user data, and a navigation function
    const auth = useAuth()
    const setAuth = useAuthUpdate()
    const navigate = useNavigate()

    // State variable to manage the loading state of account deletion
    const [deleteSpinning, setDeleteSpinning] = useState(false)

    // Function to handle account deletion
    async function onDeleteAccount(_: SyntheticEvent, password: string) {
        setDeleteSpinning(true)

        // Make a request to delete the user's account
        const api = new Api().userDeletion(auth!.username, password)
        // Handle the account deletion process with toast notifications
        await toast.promise(api, {
            pending: "Deleting your account",
            success: "Your account has been deleted, and you have been logged out",
            error: {
                render: ({data}) => {
                    return (data instanceof Error) ? data.message : ""
                }
            }
        }).then(() => {
            setAuth(undefined)
            navigate("/")
        })
    }

    // Function to handle cancellation of account deletion
    function onCancelDeletion(_: SyntheticEvent) {
        toast.info("You decided to cancel the account deletion process. No action has been taken")

    }



    return(
        <Card style={{borderTop: "0", borderTopLeftRadius: "0", borderTopRightRadius: "0"}}>
            <Card.Body>
                <SettingsDeleteUser
                    deleteSpinning={deleteSpinning}
                    onDelete={onDeleteAccount}
                    onCancelDeletion={onCancelDeletion}
                />
            </Card.Body>
        </Card>
    )
}