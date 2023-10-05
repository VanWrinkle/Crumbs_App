import '../App.css';
import '../Crumb';
import {Crumb} from "../Crumb";
import React from "react";
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

    const content = crumb.contents.reduce((acc: string, item: any) => {
        return acc + " " + item.value
    }, "")

    return (
        <Card className="mb-2">
            <Row>
                <Col xs={3}>
                    <Card.Img src="./logo192.png" />
                </Col>
                <Col>
                    <Card.Body className="mt-2 mb-2">
                        <Card.Title>{crumb.author}:</Card.Title>
                        <Card.Text>{content}</Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}