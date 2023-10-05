import {Crumb} from "../Crumb";
import {SocialMediaTopPanel} from "../Components/CrumbTopPanel";
import {SocialMediaPostsDisplayAllBrief} from "../Components/CrumbFeed";
import React, {SyntheticEvent, useEffect, useState} from "react";
import {Container, Row} from "react-bootstrap";
import {Api} from "../Api";

export function PersonalFeed() {
    // let staticPost = new CrumbV1("Guest", "Hey there! This is a social media post!");
    const [crumbs, setCrumbs] = useState<Crumb[]>([])

    async function updatePosts() {
        const api = new Api()
        api.getMainFeed(100)
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
            <Row>
                <SocialMediaTopPanel crumbs={crumbs} setCrumbs={setCrumbs}/>
            </Row>
            <Row>
                <SocialMediaPostsDisplayAllBrief crumbs={crumbs} onLike={onLike}/>
            </Row>
        </Container>
    );
}