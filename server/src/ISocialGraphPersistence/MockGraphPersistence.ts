import {CrumbFilter} from "./NeoGraphPersistence/NeoGraphPersistence";
import {UserPostData, UserPostView} from "./ISocialGraphPersistence";

export class MockGraphPersistence {
    createUserNode(username: string): Promise<void> {
        return new Promise(()=>{});
    }
    deleteUserNodeAndUserCrumbs(username: string): Promise<void> {
        return new Promise(()=>{});
    }

    createCrumb(parent: string | null, username: string, crumb: UserPostData): Promise<void> {
        return new Promise(()=>{});
    }
    updateCrumb(crumb_id: string, newBody: UserPostData): Promise<void> {
        return new Promise(()=>{});
    }
    deleteCrumb(crumb_id: string): Promise<void> {
        return new Promise(()=>{});
    }
    getCrumb(crumb_id: string): Promise <UserPostView> {
        return new Promise(()=>{let view: UserPostView = {
            post_id: "0",
            author: "test_user",
            contents: [],
            liked: false,
            timestamp_milliseconds: 0,
            likes: 0
        }
        return view });
    }
    // Relationships
    setUserFollowing(username: string, followTarget: string, following: boolean): Promise <void> {
        return new Promise(()=>{});
    }
    setCrumbLiked(username: string, crumb_id: string, liked: boolean) : Promise<void> {
        return new Promise(()=>{});
    }
    //setCrumbParent(crumb_id: string, parent_id: string): Promise<void>
    getCrumbs(user: string | null, filter: CrumbFilter, cutoff: string | null): Promise <UserPostView[]> {
        return new Promise(()=>{ let views: UserPostView[] = []; return views;});
    }
}