import {Button} from "react-bootstrap";
import {Crumb} from "../types/Crumb";
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
    const [followsUser, setFollowsUser] = useState<boolean | null>(null)
    const [user, setUser] = useState<User | undefined>(undefined)

    // check if user is followed or not
    useEffect(() => {
        const response = new Api().getProfileInfo(userId)
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
    async function onFollow(userId: string) {
        if (authorized && user) {
            // Toggle the follow status and update the user object
            new Api().toggleFollow(userId, false)
                .then(() => {
                    setUser((prevUser) => ({
                        ...prevUser!,
                        is_followed_by_user: !prevUser?.is_followed_by_user
                    }))
                })
                .catch((error: any) => {
                    toast.error("Failed to follow user")
                })
        } else {
            toast.info("You need be signed into an account to leave reactions")
        }

    }


    return(
        <>
            <span>Followers: {user ? user.followers_count : '?'}</span>
        <Button
            onClick={_ => onFollow(userId)}
            disabled={!authorized || !user}
        >
            follow
        </Button>
        </>
    )
}