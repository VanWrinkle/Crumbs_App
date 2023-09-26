import {StoredUserData} from "./StoredUserData";

/**
 * Interface for user databases containing username, hash and salt.
 */
export interface IUserDatabase {
    /**
     * Adds a user to the database. Failing to add the user to the
     * database due to technical problems raises an error.
     * @param user - user to be added to storage
     */
    addUser(user: StoredUserData): Promise<void>

    /**
     * Retrieves the data matching on username, otherwise undefined.
     * An error is raised only if interaction with the database fails.
     * @param username
     * @return - user data if match found, undefined otherwise
     */
    getUser(username: string): Promise<StoredUserData | undefined>
}


