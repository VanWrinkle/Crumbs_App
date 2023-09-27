import '../App.css';
import '../Crumb';
import { Crumb, CrumbV1, SocialMediaPostDispatch } from "../Crumb";
import React, {SyntheticEvent, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Col, Container, Form, Image, Row, Button} from "react-bootstrap";

/**
 * panel that iterates over crumbs array and includes component for each
 * @param crumb - array of crumbs
 */
export function SocialMediaPostsDisplayAllBrief({crumbs}: {crumbs: Crumb[]}) {
    const results = crumbs.map((crumb) =>
        <SocialMediaPostDisplaySingleBrief crumb={crumb} />
    );
    return (
        <div>{results}</div>
    );
}

/**
 * component for a single crumb
 * @param crumb - single crumb
 */
function SocialMediaPostDisplaySingleBrief({crumb}: {crumb: Crumb}) {
    return (
        <Card className="mb-2">
            <Row>
                <Col xs={3}>
                    <Card.Img src="./logo192.png" />
                </Col>
                <Col>
                    <Card.Body className="mt-2 mb-2">
                        <Card.Title>{crumb.userId}:</Card.Title>
                        <Card.Text>{crumb.content}</Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}