import {Container, Row, Spinner} from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import {CrumbsCard} from "./CrumbsCard/CrumbsCard";
import React from "react";
import {Crumb} from "../types/Crumb";
import {SocialMediaTopPanel} from "./CrumbsComposePanel";

export function CrumbsFeed(props: {
    canCompose: boolean,
    crumbs: Crumb[],
    hasMore: boolean,
    onLike: (crumb: Crumb) => {},
    updatePosts: () => void,
}) {

    return(
        <Container className="main-content">
            {props.canCompose && (
                <Row>
                    <SocialMediaTopPanel />
                </Row>
            )}
            <InfiniteScroll
                next={props.updatePosts}
                hasMore={props.hasMore}
                loader={(
                    <Row className="justify-content-center mt-4">
                        <Spinner animation="border" variant="info" />
                    </Row>
                )}
                dataLength={props.crumbs.length}
                className="overflow-hidden"
            >
                <Row>
                    {props.crumbs.map(crumb =>
                        <div><CrumbsCard crumb={crumb} onLike={_ => props.onLike(crumb)} /></div>
                    )}
                </Row>
            </InfiniteScroll>
        </Container>
    )
}