import React from "react";
import {Container} from "react-bootstrap";
import {Api} from "../services/Api";
import {Feed} from "../containers/Feed";

export function Frontpage({feedBulkSize}: {feedBulkSize: number}) {
    return (
        <Container fluid>
            <Feed
                canCompose={true}
                feed={(continueFrom: string) => new Api().getMainFeed(feedBulkSize, continueFrom)}
                feedBulkSize={feedBulkSize}
                parentId={null}
            />
        </Container>
    )
}