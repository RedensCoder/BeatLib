import {User} from "../../DataBase/Structures.js";

export const getAllUserById = async (res, req) => {
    let data = await User.findOne({where: {username: req.params.username}});
    res.send(data);
}