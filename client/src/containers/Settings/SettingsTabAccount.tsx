import {Alert, Card} from "react-bootstrap";
import {SettingsDeleteUser} from "./SettingsDeleteUser";
import React, {SyntheticEvent, useState} from "react";
import {Api} from "../../services/Api";
import {useAuth, useAuthUpdate} from "../../context/AuthProvider";

export function SettingsTabAccount() {
    const auth = useAuth()
    const setAuth = useAuthUpdate()
    const [deleteSpinning, setDeleteSpinning] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [showAlert, setShowAlert] = useState(false)


    async function onDeleteAccount(_: SyntheticEvent, password: string) {
        setDeleteSpinning(true)
        await new Api().userDeletion(auth!.username, password)
            .then(_ => {
                setAuth(undefined)
            })
            .catch(error => {
                if (error instanceof Error) {
                    setShowAlert(true)
                    setAlertMessage(error.message)
                }
            })
            .finally(() => {
                setDeleteSpinning(false)
            })
    }



    return(
        <Card style={{borderTop: "0", borderTopLeftRadius: "0", borderTopRightRadius: "0"}}>
            {showAlert && (
                <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                    {alertMessage}
                </Alert>)}
            <Card.Body>
                <SettingsDeleteUser deleteSpinning={deleteSpinning} onDelete={onDeleteAccount}/>
            </Card.Body>
        </Card>
    )
}