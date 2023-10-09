import {useParams} from "react-router-dom";
import React from "react";
import {Container} from "react-bootstrap";
import {CrumbsFeed} from "../Components/CrumbsFeed";
import {Api} from "../Api";

export function Profile() {
    const {userid} = useParams()

    return (
        <Container className="main-content" style={{marginTop: 50}}>
            <h5>@{userid!}</h5>
            <CrumbsFeed canCompose={false} feed={(continueFrom: string) => new Api().getUserFeed(userid!, 100, continueFrom)} />
        </Container>
    )
}