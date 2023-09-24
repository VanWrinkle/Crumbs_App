export interface StoredUserData {
    userName: string,
    hash: string,
    salt: string,
}

export interface IUserDatabase {
    addUser(user: StoredUserData): Promise<void>
    getUser(username: string): Promise<StoredUserData | undefined>
}


