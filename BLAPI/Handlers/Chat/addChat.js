import { Chat } from "../../DataBase/Structures.js";

export const addChat = async (req, res) => {
    if (!req.body.user_one || !req.body.user_two) {
        res.send("Error send data!");
    } else {
        if (await Chat.findOne({where: {user_one: req.body.user_one}}) === null) {
            await Chat.create({
                user_one: req.body.user_one,
                user_two: req.body.user_two
            })

            res.send("Chat created!");
        } else {
            res.send("Chat is already exist!");
        }
    }
}