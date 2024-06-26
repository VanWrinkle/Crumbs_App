/**
 * type alias for setState()
 * makes argument type for mutating social media post array much easier to work with
 */
export interface SocialMediaPostDispatch {
    (value: React.SetStateAction<Crumb[]>): void;
}

/**
 * data structure for a single post
 */
export interface Crumb {
    author: string;
    timestamp_milliseconds: number;
    post_id: string;
    likes: number;
    liked: boolean;
    replies: number;
    contents: CrumbContent[];
    parent: string | null;
}

export interface CrumbContent {
    type: string,
    value: string
}


/**
 *
 */
export class CrumbV1 implements Crumb {
    public likes: number;
    public liked: boolean;
    public timestamp_milliseconds: number;
    public post_id: string;
    public contents: CrumbContent[];
    public replies: number;

    constructor(public author: string, public content: string, public parent: string | null = null) {
        this.likes = 0;
        this.replies = 0;
        this.post_id = "";
        this.liked = false;
        this.timestamp_milliseconds = new Date().getTime();
        this.contents = [{type: "txt", value: content}]
    }

}