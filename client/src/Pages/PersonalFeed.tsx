import React from "react";
import {Container} from "react-bootstrap";
import {Api} from "../services/Api";
import {CrumbsFeed} from "../Components_old/CrumbsFeed";

export function PersonalFeed() {
    return (
        <Container>
            <CrumbsFeed canCompose={true} feed={(continueFrom: string) => new Api().getMainFeed(10, continueFrom)} />
        </Container>
    )
}