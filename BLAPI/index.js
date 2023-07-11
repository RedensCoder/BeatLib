import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileMult from "./file.cjs";
import fileBeat from "./beat_load.cjs";
import {authenticateToken, authenticateUserToken} from "./jwt.js";
import {config} from "dotenv";
import {getUserById} from "./Handlers/Users/GetUserById.js";
import {getAllUserById} from "./Handlers/Users/GetAllUserById.js";
import {createUser} from "./Handlers/Users/CreateUser.js";
import {authUser} from "./Handlers/Users/authUser.js";
import {ChangeUser} from "./Handlers/Users/ChangeUser.js";
import {subscribe} from "./Handlers/Subscribes/Subscribe.js";
import { unSubscribe } from "./Handlers/Subscribes/unSubscribe.js";
import {showUserSubscribes} from "./Handlers/Subscribes/ShowUserSubscribes.js";
import { User } from "./DataBase/Structures.js";
import { getUserStats } from "./Handlers/Users/GetUserStats.js";
import { upload_beat } from "./Handlers/Beats/upload_beat.js";
import { getUserBeat } from "./Handlers/Beats/getUserBeat.js";
import { getUserExp } from "./Handlers/Users/GetUserExp.js";
import { updateUserExp } from "./Handlers/Users/ChangeUserExp.js";
import { addmessage } from "./Handlers/Chat/addMessage.js";
import { getChat } from "./Handlers/Chat/getChat.js";
import { addChat } from "./Handlers/Chat/addChat.js";
import { getChatMessages } from "./Handlers/Chat/getChatMessages.js";
import {getBeatById} from "./Handlers/Beats/getBeatById.js";
config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/v1/files', express.static('public'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", ["Content-Type", "Access-Control-Allow-Credentials", "Authorization", "Accept-Encoding"]);
    next();
});

// USERS
app.get("/api/v1/getAllUserByUserName/:username", authenticateUserToken, async (req, res) => {
    await getAllUserById(res, req);
});

app.get("/api/v1/getUserByUserName/:username", authenticateToken, async (req, res) => {
    await getUserById(res, req);
});

app.post("/api/v1/createUser", async (req, res) => {
    await createUser(req, res);
});
app.post("/api/v1/auth", async (req, res) => {
    await authUser(req, res);
});
app.post("/api/v1/changeUser", authenticateToken, async (req, res) => {
    await ChangeUser(req, res);
});
app.post("/api/v1/uploadAvatar/:username", fileMult.single("avatar"), authenticateUserToken, (req, res) => {
    if (req.file) {
        User.update({ avatar: `http://localhost:8080/api/v1/files/${req.file.path.replace("public\\", "")}` }, {
            where: {
                username: req.params.username
            }
        })

        res.json(req.file);
    } else {
        res.send("File doesn't uploaded!")
    }
});
// STATS
app.get("/api/v1/getUserStats/:username", authenticateToken, async (req, res) => {
    await getUserStats(req, res);
})
//EXP
app.get("/api/v1/getUserExp/:username", authenticateToken, async (req, res) => {
    await getUserExp(req, res);
})
app.post("/api/v1/incrementUserExp", authenticateToken, async (req, res) => {
    await updateUserExp(req, res);
})
// SUBSCRIBES
app.post("/api/v1/subscribe", authenticateToken, async (req, res) => {
    await subscribe(req, res);
});
app.get("/api/v1/getUserSubscribes/:username", authenticateToken, async (req, res) => {
    await showUserSubscribes(req, res);
});
app.post("/api/v1/unsubscribe", authenticateToken, async (req, res) => {
    await unSubscribe(req, res);
});
//CHAT
app.post("/api/v1/addMessage", authenticateToken, async (req, res) => {
    await addmessage(req, res);
});
app.get("/api/v1/getChatMessages/:chat_id", authenticateToken, async (req, res) => {
    await getChatMessages(req, res);
});
app.post("/api/v1/addChat", authenticateToken, async (req, res) => {
    await addChat(req, res);
})
app.get("/api/v1/getChat/:username", authenticateToken, async (req, res) => {
    await getChat(req, res);
});
// BEATS
app.post("/api/v1/uploadbeat", authenticateToken, fileBeat.fields([{name: "avatar", maxCount: 1}, {name: "streaming_src", maxCount: 1}, {name: "mp3_src", maxCount: 1}, {name: "wav_src", maxCount: 1}, {name: "track_src", maxCount: 1}]), async (req, res) => {
  await upload_beat(req, res)
});
app.get("/api/v1/getUserBeats/:username", authenticateToken, async (req, res) => {
    await getUserBeat(req, res);
});
app.get("/api/v1/getBeatById/:id", async (req, res) => {
    await getBeatById(req, res);
});

app.listen("8080", () => {
    console.log("Server started...");
});