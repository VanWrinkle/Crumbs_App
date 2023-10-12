import {Crumb, CrumbV1, SocialMediaPostDispatch} from "../types/Crumb";
import {Alert, Col, Form, Image} from "react-bootstrap";
import React, {SyntheticEvent, useState} from "react";
import {useAuth} from "../context/AuthProvider";
import {Api} from "../services/Api";
import {LoadingButton} from "../components/LoadingButton";

export function SocialMediaTopPanel(props: {crumbs: Crumb[], setCrumbs: SocialMediaPostDispatch}) {
    return (
        <>
            <Col xs={3}>
                <Image src="/logo.png" fluid />
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
    const [spinner, setSpinner] = useState(false)
    const [alert, setAlert] = useState("")
    const userData = useAuth()
    async function onClick(e: SyntheticEvent) {
        e.preventDefault();
        const timer = setTimeout(() => {
            setSpinner(true)
        }, 300)
        try {
            const api = new Api()
            const crumb = new CrumbV1(userData!.username.toString(), userInput)
            await api.postNewCrumb(crumb);
            setUserInput("");
            props.setCrumbs([crumb, ...props.crumbs]);
        } catch (error) {
            if (error instanceof Error) {
                setAlert(error.message)
            }
        } finally {
            clearTimeout(timer)
            setSpinner(false)

        }

    }


    return (
        <Form className="mb-3">
            <Form.Control
                as="textarea"
                rows={3}
                value={userInput}
                placeholder={userData
                    ? "Write your crumb as " + userData.username + "..."
                    : "Log in to write crumbs..."}
                className="mt-2 mb-2 textarea"
                disabled= { !userData || spinner }
                onChange={(e) => setUserInput(e.target.value)}>
            </Form.Control>
            <div className="d-grid">
                <Alert variant="warning" onClose={() => setAlert("")} hidden={alert === ""}>
                    {alert}
                </Alert>
                <LoadingButton
                    isLoading={spinner}
                    onClick={onClick}
                    buttonText={'Post Crumb'}
                    disabled={userInput.length === 0}
                    variant={'primary'}
                />
            </div>
        </Form>
    );
}