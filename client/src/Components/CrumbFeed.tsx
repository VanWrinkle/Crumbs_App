import '../App.css';
import '../Crumb';
import {Crumb} from "../Crumb";
import React, {SyntheticEvent} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Col, Row, Button, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ThumbUp} from "@mui/icons-material";

/**
 * panel that iterates over crumbs array and includes component for each
 * @param crumb - array of crumbs
 */
export function SocialMediaPostsDisplayAllBrief(props: {crumbs: Crumb[], onLike: (e: SyntheticEvent, crumb: Crumb)=>{}}) {
    const results = props.crumbs.map((crumb) =>
        <SocialMediaPostDisplaySingleBrief crumb={crumb} onLike={props.onLike} />
    );
    return (
        <div>{results}</div>
    );
}

/**
 * component for a single crumb
 * @param crumb - single crumb
 */
function SocialMediaPostDisplaySingleBrief(props: {crumb: Crumb, onLike: (e: SyntheticEvent, crumb: Crumb)=>{}}) {
    const content = props.crumb.contents.map(content => {
        switch (content.type) {
            case "hashtag":
                return(<Link to={""}>{content.value}</Link>)
            case "mention":
                return(<Link to={""}>{content.value}</Link>)
            default:
                return (<>{content.value}</>)
        }
    })

    return (
        <Card className="mb-2">
            <Row>
                <Col xs={3}>
                    <Card.Img src="./logo192.png" />
                </Col>
                <Col>
                    <Card.Body className="mt-2 mb-2">
                        <Card.Title>@
                            <a href={`/profile/${props.crumb.author}`}
                               style={{color: 'black'}}>
                                <em>{props.crumb.author}</em>
                            </a>
                        </Card.Title>
                        <Card.Text>{content}</Card.Text>
                        <Stack direction="horizontal">
                            <div className="ms-auto">
                                <Button
                                    size="sm"
                                    className="ms-auto"
                                    variant={props.crumb.liked ? "info" : "outline-info"}
                                    onClick={e => props.onLike(e, props.crumb)}>
                                    <span className="pe-1">
                                        <ThumbUp fontSize="inherit" />
                                    </span>
                                    {props.crumb.likes}
                                </Button>
                            </div>
                        </Stack>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}