import {CrumbV1} from "../types/Crumb";
import React, {SyntheticEvent, useState} from "react";
import {useAuth} from "../context/AuthProvider";
import {Api} from "../services/Api";
import {CrumbComposeForm} from "../components/CrumbComposeForm";
import {toast} from "react-toastify";

/**
 * panel for composing new crumbs
 */
export function CrumbCompose(props: {
    parentId: string | null
}) {
    const [userInput, setUserInput] = useState("");
    const username = useAuth()?.username
    const [disabledButton, setDisabledButton] = useState(false)

    async function onSubmit(e: SyntheticEvent) {
        e.preventDefault();
        setDisabledButton(true)
        const crumb = new CrumbV1(username!.toString(), userInput, props.parentId)
        const api = new Api().postNewCrumb(crumb)
        await toast.promise(api, {
            pending: "Posting",
            success: {
                render: () => {
                    return (
                        <>
                        <div>Your crumb is ready!</div>
                        <div><a href={`/profile/${username}`}>Take a look at it here!</a></div>
                        </>
                    )
                }
            },
            error: {
                render: ({data}) => {
                    return (data instanceof Error) ? data.message : ""
                }
            }
        }).finally(() => {
            setUserInput("")
            setDisabledButton(false)
        })
    }

    return (
        <CrumbComposeForm
            userInput={userInput}
            username={username}
            setUserInput={setUserInput}
            onSubmit={onSubmit}
            disabledButton={disabledButton}
        />
    );
}