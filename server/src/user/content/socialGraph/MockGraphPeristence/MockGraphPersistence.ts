import {Crumb, CrumbContent} from "../../../../entities/Crumb";
import {CrumbFilter} from "../../../../entities/CrumbFilter";
import {User} from "../../../../entities/User";
import {ISocialNetworkPersistence} from "../../../../contracts/ISocialNetworkPersistence";
import fs from "fs";


function randomID() : number  {
    return (Math.random() * 1000000);
}

export class MockGraphPersistence implements ISocialNetworkPersistence {

    users: User[] = [];
    crumbs: Map<string, Crumb[]> = new Map<string, Crumb[]>();
    follows: Map<string, string[]> = new Map<string, string[]>();
    likes: Map<string, string[]> = new Map<string, string[]>();
    replies: Map<string, string> = new Map<string, string>();

    constructor() {
        this.load();
    }

    load(): Promise<void> {
        return new Promise((resolve, reject)=>{
            try {
                let data = fs.readFileSync("mockGraphPersistence.json", "utf-8");
                let json = JSON.parse(data);
                console.log(json);
                this.users = json.users ?? []
                this.crumbs = new Map<string, Crumb[]>(json.crumbs);
                this.follows = new Map<string, string[]>(json.follows);
                this.likes = new Map<string, string[]>(json.likes);
                this.replies = new Map<string, string>(json.replies);
                resolve();
            } catch (e) {
                console.log(e);
            }
        });
    }

    save(): Promise<void> {
        return new Promise(()=>{
            fs.writeFileSync("mockGraphPersistence.json", JSON.stringify({
                users: this.users,
                crumbs: [...this.crumbs.entries()],
                follows: [...this.follows.entries()],
                likes: [...this.likes.entries()],
                replies: [...this.replies.entries()]
            }));
        });
    }

    createUser(username: string): Promise<void> {
        return new Promise((resolve, reject)=>{
            if(this.users.find(user => user.username === username) === undefined) {
                this.users.push(new User(username));
                resolve();
            } else {
                reject("User already exists");
            }
        });
    }

    deleteUserAndCrumbs(username: string): Promise<void> {
        return new Promise(()=>{
            this.users = this.users.filter(user => user.username !== username);
            this.crumbs.delete(username);
        });
    }

    createCrumb(parent: string | null, username: string, crumb: CrumbContent[]): Promise<void> {
        return new Promise(async (resolve, reject)=>{
            if(this.users?.find(user => user.username === username) === undefined) {
                reject("User does not exist");
                return;
            }
            if(parent != null && this.crumbs?.get(parent) === undefined) {
                reject("Parent does not exist");
                return;
            }

            let crumbID = randomID().toString();

            if(parent) {
                this.replies.set(crumbID, parent);
            }

            let newCrumb: Crumb = {
                replies: 0,
                post_id: crumbID,
                author: username,
                contents: crumb,
                liked: false,
                timestamp_milliseconds: Date.now(),
                likes: 0
            }

            if(this.crumbs.has(username)) {
                this.crumbs.get(username)?.push(newCrumb);
            } else {
                this.crumbs.set(username, [newCrumb]);
            }
            this.save().then(() => console.log('saved new post'));
            resolve();
        });
    }
    updateCrumb(crumb_id: string, newBody: CrumbContent[]): Promise<void> {
        return new Promise(()=>{});
    }
    deleteCrumb(crumb_id: string): Promise<void> {
        return new Promise(()=>{});
    }
    getCrumb(crumb_id: string): Promise <Crumb> {
        return new Promise((resolve, reject)=>{
            this.crumbs.forEach((crumbs: Crumb[]) => {
                let crumb = crumbs.find(crumb => crumb.post_id === crumb_id);
                if(crumb !== undefined) {
                    resolve(crumb);
                }
            });
            reject("Crumb not found");
        });
    }


    setFollow(username: string, followTarget: string, following: boolean): Promise <void> {
        return new Promise(()=>{
            let follows = this.follows.get(username);
            if(following) {
                if (follows !== undefined) {
                    if(follows.find(user => user === followTarget) !== undefined) {
                        follows.push(followTarget);
                        this.follows.set(username, follows);
                    }
                } else {
                    this.follows.set(username, [followTarget]);
                }
            } else {
                follows = follows?.filter(user => user !== followTarget);
                this.follows.set(username, follows ?? []);
            }
        });
    }
    setLike(username: string, crumb_id: string, liked: boolean) : Promise<void> {
        return new Promise(()=>{
            this.crumbs.forEach((crumbs: Crumb[]) => {
                let crumb = crumbs.find(crumb => crumb.post_id === crumb_id);
                if(crumb !== undefined) {
                    if(this.likes.has(crumb_id)) {
                        if(liked) {
                            this.likes.get(crumb_id)?.push(username);
                        } else {
                            let likes = this.likes.get(crumb_id);
                            if(likes !== undefined) {
                                this.likes.set(crumb_id, likes.filter(user => user !== username));
                            }
                        }
                    } else {
                        if(liked) {
                            this.likes.set(crumb_id, [username]);
                        }
                    }
                }
            });
        });
    }
    getCrumbs(user: string | null, filter: CrumbFilter, cutoff: string | null): Promise <Crumb[]> {
        return new Promise((resolve, reject)=>{
            this.save();
            if(filter.sort === CrumbFilter.Sort.Time) {
                let crumbs: Array<Crumb> = Array.from(this.crumbs.values())
                    .reduce((a, b) => a.concat(b), [])
                    .sort((a, b) => a.timestamp_milliseconds - b.timestamp_milliseconds);
                if(filter.order === CrumbFilter.Order.Descending) {
                    crumbs = crumbs.reverse();
                }
                resolve(crumbs);
            } else if(filter.sort === CrumbFilter.Sort.Engagement) {
                throw new Error("Not implemented");
            }
        });
    }

    getProfileInfo() : Promise<User> {
        return new Promise<User>(resolve => {
            resolve(new User("some_user"))
        })
    }
}