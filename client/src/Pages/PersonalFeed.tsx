import React from "react";
import {Container} from "react-bootstrap";
import {Api} from "../Api";
import {CrumbsFeed} from "../Components/CrumbsFeed";

export function PersonalFeed() {
    return (
        <Container className="main-content">
            <CrumbsFeed canCompose={true} feed={() => new Api().getMainFeed(100)} />
        </Container>
    )
}