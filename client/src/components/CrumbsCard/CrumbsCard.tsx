import {Crumb} from "../../types/Crumb";
import React, {SyntheticEvent} from "react";
import {Card, Col, Row} from "react-bootstrap";
import {CrumbsCardBottomRow} from "./CrumbsCardBottomRow";
import {CrumbsCardContentDecoder} from "./CrumbsCardContentDecoder";
import {CrumbsCardTopRow} from "./CrumbsCardTopRow";
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * component for a single crumb
 * @param props
 */
export function CrumbsCard(props: { crumb: Crumb, onLike: (e: SyntheticEvent, crumb: Crumb) => {} }) {
    return (
        <Card className={"mb-2"}>
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
                        <CrumbsCardBottomRow crumb={props.crumb} onLike={props.onLike} />
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}