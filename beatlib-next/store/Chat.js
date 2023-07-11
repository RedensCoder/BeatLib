import {makeAutoObservable} from "mobx";
import axios from "axios";
import {useParseJWT} from "../components/CustomHooks";

class Chat {
    constructor() {
        makeAutoObservable(this);
    }

    async getMessages(context) {
        const token = context.req.cookies["user"];

        let req = await axios.get(`http://localhost:8080/api/v1/getChatMessages/1`, {
            headers: {
                "Authorization": token
            }
        })

        return req.data;
    }

    async getChats(context) {
        const token = context.req.cookies["user"];

        let req = await axios.get(`http://localhost:8080/api/v1/getChat/${useParseJWT(token).data.username}`, {
            headers: {
                'Authorization': token
            }
        })

        return req.data;
    }
}

export default new Chat();