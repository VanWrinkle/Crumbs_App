import {Crumb, CrumbV1} from "../Crumb";
import {SocialMediaTopPanel} from "../Components/CrumbTopPanel";
import {SocialMediaPostsDisplayAllBrief} from "../Components/CrumbFeed";
import React, {SyntheticEvent, useState} from "react";
import {Button, Container, Row} from "react-bootstrap";
import {useAuth} from "../AuthProvider";
import axios from "axios";

export function PersonalFeed() {

    let staticPost = new CrumbV1("Guest", "Hey there! This is a social media post!");
    const [crumbs, setCrumbs] = useState<Crumb[]>([staticPost])

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