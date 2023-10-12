import {Alert, Button, Card, Container, Form, Modal, Tab, Tabs} from "react-bootstrap";
import React, {SyntheticEvent, useEffect, useState} from "react";
import {useAuth, useAuthUpdate} from "../context/AuthProvider";
import {useNavigate} from "react-router-dom";
import {Api} from "../services/Api";
import {LoadingButton} from "../components/LoadingButton";

export function Settings() {
    const auth = useAuth()
    const setAuth = useAuthUpdate()
    const navigate = useNavigate()
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

    useEffect(() => {
        // redirects user to homepage if logged out
        if (!auth?.username) {
            navigate("/")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);


    return (
        <Container className="main-content" style={{marginTop: 50}}>
            {showAlert && (
                <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                    {alertMessage}
                </Alert>)}
            <h5>Settings</h5>
            <Tabs defaultActiveKey="account" fill>
                <Tab eventKey="account" title="Account">
                    <Card style={{borderTop: "0", borderTopLeftRadius: "0", borderTopRightRadius: "0"}}>
                        <Card.Body>
                            <DeleteAccount deleteSpinning={deleteSpinning} onDelete={onDeleteAccount}/>
                        </Card.Body>
                    </Card>
                    <Container style={{backgroundColor: "white"}}>
                    </Container>
                </Tab>
                <Tab eventKey="notifications" title="Notifications" style={{color: "black"}}>

                </Tab>
                <Tab eventKey="security" title="Security & Privacy">

                </Tab>
                <Tab eventKey="personalization" title="Personalization">

                </Tab>
            </Tabs>
        </Container>
    )

}

function DeleteAccount(props: {deleteSpinning: boolean, onDelete: (e: SyntheticEvent, password: string) => {}}) {
    const [showDialogue, setShowDialogue] = useState(false);
    const [password, setPassword] = useState("")
    const handleClose = () => setShowDialogue(false);
    const handleShow = () => setShowDialogue(true);

    return (
        <>
            <LoadingButton
                isLoading={props.deleteSpinning}
                onClick={handleShow}
                buttonText={"Delete my account"}
                disabled={false}
                variant={'danger'}
            />

            <Modal show={showDialogue} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Deleting your account is a permanent action that cannot be undone. This will result in the
                        removal of all your data from our servers. To proceed with account deletion, please confirm
                        by entering your password.
                    </p>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="danger"
                        onClick={e => {
                            handleClose();
                            props.onDelete(e, password);
                        }}
                        disabled={password.length === 0}>
                        Delete my account
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}