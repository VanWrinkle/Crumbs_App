import React, {SyntheticEvent, useEffect, useState} from "react";
import {Crumb} from "../Crumb";
import {Api} from "../Api";
import {Container, Row} from "react-bootstrap";
import {SocialMediaTopPanel} from "./CrumbTopPanel";
import {SocialMediaPostsDisplayAllBrief} from "./CrumbFeed";

export function CrumbsFeed(prop: {
    canCompose: boolean,
    feed: () => Promise<Crumb[] | undefined>
}) {
    const [crumbs, setCrumbs] = useState<Crumb[]>([])

    async function updatePosts() {
        prop.feed()
            .then((response) => {
                if (response) {
                    // TODO appende response istedenfor?
                    setCrumbs(response)
                }
                console.log("test")
            })
            .catch(error => {
                // TODO error handling
            })
    }

    async function onLike(e: SyntheticEvent, crumb: Crumb) {
        new Api().toggleLike(crumb)
            .then(() => {
                crumb.likes += crumb.liked ? -1 : 1
                crumb.liked = !crumb.liked
                setCrumbs(crumbs.map(it => {
                    return crumb.post_id == it.post_id ? crumb : it
                }))
            })
            .catch(error => {
                // TODO error handling
            })
    }

    useEffect(() => {
        // TODO: Denne fetcher twice, for en eller annen grunn.. Yikes!
        updatePosts()
    }, []);

    return (
        <Container className="main-content">
            {prop.canCompose ? (
                <Row>
                    <SocialMediaTopPanel crumbs={crumbs} setCrumbs={setCrumbs}/>
                </Row>
                ) : (
                <></>
                )
            }
            <Row>
                <SocialMediaPostsDisplayAllBrief crumbs={crumbs} onLike={onLike}/>
            </Row>
        </Container>
    );
}