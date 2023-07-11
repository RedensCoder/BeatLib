import { Op } from "sequelize"
import { Exp, User } from "../../DataBase/Structures.js"

export const updateUserExp = async (req, res) => {
    if (!req.body.exp, !req.body.username) {
        res.send("Error send data!")
    } else {
        Exp.increment("exp", {by: parseInt(req.body.exp), where: {username: req.body.username}})

        let exp = await Exp.findOne({where: {username: req.body.username}})
        let level = await User.findOne({where: {username: req.body.username}})

        if (await Exp.findOne({where: {[Op.and]: [{username: req.body.username}, {exp: {[Op.gte]: exp.max_exp}}]}}) !== null) {
            Exp.decrement({exp: exp.max_exp}, {where: {
                username: req.body.username
            }})
            User.increment("level", {by: 1, where: {username: req.body.username}})
            Exp.update({max_exp: parseInt(100 + 10 * level.level)}, {where: {username: req.body.username}})
        }
        res.send("Exp has changed!")
    }
}