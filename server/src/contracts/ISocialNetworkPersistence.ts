import {CrumbFilter} from "../entities/CrumbFilter";
import {Crumb, CrumbContent} from "../entities/Crumb";
import {User} from "../entities/User";


export interface ISocialNetworkPersistence {
    createUser(username: string): Promise<void>
    deleteUserAndCrumbs(username: string): Promise<void>
    createCrumb(parent: string | null, username: string, crumb: CrumbContent[]): Promise<void>
    updateCrumb(crumb_id: string, newBody: CrumbContent[]): Promise<void>
    deleteCrumb(crumb_id: string): Promise<void>
    getCrumb(crumb_id: string): Promise <Crumb>
    setFollow(username: string, followTarget: string, following: boolean): Promise <void>
    setLike(username: string, crumb_id: string, liked: boolean) : Promise<void>
    getCrumbs(user: string | null, filter: CrumbFilter, cutoff: string | null): Promise <Crumb[]>
    getProfileInfo(activeUser: string | null, targetUser: string): Promise<User>
}







