import {Button, Stack} from "react-bootstrap";
import {useAuth} from "../context/AuthProvider";
import {ThumbUp} from "@mui/icons-material";
import React, {SyntheticEvent} from "react";
import {Crumb} from "../types/Crumb";

export function CrumbsCardBottomRow(props: {crumb: Crumb, onLike: (e: SyntheticEvent, crumb: Crumb) => {}}) {
    return(
        <Stack direction="horizontal">
            <div className="ms-auto">
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