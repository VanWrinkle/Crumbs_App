export interface StoredUserData {
    userName: string,
    hash: string,
    salt: string,
}

export interface IUserDatabase {
    /**
     *
     * @param user - {StoredUserData}
     */
    addUser(user: StoredUserData): Promise<void>

    /**
     *
     * @param username
     */
    getUser(username: string): Promise<StoredUserData | undefined>
}


