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