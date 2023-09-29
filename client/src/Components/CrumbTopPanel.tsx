import {Crumb, CrumbV1, SocialMediaPostDispatch} from "../Crumb";
import {Button, Col, Form, Image} from "react-bootstrap";
import React, {SyntheticEvent, useState} from "react";
import {useAuth} from "../AuthProvider";

export function SocialMediaTopPanel(props: {crumbs: Crumb[], setCrumbs: SocialMediaPostDispatch}) {
    return (
        <>
            <Col xs={3}>
                <Image src="./logo.png" fluid />
            </Col>
            <Col>
                <SocialMediaPostNew crumbs={props.crumbs} setCrumbs={props.setCrumbs} />
            </Col>
        </>
    );
}

/**
 * panel for composing new crumbs
 * @param props - array of crumbs and setter
 */
function SocialMediaPostNew(props: {crumbs: Crumb[], setCrumbs: SocialMediaPostDispatch}) {
    const [userInput, setUserInput] = useState("");
    const userData = useAuth()
    function onClick(e: SyntheticEvent) {
        e.preventDefault();
        let post = new CrumbV1("Guest", userInput);
        setUserInput("");
        props.setCrumbs([post, ...props.crumbs]);
    }


    return (
        <Form onSubmit={onClick} className="mb-3">
            <Form.Control
                as="textarea"
                rows={3}
                value={userInput}
                placeholder={userData
                    ? "Write your crumb as " + userData.username + "..."
                    : "Log in to write crumbs..."}
                className="mt-2 mb-2 textarea"
                disabled= { !userData }
                onChange={(e) => setUserInput(e.target.value)}>
            </Form.Control>
            <div className="d-grid">
                <Button
                    type="submit"
                    variant="primary"
                    disabled={userInput.length === 0}>Post Crumb</Button>
            </div>
        </Form>
    );
}