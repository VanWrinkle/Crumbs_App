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
    contents: CrumbContent[]
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
    public contents: CrumbContent[]

    constructor(public author: string, public content: string) {
        this.likes = 0;
        this.post_id = "";
        this.liked = false;
        this.timestamp_milliseconds = 0;
        this.contents = [{type: "txt", value: content}]
    }

}