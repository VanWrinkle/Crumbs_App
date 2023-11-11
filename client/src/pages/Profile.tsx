import {useParams} from "react-router-dom";
import React from "react";
import {Container} from "react-bootstrap";
import {Feed} from "../containers/Feed";
import {Api} from "../services/Api";
import {FollowUser} from "../containers/FollowUser";

/**
 * Profile is a React page that displays a user's profile information and feed.
 * @param feedBulkSize - The number of posts to load at once in the user's feed.
 * @returns A React element representing the user's profile and feed.
 */
export function Profile({feedBulkSize}: {feedBulkSize: number}) {
    const {userid} = useParams()

    return (
        <Container className="main-content" style={{marginTop: 50}}>
            {userid &&
                <>
                    <h5>@{userid}</h5>
                    <FollowUser userId={userid} />
                </>
            }
            <Feed
                canCompose={false}
                feed={(continueFrom: string) => new Api().getUserFeed(userid!, feedBulkSize, continueFrom)}
                feedBulkSize={feedBulkSize}
                parentId={null}
            />

        </Container>
    )
}