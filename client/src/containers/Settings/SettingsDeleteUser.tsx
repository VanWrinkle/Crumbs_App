import React, {SyntheticEvent, useState} from "react";
import {LoadingButton} from "../../components/LoadingButton";
import {Button, Form, Modal} from "react-bootstrap";

/**
 * SettingsDeleteUser is a React component responsible for handling user account deletion in settings.
 * It displays a confirmation dialog for account deletion and handles the deletion process.
 * @param deleteSpinning - A boolean indicating if the delete action is in progress.
 * @param onDelete - A callback function to initiate the account deletion.
 * @param onCancelDeletion - A callback function to cancel the account deletion.
 * @returns A React element for handling account deletion in settings.
 */
export function SettingsDeleteUser(props: {
    deleteSpinning: boolean,
    onDelete: (e: SyntheticEvent, password: string) => {},
    onCancelDeletion: (e: SyntheticEvent) => void}
) {
    // State variables to manage the visibility of the deletion confirmation dialog and the entered password
    const [showDialogue, setShowDialogue] = useState(false);
    const [password, setPassword] = useState("")

    // Function to close the deletion confirmation dialog
    const handleClose = () => setShowDialogue(false);

    // Function to show the deletion confirmation dialog
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
                    <Button variant="secondary" onClick={e => {
                        handleClose()
                        props.onCancelDeletion(e)
                    }}>
                        Close
                    </Button>
                    <Button
                        variant="danger"
                        onClick={e => {
                            handleClose()
                            props.onDelete(e, password)
                        }}
                        disabled={password.length === 0}>
                        Delete my account
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}