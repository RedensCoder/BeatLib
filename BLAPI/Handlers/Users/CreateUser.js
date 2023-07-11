import md5 from "md5";
import {Exp, User, Stats} from "../../DataBase/Structures.js";

export const createUser = async (req, res) => {
    const body = req.body;
    if (!body.username || !body.password || !body.email) {
        res.send("Error send data!")
    } else {
        if (await User.findOne({where: {username: body.username}}) != null) {
            res.send("This user already exist!")
        } else {
            await User.create({
                username: body.username,
                password: md5(body.password),
                email: body.email,
                about: "",
                avatar: "http://localhost:8080/api/v1/files/avatar_none.png",
                level: 1
            });

            await Exp.create({
                username: body.username,
                exp: 0,
                max_exp: 100
            })

            await Stats.create({
                username: body.username,
                subs: 0,
                listeners: 0,
            })

            res.send("User created!");
        }
    }
}