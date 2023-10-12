import React, {SyntheticEvent, useEffect, useState} from "react";
import {Crumb} from "../types/Crumb";
import {Api} from "../services/Api";
import {Container, Row, Spinner} from "react-bootstrap";
import {SocialMediaTopPanel} from "./CrumbTopPanel";
import InfiniteScroll from 'react-infinite-scroll-component';
import {CrumbsCard} from "../components/CrumbsCard";

export function CrumbsFeed(prop: {
    canCompose: boolean,
    feed: (continueFrom: string) => Promise<Crumb[] | undefined>
}) {
    const [crumbs, setCrumbs] = useState<Crumb[]>([])
    const [hasMore, setHasMore] = useState(true)

    async function updatePosts() {
        const continueFrom = crumbs.length > 0 ? crumbs[crumbs.length - 1].post_id : ""
        prop.feed(continueFrom)
            .then((response) => {
                if (response) {
                    if (response.length === 0) {
                        setHasMore(false)
                    } else {
                        setCrumbs([...crumbs, ...response])
                    }
                }
            })
            .catch(() => {
                // TODO error handling
            })
    }

    async function onLike(_e: SyntheticEvent, crumb: Crumb) {
        new Api().toggleLike(crumb)
            .then(() => {
                crumb.likes += crumb.liked ? -1 : 1
                crumb.liked = !crumb.liked
                setCrumbs(crumbs.map(it => {
                    return crumb.post_id === it.post_id ? crumb : it
                }))
            })
            .catch(() => {
                // TODO error handling
            })
    }

    useEffect(() => {
        void updatePosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container className="main-content">
            {prop.canCompose && (
                <Row>
                    <SocialMediaTopPanel crumbs={crumbs} setCrumbs={setCrumbs}/>
                </Row>
            )}
                <InfiniteScroll
                    next={updatePosts}
                    hasMore={hasMore}
                    loader={(
                        <Row className="justify-content-center mt-4">
                            <Spinner animation="border" variant="info" />
                        </Row>
                    )}
                    dataLength={crumbs.length}
                    className="overflow-hidden"
                >
                    <Row>
                        <SocialMediaPostsDisplayAllBrief crumbs={crumbs} onLike={onLike}/>
                    </Row>
                </InfiniteScroll>
        </Container>
    );
}



/**
 * panel that iterates over crumbs array and includes component for each
 * @param props
 */
export function SocialMediaPostsDisplayAllBrief(props: {crumbs: Crumb[], onLike: (e: SyntheticEvent, crumb: Crumb)=>{}}) {
    const results = props.crumbs.map((crumb) =>
        <CrumbsCard crumb={crumb} onLike={props.onLike} />
    );
    return (
        <div>{results}</div>
    );
}

