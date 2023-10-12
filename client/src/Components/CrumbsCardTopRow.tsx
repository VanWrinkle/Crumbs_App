import {Col, Row} from "react-bootstrap";
import {getTimeSince} from "../utils/utils";
import React from "react";
import {Crumb} from "../types/Crumb";

export function CrumbsCardTopRow({crumb}: {crumb: Crumb}) {
    const date = new Date(crumb.timestamp_milliseconds);
    return(
        <Row className="pb-2">
            <Col sm={8} style={{color: 'black', fontSize: '1.2em'}}>@
                <a href={`/profile/${crumb.author}`} style={{color: "inherit"}}>
                    <em>{crumb.author}</em>
                </a>
            </Col>
            <Col style={{textAlign: 'right'}}>
                <em style={{color: 'gray', fontSize: '0.8em'}}>
                    {getTimeSince(date)}
                </em>
            </Col>
        </Row>
    )
}