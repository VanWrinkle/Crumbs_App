import {UserRegistration} from "../entities/UserRegistration";

/**
 * Interface for user databases containing username, hash and salt.
 */
export interface IUserRegistrationDatabase {
    /**
     * Adds a user to the database. Failing to add the user to the
     * database due to technical problems raises an error.
     * @param user - user to be added to storage
     */
    addUser(user: UserRegistration): Promise<void>


    /**
     * Deletes user's details from database
     * @param username - username of user to be deleted
     */
    deleteUser(username: string): Promise<void>

    /**
     * Retrieves the data matching on username, otherwise undefined.
     * An error is raised only if interaction with the database fails.
     * @param username
     * @return - user data if match found, undefined otherwise
     */
    getUser(username: string): Promise<UserRegistration | undefined>
}


