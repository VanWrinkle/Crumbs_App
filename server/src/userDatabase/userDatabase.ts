export interface StoredUserData {
    userName: string,
    hash: string,
    salt: string,
}

export interface UserDatabase {
    addUser(user: StoredUserData): Promise<void>
    getUser(username: string): Promise<StoredUserData | undefined>
}


