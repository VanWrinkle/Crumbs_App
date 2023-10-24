import {Col, Image, Row} from "react-bootstrap";
import React, {useContext} from "react";
import {CrumbCompose} from "../containers/CrumbCompose";
import {ThemeContext} from "../context/ThemeContext";

export function SocialMediaTopPanel(props: {
    parentId: string | null
}) {
    const {theme} = useContext(ThemeContext)
    return (
        <Row>
            <Col xs={3}>
                <Image src={theme === "dark" ?
                    "/darklogo.png" : "/logo.png"}
                       fluid/>
            </Col>
            <Col>
                <CrumbCompose parentId={props.parentId}/>
            </Col>
        </Row>
    );
}