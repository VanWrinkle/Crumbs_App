import {Button, Form} from "react-bootstrap";
import React, {SyntheticEvent} from "react";

export function CrumbComposeForm(props: {
    userInput: string,
    username: string | undefined,
    setUserInput: (text: string) => void,
    onSubmit: (e: SyntheticEvent) => void,
    disabledButton: boolean
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
                disabled= { !props.username || props.disabledButton }
                onChange={(e) => props.setUserInput(e.target.value)}>
            </Form.Control>
            <div className="d-grid">
                <Button
                    onClick={props.onSubmit}
                    disabled={props.disabledButton || props.userInput.length === 0}
                >Post Crumb</Button>
            </div>
        </Form>
    );
}