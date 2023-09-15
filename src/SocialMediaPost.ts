export interface SocialMediaPostDispatch {
    (value: React.SetStateAction<SocialMediaPost[]>): void;
}
export interface SocialMediaPost {
    userId: string;
    published: Date;
    expires: Date;
    likes: number;
    content: string;
    comments: SocialMediaPost[];
}

export class SocialMediaPostV1 implements SocialMediaPost {
    public published: Date;
    public expires: Date;
    public likes: number;
    public comments: SocialMediaPostV1[];

    constructor(public userId: string, public content: string) {
        this.published = new Date();
        this.expires = new Date();
        this.expires.setDate(this.published.getDate() + 14);
        this.likes = 0;
        this.comments = [];
    }
}