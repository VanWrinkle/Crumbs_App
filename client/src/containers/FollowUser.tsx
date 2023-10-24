import {Button} from "react-bootstrap";
import {Crumb} from "../types/Crumb";
import {Api} from "../services/Api";
import {toast} from "react-toastify";
import {useAuth} from "../context/AuthProvider";
import {useEffect, useState} from "react";

export function FollowUser({userId}: {userId: string}) {
    const authorized = useAuth();
    const [followsUser, setFollowsUser] = useState<boolean | null>(null)

    // check if user is followed or not
    useEffect(() => {

    }, []);

    async function onFollow(userId: string) {
        if (authorized) {
            new Api().toggleFollow(userId, false)
                .then(() => {

                })
                .catch((error: any) => {
                    toast.error("Failed to follow user")
                })
        } else {
            toast.info("You need be signed into an account to leave reactions")
        }

    }


    return(
        <Button
            onClick={_ => onFollow(userId)}
            disabled={!authorized}
        >
            follow
        </Button>
    )
}