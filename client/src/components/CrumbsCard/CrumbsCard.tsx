import {Crumb} from "../../types/Crumb";
import React, {SyntheticEvent, useState} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import {CrumbsCardBottomRow} from "./CrumbsCardBottomRow";
import {CrumbsCardContentDecoder} from "./CrumbsCardContentDecoder";
import {CrumbsCardTopRow} from "./CrumbsCardTopRow";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Feed} from "../../containers/Feed";
import {Api} from "../../services/Api";
import {CrumbCompose} from "../../containers/CrumbCompose";

/**
 * component for a single crumb
 * @param props
 */
export function CrumbsCard(props: { crumb: Crumb, onLike: (e: SyntheticEvent, crumb: Crumb) => {} }) {
    const [subfeed, getSubfeed] = useState(false)
    const [composeField, setComposeField] = useState(false)

    return (
        <>
            <Card className={"mt-2"}>
                <Row>
                    <Col xs={1}>
                        <Card.Img src="/profile.png" className="rounded-circle ms-3 mt-4" style={{maxHeight: 40, width: "auto"}}/>
                    </Col>
                    <Col className={"ps-3"}>
                        <Card.Body>
                            <CrumbsCardTopRow crumb={props.crumb} />
                            <Card.Text>
                                <CrumbsCardContentDecoder contents={props.crumb.contents} />
                            </Card.Text>
                            <CrumbsCardBottomRow
                                crumb={props.crumb}
                                onLike={props.onLike}
                                showSubfeed={subfeed}
                                showComposeField={composeField}
                                onReply={_ => setComposeField(!composeField) }
                                onReplies={ _ => getSubfeed(!subfeed) }/>
                        </Card.Body>
                    </Col>
                </Row>

            </Card>
            {composeField &&
                <Container className={"main-content border-start border-4 ms-2 pe-2"}>
                    <CrumbCompose parentId={props.crumb.post_id} />
                </Container>
            }
            {subfeed &&
                <Feed
                    canCompose={false}
                    feed={(continueFrom: string) => new Api().getMainFeed(5, continueFrom, props.crumb.post_id)}
                    feedBulkSize={5}
                    parentId={props.crumb.post_id}
                />
            }
        </>
    );
}