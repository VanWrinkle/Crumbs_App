import React, {SyntheticEvent, useEffect, useState} from "react";
import {Crumb} from "../Crumb";
import {Api} from "../Api";
import {Button, Card, Col, Container, Row, Stack} from "react-bootstrap";
import {SocialMediaTopPanel} from "./CrumbTopPanel";
import {Link} from "react-router-dom";
import {ThumbUp} from "@mui/icons-material";
import {useAuth} from "../AuthProvider";

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
    const auth = useAuth()
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
                    <Card.Img src="/logo192.png" />
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
                                    disabled={props.crumb.author == auth?.username}
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
