import {Card} from "react-bootstrap";
import {SettingsDeleteUser} from "./SettingsDeleteUser";
import React, {SyntheticEvent, useState} from "react";
import {Api} from "../../services/Api";
import {useAuth, useAuthUpdate} from "../../context/AuthProvider";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export function SettingsTabAccount() {
    const auth = useAuth()
    const setAuth = useAuthUpdate()
    const navigate = useNavigate()
    const [deleteSpinning, setDeleteSpinning] = useState(false)


    async function onDeleteAccount(_: SyntheticEvent, password: string) {
        setDeleteSpinning(true)
        const api = new Api().userDeletion(auth!.username, password)
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