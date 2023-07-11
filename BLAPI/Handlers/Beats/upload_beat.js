import { Beats } from "../../DataBase/Structures.js";

export const upload_beat = async (req, res) => {
    if (!req.body.username || !req.body.name || !req.body.bpm || !req.body.mp3_price || !req.body.wav_price || !req.body.track_price || !req.body.exclusive) {
        res.send("Error send data!")
    } else {
        if (req.files) {
            if (await Beats.findOne({where: {name: req.body.name}}) !== {}) {
                Beats.create({
                    username: req.body.username,
                    name: req.body.name,
                    descript: req.body.descript,
                    bpm: req.body.bpm,
                    avatar: `http://localhost:8080/api/v1/files/${req.files.avatar[0].path.replace("public\\", "")}`,
                    streaming_src: `http://localhost:8080/api/v1/files/${req.files.streaming_src[0].path.replace("public\\", "")}`,
                    mp3_src: `http://localhost:8080/api/v1/files/${req.files.mp3_src[0].path.replace("public\\", "")}`,
                    wav_src: `http://localhost:8080/api/v1/files/${req.files.wav_src[0].path.replace("public\\", "")}`,
                    track_src: `http://localhost:8080/api/v1/files/${req.files.track_src[0].path.replace("public\\", "")}`,
                    mp3_price: req.body.mp3_price,
                    wav_price: req.body.wav_price,
                    track_price: req.body.track_price,
                    exclusive: req.body.exclusive
                })

                res.send(req.files);
            } else {
                res.send("This beat is already!");
            }
        } else {
            res.send("File doesn't uploaded!")
        }
    }
}