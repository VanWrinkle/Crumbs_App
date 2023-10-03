import axios, {AxiosInstance} from "axios";
import {Crumb} from "./Crumb";

export class Api {
    private client: AxiosInstance

    constructor() {
        this.client = axios.create({
            baseURL: '/api',
            timeout: 5000,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    async userLogin(username: string, password: string) {
       try {
           const response = await this.client.post('/login', {
               username: username,
               password: password
           })
           return response.data
       } catch (error: any) {
           if (error.response) {
               switch (error.response.status) {
                   case 401:
                       throw new Error("Incorrect username and/or password")
                   default:
                       throw new Error("Unexpected server error, try again later")
               }
           } else if (error.request) {
               throw new Error('Network error or timeout');
           } else {
               throw new Error('Unexpected error')
           }

       }
    }

    async userRenew() {
        try {
            const response = await this.client.post('/renew')
            return response.data
        } catch (error: any) {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        throw new Error("Invalid token")
                    default:
                        throw new Error("Unexpected server error, try again later")
                }
            } else if (error.request) {
                throw new Error('Network error or timeout');
            } else {
                throw new Error('Unexpected error')
            }

        }
    }

    async userRegistration(username: string, password: string) {
        try {
            const response = await this.client.post('/register', {
                username: username,
                password: password
            })
            return response.data
        } catch (error: any) {
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        throw new Error("The username or password does not meet the security requirements")
                    case 409:
                        throw new Error("A user is already registered by that username")
                    default:
                        throw new Error("Unexpected server error, try again later")
                }
            } else if (error.request) {
                throw new Error('Network error or timeout');
            } else {
                throw new Error('Unexpected error')
            }
        }
    }

    async postNewCrumb(crumb: Crumb) {
        try {
            const response = await this.client.post('/postCrumb', crumb);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 401) {
                    throw new Error('Not logged in');
                } else {
                    throw new Error('Something went wrong');
                }
            } else if (error.request) {
                throw new Error('Network error or timeout');
            } else {
                throw new Error('Unexpected error');
            }
        }
    }

}