export interface ISocialGraphPersistence {
    createUserNode(username: string): Promise<void>
    deleteUserNode(username: string): Promise<void>

    createCrumb(username: string, crumb: UserPostData): Promise<void>
    updateCrumb(crumb_id: string, newBody: UserPostData): Promise<void>
    deleteCrumb(crumb_id: string): Promise<void>
    getCrumb(crumb_id: string): Promise <UserPostView>
    // Relationships
    setUserFollowing(username: string, followTarget: string, following: boolean): Promise <void>
    setCrumbLiked(username: string, liked: boolean) : Promise<void>
    setCrumbParent(crumb_id: string, parent_id: string): Promise<void>
}

export interface UserPostData {
    contents: string[]
    flags: string[]
}

export class ComponentType {
    static Text = "text"
    static Hash = "hash"
    static Mention = "mention"
    static URL = "url"
}


export interface PostComponent {
    type: string
    value: string
}


export interface UserPostView {
    author: string
    post_id: string
    likes: number,
    liked: boolean,
    contents: PostComponent[]
}