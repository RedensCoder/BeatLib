import { Beats } from "../../DataBase/Structures.js"

export const getUserBeat = async (req, res) => {
    let data = await Beats.findAll({where: {username: req.params.username}});

    res.send(data);
}