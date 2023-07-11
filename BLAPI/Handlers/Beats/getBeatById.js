import {Beats} from "../../DataBase/Structures.js";

export const getBeatById = async (req, res) => {
    let data = await Beats.findOne({where: {id: req.params.id}});
    res.send(data);
}