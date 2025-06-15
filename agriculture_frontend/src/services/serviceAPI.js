import {API} from "../hooks/API.js";

export class ServiceAPI {

    static async getHeroComponent(key1, key2) {
        return await API.getAPIWithoutToken(key1, key2);
    }

    static async getBlogsWithPagination(key1, key2) {
        return await API.getAPIWithoutToken(key1, key2);
    }

    static async getAllCategoriesServices(key1, key2){
        return await API.getAPIWithoutToken(key1, key2);
    }

    static async getServiceDetail(key1, key2) {
        return await API.getAPIWithoutToken(key1, key2);
    }

    static async getCategoryDetail(key1, key2){
        return await API.getAPIWithoutToken(key1, key2);
    }

    static async setAuthentication(key1, key2, body){
        return await API.setAPIWithoutToken(key1, key2, body);
    }

    static async validateEmail(key1, key2){
        return await API.putAPIWithoutToken(key1, key2);
    }

    static async getDataWithToken(key1, key2){
        return await API.getAPIWithToken(key1, key2);
    }

    static async putDataWithoutToken(key1, key2, body){
        return await API.putAPIWithoutTokenAndAddBody(key1, key2, body);
    }

    static async getAPIWithoutPagination(key1, key2){
        return await API.getAPIWithoutToken(key1, key2);
    }

    static async setAPIWithToken(key1, key2, body){
        return await API.setAPIWithToken(key1, key2, body);
    }

    static async logout(key1) {
        return await API.logout(key1);
    }

    static async deleteWithToken(key1, key2) {
        return await API.deleteWithToken(key1, key2);
    }

    static async getWeather(key1, key2){
        return await API.getWeather(key1, key2);
    }

    static async loginWithSocial(key1, key2, body) {
        return await API.setAPIWithoutToken(key1, key2, body);
    }

    static async deleteAccount(key1, key2){
        return await API.deleteWithToken(key1, key2);
    }
}