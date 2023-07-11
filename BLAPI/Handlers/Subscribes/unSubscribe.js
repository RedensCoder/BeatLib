import {Subscribes, Stats} from "../../DataBase/Structures.js";

export const unSubscribe = async (req, res) => {
    if (!req.body.user || !req.body.follow) {
        res.send("Error data send!")
    } else {
        if (await Subscribes.findOne({where: {sub_user: req.body.user, follow_user: req.body.follow}}) === null) {
            res.send("This user no subscribe!")
        } else {
            await Subscribes.destroy({
                where: {
                    sub_user: req.body.user,
                    follow_user: req.body.follow
                }
            });

            await Stats.decrement("subs", {by: 1, where: {username: req.body.follow}})
            res.send("User unsubscribed!");
        }
    }
}