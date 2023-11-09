import {Crumb, CrumbContent} from "../../../../entities/Crumb";
import {CrumbFilter} from "../../../../entities/CrumbFilter";
import {User} from "../../../../entities/User";


export class MockGraphPersistence {
    createUserNode(username: string): Promise<void> {
        return new Promise(()=>{});
    }
    deleteUserNodeAndUserCrumbs(username: string): Promise<void> {
        return new Promise(()=>{});
    }

    createCrumb(parent: string | null, username: string, crumb: CrumbContent[]): Promise<void> {
        return new Promise(()=>{});
    }
    updateCrumb(crumb_id: string, newBody: CrumbContent[]): Promise<void> {
        return new Promise(()=>{});
    }
    deleteCrumb(crumb_id: string): Promise<void> {
        return new Promise(()=>{});
    }
    getCrumb(crumb_id: string): Promise <Crumb> {
        return new Promise(()=>{let view: Crumb = {
            replies: 0,
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
    getCrumbs(user: string | null, filter: CrumbFilter, cutoff: string | null): Promise <Crumb[]> {
        return new Promise(()=>{ let views: Crumb[] = []; return views;});
    }

    getProfileInfo() : Promise<User> {
        return new Promise<User>(resolve => {
            resolve(new User("some_user"))
        })
    }
}