import {User} from "../../DataBase/Structures.js";

export const getUserById = async (res, req) => {
    let data = await User.findOne({attributes: ["username", "about", "avatar", "level"] ,where: {username: req.params.username}});
    res.send(data);
}