import {useParams} from "react-router-dom";
import React from "react";
import {Container} from "react-bootstrap";
import {CrumbsFeed} from "../Components/CrumbsFeed";
import {Api} from "../Api";

export function Profile() {
    const {userid} = useParams()

    return (
        <Container className="main-content">
            Personlig feed til {userid}. Almost. Hovedfeed as of now men vil bli endret

            <CrumbsFeed canCompose={false} feed={() => new Api().getUserFeed(userid!, 100)} />
        </Container>
    )
}