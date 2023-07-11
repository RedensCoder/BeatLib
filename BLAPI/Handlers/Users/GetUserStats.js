import { Stats } from "../../DataBase/Structures.js"

export const getUserStats = async (req, res) => {
    let data = await Stats.findOne({where: { username: req.params.username}})
    res.send(data)
}