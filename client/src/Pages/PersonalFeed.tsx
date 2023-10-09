import React from "react";
import {Container} from "react-bootstrap";
import {Api} from "../Api";
import {CrumbsFeed} from "../Components/CrumbsFeed";

export function PersonalFeed() {
    return (
        <Container>
            <CrumbsFeed canCompose={true} feed={(continueFrom: string) => new Api().getMainFeed(10, continueFrom)} />
        </Container>
    )
}