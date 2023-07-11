import { Exp } from "../../DataBase/Structures.js"

export const getUserExp = async (req, res) => {
    let data = await Exp.findOne({where: { username: req.params.username}})
    res.send(data)
}