import { Messages } from "../../DataBase/Structures.js"

export const addmessage = async (req, res) => {
    if (!req.body.id || !req.body.from || !req.body.message) {
        res.send("Error send data!")
    } else {
        let now = new Date();
        await Messages.create({
            chat_id: req.body.id,
            from_msg: req.body.from,
            message: req.body.message,
            created_at: now
        })
        res.send("Message sended!")
    }
}