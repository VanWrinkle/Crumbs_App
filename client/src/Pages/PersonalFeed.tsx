import {Crumb} from "../Crumb";
import {SocialMediaTopPanel} from "../Components/CrumbTopPanel";
import {SocialMediaPostsDisplayAllBrief} from "../Components/CrumbFeed";
import React, {useEffect, useState} from "react";
import {Container, Row} from "react-bootstrap";
import {Api} from "../Api";

export function PersonalFeed() {
    // let staticPost = new CrumbV1("Guest", "Hey there! This is a social media post!");
    const [crumbs, setCrumbs] = useState<Crumb[]>([])

    async function updatePosts() {
        const api = new Api()
        api.getMainFeed(10)
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
                <SocialMediaPostsDisplayAllBrief crumbs={crumbs}/>
            </Row>
        </Container>
    );
}