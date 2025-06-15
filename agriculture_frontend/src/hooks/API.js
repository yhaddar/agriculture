import axios from "axios";
import Cookies from "js-cookie";

export class API {
    static host = import.meta.env.VITE_SERVER_LOCALHOST;
    static port = import.meta.env.VITE_SERVER_PORT;
    static mode = import.meta.env.VITE_PROJECT_MODE;
    static web = this.mode === "DEVELOPEMENT" ? `${this.host}:${this.port}` : this.mode === "PRODUCTION" ? "https://agriculture.laravel.cloud" : null;
    static token = Cookies.get("token");

    static async getAPIWithoutToken(key1, key2) {
        try {
            const response = await axios.get(`${this.web}/api/${key1}/${key2}`);

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async setAPIWithoutToken(key1, key2, body) {
        try {

            const response = await axios.post(`${import.meta.env.VITE_SERVER_LOCALHOST}:${import.meta.env.VITE_SERVER_PORT}/api/${key1}/${key2}`, body, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await response.data;
            const status = await response.status;

            return {response: data?.data, status};


        } catch (error) {
            const data = await error.response.data.error;
            const status = await error.response.status;
            return {response: data, status: status};

        }
    }

    static async putAPIWithoutToken(key1, key2) {
        try {

            const response = await axios.put(`${this.web}/api/${key1}/${key2}`);

            const data = await response.data;
            const status = response.status;

            return {response: data?.data, status};

        } catch (error) {
            const data = await error.response.data.error;
            const status = await error.response.status;
            return {response: data, status: status};
        }
    }

    static async getAPIWithToken(key1, key2) {
        try {

            const response = await axios.get(`${this.web}/api/${key1}/${key2}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                }
            });

            const data = await response.data;
            const status = response.status;
            return {response: data?.data, status};

        } catch (error) {
            const data = await error.response.data;
            const status = await error.response.status;
            return {response: data?.data, status};
        }
    }

    static async putAPIWithoutTokenAndAddBody(key1, key2, body) {
        try {

            const response = await axios.put(`${this.web}/api/${key1}/${key2}`, body, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await response.data;
            const status = response.status;

            return {response: data?.data, status};

        } catch (error) {
            const data = await error.response.data.error;
            const status = await error.response.status;
            return {response: data, status: status};
        }
    }

    static async setAPIWithToken(key1, key2, body) {
        try {

            const response = await axios.post(`${import.meta.env.VITE_SERVER_LOCALHOST}:${import.meta.env.VITE_SERVER_PORT}/api/${key1}/${key2}`, body, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.token}`,
                },
            });

            const data = await response.data;
            const status = await response.status;

            return {data: data?.data, status};


        } catch (error) {
            const data = await error.response.data.message;
            const status = await error.response.status;
            return {data: data, status: status};

        }
    }

    static async logout(key1) {
        try {

            const response = await axios.post(`${import.meta.env.VITE_SERVER_LOCALHOST}:${import.meta.env.VITE_SERVER_PORT}/api/${key1}`, null, {
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                }
            });

            const data = await response.data;
            const status = await response.status;

            return {data: data?.data, status};

        }catch (error) {
            const data = await error.response.data.error;
            const status = await error.response.status;
            return {response: data, status: status};

        }
    }

    static async deleteWithToken(key1, key2) {
        try {

            const response = await axios.delete(`${import.meta.env.VITE_SERVER_LOCALHOST}:${import.meta.env.VITE_SERVER_PORT}/api/${key1}/${key2}`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                }
            });

            const data = await response.data;
            const status = await response.status;

            return {data: data?.data, status};

        }catch (error) {
            const data = await error.response.data.error;
            const status = await error.response.status;
            return {response: data, status: status};

        }
    }

    static async getWeather(key1, key2){
        try {

            const response = await axios.get(`${import.meta.env.VITE_SERVER_LOCALHOST}:${import.meta.env.VITE_SERVER_PORT}/api/${key1}/${key2}`);

            const data = await response.data;
            const status = await response.status;

            return {weather: data?.weather, forecast: data?.forecast, status};

        }catch (error) {
            const data = await error.response.data.error;
            const status = await error.response.status;
            return {response: data, status: status};

        }
    }
}