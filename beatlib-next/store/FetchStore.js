import {makeAutoObservable} from "mobx";
import axios from "axios";
import {useParseJWT} from "../components/CustomHooks";
import {getCookie} from "cookies-next";

class FetchStore {
    constructor() {
        makeAutoObservable(this);
    }

    async getData(context) {
        const token = context.req.cookies["user"];

        const res = await axios.get(`http://localhost:8080/api/v1/getAllUserByUserName/${useParseJWT(token).data.username}`, {
            headers: {
                'Authorization': token
            }
        });

        return res.data;
    }

    async getUserData(context) {
        const { user } = context.params;

        const res = await axios.get(`http://localhost:8080/api/v1/getUserByUserName/${user}`, {
            headers: {
                'Authorization': context.req.cookies["user"]
            }
        });

        return res.data
    }

    async getUserByName(name, cookie) {
        const res = await axios.get(`http://localhost:8080/api/v1/getUserByUserName/${name}`, {
            headers: {
                'Authorization': cookie
            }
        });

        return await res.data
    }

    async getStats(context) {
        const token = context.req.cookies["user"];

        const res = await axios.get(`http://localhost:8080/api/v1/getUserStats/${useParseJWT(token).data.username}`, {
            headers: {
                'Authorization': context.req.cookies["user"]
            }
        });

        return res.data
    }

    async getUserStats(context) {
        const { user } = context.params;

        const res = await axios.get(`http://localhost:8080/api/v1/getUserStats/${user}`, {
            headers: {
                'Authorization': context.req.cookies["user"]
            }
        });

        return res.data
    }

    async getBeats(context) {
        const token = context.req.cookies["user"];

        const res = await axios.get(`http://localhost:8080/api/v1/getUserBeats/${useParseJWT(token).data.username}`, {
            headers: {
                'Authorization': context.req.cookies["user"]
            }
        });

        return res.data
    }
    async getUserBeats(context) {
        const { user } = context.params;

        const res = await axios.get(`http://localhost:8080/api/v1/getUserBeats/${user}`, {
            headers: {
                'Authorization': context.req.cookies["user"]
            }
        });

        return res.data
    }


    async getUserExp(context) {
        const { user } = context.params;

        const res = await axios.get(`http://localhost:8080/api/v1/getUserExp/${user}`, {
            headers: {
                'Authorization': context.req.cookies["user"]
            }
        });

        return res.data
    }

    async getExp(context) {
        const token = context.req.cookies["user"];

        const res = await axios.get(`http://localhost:8080/api/v1/getUserExp/${useParseJWT(token).data.username}`, {
            headers: {
                'Authorization': context.req.cookies["user"]
            }
        });

        return res.data
    }

    async addUserExp(user, count) {
        let req = await axios.post("http://localhost:8080/api/v1/incrementUserExp",
            {
                "username": user,
                "exp": count
            },
            {
                headers: {
                    'Authorization': getCookie("user")
                }
            });
    }
}

export default new FetchStore();