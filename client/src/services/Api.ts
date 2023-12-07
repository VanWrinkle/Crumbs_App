import axios, {AxiosError, AxiosInstance} from "axios";
import {Crumb} from "../types/Crumb";
import {User} from "../types/User";

/**
 * This class represents an API client for making various user-related requests.
 */
export class Api {
    private client: AxiosInstance

    /**
     * Initializes the API client with a base URL and default configuration.
     */
    constructor() {
        this.client = axios.create({
            baseURL: '/api',
            timeout: 5000,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    /**
     * Attempts to log in a user with the provided username and password.
     * @param username - The user's username.
     * @param password - The user's password.
     * @returns A promise that resolves with user data on successful login.
     * @throws An error object with a specific error message on failure.
     */
    async userLogin(username: string, password: string) {
       try {
           const response = await this.client.post('/login', {
               username: username,
               password: password
           })
           return response.data
       } catch (error: any) {
           this.handleApiError(error, {401: 'Incorrect username and/or password'})
       }
    }

    /**
     * Logs out the currently authenticated user.
     * @throws An error object with an optional error message on failure.
     */
    async userLogout() {
        try {
            await this.client.post('/logout')
        } catch (error: any) {
            this.handleApiError(error, {})
        }
    }


    /**
     * Renews the user's session token.
     * @returns A promise that resolves with user data on successful token renewal.
     * @throws An error object with a specific error message on failure.
     */
    async userRenew() {
        try {
            const response = await this.client.post('/renew')
            return response.data
        } catch (error: any) {
            this.handleApiError(error, {401: 'Invalid token'})
        }
    }

    /**
     * Registers a new user with the provided username and password.
     * @param username - The desired username for the new user.
     * @param password - The password for the new user.
     * @returns A promise that resolves with user data on successful registration.
     * @throws An error object with specific error messages based on the failure scenario.
     */
    async userRegistration(username: string, password: string) {
        try {
            const response = await this.client.post('/register', {
                username: username,
                password: password
            })
            return response.data
        } catch (error: any) {
            this.handleApiError(error, {
                400: 'The username or password does not meet the security requirements',
                409: 'A user is already registered by that username'
            })
        }
    }

    /**
     * Posts a new crumb to the server.
     * @param crumb - The crumb object to be posted.
     * @returns A promise that resolves with the posted crumb data.
     * @throws An error object with a specific error message on failure.
     */
    async postNewCrumb(crumb: Crumb) {
        try {
            const response = await this.client.post('/postCrumb', crumb);
            return response.data;
        } catch (error: any) {
            this.handleApiError(error, {401: 'Not logged in'})
        }
    }

    /**
     * Retrieves the main feed with a specified number of posts and optional pagination parameters.
     * @param numberOfPosts - The maximum number of posts to retrieve (default: 15).
     * @param continue_from - A token for paginating through the feed (default: "").
     * @param parent - The ID of the parent crumb for nested posts (default: null).
     * @returns A promise that resolves with an array of crumb data.
     * @throws An error object with an optional error message on failure.
     */
    async getMainFeed(numberOfPosts: number = 15, continue_from: string = "", parent: string | null = null) {
        try {
            const response = await this.client.get('/getMainFeed', {params: {
                    "max_posts": numberOfPosts,
                    "continue_from": continue_from,
                    "parent": parent
                }});
            return response.data as Crumb[];
        } catch (error: any) {
            this.handleApiError(error, {})
        }
    }

    /**
     * Retrieves replies with a specified number of posts and optional pagination parameters.
     * @param numberOfPosts - The maximum number of posts to retrieve (default: 10).
     * @param continue_from - A token for paginating through the feed (default: "").
     * @param parent - The ID of the parent crumb for nested posts (default: null).
     * @returns A promise that resolves with an array of crumb data.
     * @throws An error object with an optional error message on failure.
     */
    async getReplies(numberOfPosts: number = 10, contine_from: string = "", parent: string) {
        try {
            const response = await this.client.get('/getReplies', {params: {
                    "continue_from": contine_from,
                    "parent": parent,
                    "max_posts": numberOfPosts,
                }});
            return response.data as Crumb[];
        } catch (error: any) {
            this.handleApiError(error, {})
        }
    }

    /**
     * Retrieves a feed of posts written by a specific user with a specified number of posts and optional pagination parameters.
     * @param username - The username of the user whose feed is to be retrieved.
     * @param numberOfPosts - The maximum number of posts to retrieve (default: 10).
     * @param continue_from - A token for paginating through the feed (default: "").
     * @returns A promise that resolves with an array of crumb data.
     * @throws An error object with an optional error message on failure.
     */
    async getUserFeed(username: string, numberOfPosts: number = 10, continue_from: string = "") {
        try {
            const response = await this.client.get('/getUserFeed', {params: {
                    "user": username,
                    "max_posts": numberOfPosts,
                    "continue_from": continue_from
                }});
            return response.data as Crumb[];
        } catch (error: any) {
            this.handleApiError(error, {}) // TODO: Handle custom handler errors
        }
    }

    /**
     * Toggles a like for a crumb by either adding or removing the like.
     * @param crumb - The crumb to like or unlike.
     * @throws An error object with an optional error message on failure.
     */
    async toggleLike(crumb: Crumb) {
        try {
            if (crumb.liked) {
                await this.client.delete('/likeCrumb', {params: {'crumb': crumb.post_id}})
            } else {
                await this.client.post('/likeCrumb', {},{params: {'crumb': crumb.post_id}})
            }
        } catch (error: any) {
            this.handleApiError(error, {})
        }
    }

    /**
     * Toggles following or unfollowing a user.
     * @param userId - The ID of the user to follow or unfollow.
     * @param remove - If true, unfollows the user; if false, follows the user.
     * @throws An error object with an optional error message on failure.
     */
    async toggleFollow(userId: String, remove: boolean) {
        try {
            if (remove) {
                await this.client.delete('/followUser', {params: {'user': userId}})
            } else {
                await this.client.post('/followUser', {},{params: {'user': userId}})
            }
        } catch (error: any) {
            this.handleApiError(error, {})
        }
    }

    /**
     * Deletes a user's account after verifying the user's password.
     * @param username - The user's username.
     * @param password - The user's password for authentication.
     * @throws An error object with specific error messages on failure.
     */
    async userDeletion(username: string, password: string) {
        try {
            await this.userLogin(username, password)
            await this.client.delete('/deleteUser')
        } catch (error: any) {
            if (error.message === "Incorrect username and/or password") {
                throw new Error("Incorrect password provided")
            }
            console.log(error)
            this.handleApiError(error, {})
        }
    }

    /**
     * Retrieves the profile information of a user with the specified username.
     * @param username - The username of the user whose profile information is to be retrieved.
     * @returns A promise that resolves with the user's profile data.
     * @throws An error object with an optional error message on failure.
     */
    async getProfileInfo(username: string) {
        try {
            const response = await this.client.get('/getProfileInfo', {params: {'profileOwner': username}})
            return response.data as User
        } catch (error: any) {
            this.handleApiError(error, {})
        }

    }

    /**
     * Handles errors from API requests and throws appropriate error messages.
     * @param error - The Axios error object.
     * @param customErrorMessages - Custom error messages for specific HTTP status codes (default: {}).
     * @throws An error with the appropriate error message based on the error type.
     */
    private handleApiError(error: AxiosError, customErrorMessages: Record<number, string> = {}) {
        if (error.response) {
            const status = error.response.status;
            if (customErrorMessages[status]) {
                throw new Error(customErrorMessages[status]);
            } else {
                throw new Error('Unexpected server error, try again later');
            }
        } else if (error.request) {
            throw new Error('Network error or timeout');
        } else {
            throw new Error('Unexpected error');
        }
    }
}