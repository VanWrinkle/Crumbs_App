import {UserPostView} from "../ISocialGraphPersistence/ISocialGraphPersistence";


enum Order {
    Ascending,
    Descending
}

enum Sort {
    Time,
    Engagement
}

class PostViewSettings {
    readonly default_max_posts = 15
    readonly default_sort_method = Sort.Time
    readonly default_ordering_method = Order.Descending
    readonly default_last_post = null

    ordering: Order = this.default_ordering_method
    sortMethod: Sort = this.default_sort_method
    max_posts: number = this.default_max_posts
    last_post: string | null = this.default_last_post
}

export interface IPostPresentationService {
    getPostsByUser(author: string, settings: PostViewSettings) : UserPostView[]
    getPostsByTags(tags: string[], settings: PostViewSettings): UserPostView[]
    getReplies(postID: string, settings: PostViewSettings): UserPostView[]
    getGuestFeed(settings: PostViewSettings) : UserPostView[]
    getPersonalFeed(username: string, settings: PostViewSettings): UserPostView[]
}


