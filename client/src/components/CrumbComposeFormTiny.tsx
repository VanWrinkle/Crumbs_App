import {Button, Col, Form, Row} from "react-bootstrap";
import React, {SyntheticEvent} from "react";
import {Send} from "@mui/icons-material";

export function CrumbComposeFormTiny(props: {
    userInput: string,
    username: string | undefined,
    setUserInput: (text: string) => void,
    onSubmit: (e: SyntheticEvent) => void,
    disabledButton: boolean
}) {

    return (
        <Form>
            <Row className="align-items-center">
                <Col>
                    <Form.Control
                        as="textarea"
                        rows={1}
                        value={props.userInput}
                        placeholder={props.username
                            ? "Write your reply as " + props.username + "..."
                            : "Log in to write a reply..."}
                        className="mt-2 mb-2 textarea"
                        disabled= { !props.username || props.disabledButton }
                        onChange={(e) => props.setUserInput(e.target.value)}>
                    </Form.Control>
                </Col>
                <Col className={"col-auto"}>
                    <Button
                        onClick={props.onSubmit}
                        disabled={props.disabledButton || props.userInput.length === 0}
                    ><Send></Send></Button>
                </Col>
            </Row>
        </Form>
    );
}