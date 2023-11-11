import {CrumbV1} from "../types/Crumb";
import React, {SyntheticEvent, useState} from "react";
import {useAuth} from "../context/AuthProvider";
import {Api} from "../services/Api";
import {CrumbComposeForm} from "../components/CrumbComposeForm";
import {toast} from "react-toastify";
import { CrumbComposeFormTiny } from "../components/CrumbComposeFormTiny";

/**
 * CrumbCompose is a React container responsible for composing and posting new Crumb posts.
 * It provides a form for users to input their Crumb content and handles the posting process.
 * @param parentId - The ID of the parent Crumb, if this Crumb is a reply, or null if it's a new post.
 * @returns A React element for Crumb composition and posting.
 */
export function CrumbCompose(props: {
    parentId: string | null
}) {
    // State variables to manage user input, username, and button disable state
    const [userInput, setUserInput] = useState("");
    const username = useAuth()?.username
    const [disabledButton, setDisabledButton] = useState(false)

    // Function to handle Crumb post submission
    async function onSubmit(e: SyntheticEvent) {
        e.preventDefault();
        setDisabledButton(true)

        // Create a new Crumb with user input
        const crumb = new CrumbV1(username!.toString(), userInput, props.parentId)
        const api = new Api().postNewCrumb(crumb)

        // Handle posting process with toast notifications
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
        <>
            {props.parentId == null ? (
            <CrumbComposeForm
                userInput={userInput}
                username={username}
                setUserInput={setUserInput}
                onSubmit={onSubmit}
                disabledButton={disabledButton}
            />
            ):(
            <CrumbComposeFormTiny
                userInput={userInput}
                username={username}
                setUserInput={setUserInput}
                onSubmit={onSubmit}
                disabledButton={disabledButton}
            />
            )}
        </>

    )
}