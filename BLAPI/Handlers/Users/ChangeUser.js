import md5 from "md5";
import {User} from "../../DataBase/Structures.js";

export const ChangeUser = async (req, res) => {
    const body = req.body;
    if (!body.username || !body.password || !body.oldUsername) {
        res.send("Error send data!")
    } else if (await User.findOne({where: {username: body.oldUsername, password: md5(body.password)}}) === null) {
        res.send("User not found!")
    } else {
        if (body.about !== "") {
            await User.update({username: body.username, about: body.about}, {
                where: {
                    username: body.oldUsername,
                    password: md5(body.password)
                }
            })
        } else {
            await User.update({username: body.username}, {
                where: {
                    username: body.oldUsername,
                    password: md5(body.password)
                }
            })
        }
        res.send("user successful changed!");
    }
}