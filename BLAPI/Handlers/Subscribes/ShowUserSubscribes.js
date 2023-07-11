import {Subscribes} from "../../DataBase/Structures.js";

export const showUserSubscribes = async (req, res) => {
    let data = await Subscribes.findAll({where: {sub_user: req.params.username}});
    res.send(data);
}