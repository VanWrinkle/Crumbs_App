import React, {SyntheticEvent, useState} from "react";
import {LoadingButton} from "../../components/LoadingButton";
import {Button, Form, Modal} from "react-bootstrap";

export function SettingsDeleteUser(props: { deleteSpinning: boolean, onDelete: (e: SyntheticEvent, password: string) => {} }) {
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