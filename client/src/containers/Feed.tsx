import React, {useEffect, useState} from "react";
import {Crumb} from "../types/Crumb";
import {Api} from "../services/Api";
import {CrumbsFeed} from "../components/CrumbsFeed";

export function Feed(props: {
    canCompose: boolean,
    feed: (continueFrom: string) => Promise<Crumb[] | undefined>,
    feedBulkSize: number
}) {
    const [crumbs, setCrumbs] = useState<Crumb[]>([])
    const [hasMore, setHasMore] = useState(true)

    async function updatePosts() {
        const continueFrom = crumbs.length > 0 ? crumbs[crumbs.length - 1].post_id : ""
        props.feed(continueFrom)
            .then((response) => {
                if (response) {
                    if (response.length < props.feedBulkSize) {
                        setHasMore(false)
                    }
                    setCrumbs([...crumbs, ...response])
                }
            })
            .catch(() => {
                // TODO error handling
            })
    }

    async function onLike(crumb: Crumb) {
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
        <CrumbsFeed
            canCompose={props.canCompose}
            crumbs={crumbs}
            hasMore={hasMore}
            onLike={onLike}
            updatePosts={updatePosts}
            />
    );
}