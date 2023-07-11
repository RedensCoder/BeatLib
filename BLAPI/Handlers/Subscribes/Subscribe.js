import {Stats, Subscribes} from "../../DataBase/Structures.js";

export const subscribe = async (req, res) => {
    if (!req.body.user || !req.body.follow) {
        res.send("Error data send!")
    } else {
        if (await Subscribes.findOne({where: {sub_user: req.body.user, follow_user: req.body.follow}}) != null) {
            res.send("This user already subscribe!")
        } else {
            await Subscribes.create({
                sub_user: req.body.user,
                follow_user: req.body.follow
            });

            await Stats.increment("subs", {by: 1, where: {username: req.body.follow}})
            res.send("User subscribed!");
        }
    }
}