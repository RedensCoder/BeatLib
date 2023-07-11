import { Messages } from "../../DataBase/Structures.js"

export const getChatMessages = async (req, res) => {
    let data = await Messages.findAll({where: {chat_id: req.params.chat_id}})
    res.send(data);
}