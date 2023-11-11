import {Container, Row, Spinner} from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import {CrumbsCard} from "./CrumbsCard/CrumbsCard";
import React from "react";
import {Crumb} from "../types/Crumb";
import {SocialMediaTopPanel} from "./CrumbsComposePanel";
import {CrumbCompose} from "../containers/CrumbCompose";

/**
 * CrumbsFeed is a React component responsible for rendering a feed of Crumb items with various actions.
 * It displays a list of Crumb cards, allows liking of Crumbs, and provides infinite scrolling.
 * @param canCompose - A boolean indicating whether users can compose new Crumbs in the feed.
 * @param crumbs - An array of Crumb items to display in the feed.
 * @param hasMore - A boolean indicating whether there are more items to load via infinite scrolling.
 * @param onLike - A callback function to handle the like action for a Crumb.
 * @param updatePosts - A function to trigger updating and loading more Crumbs in the feed.
 * @param parentId - The ID of the parent Crumb (if any) to which the feed is related.
 * @returns A React element representing the CrumbsFeed component.
 */
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