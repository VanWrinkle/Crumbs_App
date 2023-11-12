import React, {useEffect, useState} from "react";
import {Crumb} from "../types/Crumb";
import {Api} from "../services/Api";
import {CrumbsFeed} from "../components/CrumbsFeed";
import {useAuth} from "../context/AuthProvider";
import {toast} from "react-toastify";

/**
 * Feed is a React component responsible for displaying and managing a feed of Crumb posts.
 * It handles loading, displaying, and interaction with the feed, such as liking posts.
 * @param canCompose - Indicates whether the user can compose new posts in the feed.
 * @param feed - A function to fetch feed data based on a continuation token.
 * @param feedBulkSize - The number of posts to load at once in the feed.
 * @param parentId - The ID of the parent Crumb post for nested posts.
 * @returns A React element representing the Crumb feed.
 */
export function Feed(props: {
    canCompose: boolean,
    feed: (continueFrom: string) => Promise<Crumb[] | undefined>,
    feedBulkSize: number,
    parentId: string | null,
    userId: string | undefined
}) {
    // Retrieve the authorized user's data
    const authorized = useAuth()

    // State variables to manage feed data, restart feed, and control "load more" functionality
    const [crumbs, setCrumbs] = useState<Crumb[]>([])
    const [restartFeed, setRestartFeed] = useState(true)
    const [hasMore, setHasMore] = useState(true)

    // Function to update and load posts in the feed
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
            .catch(error => {
                if (error instanceof Error) {
                    console.log(error)
                }
                toast.error("Could not load the last messages")
            })
    }

    // Effect to reset feed and "load more" state when user authentication status changes
    useEffect(() => {
        setRestartFeed(true)
        setHasMore(true)
    }, [authorized]);

    // Effect to reset the feed and remove all crumbs when the /profile/{user} param changes
    useEffect(() => {
        setCrumbs([])
        setRestartFeed(true)
        setHasMore(true)
    }, [props.userId]);

    // Function to handle liking or unliking a Crumb post
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
                        toast.error(error.message)
                })
        } else {
            toast.info("You need be signed into an account to leave reactions")
        }

    }

    // Effect to load initial posts when the component mounts
    useEffect(() => {
        void updatePosts()
    }, []);

    return (
        <CrumbsFeed
            canCompose={props.canCompose}
            crumbs={crumbs}
            hasMore={hasMore}
            onLike={onLike}
            updatePosts={updatePosts}
            parentId={props.parentId}
            />
    );
}