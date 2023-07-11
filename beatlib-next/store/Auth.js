import {makeAutoObservable} from "mobx";
import axios from "axios";
import {setCookie} from "cookies-next";
import {useParseJWT} from "../components/CustomHooks";

class Auth {
    error = "";

    constructor() {
        makeAutoObservable(this);
    }

    register(data) {
        if (data.password === data.sub_password) {
            axios.post("http://localhost:8080/api/v1/createUser", {
                "username": data.username,
                "password": data.password,
                "email": data.email,
            }, {
                headers: {
                    'Access-Control-Allow-Credentials': true,
                },
            }).then(res => {
                if (res.data === "This user already exist!") {
                    this.error = "Данный пользователь уже зарегистрирован!";
                } else {
                    this.error = "Регистрация прошла успешно!";
                }
            })
        } else {
            this.error = "Пароли не совпадают!";
        }
    }

    async auth(data) {
        let req = await axios.post(`http://localhost:8080/api/v1/auth`, {
            "username": data.username,
            "password": data.password

            }, {
            headers: {
                'Access-Control-Allow-Credentials': true,
            }});

            if (req.data === "User not found!") {
                this.error = "Вы неправильно ввели данные!";
            } else {
                await setCookie("user", req.data, {maxAge: 60 * 60 * 24 * 7})
                location.reload();
            }
    }
}

export default new Auth();