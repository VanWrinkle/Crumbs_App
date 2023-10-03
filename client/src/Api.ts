import axios, {Axios, AxiosError, AxiosInstance, AxiosResponse} from "axios";
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
           this.handleApiError(error, {401: 'Incorrect username and/or password'})
       }
    }

    async userRenew() {
        try {
            const response = await this.client.post('/renew')
            return response.data
        } catch (error: any) {
            this.handleApiError(error, {401: 'Invalid token'})
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
            this.handleApiError(error, {
                400: 'The username or password does not meet the security requirements',
                409: 'A user is already registered by that username'
            })
        }
    }

    async postNewCrumb(crumb: Crumb) {
        try {
            const response = await this.client.post('/postCrumb', crumb);
            return response.data;
        } catch (error: any) {
            this.handleApiError(error, {401: 'Not logged in'})
        }
    }

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