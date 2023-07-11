import { Op } from "sequelize";
import { Chat } from "../../DataBase/Structures.js";

export const getChat = async (req, res) => {
    let data = await Chat.findAll({where: {[Op.or]: [{user_one: req.params.username}, {user_two: req.params.username}]}});
    res.send(data);
}