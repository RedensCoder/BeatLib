import {connect} from "./Connect.js";
import {DataTypes} from "sequelize";

export const User = connect.define("users", {
    username: {
        type: DataTypes.TEXT,
        primaryKey: true
    },
    password: DataTypes.TEXT,
    email: DataTypes.TEXT,
    about: DataTypes.TEXT,
    avatar: DataTypes.TEXT,
    level: DataTypes.INTEGER,
}, {timestamps: false});

export const Exp = connect.define("user_exps", {
    username: DataTypes.TEXT,
    exp: DataTypes.INTEGER,
    max_exp: DataTypes.INTEGER,
}, {timestamps: false});

export const Subscribes = connect.define("subscribes", {
    sub_user: DataTypes.TEXT,
    follow_user: DataTypes.TEXT
}, {timestamps: false});

export const Stats = connect.define("stats", {
    username: DataTypes.TEXT,
    subs: DataTypes.INTEGER,
    listeners: DataTypes.INTEGER,
}, {timestamps: false});

export const Chat = connect.define("chats", {
    user_one: DataTypes.TEXT,
    user_two: DataTypes.TEXT
}, {timestamps: false});

export const Messages = connect.define("messages", {
    chat_id: DataTypes.INTEGER,
    from_msg: DataTypes.TEXT,
    message: DataTypes.TEXT,
    created_at: DataTypes.DATE
}, {timestamps: false});

export const Beats = connect.define("beats", {
    username: DataTypes.TEXT,
    name: DataTypes.TEXT,
    descript: DataTypes.TEXT,
    bpm: DataTypes.INTEGER,
    avatar: DataTypes.TEXT,
    streaming_src: DataTypes.TEXT,
    mp3_src: DataTypes.TEXT,
    wav_src: DataTypes.TEXT,
    track_src: DataTypes.TEXT,
    mp3_price: DataTypes.INTEGER,
    wav_price: DataTypes.INTEGER,
    track_price: DataTypes.INTEGER,
    exclusive: DataTypes.INTEGER
}, {timestamps: false});
