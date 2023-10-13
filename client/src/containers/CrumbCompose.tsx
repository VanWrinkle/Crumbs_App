import {Crumb, CrumbV1, SocialMediaPostDispatch} from "../types/Crumb";
import React, {SyntheticEvent, useContext, useState} from "react";
import {useAuth} from "../context/AuthProvider";
import {Api} from "../services/Api";
import {CrumbComposeForm} from "../components/CrumbComposeForm";
import {toast} from "react-toastify";

/**
 * panel for composing new crumbs
 * @param props - array of crumbs and setter
 */
export function CrumbCompose(props: {crumbs: Crumb[], setCrumbs: SocialMediaPostDispatch}) {
    const [userInput, setUserInput] = useState("");
    const [spinner, setSpinner] = useState(false)
    const [alert, setAlert] = useState("")
    const username = useAuth()?.username

    async function onSubmit(e: SyntheticEvent) {
        e.preventDefault();
        const crumb = new CrumbV1(username!.toString(), userInput)
        const api = new Api().postNewCrumb(crumb)
        await toast.promise(api, {
            pending: "Posting",
            success: "Your crumb has been successfully posted",
            error: {
                render: ({data}) => {
                    return (data instanceof Error) ? data.message : ""
                }
            }
        }).then(() => {
            setUserInput("")
        })
    }

    return (
        <CrumbComposeForm
            userInput={userInput}
            username={username}
            spinner={spinner}
            setUserInput={setUserInput}
            onSubmit={onSubmit}
            setAlert={setAlert}
            alert={alert}
        />
    );
}