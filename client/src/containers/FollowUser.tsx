import {Button} from "react-bootstrap";
import {Crumb} from "../types/Crumb";
import {Api} from "../services/Api";
import {toast} from "react-toastify";
import {useAuth} from "../context/AuthProvider";
import {useEffect, useState} from "react";
import {User} from "../types/User";

export function FollowUser({userId}: {userId: string}) {
    const authorized = useAuth();
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

    async function onFollow(userId: string) {
        if (authorized && user) {
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