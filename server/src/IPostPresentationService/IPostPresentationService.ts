import {UserPost} from "./UserPost";

export interface IPostPresentationService {
    getRepliesByChronology(postID: string): UserPost[]
    getRepliesByEngagement(postID: string): UserPost[]
    getInterestFeed(userID: string): UserPost[]
}