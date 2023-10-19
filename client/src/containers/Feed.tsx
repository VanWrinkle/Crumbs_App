import React, {useEffect, useState} from "react";
import {Crumb} from "../types/Crumb";
import {Api} from "../services/Api";
import {CrumbsFeed} from "../components/CrumbsFeed";
import {useAuth} from "../context/AuthProvider";
import {useAddNotification} from "../context/AlertProvider";
import {toast} from "react-toastify";

export function Feed(props: {
    canCompose: boolean,
    feed: (continueFrom: string) => Promise<Crumb[] | undefined>,
    feedBulkSize: number
}) {
    const authorized = useAuth()
    const [crumbs, setCrumbs] = useState<Crumb[]>([])
    const [restartFeed, setRestartFeed] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const addNotification = useAddNotification()

    async function updatePosts() {
        const continueFrom = restartFeed || crumbs.length === 0 ? "" : crumbs[crumbs.length - 1].post_id
        setRestartFeed(false)
        props.feed(continueFrom)
            .then((response) => {
                if (response) {
                    setCrumbs([...crumbs, ...response])
                    if (response.length < props.feedBulkSize) {
                        setHasMore(false)
                    }
                }
            })
            .catch(() => {
                toast.error("Could not load the last messages")
                addNotification({message: "failed to load more crumbs", link: ""})
            })
    }

    useEffect(() => {
        setRestartFeed(true)
        setHasMore(true)
    }, [authorized]);

    async function onLike(crumb: Crumb) {
        if (authorized) {
            new Api().toggleLike(crumb)
                .then(() => {
                    crumb.likes += crumb.liked ? -1 : 1
                    crumb.liked = !crumb.liked
                    setCrumbs(crumbs.map(it => {
                        return crumb.post_id === it.post_id ? crumb : it
                    }))
                })
                .catch((error: any) => {
                    if (error instanceof Error)
                    addNotification({message: error.message, link: ""})
                })
        } else {
            toast.info("You need be signed into an account to leave reactions")
        }

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