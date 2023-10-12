import {Alert, Form} from "react-bootstrap";
import {LoadingButton} from "./LoadingButton";
import React, {SyntheticEvent} from "react";

export function CrumbComposeForm(props: {
    userInput: string,
    username: string | undefined,
    spinner: boolean,
    setUserInput: (text: string) => void,
    onSubmit: (e: SyntheticEvent) => void,
    setAlert: (alertText: string) => void,
    alert: string
}) {

    return (
        <Form className="mb-3">
            <Form.Control
                as="textarea"
                rows={3}
                value={props.userInput}
                placeholder={props.username
                    ? "Write your crumb as " + props.username + "..."
                    : "Log in to write crumbs..."}
                className="mt-2 mb-2 textarea"
                disabled= { !props.username || props.spinner }
                onChange={(e) => props.setUserInput(e.target.value)}>
            </Form.Control>
            <div className="d-grid">
                <Alert variant="warning" onClose={() => props.setAlert("")} hidden={props.alert === ""}>
                    {props.alert}
                </Alert>
                <LoadingButton
                    isLoading={props.spinner}
                    onClick={props.onSubmit}
                    buttonText={'Post Crumb'}
                    disabled={props.userInput.length === 0}
                    variant={'primary'}
                />
            </div>
        </Form>
    );
}