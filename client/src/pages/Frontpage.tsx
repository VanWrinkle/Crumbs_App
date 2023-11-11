import React from "react";
import {Container} from "react-bootstrap";
import {Api} from "../services/Api";
import {Feed} from "../containers/Feed";

/**
 * Frontpage is a React page that displays the main feed, typically the home page of the application.
 * @param feedBulkSize - The number of posts to load at once in the main feed.
 * @returns A React element representing the main feed and its content.
 */
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