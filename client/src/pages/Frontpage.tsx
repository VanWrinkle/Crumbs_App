import React from "react";
import {Container} from "react-bootstrap";
import {Api} from "../services/Api";
import {Feed} from "../containers/Feed";

export function Frontpage() {
    return (
        <Container>
            <Feed canCompose={true} feed={(continueFrom: string) => new Api().getMainFeed(10, continueFrom)} />
        </Container>
    )
}