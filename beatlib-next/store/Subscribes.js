import {makeAutoObservable} from "mobx";
import axios from "axios";
import {getCookie} from "cookies-next";
import {useParseJWT} from "../components/CustomHooks";

class Subscribes {
    constructor() {
        makeAutoObservable(this)
    }

    async subscribe(user, sub_user) {
        await axios.post("http://localhost:8080/api/v1/subscribe", {
            user: user,
            follow: sub_user
        }, {
            headers: {
                "Authorization": getCookie("user")
            }
        })

        location.reload();
    }

    async unSubscribe(user, sub_user) {
        await axios.post("http://localhost:8080/api/v1/unsubscribe", {
            user: user,
            follow: sub_user
        }, {
            headers: {
                "Authorization": getCookie("user")
            }
        })

        location.reload();
    }

    async getUserSub(context) {
        const token = context.req.cookies["user"];

        const res = await axios.get(`http://localhost:8080/api/v1/getUserSubscribes/${useParseJWT(token).username}`, {
            headers: {
                "Authorization": token
            }
        })

        return res.data
    }
}

export default new Subscribes();