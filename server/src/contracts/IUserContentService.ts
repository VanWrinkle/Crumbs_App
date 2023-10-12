
interface IUserContentService {
    storePost(): Promise<void>
    setProfileImage() : Promise<void>
    getProfileImage() : Promise<void>
}
