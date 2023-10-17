import {Col, Image} from "react-bootstrap";
import React from "react";
import {CrumbCompose} from "../containers/CrumbCompose";

export function SocialMediaTopPanel() {
    return (
        <>
            <Col xs={3}>
                <Image src="/logo.png" fluid/>
            </Col>
            <Col>
                <CrumbCompose/>
            </Col>
        </>
    );
}