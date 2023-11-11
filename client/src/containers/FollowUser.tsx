import {Button, Col} from "react-bootstrap";
import {Api} from "../services/Api";
import {toast} from "react-toastify";
import {useAuth} from "../context/AuthProvider";
import {useEffect, useState} from "react";
import {User} from "../types/User";

/**
 * FollowUser is a React component responsible for displaying user follow information and handling follow actions.
 * It checks if the authenticated user is following a specific user and provides the option to follow or unfollow them.
 * @param userId - The ID of the user to follow or unfollow.
 * @returns A React element for user follow actions and follower count.
 */
export function FollowUser({userId}: {userId: string}) {
    // Retrieve the authorized user's authentication status
    const authorized = useAuth();

    // State variables to track if the user follows the target user and to store user information
    const [user, setUser] = useState<User | undefined>(undefined)

    // check if user is followed or not
    useEffect(() => {
        new Api().getProfileInfo(userId)
            .then((response) => {
                setUser(response)
            })
            .catch((error) => {
                if (error instanceof Error) {
                    toast.error(error.message)
                }
            })
    }, []);

    // Function to handle user follow or unfollow actions
    async function onFollow(userId: string, unfollow: boolean) {
        if (authorized && user) {
            // Toggle the follow status and update the user object
            new Api().toggleFollow(userId, unfollow)
                .then(() => {
                    setUser((prevUser) => ({
                        ...prevUser!,
                        followers_count: (prevUser?.followers_count ?? 0) + (unfollow ? -1 : 1),
                        is_followed_by_user: !prevUser?.is_followed_by_user
                    }))
                })
                .catch(() => {
                    toast.error("Failed to follow/unfollow user")
                })
        } else {
            toast.info("You need be signed into an account to leave reactions")
        }

    }


    return(
        <Col>
            <Button
                onClick={_ => onFollow(userId, user?.is_followed_by_user ?? false)}
                disabled={!authorized || !user}>
                {user?.is_followed_by_user ? "unfollow" : "follow"}
            </Button>
            <div>Followers: {user ? user.followers_count : ''}</div>
            <div>Following: {user ? user.following_count : ''}</div>
        </Col>
    )
}