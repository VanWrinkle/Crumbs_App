import {Crumb} from "../types/Crumb";
import React, {SyntheticEvent} from "react";
import {Link} from "react-router-dom";
import {Button, Card, Col, Row, Stack} from "react-bootstrap";
import {getTimeSince} from "../utils/utils";
import {useAuth} from "../context/AuthProvider";
import {ThumbUp} from "@mui/icons-material";
import {CrumbsCardBottomRow} from "./CrumbsCardBottomRow";
import {CrumbsCardContentDecoder} from "./CrumbsCardContentDecoder";
import {CrumbsCardTopRow} from "./CrumbsCardTopRow";

/**
 * component for a single crumb
 * @param props
 */
export function CrumbsCard(props: { crumb: Crumb, onLike: (e: SyntheticEvent, crumb: Crumb) => {} }) {
    return (
        <Card className="mb-2">
            <Row>
                <Col xs={3}>
                    <Card.Img src="/logo192.png"/>
                </Col>
                <Col>
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