import {Container, Row, Spinner} from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import {CrumbsCard} from "./CrumbsCard/CrumbsCard";
import React from "react";
import {Crumb} from "../types/Crumb";
import {SocialMediaTopPanel} from "./CrumbsComposePanel";
import {CrumbCompose} from "../containers/CrumbCompose";

export function CrumbsFeed(props: {
    canCompose: boolean,
    crumbs: Crumb[],
    hasMore: boolean,
    onLike: (crumb: Crumb) => {},
    updatePosts: () => void,
    parentId: string | null
}) {

    const style = "main-content" + (props.parentId != null ? " border-start border-4 ms-2 pe-2" : "")

    return(
        <Container className={style}>
            <Row>
            {props.canCompose && !props.parentId && (
                <SocialMediaTopPanel parentId={props.parentId} />
            )}
            {props.canCompose && props.parentId && (
                <CrumbCompose parentId={props.parentId} />
            )}
            </Row>
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