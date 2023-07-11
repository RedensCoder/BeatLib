import md5 from "md5";
import {User} from "../../DataBase/Structures.js";
import {generateAccessToken} from "../../jwt.js";

export const authUser = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.send("Error data!");
    } else {
        let data = await User.findOne({where: {username: req.body.username, password: md5(req.body.password)}});
        if (data !== null) {
            const token = generateAccessToken(data.username, data.password, data.email);

            res.send(token)
        } else {
            res.send("User not found!");
        }
    }
}