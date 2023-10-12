import {Crumb, SocialMediaPostDispatch} from "../types/Crumb";
import {Col, Image} from "react-bootstrap";
import React from "react";
import {CrumbCompose} from "../containers/CrumbCompose";

export function SocialMediaTopPanel(props: { crumbs: Crumb[], setCrumbs: SocialMediaPostDispatch }) {
    return (
        <>
            <Col xs={3}>
                <Image src="/logo.png" fluid/>
            </Col>
            <Col>
                <CrumbCompose crumbs={props.crumbs} setCrumbs={props.setCrumbs}/>
            </Col>
        </>
    );
}