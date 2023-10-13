import {Link} from "react-router-dom";
import React from "react";
import {CrumbContent} from "../../types/Crumb";

export function CrumbsCardContentDecoder({contents}: {contents: CrumbContent[]}) {
    return(
        <>
        {contents.map((item) =>
            item.type == "hashtag" ? <CrumbCardHashtag content={item} /> :
            item.type == "mention" ? <CrumbCardMention content={item} /> :
            <>{item.value}</>
        )}
        </>
    )
}

function CrumbCardHashtag({content}: {content: CrumbContent}) {
    return(
        <Link to={""}>
            {content.value}
        </Link>
    )
}

function CrumbCardMention({content}: {content: CrumbContent}) {
    return (
        <Link to={`/profile/${content.value.substring(1)}`}>
            {content.value}
        </Link>)
}