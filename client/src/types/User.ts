export class User {
    username: string
    is_followed_by_user: boolean | undefined
    followers_count: number | undefined
    following_count: number | undefined
    constructor(username: string) {
        this.username = username;
    }
}
