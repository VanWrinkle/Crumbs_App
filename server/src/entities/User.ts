import {Crumb} from "./Crumb";




export class User {
    username: string
    joined: number | undefined
    is_followed_by_user: boolean | undefined
    followers_count: number | undefined
    following_count: number | undefined


    constructor(username: string) {
        this.username = username;
    }
    // followUser(otherUser: User, follow: boolean) {}
    //
    // likeCrumb(crumb: Crumb, like: boolean) {}
    //
    // unlikeCrumb() {}
    //
    // postCrumb(){}

}

export namespace User {
    enum Result {

    }
}