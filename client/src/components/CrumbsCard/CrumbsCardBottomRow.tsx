import {Button, Stack} from "react-bootstrap";
import {useAuth} from "../../context/AuthProvider";
import {Message, Reply, ThumbUp} from "@mui/icons-material";
import React, {SyntheticEvent} from "react";
import {Crumb} from "../../types/Crumb";

export function CrumbsCardBottomRow(props: {
    crumb: Crumb,
    showSubfeed: Boolean
    showComposeField: Boolean
    onLike: (e: SyntheticEvent, crumb: Crumb) => {},
    onReply: (e: SyntheticEvent) => void,
    onReplies: (e: SyntheticEvent) => void
}) {
    return(
        <Stack direction="horizontal">
            <div className="ms-auto">
                <Button
                    size="sm"
                    className="ms-auto me-2"
                    disabled={props.crumb.author === useAuth()?.username}
                    variant={props.showComposeField ? "info" : "outline-info"}
                    onClick={e => { props.onReply(e) }}>
                        <span className="pe-1">
                            <Reply fontSize="inherit"/>
                        </span>
                    Reply
                </Button>
                <Button
                    size="sm"
                    className="ms-auto me-2"
                    variant={props.showSubfeed ? "info" : "outline-info"}
                    onClick={e => props.onReplies(e)}>
                        <span className="pe-1">
                            <Message fontSize="inherit"/>
                        </span>
                    0
                </Button>
                <Button
                    size="sm"
                    className="ms-auto"
                    disabled={props.crumb.author === useAuth()?.username}
                    variant={props.crumb.liked ? "info" : "outline-info"}
                    onClick={e => props.onLike(e, props.crumb)}>
                        <span className="pe-1">
                            <ThumbUp fontSize="inherit"/>
                        </span>
                    {props.crumb.likes}
                </Button>
            </div>
        </Stack>
    )
}