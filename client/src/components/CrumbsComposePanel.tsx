import {Col, Image, Row} from "react-bootstrap";
import React from "react";
import {CrumbCompose} from "../containers/CrumbCompose";

export function SocialMediaTopPanel(props: {
    parentId: string | null
}) {
    return (
        <Row>
            <Col xs={3}>
                <Image src="/logo.png" fluid/>
            </Col>
            <Col>
                <CrumbCompose parentId={props.parentId}/>
            </Col>
        </Row>
    );
}