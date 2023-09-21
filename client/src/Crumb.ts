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
    userId: string;
    published: Date;
    expires: Date;
    likes: number;
    content: string;
    comments: Crumb[];
}

/**
 *
 */
export class CrumbV1 implements Crumb {
    public published: Date;
    public expires: Date;
    public likes: number;
    public comments: CrumbV1[];

    constructor(public userId: string, public content: string) {
        this.published = new Date();
        this.expires = new Date();
        this.expires.setDate(this.published.getDate() + 14);
        this.likes = 0;
        this.comments = [];
    }
}